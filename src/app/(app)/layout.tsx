import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  const userDoc = await db.collection('users').doc(session.userId).get();
  const userData = userDoc.exists ? userDoc.data() : null;

  const user = {
    name: userData?.name || 'Unknown User',
    email: userData?.email || session.email,
    role: userData?.role || session.role,
  };

  return (
    <>
      <Sidebar />
      <Header user={user} />
      <main className="ml-[240px] xl:ml-64 pt-20 p-margin-desktop min-h-screen">
        {children}
      </main>
    </>
  );
}
