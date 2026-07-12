import { Table } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

export default function DispatcherPage() {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1>Trip Dispatcher</h1>
        <Button variant="primary">New Dispatch</Button>
      </div>
      <Table headers={["Trip ID", "Vehicle", "Driver", "Status", "ETA", "Actions"]}>
        <tr>
          <td>#TRP-4921</td>
          <td>Van-04</td>
          <td>John Doe</td>
          <td><Badge status="primary" pill>On Trip</Badge></td>
          <td>14:30</td>
          <td><Button variant="secondary" style={{padding: '4px 8px', fontSize: '12px'}}>Details</Button></td>
        </tr>
        <tr>
          <td>#TRP-4922</td>
          <td>Truck-12</td>
          <td>Jane Smith</td>
          <td><Badge status="warning" pill>Delayed</Badge></td>
          <td>15:45</td>
          <td><Button variant="secondary" style={{padding: '4px 8px', fontSize: '12px'}}>Details</Button></td>
        </tr>
        <tr>
          <td>#TRP-4923</td>
          <td>Van-08</td>
          <td>Mike Johnson</td>
          <td><Badge status="success" pill>Completed</Badge></td>
          <td>-</td>
          <td><Button variant="secondary" style={{padding: '4px 8px', fontSize: '12px'}}>Details</Button></td>
        </tr>
      </Table>
    </div>
  );
}
