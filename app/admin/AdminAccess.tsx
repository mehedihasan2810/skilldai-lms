"use client";

import { useUser } from "@/novu/novu";
import NotificationForm from "./form";

export default function AdminAccess() {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  if (isError || !user || user.email !== "iamvishnuamarapu@gmail.com") {
    return (
      <p className="text-center text-red-500 text-lg font-semibold mt-10">
        ❌ Access Denied: You are not an admin.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <NotificationForm />
    </div>
  );
}
