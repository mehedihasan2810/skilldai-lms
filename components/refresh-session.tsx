"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
const supabase = createClient();

export function RefreshSession() {
  const router = useRouter();
  const queryClient = useQueryClient();
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
            await queryClient.invalidateQueries({
              queryKey: ["notifications"],
            });
            console.log("refreshing session");
            const { data, error } = await supabase.auth.refreshSession();
            console.log({ data, error });
            console.log("refreshed session");

            router.refresh();
          } catch (error) {
            console.log("error refreshing session");
            console.error(error);
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
