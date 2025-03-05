"use client";

import { useEffect, useState } from "react";
import { NovuProvider } from "@novu/notification-center";
import { Inbox, Bell } from "@novu/react";
import { dark } from "@novu/react/themes";
import { useTheme } from "next-themes";
import { useUser } from "@/novu/novu"; // Using useUser() hook directly

const NotificationInbox = () => {
  const { resolvedTheme } = useTheme();
  const { data: user, isLoading, error } = useUser(); // Get user directly

  if (isLoading) return  <Inbox
  applicationIdentifier="RsdBv-8Nnrgr"
  subscriberId="guest-user"
  appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
>
</Inbox>;
  if (error) {
    console.error("Error fetching Novu user:", error);
    return <p>Error loading notifications!</p>;
  }

  return (
    <div>
        <Inbox
          applicationIdentifier="RsdBv-8Nnrgr"
          subscriberId={user?.id}
          appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
        >
        </Inbox>
    </div>
  );
};

export default NotificationInbox;
