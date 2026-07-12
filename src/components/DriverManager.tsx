'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { createDriver, updateDriverStatus } from '@/actions/driver'

export function DriverManager({ initialDrivers }: { initialDrivers: any[] }) {
  const [drivers, setDrivers] = useState(initialDrivers)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [name, setName] = useState('')
  const [licenseNo, setLicenseNo] = useState('')
  const [licenseExpiry, setLicenseExpiry] = useState('')
  const [contact, setContact] = useState('')
  
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createDriver({
      name,
      licenseNo,
      licenseExpiry: new Date(licenseExpiry),
      contact,
      safetyScore: 100 // default new driver score
    })
    
    if (res.success && res.driver) {
      setDrivers([...drivers, res.driver])
      setShowAddForm(false)
      setName(''); setLicenseNo(''); setLicenseExpiry(''); setContact('');
    } else {
      alert(res.error || 'Failed to add driver')
    }
    setLoading(false)
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    const res = await updateDriverStatus(id, status)
    if (res.success && res.driver) {
      setDrivers(drivers.map(d => d.id === id ? res.driver : d))
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Drivers & Safety Profiles</h1>
        <Button 
          variant="primary" 
          className="shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <span className="material-symbols-outlined text-[18px]">{showAddForm ? 'close' : 'add'}</span>
          {showAddForm ? 'Cancel' : 'Add Driver'}
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-6 mb-6">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Name</label>
              <input required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">License No</label>
              <input required value={licenseNo} onChange={e=>setLicenseNo(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="DL-12345" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">License Expiry</label>
              <input required type="date" value={licenseExpiry} onChange={e=>setLicenseExpiry(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase">Contact</label>
              <input required value={contact} onChange={e=>setContact(e.target.value)} className="w-full bg-[#131b2e] border border-white/10 rounded-lg px-4 py-2 text-sm text-on-surface" placeholder="9876543210" />
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Driver'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Driver</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">License No</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Expiry</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Contact</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Safety Score</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="py-5 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="font-medium text-[15px]">
              {drivers.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-on-surface-variant">No drivers found.</td></tr>
              ) : (
                drivers.map(d => {
                  const isExpired = new Date(d.licenseExpiry) < new Date();
                  return (
                    <tr key={d.id} className="border-b border-white/5 hover:bg-[#171f33]/50 transition-colors group">
                      <td className="py-5 px-6 text-on-surface font-bold group-hover:text-[#6366f1] transition-colors">{d.name}</td>
                      <td className="py-5 px-6 text-on-surface-variant">{d.licenseNo}</td>
                      <td className={`py-5 px-6 flex items-center gap-3 ${isExpired ? 'text-[#ffb4ab]' : 'text-[#4edea3]'}`}>
                        {new Date(d.licenseExpiry).toLocaleDateString()}
                        {isExpired && <span className="text-[10px] bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">EXPIRED</span>}
                      </td>
                      <td className="py-5 px-6 text-[#6366f1]">{d.contact}</td>
                      <td className="py-5 px-6 text-on-surface-variant">{d.safetyScore}%</td>
                      <td className="py-5 px-6">
                        {d.status === 'Available' && <Badge variant="outline" className="border-[#4edea3]/30 text-[#4edea3] bg-[#4edea3]/5">AVAILABLE</Badge>}
                        {d.status === 'OnTrip' && <Badge variant="primary" className="bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#c0c1ff]">ON TRIP</Badge>}
                        {d.status === 'OffDuty' && <Badge variant="outline" className="border-white/20 text-on-surface-variant bg-white/5">OFF DUTY</Badge>}
                        {d.status === 'Suspended' && <Badge variant="danger" className="bg-[#ffb4ab]/5 border-[#ffb4ab]/30 text-[#ffb4ab]">SUSPENDED</Badge>}
                      </td>
                      <td className="py-5 px-6">
                        <select 
                          value={d.status} 
                          onChange={(e) => handleUpdateStatus(d.id, e.target.value)}
                          className="bg-transparent text-xs border border-white/20 rounded px-2 py-1 text-on-surface-variant"
                        >
                          <option value="Available">Available</option>
                          <option value="OffDuty">Off Duty</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-surface-container/30 border-t border-white/5 mt-auto">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">TOGGLE STAT</span>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#4edea3]/30 text-[#4edea3] bg-[#4edea3]/5">AVAILABLE</Badge>
              <Badge variant="primary" className="bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#c0c1ff]">ON TRIP</Badge>
              <Badge variant="outline" className="border-white/20 text-on-surface-variant bg-white/5">OFF DUTY</Badge>
              <Badge variant="danger" className="bg-[#ffb4ab]/5 border-[#ffb4ab]/30 text-[#ffb4ab]">SUSPENDED</Badge>
            </div>
            <p className="text-sm font-medium text-on-surface-variant mt-2">
              Rule: Expired license or Suspended status → <span className="text-on-surface">blocked from trip assignment</span>
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}
