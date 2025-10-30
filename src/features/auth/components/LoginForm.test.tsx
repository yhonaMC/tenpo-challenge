import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { useAuthStore } from '../store/auth.store'

vi.mock('../store/auth.store')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

const renderLoginForm = () => {
  return render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  )
}

describe('LoginForm', () => {
  const mockLogin = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuthStore).mockReturnValue(mockLogin)
  })

  it('renders email and password inputs', () => {
    renderLoginForm()
    
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderLoginForm()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('shows validation error for empty email', async () => {
    const user = userEvent.setup()
    renderLoginForm()
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('El correo electrónico es requerido')).toBeInTheDocument()
    })
  })

  it('shows validation error for empty password', async () => {
    const user = userEvent.setup()
    renderLoginForm()
    
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    await user.type(emailInput, 'test@example.com')
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('La contraseña es requerida')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup()
    renderLoginForm()
    
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    
    await user.type(emailInput, 'notanemail')
    await user.type(passwordInput, 'password123')
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/correo/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for short email', async () => {
    const user = userEvent.setup()
    renderLoginForm()
    
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    await user.type(emailInput, 'a@b.com')
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('El correo debe tener al menos 8 caracteres')).toBeInTheDocument()
    })
  })

  it('shows validation error for short password', async () => {
    const user = userEvent.setup()
    renderLoginForm()
    
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, '123')
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('La contraseña debe tener al menos 8 caracteres')).toBeInTheDocument()
    })
  })

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(undefined)
    
    renderLoginForm()
    
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    renderLoginForm()
    
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)
    
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('displays error message on login failure', async () => {
    const user = userEvent.setup()
    const errorMessage = 'Error al iniciar sesión'
    mockLogin.mockRejectedValueOnce(new Error(errorMessage))
    
    renderLoginForm()
    
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('displays helper text about credentials', () => {
    renderLoginForm()
    expect(screen.getByText('Use cualquier correo electrónico y contraseña válida (8+ caracteres)')).toBeInTheDocument()
  })

  it('renders email icon', () => {
    renderLoginForm()
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    const iconContainer = emailInput.parentElement?.parentElement?.querySelector('.absolute')
    expect(iconContainer).toBeInTheDocument()
  })

  it('renders password icon', () => {
    renderLoginForm()
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    const iconContainer = passwordInput.parentElement?.parentElement?.querySelector('.absolute')
    expect(iconContainer).toBeInTheDocument()
  })
})

