import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="ml-[240px] xl:ml-64 pt-20 p-margin-desktop min-h-screen">
        {children}
      </main>
    </>
  );
}
