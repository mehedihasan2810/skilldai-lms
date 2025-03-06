import { Suspense } from "react";
import { Loader } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminAccess from "./AdminAccess";

const AdminPage = () => {
  return (
    <div className="relative isolate size-full">
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center gap-2">
            <Loader className="size-6 animate-spin" /> Please wait...
          </div>
        }
      >
        <Admin />
      </Suspense>
    </div>
  );
};

const Admin = async () => {
  const supabase =await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || session.user.email !== "iamvishnuamarapu@gmail.com") {
    return redirect("/");
  }

  return <AdminAccess/>;
};

export default AdminPage;
