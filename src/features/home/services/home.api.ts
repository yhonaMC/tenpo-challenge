import { axiosInstance } from '@/shared/http/axiosInstance'
import type { RandomUserResponse, UsersQueryParams } from '../types'
import { APP_CONSTANTS } from '@/shared/constants/app.constants'

interface IHomeService {
  fetchUsers(params?: UsersQueryParams): Promise<RandomUserResponse>
}

class HomeService implements IHomeService {
  async fetchUsers(params: UsersQueryParams = {}): Promise<RandomUserResponse> {
    const {
      results = APP_CONSTANTS.ITEMS_PER_PAGE,
      seed = 'myapp',
      page = 1
    } = params

    try {
      const response = await axiosInstance.get<RandomUserResponse>('/', {
        params: {
          results,
          seed,
          page
        }
      })

      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }
}

export const homeService = new HomeService()
