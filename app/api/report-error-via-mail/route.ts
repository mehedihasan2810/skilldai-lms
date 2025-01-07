import { reportErrorAction } from "@/actions/report-error-via-mail";
import ErrorReportEmail from "@/emails/error-report-email";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  try {
    const {
      userEmail,
      timestamp,
      errorMessage,
      errorTrace,
      errorSourceUrl,
      browser,
      device,
    }: {
        userEmail: string;
        timestamp: string;
        errorMessage: string;
        errorTrace: string;
        errorSourceUrl: string;
        browser: string;
        device: string;
    } = await req.json();

    const res = await reportErrorAction({
        userEmail,
        timestamp,
        errorMessage,
        errorTrace,
        errorSourceUrl,
        browser,
        device,
    });

    return Response.json({ data: res });

    console.log({
      userEmail,
      timestamp,
      errorMessage,
      errorTrace,
      errorSourceUrl,
      browser,
      device,
    });

    const { data, error } = await resend.emails.send({
      from: "Skilld AI <support@updates.skilld.ai>",
      to: ["mehedi.hasan.webcraft@gmail.com", "as@millionlights.uk"],
      subject: `Error Report: ${errorMessage}`,
      react: ErrorReportEmail({
        userEmail,
        timestamp,
        errorMessage,
        errorTrace,
        errorSourceUrl,
        browser,
        device,
      }),
    });

    console.log(data);
    console.log(error);

    return Response.json({ data: data });
  } catch (error) {
    console.error(error);
    return Response.json({ error: (error as Error).message });
  }
};
