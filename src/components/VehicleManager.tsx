'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { createVehicle, updateVehicleStatus } from '@/actions/vehicle'

export function VehicleManager({ initialVehicles }: { initialVehicles: any[] }) {
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filterType, setFilterType] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Form state
  const [regNo, setRegNo] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('Van')
  const [capacity, setCapacity] = useState('')
  const [odometer, setOdometer] = useState('')
  const [acqCost, setAcqCost] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createVehicle({
      regNo,
      name,
      type,
      capacity: Number(capacity),
      odometer: Number(odometer),
      acqCost: Number(acqCost)
    })
    
    if (res.success && res.vehicle) {
      setVehicles([...vehicles, res.vehicle])
      setShowAddForm(false)
      // Reset
      setRegNo(''); setName(''); setCapacity(''); setOdometer(''); setAcqCost('');
    } else {
      alert(res.error || 'Failed to add vehicle')
    }
    setLoading(false)
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    const res = await updateVehicleStatus(id, status)
    if (res.success && res.vehicle) {
      setVehicles(vehicles.map(v => v.id === id ? res.vehicle : v))
    }
  }

  const filteredVehicles = vehicles.filter(v => {
    const matchType = filterType === 'All' || v.type === filterType
    const matchStatus = filterStatus === 'All' || v.status === filterStatus
    const matchSearch = v.regNo.toLowerCase().includes(searchQuery.toLowerCase()) || v.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchStatus && matchSearch
  })

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Filters */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-48">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-2.5 text-sm font-medium text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50 cursor-pointer"
            >
              <option value="All">Type: All</option>
              <option value="Van">Van</option>
              <option value="Truck">Truck</option>
              <option value="Mini">Mini</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">expand_more</span>
          </div>

          <div className="relative w-48">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-2.5 text-sm font-medium text-on-surface appearance-none focus:outline-none focus:border-[#6366f1]/50 cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="Available">Available</option>
              <option value="OnTrip">On Trip</option>
              <option value="InShop">In Shop</option>
              <option value="Retired">Retired</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">expand_more</span>
          </div>

          <div className="relative flex-1 max-w-md">
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131b2e] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-[#6366f1]/50" 
              placeholder="Search reg. no..." 
              type="text" 
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          </div>
        </div>

        <Button 
          variant="primary" 
          className="shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <span className="material-symbols-outlined text-[18px]">{showAddForm ? 'close' : 'add'}</span>
          {showAddForm ? 'Cancel' : 'Add Vehicle'}
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-6">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Reg. No</label>
              <input required value={regNo} onChange={e=>setRegNo(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="e.g. GJ01AB1234" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Name / Model</label>
              <input required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="e.g. VAN-05" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Type</label>
              <select value={type} onChange={e=>setType(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface">
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
                <option value="Mini">Mini</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Capacity (kg)</label>
              <input required type="number" value={capacity} onChange={e=>setCapacity(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="500" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Odometer</label>
              <input required type="number" value={odometer} onChange={e=>setOdometer(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="1000" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Acq. Cost</label>
              <input required type="number" value={acqCost} onChange={e=>setAcqCost(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="500000" />
            </div>
            <div className="md:col-span-3 flex justify-end mt-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Vehicle'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Reg. No. (Unique)</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Name/Model</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Type</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Capacity</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Odometer</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Acq. Cost</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-medium text-[15px]">
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-on-surface-variant">No vehicles found.</td>
                </tr>
              ) : (
                filteredVehicles.map(v => (
                  <tr key={v.id} className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                    <td className={`py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide ${v.status === 'Retired' ? 'line-through opacity-50' : ''}`}>{v.regNo}</td>
                    <td className={`py-5 px-6 text-on-surface-variant ${v.status === 'Retired' ? 'opacity-50' : ''}`}>{v.name}</td>
                    <td className={`py-5 px-6 text-on-surface-variant ${v.status === 'Retired' ? 'opacity-50' : ''}`}>{v.type}</td>
                    <td className={`py-5 px-6 text-on-surface-variant ${v.status === 'Retired' ? 'opacity-50' : ''}`}>{v.capacity} kg</td>
                    <td className={`py-5 px-6 text-on-surface ${v.status === 'Retired' ? 'opacity-50' : ''}`}>{v.odometer.toLocaleString()}</td>
                    <td className={`py-5 px-6 text-on-surface ${v.status === 'Retired' ? 'opacity-50' : ''}`}>$ {v.acqCost.toLocaleString()}</td>
                    <td className="py-5 px-6 text-center">
                      {v.status === 'Available' && <Badge variant="outline" className="border-white/20 text-on-surface-variant bg-white/5 inline-flex">Available</Badge>}
                      {v.status === 'OnTrip' && (
                        <Badge variant="primary" className="bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#c0c1ff] inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></span>
                          On Trip
                        </Badge>
                      )}
                      {v.status === 'InShop' && <Badge variant="outline" className="border-[#6366f1]/30 text-[#6366f1] bg-[#6366f1]/5 inline-flex">In Shop</Badge>}
                      {v.status === 'Retired' && <Badge variant="outline" className="border-white/10 text-on-surface-variant opacity-50 inline-flex">Retired</Badge>}
                    </td>
                    <td className="py-5 px-6 text-right">
                      {v.status !== 'Retired' && (
                        <button 
                          onClick={() => handleUpdateStatus(v.id, 'Retired')}
                          className="text-xs text-error hover:underline"
                        >
                          Retire
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-surface-container/30 border-t border-white/5 mt-auto">
          <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">info</span>
            Rule: Registration No. must be unique - <strong className="text-on-surface">Retired/In Shop vehicles are hidden from Trip Dispatcher</strong>
          </p>
        </div>
      </Card>
    </>
  )
}
