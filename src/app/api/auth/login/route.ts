import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/firebase'
import { createSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (!db) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }

    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('email', '==', email).limit(1).get()

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const userDoc = snapshot.docs[0]
    const user = { id: userDoc.id, ...userDoc.data() } as any

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create session
    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email, role: user.role } 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
