import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
    }}>
      <div style={{width: '100%', maxWidth: '400px'}}>
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h1 style={{color: 'var(--color-primary)', fontSize: '32px'}}>TransitOps</h1>
          <p style={{color: 'var(--color-on-surface-variant)'}}>Fleet Command Center</p>
        </div>
        <Card indicator="primary">
          <h2 style={{marginBottom: '24px'}}>Sign In</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <Input label="Email or Operator ID" id="email" type="text" placeholder="alpha@transitops.com" />
            <Input label="Password" id="password" type="password" placeholder="••••••••" />
            <Link href="/dashboard" style={{width: '100%', display: 'block', marginTop: '8px'}}>
              <Button variant="primary" style={{width: '100%'}}>Authenticate</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
