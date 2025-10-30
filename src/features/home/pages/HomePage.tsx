import React from 'react'
import { WorksList } from '@/features/home/components/WorksList'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { Button } from '@/shared/ui'

export const HomePage: React.FC = () => {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-20 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#9EF4C6] rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-black">T</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Tenpo</h1>
                <p className="text-xs text-gray-400">Users Directory</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:border-[#9EF4C6] hover:text-[#9EF4C6] hover:bg-transparent"
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <WorksList />
      </main>
    </div>
  )
}
