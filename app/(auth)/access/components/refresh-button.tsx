"use client";

import { Button } from "@/components/ui/button";
import { revalidateServerData } from "@/actions/revalidate-server-data";

export const RefreshButton = () => {
  return (
    <Button
      onClick={() => {
        revalidateServerData();
      }}
    >
      Refresh
    </Button>
  );
};
