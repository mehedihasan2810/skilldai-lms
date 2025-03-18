"use client";
import { useEffect } from "react";
import { refreshSession } from "@/actions/refresh-session";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { revalidateServerData } from "@/actions/revalidate-server-data";
const supabase = createClient();

export function RefreshSession() {
  useEffect(() => {
    const subscription = supabase
      .channel(`user-info`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_info",
          //   filter: `or.initiatorId.eq.${userId},participatorId.eq.${userId}`,
        },
        async (payload) => {
          console.log({ accessPayload: payload });
          try {
            console.log("refreshing session");
            const { data, error } = await refreshSession();
            // const { data, error } = await supabase.auth.refreshSession();
            console.log("refreshed session");

            if (error) {
              console.error(error);
              toast.error(error);
              // toast.error(error.message);
              return;
            }

            // console.log("revalidating server data");

            // await revalidateServerData();
            // console.log("revalidated server data");
          } catch (error) {
            console.log("error refreshing session");
            console.error(error);
            toast.error((error as Error).message);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return null;
}
