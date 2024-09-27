import { registerOTel } from "@vercel/otel";
import { LangfuseExporter } from "langfuse-vercel";

export function register() {
  registerOTel({
    serviceName: "skilldai-lms",
    traceExporter: new LangfuseExporter(),
    // traceExporter: new LangfuseExporter({
    //   debug: false,
    //   secretKey: process.env.NEXT_PUBLIC_LANGFUSE_SECRET_KEY,
    //   publicKey: process.env.NEXT_PUBLIC_LANGFUSE_PUBLIC_KEY,
    //   baseUrl: process.env.NEXT_PUBLIC_LANGFUSE_BASEURL,
    // }),
  });
}
