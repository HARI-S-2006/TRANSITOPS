import { Table } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

export default function VehiclesPage() {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h1>Vehicle Registry</h1>
        <Button variant="primary">Add Vehicle</Button>
      </div>
      <Table headers={["ID", "Make/Model", "License", "Status", "Mileage", "Actions"]}>
        <tr>
          <td>V-001</td>
          <td>Ford Transit 250</td>
          <td>XYZ-1234</td>
          <td><Badge status="success">Available</Badge></td>
          <td>45,000 mi</td>
          <td><Button variant="secondary">View</Button></td>
        </tr>
        <tr>
          <td>V-002</td>
          <td>Mercedes Sprinter</td>
          <td>ABC-9876</td>
          <td><Badge status="primary">On Trip</Badge></td>
          <td>32,100 mi</td>
          <td><Button variant="secondary">View</Button></td>
        </tr>
        <tr>
          <td>V-003</td>
          <td>Ram ProMaster</td>
          <td>LMN-4567</td>
          <td><Badge status="warning">In Shop</Badge></td>
          <td>89,000 mi</td>
          <td><Button variant="secondary">View</Button></td>
        </tr>
      </Table>
    </div>
  );
}
