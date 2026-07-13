import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  const userDoc = await db.collection('users').doc(session.userId).get();
  const userData = userDoc.exists ? userDoc.data() : null;

  const fullName = userData?.name || 'Unknown User';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const email = userData?.email || session.email;
  const role = userData?.role || session.role;
  
  let joinedDate = 'Unknown';
  if (userData?.createdAt) {
    if (typeof userData.createdAt === 'string') {
      joinedDate = new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else if (userData.createdAt.toDate) {
      joinedDate = userData.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  }

  const empId = 'TRN-' + session.userId.substring(0, 4).toUpperCase();

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <Card className="p-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="h-24 w-24 rounded-full bg-surface-container-highest border-2 border-[#6366f1]/50 flex items-center justify-center overflow-hidden shadow-lg mx-auto">
                <span className="text-3xl text-[#6366f1] font-bold">{firstName.charAt(0)}{lastName ? lastName.charAt(0) : ''}</span>
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#00a572] rounded-full border-2 border-surface"></span>
            </div>
            
            <h2 className="text-xl font-bold text-on-surface mb-1">{fullName}</h2>
            <p className="text-sm text-on-surface-variant mb-4">{email}</p>
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#6366f1]/10 text-[#6366f1] uppercase border border-[#6366f1]/20">{role}</span>
            
            <div className="w-full h-px bg-white/5 my-6"></div>
            
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Employee ID</span>
                <span className="text-on-surface font-mono">{empId}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Joined</span>
                <span className="text-on-surface">{joinedDate}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Status</span>
                <span className="text-[#00a572] font-semibold">Active</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Edit Details */}
        <div className="lg:col-span-8 flex flex-col gap-6 h-full">
          <Card className="p-8 flex-1 flex flex-col">
            <h2 className="text-[13px] font-bold text-on-surface-variant mb-6 uppercase tracking-widest">PERSONAL INFORMATION</h2>
            <form className="flex flex-col gap-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">First Name</label>
                  <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface focus:outline-none focus:border-[#6366f1]/50" type="text" defaultValue={firstName} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Last Name</label>
                  <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface focus:outline-none focus:border-[#6366f1]/50" type="text" defaultValue={lastName} />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Email Address</label>
                <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface opacity-60 cursor-not-allowed" type="email" defaultValue={email} disabled />
                <span className="text-[11px] text-on-surface-variant mt-1">Email address is managed by your organization.</span>
              </div>
              
              <div className="w-full h-px bg-white/5 my-2"></div>
              
              <h2 className="text-[13px] font-bold text-on-surface-variant mb-2 uppercase tracking-widest">CHANGE PASSWORD</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">New Password</label>
                  <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface focus:outline-none focus:border-[#6366f1]/50" type="password" placeholder="••••••••" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Confirm Password</label>
                  <input className="w-full bg-[#131b2e] border border-white/5 rounded-lg px-4 py-3 text-[15px] font-medium text-on-surface focus:outline-none focus:border-[#6366f1]/50" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="mt-auto pt-8 flex gap-4 justify-end">
                <Button variant="secondary" className="px-6 py-2.5 text-sm tracking-wide bg-transparent border border-white/10 hover:bg-white/5">
                  Cancel
                </Button>
                <Button variant="primary" className="px-6 py-2.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-sm tracking-wide">
                  Save changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
