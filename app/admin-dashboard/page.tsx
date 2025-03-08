import { createClient } from "@/lib/supabase/server";
import TokenUsageTable from "./tokentable";

export default async function AdminDashboard() {
    const supabase =await createClient();
  // Fetch data from Supabase (server-side)
  const { data, error } = await supabase
  .from("token_usage")
  .select("*")
  .order("total_tokens", { ascending: false }); // Sorts in descending order

  if (error) {
    console.error("Error fetching token usage:", error);
    return <p className="text-red-500">Failed to load token usage data.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <TokenUsageTable data={data} />
    </div>
  );
}
