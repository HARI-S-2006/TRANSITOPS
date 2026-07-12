import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = 'transitops-super-secret-key-for-hackathon'
const key = new TextEncoder().encode(secretKey)

export type SessionPayload = {
  userId: string
  email: string
  role: string
}

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key)
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload as SessionPayload
  } catch (error) {
    return null
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function createSession(payload: SessionPayload) {
  const session = await encrypt(payload)
  const cookieStore = await cookies()
  
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
