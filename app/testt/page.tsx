"use client";

import { createClient } from "@/lib/supabase/client";

const Page = () => {
  const foo = async () => {
    const supabase = createClient();
    // https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/English/cbse-class-9-English_I_PT.pdf
    const { data, error } = await supabase.storage
      .from("pdf_chat")
      .list("EXAMS-PAPER/9th/Social Science");

    console.error(error);

    const res = data?.map((item) => {
      return {
        name: item.name,
        url: `https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/9th/Social%20Science/${item.name}`,
      };
    });

    console.log(res);
  };

  return (
    <div
      onClick={async () => {
        await foo();
      }}
    >
      hello
    </div>
  );
};

export default Page;
