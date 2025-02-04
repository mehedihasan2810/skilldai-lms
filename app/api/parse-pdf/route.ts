// @ts-expect-error: pdf.worker.min.mjs is not typed
import * as pdfjs from "pdfjs-dist/build/pdf.mjs";
import "@ungap/with-resolvers";
import { normalizeText } from "@/lib/utils";

export const POST = async (req: Request) => {
  try {
    // @ts-expect-error: pdf.worker.min.mjs is not typed
    await import("pdfjs-dist/build/pdf.worker.min.mjs");

    const { resumeUrl } = await req.json();

    console.log({ resumeUrl });

    const doc = await pdfjs.getDocument(resumeUrl).promise;
    const numPages = doc.numPages;
    console.log({ numPages });
    const fileContent: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await doc.getPage(i);
      const textContent = await page.getTextContent();

      const text = textContent.items.map((item: any) => item.str).join(" ");

      console.log({ text });

      fileContent.push(text);

      //   textContent.items.forEach((item: TextItem) => {
      //     fileContent.push(`${item.str}${item.hasEOL ? "\n" : ""}`);
      //   });
    }
    console.log("PDF parsed data:", fileContent.length);
    console.log(fileContent.join("\n"));

    const normalizedText = normalizeText(fileContent.join("\n"));

    return Response.json(normalizedText, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: { message: (error as Error).message } },
      { status: 400 }
    );
  }
};
