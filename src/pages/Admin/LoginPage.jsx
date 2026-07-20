import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaPlaneDeparture, FaShieldAlt } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import loginImage from '../../assets/images/about page image 2.png'

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await login(form)
      toast.success('Welcome back')
      navigate(location.state?.from?.pathname || '/admin/dashboard', { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#071b34] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_32px_90px_rgba(0,0,0,0.28)] sm:min-h-[calc(100vh-3rem)] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden min-h-full overflow-hidden bg-[#071b34] lg:block">
          <img
            src={loginImage}
            alt="Bablons travel experience"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071b34]/92 via-[#071b34]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071b34]/38 via-transparent to-transparent" />

          <div className="relative flex h-full flex-col justify-between p-10 text-white xl:p-12">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/18 bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
              <FaPlaneDeparture className="text-orange-300" />
              Bablons Travel Admin
            </div>

            <div className="max-w-lg">
              <p className="font-display text-2xl italic text-orange-300">Plan better. Move faster.</p>
              <h1 className="mt-3 font-display text-5xl font-bold leading-tight xl:text-6xl">
                Manage every journey from one beautiful dashboard.
              </h1>
              <p className="mt-5 max-w-md text-base leading-8 text-white/78">
                Create destinations, publish packages, review enquiries, and keep Bablons travel operations running smoothly.
              </p>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
                {[
                  ['Live', 'Packages'],
                  ['Fast', 'Enquiries'],
                  ['Smart', 'Content'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/14 bg-white/12 p-4 backdrop-blur">
                    <p className="text-xl font-black">{value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/58">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-9">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shadow-sm">
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-orange-600">Secure admin access</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Welcome back</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to manage packages, destinations, customer enquiries, and website content.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Email address</span>
                <span className="mt-2 flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition-within focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
                  <FaEnvelope className="mr-3 h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                    placeholder="admin@bablons.com"
                    required
                  />
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">Password</span>
                <span className="mt-2 flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition-within focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
                  <FaLock className="mr-3 h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="ml-3 text-slate-400 transition hover:text-orange-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </span>
              </label>

              <button
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_16px_32px_rgba(249,115,22,0.24)] transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:translate-y-0 disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading ? <FaArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /> : null}
              </button>
            </form>

            <p className="mt-7 rounded-2xl bg-slate-50 p-4 text-center text-xs font-semibold leading-6 text-slate-500">
              Sign in to access your Bablons Travel dashboard and continue managing your workspace securely.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LoginPage
