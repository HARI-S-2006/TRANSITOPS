import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function SettingsPage() {
  return (
    <div>
      <h1 style={{marginBottom: '24px'}}>Settings & RBAC</h1>
      <div style={{maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <Card indicator="primary">
          <h2 style={{marginBottom: '16px'}}>Organization Profile</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <Input label="Company Name" id="company" defaultValue="TransitOps Logistics Inc." />
            <Input label="Support Email" id="email" defaultValue="support@transitops.com" />
            <Button variant="primary" style={{alignSelf: 'flex-start'}}>Save Changes</Button>
          </div>
        </Card>
        <Card indicator="warning">
          <h2 style={{marginBottom: '16px'}}>Access Control</h2>
          <p style={{color: 'var(--color-on-surface-variant)', fontSize: '14px', marginBottom: '16px'}}>Manage roles and permissions for operators and drivers.</p>
          <Button variant="secondary">Manage Roles</Button>
        </Card>
      </div>
    </div>
  );
}
