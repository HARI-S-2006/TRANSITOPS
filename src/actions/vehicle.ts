'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createVehicle(data: {
  regNo: string
  name: string
  type: string
  capacity: number
  odometer: number
  acqCost: number
}) {
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        ...data,
        status: 'Available',
      },
    })
    revalidatePath('/vehicles')
    revalidatePath('/dashboard')
    return { success: true, vehicle }
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return { success: false, error: 'Failed to create vehicle' }
  }
}

export async function updateVehicleStatus(id: string, status: string) {
  try {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: { status },
    })
    revalidatePath('/vehicles')
    return { success: true, vehicle }
  } catch (error) {
    return { success: false, error: 'Failed to update vehicle status' }
  }
}
