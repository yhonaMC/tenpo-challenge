import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useAuthStore } from './auth.store'
import { authService } from '../services/auth.api'
import { APP_CONSTANTS } from '@/shared/constants/app.constants'
import type { LoginCredentials, AuthResponse } from '../types'

vi.mock('../services/auth.api')

describe('useAuthStore', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.clearAllMocks()
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false
    })
  })

  afterEach(() => {
    sessionStorage.clear()
  })

  describe('initial state', () => {
    it('has correct initial state', () => {
      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })
  })

  describe('initializeAuth', () => {
    it('initializes auth from sessionStorage when token exists', () => {
      const token = 'test-token-123'
      sessionStorage.setItem(APP_CONSTANTS.TOKEN_KEY, token)

      const { initializeAuth } = useAuthStore.getState()
      initializeAuth()

      const state = useAuthStore.getState()
      expect(state.token).toBe(token)
      expect(state.isAuthenticated).toBe(true)
      expect(state.user).toEqual({
        id: '1',
        email: 'user@example.com',
        name: 'Demo User'
      })
    })

    it('does not initialize auth when token does not exist', () => {
      const { initializeAuth } = useAuthStore.getState()
      initializeAuth()

      const state = useAuthStore.getState()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.user).toBeNull()
    })
  })

  describe('login', () => {
    it('successfully logs in user', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123'
      }

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User'
        },
        token: 'fake-token-123'
      }

      vi.mocked(authService.login).mockResolvedValueOnce(mockResponse)

      const { login } = useAuthStore.getState()
      await login(credentials)

      const state = useAuthStore.getState()
      expect(state.user).toEqual(mockResponse.user)
      expect(state.token).toBe(mockResponse.token)
      expect(state.isAuthenticated).toBe(true)
      expect(sessionStorage.getItem(APP_CONSTANTS.TOKEN_KEY)).toBe(mockResponse.token)
    })

    it('stores token in sessionStorage on successful login', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123'
      }

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User'
        },
        token: 'fake-token-123'
      }

      vi.mocked(authService.login).mockResolvedValueOnce(mockResponse)

      const { login } = useAuthStore.getState()
      await login(credentials)

      expect(sessionStorage.getItem(APP_CONSTANTS.TOKEN_KEY)).toBe(mockResponse.token)
    })

    it('throws error on failed login', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'wrong-password'
      }

      const errorMessage = 'Invalid credentials'
      vi.mocked(authService.login).mockRejectedValueOnce(new Error(errorMessage))

      const { login } = useAuthStore.getState()

      await expect(login(credentials)).rejects.toThrow(errorMessage)

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })

    it('calls authService.login with correct credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123'
      }

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User'
        },
        token: 'fake-token-123'
      }

      vi.mocked(authService.login).mockResolvedValueOnce(mockResponse)

      const { login } = useAuthStore.getState()
      await login(credentials)

      expect(authService.login).toHaveBeenCalledWith(credentials)
      expect(authService.login).toHaveBeenCalledTimes(1)
    })
  })

  describe('logout', () => {
    it('clears user state on logout', () => {
      useAuthStore.setState({
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User'
        },
        token: 'fake-token',
        isAuthenticated: true
      })

      sessionStorage.setItem(APP_CONSTANTS.TOKEN_KEY, 'fake-token')

      const mockAssign = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { href: '', assign: mockAssign },
        writable: true
      })

      const { logout } = useAuthStore.getState()
      logout()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })

    it('removes token from sessionStorage on logout', () => {
      sessionStorage.setItem(APP_CONSTANTS.TOKEN_KEY, 'fake-token')

      const mockAssign = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { href: '', assign: mockAssign },
        writable: true
      })

      const { logout } = useAuthStore.getState()
      logout()

      expect(sessionStorage.getItem(APP_CONSTANTS.TOKEN_KEY)).toBeNull()
    })

    it('clears all sessionStorage on logout', () => {
      sessionStorage.setItem(APP_CONSTANTS.TOKEN_KEY, 'fake-token')
      sessionStorage.setItem('other-key', 'other-value')

      const mockAssign = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { href: '', assign: mockAssign },
        writable: true
      })

      const { logout } = useAuthStore.getState()
      logout()

      expect(sessionStorage.length).toBe(0)
    })

    it('redirects to login page on logout', () => {
      const originalLocation = window.location
      delete (window as unknown as { location: unknown }).location

      Object.defineProperty(window, 'location', {
        value: { href: '' },
        writable: true,
        configurable: true
      })

      const { logout } = useAuthStore.getState()
      logout()

      expect(window.location.href).toBe('/login')

      window.location = originalLocation
    })
  })
})

