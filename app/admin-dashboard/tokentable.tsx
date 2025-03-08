"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TokenUsage = {
  id: number;
  user_id: string | null;
  user_email: string | null;
  month: number;
  year: number;
  total_tokens: number;
  type: string;
  input_token: number;
  output_token: number;
  model: string | null;
  llm: string | null;
  created_at: string;
};

export default function TokenUsageTable({ data }: { data: TokenUsage[] }) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Token Usage</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Total Tokens</TableHead>
            <TableHead>Input Tokens</TableHead>
            <TableHead>Output Tokens</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>LLM</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.user_id || "N/A"}</TableCell>
              <TableCell>{row.user_email || "N/A"}</TableCell>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.total_tokens}</TableCell>
              <TableCell>{row.input_token}</TableCell>
              <TableCell>{row.output_token}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.model || "N/A"}</TableCell>
              <TableCell>{row.llm || "N/A"}</TableCell>
              <TableCell>{new Date(row.created_at).toLocaleString("en-US", { hour12: true })}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
