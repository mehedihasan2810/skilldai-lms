// @ts-expect-error: pdf.worker.min.mjs is not typed
import * as pdfjs from "pdfjs-dist/build/pdf.mjs";
import "@ungap/with-resolvers";
import { createClient } from "@/lib/supabase/server";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { encode } from "gpt-tokenizer";

export const POST = async (req: Request) => {
  try {
    // @ts-expect-error: pdf.worker.min.mjs is not typed
    await import("pdfjs-dist/build/pdf.worker.min.mjs");

    const { fileUrl, userId, fileName, title } = await req.json();

    console.log({ fileUrl, userId, fileName, title });

    const doc = await pdfjs.getDocument(fileUrl).promise;
    const numPages = doc.numPages;
    console.log({ numPages });
    const fileContent: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await doc.getPage(i);
      const textContent = await page.getTextContent();

      const text = textContent.items.map((item: any) => item.str).join(" ");

        console.log({ text });

      fileContent.push(`Page number ${i}:\n\n${text}`);

      //   textContent.items.forEach((item: TextItem) => {
      //     fileContent.push(`${item.str}${item.hasEOL ? "\n" : ""}`);
      //   });
    }
    console.log("PDF parsed data:", fileContent.length);
    // console.log(fileContent)

    const supabase = await createClient();

    const { data: createdPdfChatData, error: createdPdfChatError } =
      await supabase
        .from("pdf_chat")
        .insert({
          title,
          summary: "",
          user_id: userId,
          file_name: fileName,
          file_url: fileUrl,
        })
        .select("id")
        .single();

    if (createdPdfChatError) {
      console.error(createdPdfChatError);
      throw new Error(createdPdfChatError.message);
    }

    if (!createdPdfChatData) {
      throw new Error("Could not save the data");
    }

    console.log({ createdPdfChatData });

    const { embeddings } = await embedMany({
      model: openai.embedding("text-embedding-ada-002"),
      // model: openai.embedding("text-embedding-3-small"),
      values: fileContent,
    });

    // console.log(embeddings)

    const insertValues = fileContent.map((content, i) => ({
      pdf_chat_id: createdPdfChatData.id,
      user_id: userId,
      file_url: fileUrl,
      file_name: fileName,
      content,
      embedding: embeddings[i],
      //   embedding: pgvector.toSql(embeddings[i]),
      tokens: encode(content).length,
    }));

    // console.dir({ insertValues }, { depth: null });

    const {
      data: createdPdfChatEmbeddingsData,
      error: createdPdfChatEmbeddingsError,
    } = await supabase
      .from("pdf_chat_embeddings")
      .insert(insertValues)
      .select("id");

    if (createdPdfChatEmbeddingsError) {
      console.error(createdPdfChatEmbeddingsError);
      throw new Error(createdPdfChatEmbeddingsError.message);
    }

    if (!createdPdfChatEmbeddingsData) {
      throw new Error("Could not save the data");
    }

    console.log({ createdPdfChatEmbeddingsData });

    return Response.json(createdPdfChatData, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: { message: (error as Error).message } },
      { status: 400 }
    );
  }
};
