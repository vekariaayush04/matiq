import { Hono } from 'hono'
import { auth } from '../auth'
import { cors } from 'hono/cors'

const authApp = new Hono()

// Enable CORS for auth routes
authApp.use('/*', cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}))

// Better-auth routes
authApp.all('/api/auth/*', async (c) => {
  const response = await auth.handler(c.req.raw)

  // Build headers object
  const headers: Record<string, string> = {}

  // Copy all headers from response
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== 'location') {
      headers[key] = value
    }
  })

  // Handle redirect - change port from 3000 to 5173
  const location = response.headers.get('location')
  if (location && location.includes('localhost:3000')) {
    const newLocation = location.replace('localhost:3000', 'localhost:5173')
    headers['Location'] = newLocation
  }

  return new Response(response.body, {
    status: response.status,
    headers,
  })
})

// Sign out
authApp.post('/api/auth/sign-out', async (c) => {
  return auth.api.signOut({
    headers: c.req.headers,
  })
})

export default authApp
