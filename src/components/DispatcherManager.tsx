'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { createTrip, dispatchTrip, completeTrip } from '@/actions/trip'

export function DispatcherManager({ 
  initialTrips, 
  availableVehicles, 
  availableDrivers 
}: { 
  initialTrips: any[], 
  availableVehicles: any[], 
  availableDrivers: any[] 
}) {
  const [trips, setTrips] = useState(initialTrips)
  const [loading, setLoading] = useState(false)
  
  const [tripNumber, setTripNumber] = useState('')
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [vehicleId, setVehicleId] = useState('')
  const [driverId, setDriverId] = useState('')
  const [cargoWeight, setCargoWeight] = useState('')
  const [distance, setDistance] = useState('')

  const selectedVehicle = availableVehicles.find(v => v.id === vehicleId)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createTrip({
      tripNumber,
      source,
      destination,
      cargoWeight: Number(cargoWeight),
      distance: Number(distance),
      vehicleId,
      driverId
    })
    
    if (res.success && res.trip) {
      // Optmistic or wait for refresh, we can just reload the page since it revalidates,
      // but let's refresh manually
      window.location.reload();
    } else {
      alert(res.error || 'Failed to create trip')
      setLoading(false)
    }
  }

  const handleDispatch = async (id: string) => {
    const res = await dispatchTrip(id)
    if (res.success) {
      window.location.reload();
    } else {
      alert(res.error || 'Failed to dispatch')
    }
  }

  const handleComplete = async (id: string) => {
    const res = await completeTrip(id)
    if (res.success) {
      window.location.reload();
    } else {
      alert(res.error || 'Failed to complete')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Left Column: Progress Bar + Create TR */}
      <div className="lg:col-span-5 flex flex-col gap-6 h-full">
        {/* Progress Bar Card */}
        <Card className="p-8">
          <div className="relative flex items-center justify-between">
            {/* Line behind */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/5 z-0"></div>
            {/* Active Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[33%] h-[2px] bg-[#6366f1] z-0"></div>
            
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-4 h-4 rounded-full bg-surface-container-high border-2 border-[#6366f1]"></div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Draft</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-6 h-6 rounded-full bg-[#6366f1] shadow-[0_0_15px_rgba(99,102,241,0.5)] border-4 border-surface"></div>
              <span className="text-[10px] font-bold text-[#6366f1] uppercase tracking-widest mt-1">Dispatched</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-4 h-4 rounded-full bg-surface-container border-2 border-white/10"></div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Completed</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-4 h-4 rounded-full bg-surface-container border-2 border-white/10"></div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Cancelled</span>
            </div>
          </div>
        </Card>

        {/* Create TR Card */}
        <Card className="p-6 flex-1 flex flex-col">
          <h2 className="text-[15px] font-bold text-on-surface mb-6 uppercase tracking-wider">CREATE TR:</h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-5 flex-1">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant">Trip Number (Unique)</label>
              <input required value={tripNumber} onChange={e=>setTripNumber(e.target.value)} className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-[#6366f1]/50" placeholder="e.g. TR001" type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant">Source</label>
              <input required value={source} onChange={e=>setSource(e.target.value)} className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-[#6366f1]/50" placeholder="Source City" type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant">Destination</label>
              <input required value={destination} onChange={e=>setDestination(e.target.value)} className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-[#6366f1]/50" placeholder="Destination City" type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant">Vehicle (Available only)</label>
              <div className="relative">
                <select required value={vehicleId} onChange={e=>setVehicleId(e.target.value)} className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50">
                  <option value="" disabled>Select vehicle...</option>
                  {availableVehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.name} - {v.capacity} kg</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">expand_more</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant">Driver (Available only)</label>
              <div className="relative">
                <select required value={driverId} onChange={e=>setDriverId(e.target.value)} className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50">
                  <option value="" disabled>Select driver...</option>
                  {availableDrivers.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">expand_more</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant">Cargo Weight (KG)</label>
              <input required value={cargoWeight} onChange={e=>setCargoWeight(e.target.value)} className="w-full bg-[#131b2e] border border-error/20 rounded-lg px-4 py-3 text-sm text-error focus:outline-none focus:border-error/50" placeholder="Weight" type="number" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant">Planned Distance (KM)</label>
              <input required value={distance} onChange={e=>setDistance(e.target.value)} className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-[#6366f1]/50" placeholder="Distance" type="number" />
            </div>

            <div className="mt-auto pt-6 flex flex-col gap-4">
              {selectedVehicle && (
                <div className="w-full bg-error/10 border-l-4 border-error p-4 rounded-r-lg">
                  <span className="text-sm font-medium text-on-surface-variant">Vehicle Capacity: <strong className="text-on-surface">{selectedVehicle.capacity} kg</strong></span>
                </div>
              )}
              <Button type="submit" variant="primary" className="py-3 shadow-[0_0_15px_rgba(99,102,241,0.3)]" disabled={loading}>
                {loading ? 'Creating...' : 'Create Trip'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Right Column: Live Board */}
      <div className="lg:col-span-7 h-full">
        <Card className="h-full p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-[15px] font-bold text-on-surface uppercase tracking-wider">LIVE BOARD</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            
            {trips.length === 0 ? (
              <p className="text-on-surface-variant text-center mt-10">No trips available.</p>
            ) : trips.map(t => (
              <div key={t.id} className="relative rounded-xl border border-white/5 bg-[#171f33]/30 p-5 overflow-hidden flex flex-col gap-4 hover:border-white/10 transition-colors">
                {t.status === 'Dispatched' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6366f1]"></div>}
                {t.status === 'Cancelled' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffb4ab]/40"></div>}
                
                <div className="flex justify-between items-center pl-2">
                  <span className={`font-bold tracking-wide ${t.status === 'Dispatched' ? 'text-on-surface' : 'text-on-surface-variant'}`}>{t.tripNumber}</span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-white/5 px-3 py-1.5 rounded-md uppercase tracking-wider">
                    {t.vehicle?.name || 'UNASSIGNED'} / {t.driver?.name?.toUpperCase() || 'UNASSIGNED'}
                  </span>
                </div>
                
                <div className={`pl-2 flex items-center gap-3 text-[15px] font-medium ${t.status === 'Cancelled' ? 'text-on-surface-variant opacity-50' : 'text-on-surface-variant'}`}>
                  <span>{t.source}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  <span>{t.destination}</span>
                </div>
                
                <div className="pl-2 flex justify-between items-center mt-2">
                  {t.status === 'Dispatched' && <Badge variant="primary" className="bg-[#6366f1]/20 border border-[#6366f1]/30">Dispatched</Badge>}
                  {t.status === 'Draft' && <Badge variant="outline" className="bg-white/5 border-white/10 text-on-surface-variant">Draft</Badge>}
                  {t.status === 'Completed' && <Badge variant="outline" className="bg-[#4edea3]/5 border-[#4edea3]/20 text-[#4edea3]">Completed</Badge>}
                  {t.status === 'Cancelled' && <Badge variant="danger" className="bg-[#ffb4ab]/10 border-[#ffb4ab]/20 text-[#ffb4ab]">Cancelled</Badge>}
                  
                  <span className="text-xs font-semibold text-on-surface-variant flex gap-2">
                    {t.status === 'Draft' && (
                      <Button onClick={() => handleDispatch(t.id)} variant="outline" className="h-7 text-xs border-[#6366f1]/50 text-[#6366f1] hover:bg-[#6366f1]/10">Dispatch</Button>
                    )}
                    {t.status === 'Dispatched' && (
                      <Button onClick={() => handleComplete(t.id)} variant="outline" className="h-7 text-xs border-[#4edea3]/50 text-[#4edea3] hover:bg-[#4edea3]/10">Complete</Button>
                    )}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </Card>
      </div>

    </div>
  )
}
