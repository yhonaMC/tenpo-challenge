import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { homeService } from '@/features/home/services/home.api'
import { APP_CONSTANTS } from '@/shared/constants/app.constants'
import type { User } from '@/features/home/types'

// Hook original mantenido por compatibilidad
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => homeService.fetchUsers(),
    select: (data) => {
      return {
        users: data.results,
        totalCount: data.info.results
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  })
}

// Nuevo hook con infinite scroll y paginación
export const useInfiniteUsers = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['users-infinite'],
    
    queryFn: async ({ pageParam }) => {
      const response = await homeService.fetchUsers({
        page: pageParam,
        results: APP_CONSTANTS.ITEMS_PER_PAGE,
      })
      return response
    },
    
    initialPageParam: 1,
    
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * APP_CONSTANTS.ITEMS_PER_PAGE
      
      // Detenerse cuando alcancemos MAX_ITEMS
      if (totalFetched >= APP_CONSTANTS.MAX_ITEMS) {
        return undefined
      }
      
      // Siguiente página
      return allPages.length + 1
    },
    
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  }
}

// Hook helper para manejar infinite scroll automático
export const useAutoLoadMore = (
  fetchNextPage: () => void,
  hasNextPage: boolean | undefined,
  isFetchingNextPage: boolean
) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '200px', // Empezar a cargar 200px antes de llegar al final
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return ref
}

// Función helper para obtener todos los usuarios de todas las páginas
export const flattenUsers = (
  data: ReturnType<typeof useInfiniteUsers>['data']
): User[] => {
  if (!data) return []
  return data.pages.flatMap((page) => page.results)
}
