export const APP_CONSTANTS = {
  TOKEN_KEY: 'auth-token',
  API_BASE_URL: 'https://randomuser.me/api',
  ITEMS_PER_PAGE: 50,
  MAX_ITEMS: 2000,
  FAKE_TOKEN: 'fake-jwt-token-abc123xyz',
} as const;

export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
  },
  PRIVATE: {
    HOME: '/',
    PROFILE: '/profile',
  },
} as const;
