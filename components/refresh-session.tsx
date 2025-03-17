"use client";
import { useEffect } from "react";
import { refreshSession } from "@/actions/refresh-session";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
export function RefreshSession() {
  useEffect(() => {
    const supabase = createClient();
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
            const { data, error } = await refreshSession();
            if (error) {
              toast.error(error);
            }
            console.log({ data, error });
          } catch (error) {
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
