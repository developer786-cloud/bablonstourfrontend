import { spawn } from 'node:child_process'

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const baseUrl = process.env.AUDIT_BASE_URL || 'http://localhost:5173'
const routes = ['/', '/packages', '/destinations', '/blogs', '/gallery', '/about', '/contact', '/faq', '/privacy', '/terms']
const viewports = [
  { width: 320, height: 760, name: 'phone-320' },
  { width: 375, height: 812, name: 'phone-375' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1366, height: 768, name: 'laptop' },
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const requestJson = async (url, retries = 40) => {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return response.json()
    } catch {
      // Edge can take a moment to expose the debugging endpoint.
    }
    await delay(150)
  }

  throw new Error(`Unable to reach ${url}`)
}

const connect = (webSocketDebuggerUrl) =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(webSocketDebuggerUrl)
    ws.addEventListener('open', () => resolve(ws), { once: true })
    ws.addEventListener('error', reject, { once: true })
  })

const makeClient = (ws) => {
  let id = 0
  const pending = new Map()
  const consoleErrors = []
  const networkErrors = []

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(message.error.message))
      else resolve(message.result)
      return
    }

    if (message.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(message.params?.type)) {
      consoleErrors.push(message.params.args?.map((arg) => arg.value || arg.description || '').join(' ') || message.params.type)
    }
    if (message.method === 'Log.entryAdded' && ['error', 'warning'].includes(message.params?.entry?.level)) {
      consoleErrors.push(message.params.entry.text)
    }
    if (message.method === 'Network.responseReceived' && message.params?.response?.status >= 400) {
      networkErrors.push(`${message.params.response.status} ${message.params.response.url}`)
    }
  })

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      id += 1
      pending.set(id, { resolve, reject })
      ws.send(JSON.stringify({ id, method, params }))
    })

  return { send, consoleErrors, networkErrors }
}

const auditPage = async (client, url, viewport) => {
  client.consoleErrors.length = 0
  client.networkErrors.length = 0
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width < 768,
  })
  await client.send('Page.navigate', { url })
  await delay(2200)

  const result = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const doc = document.documentElement;
      const body = document.body;
      const viewportWidth = window.innerWidth;
      const overflow = [];
      document.querySelectorAll('body *').forEach((el) => {
        if (el.closest('[aria-hidden="true"]')) return;
        const rect = el.getBoundingClientRect();
        const className = typeof el.className === 'string' ? el.className : '';
        if (className.includes('gallery-slider-track') || className.includes('testimonial-slider-track')) return;
        if (className.includes('transition-transform duration-[1400ms]')) return;
        if (rect.width > 1 && (rect.right > viewportWidth + 1 || rect.left < -1)) {
          overflow.push({
            tag: el.tagName.toLowerCase(),
            text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 80),
            className: className.slice(0, 140),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
        }
      });
      return {
        url: location.pathname,
        innerWidth: viewportWidth,
        scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
        overflow: overflow.slice(0, 12)
      };
    })()`,
  })

  return {
    viewport: viewport.name,
    route: new URL(url).pathname,
    ...result.result.value,
    consoleErrors: [...client.consoleErrors, ...client.networkErrors],
  }
}

const port = 9223 + Math.floor(Math.random() * 500)
const browser = spawn(edgePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${port}`,
  'about:blank',
], { stdio: 'ignore' })

try {
  await requestJson(`http://127.0.0.1:${port}/json/version`)
  const targets = await requestJson(`http://127.0.0.1:${port}/json/list`)
  const pageTarget = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl)
  if (!pageTarget) throw new Error('No debuggable page target found')
  const ws = await connect(pageTarget.webSocketDebuggerUrl)
  const client = makeClient(ws)
  await client.send('Page.enable')
  await client.send('Runtime.enable')
  await client.send('Log.enable')
  await client.send('Network.enable')

  const reports = []
  for (const viewport of viewports) {
    for (const route of routes) {
      reports.push(await auditPage(client, `${baseUrl}${route}`, viewport))
    }
  }

  ws.close()

  const ignoredConsoleText = ['Tracking Prevention blocked access to storage']
  const normalizedReports = reports.map((report) => ({
    ...report,
    consoleErrors: report.consoleErrors.filter((item) => !ignoredConsoleText.some((ignored) => item.includes(ignored))),
  }))
  const failures = normalizedReports.filter((report) => report.scrollWidth > report.innerWidth + 1 || report.consoleErrors.length)
  console.log(JSON.stringify({ checked: reports.length, failures }, null, 2))
  process.exitCode = failures.length ? 1 : 0
} finally {
  browser.kill()
}
