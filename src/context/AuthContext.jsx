import { useCallback, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService'
import { AuthContext } from './authContextValue'

const storedUser = () => {
  try {
    return JSON.parse(localStorage.getItem('bablons_admin_user') || 'null')
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('bablons_admin_token'))
  const [user, setUser] = useState(storedUser)
  const [loading, setLoading] = useState(Boolean(token))

  const saveSession = useCallback((nextToken, nextUser) => {
    localStorage.setItem('bablons_admin_token', nextToken)
    localStorage.setItem('bablons_admin_user', JSON.stringify(nextUser))
    setToken(nextToken)
    setUser(nextUser)
  }, [])

  const clearSession = useCallback(() => {
    localStorage.removeItem('bablons_admin_token')
    localStorage.removeItem('bablons_admin_user')
    setToken(null)
    setUser(null)
  }, [])

  const login = useCallback(
    async (payload) => {
      const data = await authService.login(payload)
      saveSession(data.token, data.user)
      return data.user
    },
    [saveSession]
  )

  const logout = useCallback(async () => {
    try {
      if (token) await authService.logout()
    } finally {
      clearSession()
    }
  }, [clearSession, token])

  useEffect(() => {
    let mounted = true
    const verify = async () => {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const data = await authService.me()
        if (mounted) {
          setUser(data.user)
          localStorage.setItem('bablons_admin_user', JSON.stringify(data.user))
        }
      } catch {
        if (mounted) clearSession()
      } finally {
        if (mounted) setLoading(false)
      }
    }
    verify()
    return () => {
      mounted = false
    }
  }, [clearSession, token])

  const value = useMemo(
    () => ({ token, user, loading, isAuthenticated: Boolean(token && user), login, logout }),
    [loading, login, logout, token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
