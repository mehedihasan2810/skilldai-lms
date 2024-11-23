import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SetPasswordForm from "./form";
import { Suspense } from "react";

const Page = () => {
  // const handleResetPassword = async () => {
  //   if (!password.trim()) return alert("Please enter your password.");
  //   if (password.trim().length < 6)
  //     return toast.error("Password should be minimum 6 characters.", {
  //       position: "top-center",
  //     });

  //   const refreshToken = searchParams.get("refresh_token");

  //   if (!refreshToken?.trim())
  //     return toast.error("Invalid token", { position: "top-center" });

  //   console.log(refreshToken);

  //   setIsLoading(true);

  //   const data = await supabase.auth.refreshSession({
  //     refresh_token: refreshToken,
  //   });

  //   if (data.error) {
  //     setIsLoading(false);
  //     return toast.error("Invalid token", { position: "top-center" });
  //   }

  //   console.log(data.data);

  //   const { data: userData, error: userError } = await supabase.auth.updateUser(
  //     { password: password }
  //   );

  //   console.log(userData);

  //   if (userError) {
  //     console.log(userError);
  //     setIsLoading(false);
  //     return toast.error(userError.message, { position: "top-center" });
  //     // return toast.error(
  //     //   "Something went wrong while setting the password! Please try again.",
  //     //   { position: "top-center" }
  //     // );
  //   }

  //   setIsLoading(false);
  //   return router.push(`/new`);
  // };

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
