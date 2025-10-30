import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '@/shared/ui'
import { useAuthStore } from '@/features/auth/store/auth.store'
import type { LoginCredentials } from '@/features/auth/types'
import { ROUTES } from '@/shared/constants/app.constants'

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginCredentials>()

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setIsLoading(true)
      setErrorMessage('')
      await login(data)
      navigate(ROUTES.PRIVATE.HOME)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al iniciar sesión'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <Input
        {...register('email', {
          required: 'El correo electrónico es requerido',
          minLength: {
            value: 8,
            message: 'El correo debe tener al menos 8 caracteres'
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Por favor ingrese un correo válido'
          }
        })}
        type="email"
        placeholder="Correo electrónico"
        error={errors.email?.message}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        }
      />

      <Input
        {...register('password', {
          required: 'La contraseña es requerida',
          minLength: {
            value: 8,
            message: 'La contraseña debe tener al menos 8 caracteres'
          }
        })}
        type="password"
        placeholder="Contraseña"
        error={errors.password?.message}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        }
      />

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
      >
        Iniciar sesión
      </Button>

      <p className="text-sm text-gray-500 text-center mt-4">
        Use cualquier correo electrónico y contraseña válida (8+ caracteres)
      </p>
    </form>
  )
}
