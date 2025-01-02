"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React, { useEffect } from "react";

const restrictPathnames = ["/pdf-chat/",  "/ncert/"];

export const RestrictSupportChat = () => {
  const pathname = usePathname();
  // const activePathname = pathname.split("/");

  // console.log({ pathname });

  const shouldHideChat = restrictPathnames.find((p) => pathname.includes(p));
  // const shouldHideChat = restrictPathnames.includes(
  //   activePathname[activePathname.length - 1]
  // );

  useEffect(() => {
    const interval = setInterval(() => {
      const chatContainer = document.querySelector(".crisp-client");
      //   console.log({ chatContainer, shouldHideChat });
      if (chatContainer) {
        // @ts-expect-error: blah
        chatContainer.style.display = shouldHideChat ? "none" : "block";
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldHideChat, pathname]);

  return (
    <Script
      id="supportChatbot"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
    window.$crisp=[];window.CRISP_WEBSITE_ID="0d02dec6-b49b-477b-8af3-357e2eb7064e";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
    `,
      }}
    />
  );
};
