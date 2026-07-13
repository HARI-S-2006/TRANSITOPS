import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/firebase'
import { createSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email: rawEmail, password, role } = body
    
    const email = rawEmail?.trim()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (!db) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }

    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('email', '==', email).limit(1).get()

    if (!snapshot.empty) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const docRef = await usersRef.add({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date().toISOString()
    })

    // Create session
    await createSession({
      userId: docRef.id,
      email,
      role
    })

    return NextResponse.json({ 
      success: true, 
      user: { id: docRef.id, name, email, role } 
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
