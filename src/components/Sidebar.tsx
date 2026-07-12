import Link from 'next/link';

export function Sidebar() {
  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Trip Dispatcher', href: '/dispatcher' },
    { label: 'Vehicle Registry', href: '/vehicles' },
    { label: 'Driver Management', href: '/drivers' },
    { label: 'Maintenance Log', href: '/maintenance' },
    { label: 'Fuel & Expenses', href: '/fuel' },
    { label: 'Reports', href: '/reports' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">TransitOps</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-item">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
