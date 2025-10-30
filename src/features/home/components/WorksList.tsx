import React from 'react'
import { UserCard } from './WorkCard'
import { UserCardSkeleton } from './UserCardSkeleton'
import {
  useInfiniteUsers,
  useAutoLoadMore,
  flattenUsers
} from '@/features/home/hooks/useWorks'

export const WorksList: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteUsers()

  const loadMoreRef = useAutoLoadMore(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="sticky top-16 z-10 bg-black/90 backdrop-blur-sm py-6 px-4 border-b border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="h-9 bg-gray-800 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-5 bg-gray-800 rounded w-40 animate-pulse"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center space-y-2">
          <svg
            className="w-12 h-12 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-500">Error al cargar los usuarios</p>
          <p className="text-gray-400 text-sm">
            {error instanceof Error ? error.message : 'Error desconocido'}
          </p>
        </div>
      </div>
    )
  }

  const users = flattenUsers(data)

  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-10 bg-black/90 backdrop-blur-sm py-6 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white">
            Directorio de Usuarios
          </h2>
          <p className="text-gray-400 mt-2">
            {users.length.toLocaleString()} usuarios cargados
            {hasNextPage && ' • Cargando más...'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {users.map((user) => (
            <UserCard key={user.login.uuid} user={user} />
          ))}
        </div>

        {hasNextPage && (
          <div ref={loadMoreRef} className="py-8">
            {isFetchingNextPage ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <UserCardSkeleton key={`loading-${i}`} />
                ))}
              </div>
            ) : null}
          </div>
        )}

        {!hasNextPage && users.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg">
              <svg
                className="w-5 h-5 text-[#9EF4C6]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-400">
                Has visto todos los usuarios ({users.length.toLocaleString()})
              </p>
            </div>
          </div>
        )}

        {users.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay usuarios para mostrar</p>
          </div>
        )}
      </div>
    </div>
  )
}
