import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { ROUTES } from '@/shared/constants/app.constants'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />
  }

  return <>{children}</>
}
