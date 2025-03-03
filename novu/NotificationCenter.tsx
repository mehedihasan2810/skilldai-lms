"use client";

import { useEffect, useState } from "react";
import { NovuProvider } from "@novu/notification-center";
import { Inbox , Bell} from "@novu/react";
import { dark } from '@novu/react/themes';
import { useTheme } from 'next-themes';

const NotificationCenter = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const fetchNovuUser = async () => {
      try {
        const response = await fetch("/api/novu/createUser", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user from Novu API");
        }

        const data = await response.json();
        setUserId(data.userId);
      } catch (error) {
        console.error("Error fetching Novu user:", error);
        alert("Something went wrong!");
      }
    };

    fetchNovuUser();
  }, []);

  if (!userId) return  <Inbox applicationIdentifier="YOUR_APPLICATION_IDENTIFIER" subscriberId="YOUR_SUBSCRIBER_ID" appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }}>
  <Bell />
</Inbox>;

  return (
    <div >
  <NovuProvider
    subscriberId={userId}
    applicationIdentifier="RsdBv-8Nnrgr"
  >
    <Inbox applicationIdentifier="RsdBv-8Nnrgr" subscriberId={userId} appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }}>
    
      </Inbox>
  </NovuProvider>
</div>


  );
};

export default NotificationCenter;