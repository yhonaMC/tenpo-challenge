import { useEffect } from 'react'
import { AppRouter } from './app/router/AppRouter'
import { QueryProvider } from './app/providers/QueryProvider'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { useAuthStore } from './features/auth/store/auth.store'

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
