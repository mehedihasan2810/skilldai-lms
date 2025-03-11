import React from "react";
import { QuizPage } from "./_components/quiz-page";
import PageContainer from "@/components/dashboard/page-container";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RecentQuizList } from "../quiz-from-doc/_components/recent-quiz-list";

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }
  const user = session.user;

  return (
    <PageContainer scrollable>
      {/* <QuizPage userId={""} userEmail={""} /> */}
      <QuizPage userId={user.id} userEmail={user.email ?? ""} />
      <RecentQuizList userId={user.id} />
    </PageContainer>
  );
};

export default Page;

const subjects = [
  {
    id: "5b4b1246-d673-44c5-b933-cd6c1962436e",
    name: "Geography",
    slug: "geography-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "cb60032b-7242-4e90-a4d7-17dbf5b14176",
    name: "Mathematics",
    slug: "mathematics-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "a1f267ce-5f07-4ea9-8032-d33a0d1d99cb",
    name: "Sociology",
    slug: "sociology-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "14262e9b-0a04-4a71-86db-7253dc87e274",
    name: "Physics",
    slug: "physics-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "3dda5be2-6aed-4a13-970e-153ae2d6db79",
    name: "Chemistry",
    slug: "chemistry-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "22ef9ad7-fdcf-450e-ba81-7b61fbe5931c",
    name: "History",
    slug: "history-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "3b9598f3-1dca-4ad1-ae67-c0c569fed158",
    name: "Sciences",
    slug: "sciences-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "1a61eaa3-a8a5-46cc-9bc0-fc481544248b",
    name: "Biology",
    slug: "biology-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "415766c7-7703-4f3c-80fe-d4462faf0bb8",
    name: "English",
    slug: "english-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "bdb2036f-032c-4ee7-bc1f-c10387415f10",
    name: "Physical Education",
    slug: "physical-education-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "595a3c85-de70-489b-85af-c6efd19bd59c",
    name: "Spanish",
    slug: "spanish-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "9ecf5e48-0e15-459a-a13c-30ee122b2030",
    name: "Philosophy",
    slug: "philosophy-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "11c57558-cf71-4a60-a48b-9a1b205a4a4b",
    name: "Arts",
    slug: "arts-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "b6a524d8-4e12-4824-b280-db792e44ef7e",
    name: "Economics",
    slug: "economics-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
  {
    id: "961202ae-2247-49cb-b867-6f2cef6c7d70",
    name: "Environmental Sciences",
    slug: "environmental-sciences-en",
    initials: null,
    available: true,
    color: null,
    locale: "en",
    type: "NationalCommonBase",
  },
];

const grades = [
  {
    id: "1st-grade-en-international",
    name: "1st grade",
    order: 10,
    locale: "en",
    schoolLevelId: "3f43c5c5-e805-4b3e-ac9a-bdc1cee2a010",
    available: true,
    slug: "1st-grade",
  },
  {
    id: "2nd-grade-en-international",
    name: "2nd grade",
    order: 20,
    locale: "en",
    schoolLevelId: "3f43c5c5-e805-4b3e-ac9a-bdc1cee2a010",
    available: true,
    slug: "2nd-grade",
  },
  {
    id: "3rd-grade-en-international",
    name: "3rd grade",
    order: 30,
    locale: "en",
    schoolLevelId: "3f43c5c5-e805-4b3e-ac9a-bdc1cee2a010",
    available: true,
    slug: "3rd-grade",
  },
  {
    id: "4th-grade-en-international",
    name: "4th grade",
    order: 40,
    locale: "en",
    schoolLevelId: "3f43c5c5-e805-4b3e-ac9a-bdc1cee2a010",
    available: true,
    slug: "4th-grade",
  },
  {
    id: "5th-grade-en-international",
    name: "5th grade",
    order: 50,
    locale: "en",
    schoolLevelId: "3f43c5c5-e805-4b3e-ac9a-bdc1cee2a010",
    available: true,
    slug: "5th-grade",
  },
  {
    id: "6th-grade-en-international",
    name: "6th grade",
    order: 60,
    locale: "en",
    schoolLevelId: "3f43c5c5-e805-4b3e-ac9a-bdc1cee2a010",
    available: true,
    slug: "6th-grade",
  },
  {
    id: "7th-grade-en-international",
    name: "7th grade",
    order: 70,
    locale: "en",
    schoolLevelId: "79fa1e91-e8f3-4726-a1a8-95b5a9540fdf",
    available: true,
    slug: "7th-grade",
  },
  {
    id: "8th-grade-en-international",
    name: "8th grade",
    order: 80,
    locale: "en",
    schoolLevelId: "79fa1e91-e8f3-4726-a1a8-95b5a9540fdf",
    available: true,
    slug: "8th-grade",
  },
  {
    id: "9th-grade-en-international",
    name: "9th grade",
    order: 90,
    locale: "en",
    schoolLevelId: "79fa1e91-e8f3-4726-a1a8-95b5a9540fdf",
    available: true,
    slug: "9th-grade",
  },
  {
    id: "10th-grade-en-international",
    name: "10th grade",
    order: 100,
    locale: "en",
    schoolLevelId: "3908eab6-106f-4bfa-8753-1a193112bf0c",
    available: true,
    slug: "10th-grade",
  },
  {
    id: "11th-grade-en-international",
    name: "11th grade",
    order: 110,
    locale: "en",
    schoolLevelId: "3908eab6-106f-4bfa-8753-1a193112bf0c",
    available: true,
    slug: "11th-grade",
  },
  {
    id: "12th-grade-en-international",
    name: "12th grade",
    order: 120,
    locale: "en",
    schoolLevelId: "3908eab6-106f-4bfa-8753-1a193112bf0c",
    available: true,
    slug: "12th-grade",
  },
  {
    id: "preschool",
    name: "Preschool",
    order: 0,
    locale: "en",
    schoolLevelId: "cb2367ad-0f6a-48bb-8eb0-f6ce22854638",
    available: true,
    slug: "preschool",
  },
  {
    id: "university",
    name: "University",
    order: 130,
    locale: "en",
    schoolLevelId: "50d2bb98-dac5-488f-861d-59c9951b4b72",
    available: true,
    slug: "university",
  },
];

const subects2 = [
  {
    value: "5b4b1246-d673-44c5-b933-cd6c1962436e",
    label: "Geography",
  },
  {
    value: "cb60032b-7242-4e90-a4d7-17dbf5b14176",
    label: "Mathematics",
  },
  {
    value: "a1f267ce-5f07-4ea9-8032-d33a0d1d99cb",
    label: "Sociology",
  },
  {
    value: "14262e9b-0a04-4a71-86db-7253dc87e274",
    label: "Physics",
  },
  {
    value: "3dda5be2-6aed-4a13-970e-153ae2d6db79",
    label: "Chemistry",
  },
  {
    value: "22ef9ad7-fdcf-450e-ba81-7b61fbe5931c",
    label: "History",
  },
  {
    value: "3b9598f3-1dca-4ad1-ae67-c0c569fed158",
    label: "Sciences",
  },
  {
    value: "1a61eaa3-a8a5-46cc-9bc0-fc481544248b",
    label: "Biology",
  },
  {
    value: "415766c7-7703-4f3c-80fe-d4462faf0bb8",
    label: "English",
  },
  {
    value: "bdb2036f-032c-4ee7-bc1f-c10387415f10",
    label: "Physical Education",
  },
  {
    value: "595a3c85-de70-489b-85af-c6efd19bd59c",
    label: "Spanish",
  },
  {
    value: "9ecf5e48-0e15-459a-a13c-30ee122b2030",
    label: "Philosophy",
  },
  {
    value: "11c57558-cf71-4a60-a48b-9a1b205a4a4b",
    label: "Arts",
  },
  {
    value: "b6a524d8-4e12-4824-b280-db792e44ef7e",
    label: "Economics",
  },
  {
    value: "961202ae-2247-49cb-b867-6f2cef6c7d70",
    label: "Environmental Sciences",
  },
];
