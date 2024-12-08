import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SetPasswordForm from "./form";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>Set Password</CardTitle>
        </CardHeader>
        <CardContent className="w-[300px] md:w-[400px]">
          <Suspense fallback={null}>
            <SetPasswordForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
