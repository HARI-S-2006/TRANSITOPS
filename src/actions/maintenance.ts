'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createMaintenanceLog(data: {
  serviceType: string
  cost: number
  date: Date
  vehicleId: string
}) {
  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: data.vehicleId } })
    if (!vehicle) return { success: false, error: 'Vehicle not found' }
    if (vehicle.status === 'OnTrip') return { success: false, error: 'Cannot service a vehicle currently on a trip' }

    await prisma.$transaction([
      prisma.maintenanceLog.create({
        data: {
          ...data,
          status: 'Active',
        },
      }),
      prisma.vehicle.update({
        where: { id: data.vehicleId },
        data: { status: 'InShop' },
      })
    ])

    revalidatePath('/maintenance')
    revalidatePath('/vehicles')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    console.error('Error creating maintenance log:', error)
    return { success: false, error: 'Failed to create maintenance log' }
  }
}

export async function completeMaintenanceLog(logId: string) {
  try {
    const log = await prisma.maintenanceLog.findUnique({ where: { id: logId } })
    if (!log) return { success: false, error: 'Log not found' }

    await prisma.$transaction([
      prisma.maintenanceLog.update({
        where: { id: logId },
        data: { status: 'Completed' },
      }),
      // Assuming it goes back to available
      prisma.vehicle.update({
        where: { id: log.vehicleId },
        data: { status: 'Available' },
      })
    ])

    revalidatePath('/maintenance')
    revalidatePath('/vehicles')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to complete maintenance log' }
  }
}
