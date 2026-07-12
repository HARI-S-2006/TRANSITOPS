import { Card } from "@/components/Card";

export default function ReportsPage() {
  return (
    <div>
      <h1 style={{marginBottom: '24px'}}>Reports & Analytics</h1>
      <Card>
        <p style={{color: 'var(--color-on-surface-variant)'}}>Analytics modules are currently being generated. This view will aggregate data from Dispatch, Maintenance, and Fuel endpoints.</p>
        <div style={{marginTop: '24px', height: '300px', backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-outline)'}}>
          [Complex Chart Visualization Area]
        </div>
      </Card>
    </div>
  );
}
