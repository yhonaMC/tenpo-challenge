import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { ROUTES } from '@/shared/constants/app.constants'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTES.PRIVATE.HOME} replace />
  }

  return <>{children}</>
}
