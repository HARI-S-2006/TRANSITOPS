'use server'

import { db } from '@/lib/firebase'
import { revalidatePath } from 'next/cache'

export async function createMaintenanceLog(data: {
  serviceType: string
  cost: number
  date: Date
  vehicleId: string
}) {
  try {
    if (!db) throw new Error('Database not initialized');
    
    const vehicleRef = db.collection('vehicles').doc(data.vehicleId);
    const vehicleDoc = await vehicleRef.get();
    
    if (!vehicleDoc.exists) return { success: false, error: 'Vehicle not found' }
    if (vehicleDoc.data()?.status === 'OnTrip') return { success: false, error: 'Cannot service a vehicle currently on a trip' }

    const logRef = db.collection('maintenanceLogs').doc();

    const batch = db.batch();
    batch.set(logRef, {
      ...data,
      status: 'Active',
    });
    batch.update(vehicleRef, { status: 'InShop' });
    
    await batch.commit();

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
    if (!db) throw new Error('Database not initialized');
    
    const logRef = db.collection('maintenanceLogs').doc(logId);
    const logDoc = await logRef.get();
    
    if (!logDoc.exists) return { success: false, error: 'Log not found' }

    const vehicleId = logDoc.data()?.vehicleId;
    if (!vehicleId) return { success: false, error: 'Vehicle reference missing' }
    
    const vehicleRef = db.collection('vehicles').doc(vehicleId);

    const batch = db.batch();
    batch.update(logRef, { status: 'Completed' });
    batch.update(vehicleRef, { status: 'Available' });
    
    await batch.commit();

    revalidatePath('/maintenance')
    revalidatePath('/vehicles')
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to complete maintenance log' }
  }
}
