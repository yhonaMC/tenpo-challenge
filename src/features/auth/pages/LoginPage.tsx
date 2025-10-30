import React from 'react'
import { LoginForm } from '../components/LoginForm'

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#9EF4C6] rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-black">T</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Inicie sesión en su cuenta.
          </h1>
          <p className="text-gray-400">
            Ingrese su correo electrónico y contraseña para iniciar sesión.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
