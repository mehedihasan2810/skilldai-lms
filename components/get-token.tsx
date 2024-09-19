"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GetToken = () => {
  const router = useRouter();

  console.log("helloo")

  useEffect(() => {
    const inviteEmail = () => {
      const urlParams = new URLSearchParams(window.location.hash.substring(1)); // Remove the leading #
      const refreshToken = urlParams.get("refresh_token");

      if (refreshToken) {
        console.log(refreshToken)

        router.push(`/set-password?refresh_token=${refreshToken}`);
      }
    };

    inviteEmail();
  }, [router]);

  return null;
};

export default GetToken;
