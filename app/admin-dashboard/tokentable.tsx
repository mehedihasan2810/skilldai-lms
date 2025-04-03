"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TokenUsage = {
  user_id: string | null;
  email: string | null;  // Added optional email field
  user_email: string | null;
  month: number;
  year: number;
  total_tokens: number;
  input_token: number;
  output_token: number;
  model: string;
  type: string;
};

export default function TokenUsageTable({ data }: { data: TokenUsage[] }) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Token Usage</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tool</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Total Tokens</TableHead>
            <TableHead>Input Tokens</TableHead>
            <TableHead>Output Tokens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.user_id || "N/A"}</TableCell>
              <TableCell>{row.email || row.user_email || "N/A"}</TableCell>  {/* Updated */}
              <TableCell>{row.type || "N/A"}</TableCell>
              <TableCell>{row.model || "N/A"}</TableCell>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.total_tokens}</TableCell>
              <TableCell>{row.input_token}</TableCell>
              <TableCell>{row.output_token}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
