import { prisma } from '@/lib/db';
import { DriverManager } from '@/components/DriverManager';

export default async function DriversPage() {
  const initialDrivers = await prisma.driver.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="flex flex-col h-full gap-6">
      <DriverManager initialDrivers={initialDrivers} />
    </div>
  );
}