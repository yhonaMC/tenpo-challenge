import { create } from 'zustand'
import type { AuthState, LoginCredentials } from '../types'
import { authService } from '../services/auth.api'
import { APP_CONSTANTS } from '@/shared/constants/app.constants'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  initializeAuth: () => {
    const token = sessionStorage.getItem(APP_CONSTANTS.TOKEN_KEY)

    if (token) {
      set({
        token,
        isAuthenticated: true,
        user: {
          id: '1',
          email: 'user@example.com',
          name: 'Demo User'
        }
      })
    }
  },

  login: async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials)

      sessionStorage.setItem(APP_CONSTANTS.TOKEN_KEY, response.token)

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true
      })
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  },

  logout: () => {
    sessionStorage.removeItem(APP_CONSTANTS.TOKEN_KEY)
    sessionStorage.clear()

    set({
      user: null,
      token: null,
      isAuthenticated: false
    })

    window.location.href = '/login'
  }
}))
