import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/app.constants'

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Recuperar contraseña
          </h1>
          <p className="mt-2 text-gray-400">Esta es una página de ejemplo</p>
        </div>
        <Link
          to={ROUTES.PUBLIC.LOGIN}
          className="block text-center text-[#9EF4C6] hover:underline"
        >
          Volver al login
        </Link>
      </div>
    </div>
  )
}
