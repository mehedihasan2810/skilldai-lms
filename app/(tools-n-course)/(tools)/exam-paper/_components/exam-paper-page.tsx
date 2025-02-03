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
import { examPapers, examPapers2 } from "../data";
import { ExamPaperPage2 } from "./exam-paper-page2";

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

// const ncertClasses = [
//   {
//     name: "7th",
//     subjects: [
//       {
//         name: "English",
//         books: [
//           {
//             name: "Honeycomb",
//             chapters: [
//               {
//                 name: "Three Questions",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/Three Questions.pdf?t=2025-01-01T08%3A32%3A10.988Z",
//               },
//               {
//                 name: "A Gift of Chappals",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/A Gift of Chappals.pdf",
//               },
//               {
//                 name: "Gopal and the Hilsa-fish",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/Gopal and the Hilsa-fish.pdf",
//               },
//               {
//                 name: "The Ashes That Made Trees Bloom",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/The Ashes That Made Trees Bloom.pdf",
//               },
//               {
//                 name: "Quality",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/Quality.pdf",
//               },
//               {
//                 name: "Expert Detectives",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/Expert Detectives.pdf",
//               },
//               {
//                 name: "The Invention of Vita-Wonk",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/The Invention of Vita-Wonk.pdf",
//               },
//               {
//                 name: "A Homage to our Brave Soldiers",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/Honeycomb/A Homage to our Brave Soldiers.pdf",
//               },
//             ],
//           },
//           {
//             name: "The Alian Hand Supplementry",
//             chapters: [
//               {
//                 name: "The Tiny Teacher",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/The Tiny Teacher.pdf",
//               },
//               {
//                 name: "Bringing Up Kari",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/Bringing Up Kari.pdf",
//               },
//               {
//                 name: "Golu Grows a Nose",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/Golu Grows a Nose.pdf",
//               },
//               {
//                 name: "Chandni",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/Chandni.pdf",
//               },
//               {
//                 name: "The Bear Story",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/The Bear Story.pdf",
//               },
//               {
//                 name: "A Tiger in the House",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/A Tiger in the House.pdf",
//               },
//               {
//                 name: "An Alien Hand",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/An Alien Hand.pdf",
//               },
//               {
//                 name: "geah1ps",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/English/The%20Alian%20Hand%20Supplementry/geah1ps.pdf",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Math",
//         books: [
//           {
//             name: "gemh1dd",
//             chapters: [
//               {
//                 name: "Integers",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/Maths/gemh1dd/Integers.pdf",
//               },
//               {
//                 name: "Fractions and Decimals",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Fractions and Decimals.pdf",
//               },
//               {
//                 name: "Data Handling",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Data Handling.pdf",
//               },
//               {
//                 name: "Simple Equations",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Simple Equations.pdf",
//               },
//               {
//                 name: "Lines and Angles",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Lines and Angles.pdf",
//               },
//               {
//                 name: "The Triangle and its Properties",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/The Triangle and its Properties.pdf",
//               },
//               {
//                 name: "Compairing Quantities",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Compairing Quantities.pdf",
//               },
//               {
//                 name: "Rational Numbers",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Rational Numbers.pdf",
//               },
//               {
//                 name: "Perimeter ans Area",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Perimeter ans Area.pdf",
//               },
//               {
//                 name: "Algebraic Expressions",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Algebraic Expressions.pdf",
//               },
//               {
//                 name: "Exponents and Powers",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Exponents and Powers.pdf",
//               },
//               {
//                 name: "Symmetry",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Symmetry.pdf",
//               },
//               {
//                 name: "Visualising Solid Shapes",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/Visualising Solid Shapes.pdf",
//               },
//               {
//                 name: "gemh1an",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh1an.pdf",
//               },
//               {
//                 name: "gemh1ps",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/maths/gemh1dd/gemh1ps.pdf",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Science",
//         books: [
//           {
//             name: "gesc1dd",
//             chapters: [
//               {
//                 name: "Nutrition in Plants",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Nutrition in Plants.pdf",
//               },
//               {
//                 name: "Nutrition in Animals",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Nutrition in Animals.pdf",
//               },
//               {
//                 name: "Heat",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Heat.pdf",
//               },
//               {
//                 name: "Acids, Bases and Salts",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Acids, Bases and Salts.pdf",
//               },
//               {
//                 name: "Physical and Chemical Changes",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Physical and Chemical Changes.pdf",
//               },
//               {
//                 name: "Respiration in Organisms",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Respiration in Organisms.pdf",
//               },
//               {
//                 name: "Transportation in Animals and Plants",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Transportation in Animals and Plants.pdf",
//               },
//               {
//                 name: "Reproduction in Plants",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Reproduction in Plants.pdf",
//               },
//               {
//                 name: "Motion and Time",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Motion and Time.pdf",
//               },
//               {
//                 name: "Electric Current and its Effects",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Electric Current and its Effects.pdf",
//               },
//               {
//                 name: "Light",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Light.pdf",
//               },
//               {
//                 name: "Forests: Our Lifeline",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Forests: Our Lifeline.pdf",
//               },
//               {
//                 name: "Wastewater Story",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/Wastewater Story.pdf",
//               },
//               {
//                 name: "gesc1ps",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/science/gesc1dd/gesc1ps.pdf",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "Social Science",
//         books: [
//           {
//             name: "Geography-Our Environment",
//             chapters: [
//               {
//                 name: "Environment",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Environment.pdf",
//               },
//               {
//                 name: "Inside Our Earth",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Inside Our Earth.pdf",
//               },
//               {
//                 name: "Our Changing Earth",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Our Changing Earth.pdf",
//               },
//               {
//                 name: "Air",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Air.pdf",
//               },
//               {
//                 name: "Water",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Water.pdf",
//               },
//               {
//                 name: "Human environment interaction- The Tropical and Subtropical Region",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Human environment interaction- The Tropical and Subtropical Region.pdf",
//               },
//               {
//                 name: "Life in the Desert",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/Life in the Desert.pdf",
//               },
//               {
//                 name: "gess2ps",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Geography-Our%20Environment/gess2ps.pdf",
//               },
//             ],
//           },
//           {
//             name: "History - Our Pasts II",
//             chapters: [
//               {
//                 name: "Introduction- Tracing changes Through a Thousand years",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Introduction- Tracing changes Through a Thousand years.pdf",
//               },
//               {
//                 name: "Kings and Kingdoms",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Kings and Kingdoms.pdf",
//               },
//               {
//                 name: "Delhi: 12th to 15th Century",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Delhi: 12th to 15th Century.pdf",
//               },
//               {
//                 name: "The Mughals ( 16th to 17th Century)",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/The Mughals ( 16th to 17th Century).pdf",
//               },
//               {
//                 name: "Tribes, Nomads and Settled Communities",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Tribes, Nomads and Settled Communities.pdf",
//               },
//               {
//                 name: "Devotional Paths to the Divine",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Devotional Paths to the Divine.pdf",
//               },
//               {
//                 name: "The Making of Regional Cultures",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/The Making of Regional Cultures.pdf",
//               },
//               {
//                 name: "Eighteenth-Century Political Formations",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/Eighteenth-Century Political Formations.pdf",
//               },
//               {
//                 name: "gess1ps",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/History-%20Our%20Pasts%20II/gess1ps.pdf?t=2025-01-01T16%3A28%3A22.837Z",
//               },
//             ],
//           },
//           {
//             name: "Social and political life",
//             chapters: [
//               {
//                 name: "Equality in Indian democracy",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Equality in Indian democracy.pdf",
//               },
//               {
//                 name: "Role Of The Government in Health",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Role Of The Government in Health.pdf",
//               },
//               {
//                 name: "How the State Government Works",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/How the State Government Works.pdf",
//               },
//               {
//                 name: "Growing up as Boys and Girls",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Growing up as Boys and Girls.pdf",
//               },
//               {
//                 name: "Women Change the world",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Women Change the world.pdf",
//               },
//               {
//                 name: "Understanding Media",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Understanding Media.pdf",
//               },
//               {
//                 name: "Markets Around Us",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/Markets Around Us.pdf",
//               },
//               {
//                 name: "A Shirt in The Market",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/A Shirt in The Market.pdf",
//               },
//               {
//                 name: "gess3ps",
//                 url: "https://opnrribnotbfgfrvuqrk.supabase.co/storage/v1/object/public/pdf_chat/NCERT/7th/social%20science/Social%20and%20political%20life/gess3ps.pdf",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },

// ];

export const ExamPaperPage = ({
  searchParams,
  userId,
}: {
  searchParams: {
    g: string | undefined;
    category: string | undefined;
    y: string | undefined;
    s: string | undefined;
    b: string | undefined;
    c: string | undefined;
  };
  userId: string;
}) => {
  console.log({ searchParams });

  const defaultClass = examPapers[0];
  const defaultSubject = examPapers[0].subjects[0];
  const defaultPaper = examPapers[0].subjects[0].papers[0];

  const [activeClassAccordion, setActiveClassAccordion] = useState(
    searchParams.g ?? defaultClass.name
  );
  const [activeSubjectAccordion, setActiveSubjectAccordion] = useState(
    searchParams.s ?? defaultSubject.name
  );
  const [activeBookAccordion, setActiveBookAccordion] = useState(
    searchParams.b ?? defaultPaper.name
  );
  // const [activeChapterAccordion, setActiveChapterAccordion] = useState(
  //   searchParams.c ?? defaultChapter.name
  // );

  const activeGrade = examPapers.find((grade) => grade.name === searchParams.g);
  const activeGrade2 = examPapers2.find(
    (grade) => grade.name === searchParams.g
  );

  const activeCategory = (activeGrade2?.categories ?? []).find(
    (category) => category.name === searchParams.category
  );
  const activeYear = (activeCategory?.years ?? []).find(
    (year) => year.name === searchParams.y
  );

  const activeSubject = (
    (searchParams.category ? activeYear?.subjects : activeGrade?.subjects) ?? []
  ).find((subject) => subject.name === searchParams.s);

  const activePaper = (activeSubject?.papers ?? []).find(
    (paper) =>
      paper.name.replaceAll("&", "").trim() ===
      searchParams.b?.replaceAll("%20", " ")?.trim()
  );

  console.log({ activePaper });

  // const activeChapter = (activePaper?.chapters ?? []).find(
  //   (chapter) => chapter.name === searchParams.c
  // );

  // console.log({ activeGrade, activeSubject, activePaper, activeYear, activeCategory });

  return (
    <div className="grid md:grid-cols-2 gap-8 pb-10 md:pb-0">
      <ScrollArea className="h-[70vh] md:h-[89vh] rounded-xl ">
        <div className="flex flex-col gap-4 pb-4">
          {examPapers
            .filter((g) => ["7th", "8th", "9th"].includes(g.name))
            .map((grade) => (
              <Accordion
                value={activeClassAccordion}
                onValueChange={(v) => setActiveClassAccordion(v)}
                key={grade.name}
                type="single"
                collapsible
              >
                <AccordionItem
                  value={grade.name}
                  className="border border-border/40 rounded-xl px-4 bg-card"
                >
                  <AccordionTrigger>{grade.name} grade</AccordionTrigger>
                  <AccordionContent>
                    {grade.subjects.map((subject) => (
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
                              <CornerDownRight className="size-4" />{" "}
                              {subject.name}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {subject.papers.map((paper) => (
                              <Link
                                href={`/exam-paper/?g=${grade.name}&s=${subject.name}&b=${paper.name.replaceAll("&", "")}`}
                                className={cn(
                                  "px-4 py-3 flex items-center gap-4 hover:bg-muted rounded-xl",
                                  (activePaper ?? defaultPaper).name ===
                                    paper.name
                                    ? "bg-muted"
                                    : ""
                                )}
                                key={paper.name}
                              >
                                <BookText className="size-5" /> {paper.name}
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

          <ExamPaperPage2
            searchParams={searchParams}
            userId={userId}
            gradeRank="10th"
          />
          {examPapers
            .filter((g) => g.name === "11th")
            .map((grade) => (
              <Accordion
                value={activeClassAccordion}
                onValueChange={(v) => setActiveClassAccordion(v)}
                key={grade.name}
                type="single"
                collapsible
              >
                <AccordionItem
                  value={grade.name}
                  className="border border-border/40 rounded-xl px-4 bg-card"
                >
                  <AccordionTrigger>{grade.name} grade</AccordionTrigger>
                  <AccordionContent>
                    {grade.subjects.map((subject) => (
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
                              <CornerDownRight className="size-4" />{" "}
                              {subject.name}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {subject.papers.map((paper) => (
                              <Link
                                href={`/exam-paper/?g=${grade.name}&s=${subject.name}&b=${paper.name.replaceAll("&", "")}`}
                                className={cn(
                                  "px-4 py-3 flex items-center gap-4 hover:bg-muted rounded-xl",
                                  (activePaper ?? defaultPaper).name ===
                                    paper.name
                                    ? "bg-muted"
                                    : ""
                                )}
                                key={paper.name}
                              >
                                <BookText className="size-5" /> {paper.name}
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
          <ExamPaperPage2
            searchParams={searchParams}
            userId={userId}
            gradeRank="12th"
          />
        </div>
      </ScrollArea>

      <div>
        <PDFViewer
          pdfUrl={(activePaper ?? defaultPaper).url}
          sourcePage="ncert"
          userId={userId}
        />
      </div>
    </div>
  );
};
