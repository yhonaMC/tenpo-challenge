import React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  React.useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return <>{children}</>
}
