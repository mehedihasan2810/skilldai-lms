"use client";

import { createClient } from "@/lib/supabase/client";

const Page = () => {
  const foo = async () => {
    const supabase = createClient();
    // https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/10th/Compartment/2019/Social%20science/32-1-1_Social_Science.pdf
    const { data, error } = await supabase.storage
      .from("pdf_chat")
      .list("EXAMS-PAPER/12th/Mains/2024/POLITICAL_SCIENCE/POLITICAL_SCIENCE");
    // .list("EXAMS-PAPER/11th");

    console.error(error);

    const res = data?.map((item) => {
      // return {
      //   name: item.name,
      //   papers: [{ name: "", url: "" }],
      // };

      return {
        name: item.name,
        url: `https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/EXAMS-PAPER/12th/Mains/2024/POLITICAL_SCIENCE/POLITICAL_SCIENCE/${item.name.replaceAll(" ", "%20")}`,
      };
    });

    console.log(res)
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
