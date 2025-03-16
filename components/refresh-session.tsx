"use client";
import { useEffect } from "react";
import { refreshSession } from "@/actions/refresh-session";
import { createClient } from "@/lib/supabase/client";

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
              console.log({ chatPayload: payload });
              await refreshSession();
                    //   await queryClient.invalidateQueries({
                    //     queryKey: ["chats", userId],
                    //   });
            }
          )
          .subscribe();
    
        return () => {
          subscription.unsubscribe();
        };
      }, []);
  return null;
}

