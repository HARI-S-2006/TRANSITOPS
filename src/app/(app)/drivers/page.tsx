import { Table } from "@/components/Table";
import { Badge } from "@/components/Badge";

export default function DriversPage() {
  return (
    <div>
      <h1 style={{marginBottom: '24px'}}>Driver Management</h1>
      <Table headers={["ID", "Name", "License Status", "Current Assignment", "Hours Today"]}>
        <tr>
          <td>D-001</td>
          <td>John Doe</td>
          <td><Badge status="success">Valid</Badge></td>
          <td>TRP-4921</td>
          <td>4.5h</td>
        </tr>
        <tr>
          <td>D-002</td>
          <td>Jane Smith</td>
          <td><Badge status="success">Valid</Badge></td>
          <td>TRP-4922</td>
          <td>6.2h</td>
        </tr>
        <tr>
          <td>D-003</td>
          <td>Mike Johnson</td>
          <td><Badge status="warning">Expiring Soon</Badge></td>
          <td>Off Duty</td>
          <td>0h</td>
        </tr>
      </Table>
    </div>
  );
}
