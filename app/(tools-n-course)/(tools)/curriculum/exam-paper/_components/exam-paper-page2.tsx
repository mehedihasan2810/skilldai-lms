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
import { examPapers2 } from "../data";

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

export const ExamPaperPage2 = ({
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

  //   const defaultGrade = examPapers2[0];
  //   const defaultCategory = examPapers2[0].categories[0];
  //   const defaultYears = examPapers2[0].categories[0].years[0];
  //   const defaultSubject = examPapers2[0].categories[0].years[0].subjects[0];
  //   const defaultPapers =
  //     examPapers2[0].categories[0].years[0].subjects[0].papers[0];

  const [activeGradeAccordion, setActiveGradeAccordion] = useState(
    searchParams.g
  );

  const [activeCategoryAccordion, setActiveCategoryAccordion] = useState(
    searchParams.category
  );
  const [activeYearAccordion, setActiveYearAccordion] = useState(
    searchParams.y
  );
  const [activeSubjectAccordion, setActiveSubjectAccordion] = useState(
    searchParams.s
  );
  const [activePaperAccordion, setActivePaperAccordion] = useState(
    searchParams.b
  );

  const activeGrade = examPapers2.find(
    (grade) => grade.name === searchParams.g
  );

  const activeCategory = (activeGrade?.categories ?? []).find(
    (category) => category.name === searchParams.category
  );

  const activeYear = (activeCategory?.years ?? []).find(
    (year) => year.name === searchParams.y
  );

  const activeSubject = (activeYear?.subjects ?? []).find(
    (subject) => subject.name === searchParams.s
  );

  const activePaper = (activeSubject?.papers ?? []).find(
    (paper) =>
      paper.name.replaceAll("&", "").trim() ===
      searchParams.b?.replaceAll("%20", " ")?.trim()
  );

  // const activeChapter = (activePaper?.chapters ?? []).find(
  //   (chapter) => chapter.name === searchParams.c
  // );
  console.log(searchParams.b?.replaceAll("%20", " ")?.trim());
  console.log({ activeGrade, activeSubject, activePaper });

  return (
    <>
      {examPapers2.map((grade) => (
        <Accordion
          value={activeGradeAccordion}
          onValueChange={(v) => setActiveGradeAccordion(v)}
          key={grade.name}
          type="single"
          collapsible
        >
          <AccordionItem
            value={grade.name}
            className="border border-border/40 rounded-xl px-4 bg-card"
          >
            <AccordionTrigger>
              {grade.name} grade
              {/* <div className="text-left ">
                    <p>{grade.name}</p>
                    <p className="text-muted-foreground text-xs mt-1 ml-2">
                      {grade.subjects.length} Subjects
                    </p>
                  </div> */}
            </AccordionTrigger>
            <AccordionContent>
              {grade.categories.map((category) => (
                <Accordion
                  key={category.name}
                  type="single"
                  collapsible
                  className=""
                  value={activeCategoryAccordion}
                  onValueChange={(v) => setActiveCategoryAccordion(v)}
                >
                  <AccordionItem
                    value={category.name}
                    className="border-none bg-gray-400/15 dark:bg-gray-900/35 rounded-xl px-4 mb-2"
                  >
                    <AccordionTrigger className="">
                      <div className="flex items-center gap-4">
                        <CornerDownRight className="size-4" /> {category.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {category.years.map((year) => (
                        <Accordion
                          key={year.name}
                          type="single"
                          collapsible
                          className=""
                          value={activeYearAccordion}
                          onValueChange={(v) => setActiveYearAccordion(v)}
                        >
                          <AccordionItem
                            value={year.name}
                            className="border-none bg-gray-400/15 dark:bg-gray-900/35 rounded-xl px-4 mb-2"
                          >
                            <AccordionTrigger className="">
                              <div className="flex items-center gap-4">
                                <CornerDownRight className="size-4" />{" "}
                                {year.name}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              {year.subjects.map((subject) => (
                                <Accordion
                                  key={subject.name}
                                  type="single"
                                  collapsible
                                  className=""
                                  value={activeSubjectAccordion}
                                  onValueChange={(v) =>
                                    setActiveSubjectAccordion(v)
                                  }
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
                                          href={`/curriculum/exam-paper/?g=${grade.name}&category=${category.name}&y=${year.name}&s=${subject.name}&b=${paper.name.replaceAll("&", "")}`}
                                          className={cn(
                                            "px-4 py-3 flex items-center gap-4 hover:bg-muted rounded-xl",
                                            activePaper?.name === paper.name
                                              ? "bg-muted"
                                              : ""
                                          )}
                                          key={paper.name}
                                        >
                                          <BookText className="size-5" />{" "}
                                          {paper.name}
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};
