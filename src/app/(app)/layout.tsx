import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          {/* Header content like user profile, search can go here */}
          <div style={{fontWeight: '600'}}>Command Center</div>
          <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
            <span style={{fontSize: '14px', color: 'var(--color-on-surface-variant)'}}>Operator: Alpha</span>
            <div style={{width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-surface-container-highest)'}}></div>
          </div>
        </header>
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
