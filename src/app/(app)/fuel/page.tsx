import { Card } from "@/components/Card";
import { Table } from "@/components/Table";
import { Badge } from "@/components/Badge";

export default function FuelPage() {
  return (
    <div>
      <h1 style={{marginBottom: '24px'}}>Fuel & Expenses</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px'}}>
        <Card indicator="primary">
          <h3>Total Fuel Cost (MTD)</h3>
          <div style={{fontSize: '32px', fontWeight: 'bold', marginTop: '8px'}}>$12,450</div>
        </Card>
        <Card indicator="success">
          <h3>Efficiency (Avg)</h3>
          <div style={{fontSize: '32px', fontWeight: 'bold', marginTop: '8px'}}>14.2 MPG</div>
        </Card>
        <Card indicator="warning">
          <h3>Anomalies</h3>
          <div style={{fontSize: '32px', fontWeight: 'bold', marginTop: '8px'}}>2</div>
          <Badge status="warning">Review Needed</Badge>
        </Card>
      </div>
      <Card>
        <h2>Recent Transactions</h2>
        <Table headers={["Date", "Vehicle", "Driver", "Gallons", "Cost", "Location"]}>
          <tr>
            <td>Today, 14:20</td>
            <td>V-001</td>
            <td>John Doe</td>
            <td>15.2</td>
            <td>$65.30</td>
            <td>Pilot Station #42</td>
          </tr>
        </Table>
      </Card>
    </div>
  );
}
