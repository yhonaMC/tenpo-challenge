import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { authService } from './auth.api'
import type { LoginCredentials, AuthResponse } from '../types'

vi.mock('axios')

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('successfully logs in with valid credentials', async () => {
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
        token: 'fake-jwt-token-abc123xyz'
      }

      vi.mocked(axios.post).mockResolvedValueOnce({ data: mockResponse })

      const result = await authService.login(credentials)

      expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
        email: credentials.email,
        password: credentials.password
      })
      expect(result).toEqual(mockResponse)
    })

    it('calls correct endpoint with credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'user@test.com',
        password: 'mypassword'
      }

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email: 'user@test.com',
          name: 'User'
        },
        token: 'token123'
      }

      vi.mocked(axios.post).mockResolvedValueOnce({ data: mockResponse })

      await authService.login(credentials)

      expect(axios.post).toHaveBeenCalledWith(
        '/api/auth/login',
        expect.objectContaining({
          email: credentials.email,
          password: credentials.password
        })
      )
    })

    it('throws error with custom message on axios error response', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }

      const errorMessage = 'Credenciales inválidas'
      const axiosError = {
        response: {
          data: { error: errorMessage }
        },
        isAxiosError: true
      }

      vi.mocked(axios.post).mockRejectedValueOnce(axiosError)
      vi.mocked(axios.isAxiosError).mockReturnValue(true)

      await expect(authService.login(credentials)).rejects.toThrow(errorMessage)
    })

    it('throws default error message when no custom error provided', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }

      const axiosError = {
        response: {
          data: {}
        },
        isAxiosError: true
      }

      vi.mocked(axios.post).mockRejectedValueOnce(axiosError)
      vi.mocked(axios.isAxiosError).mockReturnValue(true)

      await expect(authService.login(credentials)).rejects.toThrow('Error al iniciar sesión')
    })

    it('throws generic error for non-axios errors', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123'
      }

      vi.mocked(axios.post).mockRejectedValueOnce(new Error('Network error'))
      vi.mocked(axios.isAxiosError).mockReturnValue(false)

      await expect(authService.login(credentials)).rejects.toThrow('Error al iniciar sesión')
    })

    it('handles error without response', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123'
      }

      const axiosError = {
        isAxiosError: true
      }

      vi.mocked(axios.post).mockRejectedValueOnce(axiosError)
      vi.mocked(axios.isAxiosError).mockReturnValue(true)

      await expect(authService.login(credentials)).rejects.toThrow('Error al iniciar sesión')
    })

    it('returns user and token from successful response', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123'
      }

      const expectedUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User'
      }

      const expectedToken = 'jwt-token-xyz'

      const mockResponse: AuthResponse = {
        user: expectedUser,
        token: expectedToken
      }

      vi.mocked(axios.post).mockResolvedValueOnce({ data: mockResponse })

      const result = await authService.login(credentials)

      expect(result.user).toEqual(expectedUser)
      expect(result.token).toBe(expectedToken)
    })
  })

  describe('logout', () => {
    it('completes successfully', async () => {
      await expect(authService.logout()).resolves.toBeUndefined()
    })

    it('simulates async operation with delay', async () => {
      const startTime = Date.now()
      await authService.logout()
      const endTime = Date.now()

      expect(endTime - startTime).toBeGreaterThanOrEqual(500)
    })
  })
})

