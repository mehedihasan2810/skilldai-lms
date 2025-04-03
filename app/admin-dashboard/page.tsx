import { createClient } from "@/lib/supabase/server";
import TokenUsageTable from "./tokentable";

type TokenUsage = {
  user_id: string | null;
  email: string | null;  
  user_email: string | null;
  month: number;
  year: number;
  total_tokens: number;
  input_token: number;
  output_token: number;
  model: string;
  type: string;
};

// Helper function to group data by user_id, month, and year
function groupByUserAndMonth(data: TokenUsage[]): TokenUsage[] {
  return Object.values(
    data.reduce((acc, row) => {
      const key = `${row.user_id}-${row.month}-${row.year}`;
      if (!acc[key]) {
        acc[key] = {
          user_id: row.user_id,
          email: row.email, 
          user_email: row.user_email,
          month: row.month,
          model: row.model,
          type: row.type,
          year: row.year,
          total_tokens: 0,
          input_token: 0,
          output_token: 0,
        };
      }

      acc[key].total_tokens += row.total_tokens;
      acc[key].input_token += row.input_token;
      acc[key].output_token += row.output_token;

      return acc;
    }, {} as Record<string, TokenUsage>)
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch data
  const { data, error } = await supabase
    .from("token_usage")
    .select("*")
    .order("year", { ascending: false })
    .order("month", { ascending: false })
    .order("total_tokens", { ascending: false });


  if (error || !data) {
    console.error("Error fetching token usage:", error);
    return <p className="text-red-500">Failed to load token usage data.</p>;
  }
  const debugData = data.filter(
    (row) =>
      row.user_id === "bed46566-d891-448d-a0cf-8009f364d30d" &&
      row.month === 3 &&
      row.year === 2025
  );
  console.log("Debug Data for user_id 'bed46566-d891-448d-a0cf-8009f364d30d' in March 2025:", debugData);

  // Ensure correct typing
  const groupedData: TokenUsage[] = groupByUserAndMonth(data as TokenUsage[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <TokenUsageTable data={groupedData} />
    </div>
  );
}
