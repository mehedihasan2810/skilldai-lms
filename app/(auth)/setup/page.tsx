import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { SetupForm } from "./setup-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/");

  return (
    <div className="pt-12 md:pt-0 md:w-screen md:h-screen grid place-items-center px-4">
      <Card className="w-full md:max-w-[550px]">
        <CardHeader>
          <CardTitle className="text-xl">Please fill up this below form to continue.</CardTitle>
        </CardHeader>
        <CardContent >
          <Suspense fallback={null}>
            <SetupForm userId={user.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
