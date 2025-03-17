"use server";

import ErrorReportEmail from "@/emails/error-report-email";
import { format } from "date-fns";
import { headers } from "next/headers";
import { Resend } from "resend";
import { UAParser } from "ua-parser-js";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Props {
  userEmail: string;
  timestamp?: string;
  errorMessage: string;
  errorTrace: string;
  errorSourceUrl: string;
  browser?: string;
  device?: string;
}

export const reportErrorAction = async ({
  userEmail,
  timestamp,
  errorMessage,
  errorTrace,
  errorSourceUrl,
  browser,
  device,
}: Props) => {
  if (process.env.NODE_ENV === "development") return;

  if (process.env.NEXT_PUBLIC_SITE_URL === "https://dev.skilld.ai") return;

  try {
    console.log({
      userEmail,
      timestamp,
      errorMessage,
      errorTrace,
      errorSourceUrl,
      browser,
      device,
    });

    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";

    const parser = new UAParser(userAgent);
    const browserParser = parser.getBrowser();
    const deviceParser = parser.getDevice();

    console.log({ browserParser, deviceParser });

    const { data, error } = await resend.emails.send({
      from: "Skilld AI <support@updates.skilld.ai>",
      to: ["as@millionlights.uk"],
      subject: `Error Report: ${errorMessage}`,
      react: ErrorReportEmail({
        userEmail,
        // timestamp: timestamp ?? format(new Date().toDateString(), 'PPpp'),
        timestamp: (() => {
          const isoTime = new Date().toISOString();
          const dateFormatter = new Intl.DateTimeFormat(undefined, {
            dateStyle: "full",
          });
          const timeFormatter = new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
          });
          const localDate = dateFormatter.format(new Date());
          const localTime = timeFormatter.format(new Date());
          return `${isoTime} (${localDate} at ${localTime})`;
        })(),
        errorMessage,
        errorTrace,
        errorSourceUrl,
        browser: browser || browserParser.name || "Unknown",
        device: device || deviceParser.type || "Unknown",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "Unknown",
      }),
    });

    console.log(data);
    console.log(error);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message };
  }
};
