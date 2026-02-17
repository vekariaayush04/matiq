import { Hono } from 'hono'
import { auth } from '../auth'
import { cors } from 'hono/cors'

const authApp = new Hono()

// Enable CORS for auth routes
authApp.use('/*', cors({
  origin: (origin) => origin || '*',
  credentials: true,
}))

// Better-auth routes
authApp.all('/api/auth/*', async (c) => {
  // Get the request and potentially add origin from expo-origin header
  const req = c.req.raw.clone()
  const expoOrigin = c.req.header('expo-origin')
  if (expoOrigin && !req.headers.get('origin')) {
    req.headers.set('origin', expoOrigin)
  }

  const response = await auth.handler(req)

  // Build headers object
  const headers: Record<string, string> = {}

  // Copy all headers from response
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== 'location') {
      headers[key] = value
    }
  })

  // Handle redirect - change port from 3000 to 5173 for web
  let location = response.headers.get('location')
  if (location) {
    // For mobile OAuth, redirect to the matiks:// scheme
    if (location.includes('callback') || location.includes('sign-in')) {
      // Keep the full URL as-is for OAuth flow
      // The expoClient plugin will handle the redirect
    }
    // Replace localhost:3000 with localhost:5173 for web
    if (location.includes('localhost:3000')) {
      location = location.replace('localhost:3000', 'localhost:5173')
    }
    headers['Location'] = location
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
