import { Table } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

export default function MaintenancePage() {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1>Maintenance Log</h1>
        <Button variant="primary">Log Maintenance</Button>
      </div>
      <Table headers={["Date", "Vehicle", "Issue / Service", "Status", "Cost", "Actions"]}>
        <tr>
          <td>Oct 24, 2026</td>
          <td>V-003</td>
          <td>Oil Change & Tire Rotation</td>
          <td><Badge status="success">Completed</Badge></td>
          <td>$120.00</td>
          <td><Button variant="secondary">View</Button></td>
        </tr>
        <tr>
          <td>Oct 25, 2026</td>
          <td>V-012</td>
          <td>Brake Pad Replacement</td>
          <td><Badge status="warning">In Progress</Badge></td>
          <td>$450.00</td>
          <td><Button variant="secondary">View</Button></td>
        </tr>
      </Table>
    </div>
  );
}
