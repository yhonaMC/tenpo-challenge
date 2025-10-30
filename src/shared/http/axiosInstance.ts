import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError
} from 'axios'
import { APP_CONSTANTS } from '@/shared/constants/app.constants'

class HttpClient {
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    )

    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleResponseError
    )
  }

  private handleRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const token = sessionStorage.getItem(APP_CONSTANTS.TOKEN_KEY)

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }

  private handleRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }

  private handleResponse = (response: AxiosResponse): AxiosResponse => {
    return response
  }

  private handleResponseError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized request')
          break
        case 403:
          console.error('Forbidden - insufficient permissions')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Internal server error')
          break
        default:
          console.error('API error:', error.response.status)
      }
    } else if (error.request) {
      console.error('Network error - no response received')
    } else {
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }

  public getInstance(): AxiosInstance {
    return this.instance
  }
}

const httpClient = new HttpClient(APP_CONSTANTS.API_BASE_URL)
export const axiosInstance = httpClient.getInstance()
