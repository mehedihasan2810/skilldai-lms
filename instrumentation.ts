import { registerOTel } from "@vercel/otel";
import { LangfuseExporter } from "langfuse-vercel";

export function register() {
  registerOTel({
    serviceName: "skilldai-lms",
    traceExporter: new LangfuseExporter({ debug: false }),
  });
}
