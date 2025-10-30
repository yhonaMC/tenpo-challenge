import { http, HttpResponse } from 'msw'
import { APP_CONSTANTS } from '@/shared/constants/app.constants'

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }

    if (!body.email || body.email.length < 8) {
      return HttpResponse.json(
        { error: 'El correo electrónico debe tener al menos 8 caracteres' },
        { status: 400 }
      )
    }

    if (!body.password || body.password.length < 8) {
      return HttpResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return HttpResponse.json(
        { error: 'Por favor ingrese un correo electrónico válido' },
        { status: 400 }
      )
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return HttpResponse.json(
      {
        user: {
          id: '1',
          email: body.email,
          name: body.email.split('@')[0]
        },
        token: APP_CONSTANTS.FAKE_TOKEN
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  })
]
