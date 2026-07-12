import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{marginBottom: '24px'}}>TransitOps Dashboard</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
        <Card indicator="primary">
          <h3>Active Trips</h3>
          <div style={{fontSize: '36px', fontWeight: 'bold', marginTop: '8px'}}>24</div>
          <Badge status="success">On Time</Badge>
        </Card>
        <Card indicator="warning">
          <h3>Vehicles in Shop</h3>
          <div style={{fontSize: '36px', fontWeight: 'bold', marginTop: '8px'}}>3</div>
          <Badge status="warning">Needs Attention</Badge>
        </Card>
        <Card indicator="success">
          <h3>Available Drivers</h3>
          <div style={{fontSize: '36px', fontWeight: 'bold', marginTop: '8px'}}>12</div>
          <Badge status="success">Ready</Badge>
        </Card>
      </div>
      <div style={{marginTop: '32px'}}>
        <Card>
          <h2>Fleet Utilization</h2>
          <div style={{height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-on-surface-variant)'}}>
            [Chart Area Placeholder]
          </div>
        </Card>
      </div>
    </div>
  );
}
