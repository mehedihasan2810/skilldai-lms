"use client";

import { Inbox } from "@novu/react";
import { dark } from "@novu/react/themes";
import { useTheme } from "next-themes";

const NotificationInbox = ({userId}:{userId:string}) => {
  const { resolvedTheme } = useTheme();


  return (
    <div>
        <Inbox
          applicationIdentifier="RsdBv-8Nnrgr"
          subscriberId={userId}
          appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
        >
        </Inbox>
    </div>
  );
};

export default NotificationInbox;
