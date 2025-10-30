import axios from 'axios';
import type { LoginCredentials, AuthResponse } from '../types';

interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
}

class AuthService implements IAuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>('/api/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Error al iniciar sesión');
      }
      throw new Error('Error al iniciar sesión');
    }
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

export const authService = new AuthService();
