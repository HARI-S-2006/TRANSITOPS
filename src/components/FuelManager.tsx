'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { createFuelLog } from '@/actions/fuel'

export function FuelManager({ 
  initialFuelLogs, 
  vehicles,
  totalMaintenanceCost,
  totalFuelCost
}: { 
  initialFuelLogs: any[], 
  vehicles: any[],
  totalMaintenanceCost: number,
  totalFuelCost: number
}) {
  const [fuelLogs, setFuelLogs] = useState(initialFuelLogs)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [vehicleId, setVehicleId] = useState('')
  const [liters, setLiters] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createFuelLog({
      liters: Number(liters),
      cost: Number(cost),
      date: new Date(date),
      vehicleId
    })
    
    if (res.success) {
      window.location.reload()
    } else {
      alert(res.error || 'Failed to add fuel log')
      setLoading(false)
    }
  }

  const grandTotal = totalMaintenanceCost + totalFuelCost

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Fuel & Expense Management</h1>
        <div className="flex items-center gap-4">
          <Button variant="primary" className="shadow-[0_0_15px_rgba(99,102,241,0.3)]" onClick={() => setShowAddForm(!showAddForm)}>
            <span className="material-symbols-outlined text-[18px] font-bold">{showAddForm ? 'close' : 'local_gas_station'}</span>
            {showAddForm ? 'Cancel' : 'Log Fuel'}
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card className="p-6">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Vehicle</label>
              <select required value={vehicleId} onChange={e=>setVehicleId(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface">
                <option value="" disabled>Select vehicle...</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.name} - {v.regNo}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Date</label>
              <input required type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Liters</label>
              <input required type="number" value={liters} onChange={e=>setLiters(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="40" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Cost ($)</label>
              <input required type="number" value={cost} onChange={e=>setCost(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="100" />
            </div>
            <div className="md:col-span-4 flex justify-end mt-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Fuel Log'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="flex flex-col gap-6 flex-1">
        
        {/* Fuel Logs */}
        <Card className="p-0 overflow-hidden flex flex-col border-l-[3px] border-l-[#6366f1]">
          <div className="p-6 pb-2">
            <h2 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">FUEL LOGS</h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Vehicle</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Date</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Liters</th>
                  <th className="py-4 px-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Cost (USD)</th>
                </tr>
              </thead>
              <tbody className="font-medium text-[15px]">
                {fuelLogs.length === 0 ? (
                  <tr><td colSpan={4} className="py-8 text-center text-on-surface-variant">No fuel logs found.</td></tr>
                ) : (
                  fuelLogs.map(log => (
                    <tr key={log.id} className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                      <td className="py-5 px-8 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors tracking-wide">{log.vehicle?.name}</td>
                      <td className="py-5 px-8 text-on-surface-variant">{new Date(log.date).toLocaleDateString()}</td>
                      <td className="py-5 px-8 text-on-surface-variant">{log.liters} L</td>
                      <td className="py-5 px-8 text-on-surface font-semibold">${log.cost.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Total Cost Banner */}
        <Card className="p-8 mt-auto flex items-center justify-between bg-surface-container/30 border-white/5">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">TOTAL OPERATIONAL COST (AUTO)</h2>
            <span className="text-[13px] text-on-surface-variant opacity-50 font-medium">Fuel + Maintenance</span>
          </div>
          <div className="text-[48px] font-bold text-[#c0c1ff] tracking-tight drop-shadow-[0_0_20px_rgba(192,193,255,0.4)]">
            ${grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </div>
        </Card>

      </div>
    </>
  )
}
