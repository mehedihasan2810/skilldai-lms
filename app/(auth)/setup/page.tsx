import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { SetupForm } from "./setup-form";

const Page = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>Setup</CardTitle>
        </CardHeader>
        <CardContent className="w-[300px] md:w-[450px]">
          <Suspense fallback={null}>
            <SetupForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
