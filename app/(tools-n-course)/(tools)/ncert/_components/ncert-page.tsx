"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookText, CornerDownRight, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const PDFViewer = dynamic(
  () => import("./pdf-viewer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="bg-gray-50 rounded-xl py-4 grid place-items-center h-[89vh] text-gray-900">
        <div className="flex items-center gap-2">
          <Loader className="size-6 animate-spin" /> Loading...
        </div>
      </div>
    ),
  }
);

const ncertClasses = [
  {
    name: "7th",
    subjects: [
      {
        name: "English",
        books: [
          {
            name: "Honeycomb",
            chapters: [
              {
                name: "gehc101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc101.pdf?t=2025-01-01T08%3A32%3A10.988Z",
              },
              {
                name: "gehc102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc102.pdf",
              },
              {
                name: "gehc103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc103.pdf",
              },
              {
                name: "gehc104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc104.pdf",
              },
              {
                name: "gehc105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc105.pdf",
              },
              {
                name: "gehc106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc106.pdf",
              },
              {
                name: "gehc107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc107.pdf",
              },
              {
                name: "gehc108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc108.pdf",
              },
            ],
          },
          {
            name: "The Alian Hand Supplementry",
            chapters: [
              {
                name: "geah101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah101.pdf",
              },
              {
                name: "geah102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah102.pdf",
              },
              {
                name: "geah103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah103.pdf",
              },
              {
                name: "geah104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah104.pdf",
              },
              {
                name: "geah105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah105.pdf",
              },
              {
                name: "geah106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah106.pdf",
              },
              {
                name: "geah107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah107.pdf",
              },
              {
                name: "geah1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Math",
        books: [
          {
            name: "gemh1dd",
            chapters: [
              {
                name: "gemh101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh101.pdf",
              },
              {
                name: "gemh102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh102.pdf",
              },
              {
                name: "gemh103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh103.pdf",
              },
              {
                name: "gemh104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh104.pdf",
              },
              {
                name: "gemh105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh105.pdf",
              },
              {
                name: "gemh106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh106.pdf",
              },
              {
                name: "gemh107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh107.pdf",
              },
              {
                name: "gemh108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh108.pdf",
              },
              {
                name: "gemh109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh109.pdf",
              },
              {
                name: "gemh110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh110.pdf",
              },
              {
                name: "gemh111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh111.pdf",
              },
              {
                name: "gemh112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh112.pdf",
              },
              {
                name: "gemh113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh113.pdf",
              },
              {
                name: "gemh1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh1an.pdf",
              },
              {
                name: "gemh1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Science",
        books: [
          {
            name: "gesc1dd",
            chapters: [
              {
                name: "gesc101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc101.pdf",
              },
              {
                name: "gesc102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc102.pdf",
              },
              {
                name: "gesc103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc103.pdf",
              },
              {
                name: "gesc104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc104.pdf",
              },
              {
                name: "gesc105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc105.pdf",
              },
              {
                name: "gesc106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc106.pdf",
              },
              {
                name: "gesc107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc107.pdf",
              },
              {
                name: "gesc108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc108.pdf",
              },
              {
                name: "gesc109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc109.pdf",
              },
              {
                name: "gesc110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc110.pdf",
              },
              {
                name: "gesc111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc111.pdf",
              },
              {
                name: "gesc112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc112.pdf",
              },
              {
                name: "gesc113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc113.pdf",
              },
              {
                name: "gesc1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Social Science",
        books: [
          {
            name: "Geography-Our Environment",
            chapters: [
              {
                name: "gess201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess201.pdf",
              },
              {
                name: "gess202",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess202.pdf",
              },
              {
                name: "gess203",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess203.pdf",
              },
              {
                name: "gess204",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess204.pdf",
              },
              {
                name: "gess205",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess205.pdf",
              },
              {
                name: "gess206",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess206.pdf",
              },
              {
                name: "gess207",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess207.pdf",
              },
              {
                name: "gess2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess2ps.pdf",
              },
            ],
          },
          {
            name: "History - Our Pasts II",
            chapters: [
              {
                name: "gess101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess101.pdf",
              },
              {
                name: "gess102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess102.pdf",
              },
              {
                name: "gess103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess103.pdf",
              },
              {
                name: "gess104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess104.pdf",
              },
              {
                name: "gess105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess105.pdf",
              },
              {
                name: "gess106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess106.pdf",
              },
              {
                name: "gess107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess107.pdf",
              },
              {
                name: "gess108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess108.pdf",
              },
              {
                name: "gess1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess1ps.pdf?t=2025-01-01T16%3A28%3A22.837Z",
              },
            ],
          },
          {
            name: "Social and political life",
            chapters: [
              {
                name: "gess301",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess301.pdf",
              },
              {
                name: "gess302",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess302.pdf",
              },
              {
                name: "gess303",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess303.pdf",
              },
              {
                name: "gess304",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess304.pdf",
              },
              {
                name: "gess305",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess305.pdf",
              },
              {
                name: "gess306",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess306.pdf",
              },
              {
                name: "gess307",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess307.pdf",
              },
              {
                name: "gess308",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess308.pdf",
              },
              {
                name: "gess3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess3ps.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "8th",
    subjects: [
      {
        name: "English",
        books: [
          {
            name: "Honeydew",
            chapters: [
              {
                name: "hehd101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd101.pdf",
              },
              {
                name: "hehd102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd102.pdf",
              },
              {
                name: "hehd103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd103.pdf",
              },
              {
                name: "hehd104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd104.pdf",
              },
              {
                name: "hehd105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd105.pdf",
              },
              {
                name: "hehd106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd106.pdf",
              },
              {
                name: "hehd107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd107.pdf",
              },
              {
                name: "hehd108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd108.pdf",
              },
              {
                name: "hehd1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/Honeydew/hehd1ps.pdf",
              },
            ],
          },
          {
            name: "It So Happened",
            chapters: [
              {
                name: "heih101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih101.pdf?t=2025-01-05T14%3A54%3A18.785Z",
              },
              {
                name: "heih102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih102.pdf",
              },
              {
                name: "heih103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih103.pdf",
              },
              {
                name: "heih104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih104.pdf",
              },
              {
                name: "heih105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih105.pdf",
              },
              {
                name: "heih106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih106.pdf",
              },
              {
                name: "heih107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih107.pdf",
              },
              {
                name: "heih108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih108.pdf",
              },
              {
                name: "heih1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/English/It%20So%20Happened/heih1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Math",
        books: [
          {
            name: "hemh1dd",
            chapters: [
              {
                name: "hemh101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh101.pdf",
              },
              {
                name: "hemh102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh102.pdf",
              },
              {
                name: "hemh103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh103.pdf",
              },
              {
                name: "hemh104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh104.pdf",
              },
              {
                name: "hemh105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh105.pdf",
              },
              {
                name: "hemh106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh106.pdf",
              },
              {
                name: "hemh107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh107.pdf",
              },
              {
                name: "hemh108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh108.pdf",
              },
              {
                name: "hemh109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh109.pdf",
              },
              {
                name: "hemh110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh110.pdf",
              },
              {
                name: "hemh111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh111.pdf",
              },
              {
                name: "hemh112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh112.pdf",
              },
              {
                name: "hemh113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh113.pdf",
              },
              {
                name: "hemh1an",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh1an.pdf",
              },
              {
                name: "hemh1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Maths/hemh1dd/hemh1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Science",
        books: [
          {
            name: "hesc1dd",
            chapters: [
              {
                name: "hesc101",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc101.pdf",
              },
              {
                name: "hesc102",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc102.pdf",
              },
              {
                name: "hesc103",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc103.pdf",
              },
              {
                name: "hesc104",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc104.pdf",
              },
              {
                name: "hesc105",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc105.pdf",
              },
              {
                name: "hesc106",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc106.pdf",
              },
              {
                name: "hesc107",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc107.pdf",
              },
              {
                name: "hesc108",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc108.pdf",
              },
              {
                name: "hesc109",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc109.pdf",
              },
              {
                name: "hesc110",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc110.pdf",
              },
              {
                name: "hesc111",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc111.pdf",
              },
              {
                name: "hesc112",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc112.pdf",
              },
              {
                name: "hesc113",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc113.pdf",
              },
              {
                name: "hesc1ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Science/hesc1dd/hesc1ps.pdf",
              },
            ],
          },
        ],
      },
      {
        name: "Social Science",
        books: [
          {
            name: "Our Past III",
            chapters: [
              {
                name: "hess201",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess201.pdf",
              },
              {
                name: "hess202",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess202.pdf",
              },
              {
                name: "hess203",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess203.pdf",
              },
              {
                name: "hess204",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess204.pdf",
              },
              {
                name: "hess205",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess205.pdf",
              },
              {
                name: "hess206",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess206.pdf",
              },
              {
                name: "hess207",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess207.pdf",
              },
              {
                name: "hess208",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess208.pdf",
              },
              {
                name: "hess2ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Our%20Past%20III/hess2ps.pdf",
              },
            ],
          },
          {
            name: "Resourse and Developement (Geography)",
            chapters: [
              {
                name: "hess401",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess401.pdf",
              },
              {
                name: "hess402",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess402.pdf",
              },
              {
                name: "hess403",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess403.pdf",
              },
              {
                name: "hess404",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess404.pdf",
              },
              {
                name: "hess405",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess405.pdf",
              },
              {
                name: "hess4ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Resourse%20and%20Developement%20(Geography)/hess4ps.pdf",
              },
            ],
          },
          {
            name: "Social and Political Life",
            chapters: [
              {
                name: "hess301",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess301.pdf",
              },
              {
                name: "hess302",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess302.pdf",
              },
              {
                name: "hess303",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess303.pdf",
              },
              {
                name: "hess304",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess304.pdf",
              },
              {
                name: "hess305",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess305.pdf",
              },
              {
                name: "hess306",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess306.pdf",
              },
              {
                name: "hess307",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess307.pdf",
              },
              {
                name: "hess308",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess308.pdf",
              },
              {
                name: "hess3ps",
                url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/8th/Social%20Science/Social%20and%20Political%20Life/hess3ps.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const NCERTPage = ({
  searchParams,
  userId,
}: {
  searchParams: {
    g: string | undefined;
    s: string | undefined;
    b: string | undefined;
    c: string | undefined;
  };
  userId: string;
}) => {
  console.log({ searchParams });

  const defaultClass = ncertClasses[0];
  const defaultSubject = ncertClasses[0].subjects[0];
  const defaultBook = ncertClasses[0].subjects[0].books[0];
  const defaultChapter = ncertClasses[0].subjects[0].books[0].chapters[0];

  const [activeClassAccordion, setActiveClassAccordion] = useState(
    searchParams.g ?? defaultClass.name
  );
  const [activeSubjectAccordion, setActiveSubjectAccordion] = useState(
    searchParams.s ?? defaultSubject.name
  );
  const [activeBookAccordion, setActiveBookAccordion] = useState(
    searchParams.b ?? defaultBook.name
  );
  const [activeChapterAccordion, setActiveChapterAccordion] = useState(
    searchParams.c ?? defaultChapter.name
  );

  const activeClass = ncertClasses.find(
    (ncertClass) => ncertClass.name === searchParams.g
  );

  const activeSubject = (activeClass?.subjects ?? []).find(
    (subject) => subject.name === searchParams.s
  );

  const activeBook = (activeSubject?.books ?? []).find(
    (book) => book.name === searchParams.b
  );

  const activeChapter = (activeBook?.chapters ?? []).find(
    (chapter) => chapter.name === searchParams.c
  );

  console.log({ activeClass, activeSubject, activeBook, activeChapter });

  return (
    <div className="grid md:grid-cols-2 gap-8 pb-10 md:pb-0">
      <ScrollArea className="h-[70vh] md:h-[89vh] rounded-xl ">
        <div className="flex flex-col gap-4 pb-4">
        {ncertClasses.map((ncertClass) => (
          <Accordion
            value={activeClassAccordion}
            onValueChange={(v) => setActiveClassAccordion(v)}
            key={ncertClass.name}
            type="single"
            collapsible
          >
            <AccordionItem
              value={ncertClass.name}
              className="border border-border/40 rounded-xl px-4 bg-card"
            >
              <AccordionTrigger>
                {ncertClass.name} grade
                {/* <div className="text-left ">
                    <p>{ncertClass.name}</p>
                    <p className="text-muted-foreground text-xs mt-1 ml-2">
                      {ncertClass.subjects.length} Subjects
                    </p>
                  </div> */}
              </AccordionTrigger>
              <AccordionContent>
                {ncertClass.subjects.map((subject) => (
                  <Accordion
                    key={subject.name}
                    type="single"
                    collapsible
                    className=""
                    value={activeSubjectAccordion}
                    onValueChange={(v) => setActiveSubjectAccordion(v)}
                  >
                    <AccordionItem
                      value={subject.name}
                      className="border-none bg-gray-400/15 dark:bg-gray-900/35 rounded-xl px-4 mb-2"
                    >
                      <AccordionTrigger className="">
                        <div className="flex items-center gap-4">
                          <CornerDownRight className="size-4" /> {subject.name}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {subject.books.map((book) => (
                          <Accordion
                            key={book.name}
                            type="single"
                            collapsible
                            value={activeBookAccordion}
                            onValueChange={(v) => setActiveBookAccordion(v)}
                          >
                            <AccordionItem
                              value={book.name}
                              className="border-none rounded-xl px-4 bg-gray-400/15 dark:bg-gray-900/30 mb-2"
                            >
                              <AccordionTrigger>
                                <div className="flex items-center gap-4">
                                  <CornerDownRight className="size-4" />{" "}
                                  {book.name}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="border-t space-y-2 pt-2">
                                {book.chapters.map((chapter) => (
                                  <Link
                                    href={`/ncert/?g=${ncertClass.name}&s=${subject.name}&b=${book.name}&c=${chapter.name}`}
                                    className={cn(
                                      "px-4 py-3 flex items-center gap-4 hover:bg-muted rounded-xl",
                                      (activeChapter ?? defaultChapter).name ===
                                        chapter.name
                                        ? "bg-muted"
                                        : ""
                                    )}
                                    key={chapter.name}
                                  >
                                    <BookText className="size-5" />{" "}
                                    {chapter.name}
                                  </Link>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        </div>
      </ScrollArea>

      <div>
        <PDFViewer
          pdfUrl={(activeChapter ?? defaultChapter).url}
          // pdfUrl="https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/gehc101.pdf?t=2025-01-01T08%3A32%3A10.988Z"
          sourcePage="ncert"
          userId={userId}
        />
      </div>
    </div>
  );
};
