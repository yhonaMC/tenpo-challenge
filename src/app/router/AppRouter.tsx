import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { ROUTES } from '@/shared/constants/app.constants'
import { LoginPage, ForgotPasswordPage } from '@/features/auth/pages'
import { HomePage } from '@/features/home/pages/HomePage'

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.PUBLIC.LOGIN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.PUBLIC.FORGOT_PASSWORD}
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.PRIVATE.HOME}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={ROUTES.PUBLIC.LOGIN} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
