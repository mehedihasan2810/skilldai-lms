import PageContainer from "@/components/dashboard/page-container";

import React from "react";
import CourseTable from "./_components/course-table";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { CourseCompletionChart } from "./_components/course-status-chart";
import { QuizMarkChart } from "./_components/quiz-mark-chart";
import { ReportTopData } from "./_components/report-top-data";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const items = [
  { title: "Home", link: "/reports" },
  { title: "Reports", link: "/reports" },
];

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  return (
    <PageContainer scrollable>
      <Breadcrumbs items={items} />
      <ReportTopData userId={user.id} />

      <div className="grid 2xl:grid-cols-2 mt-8 gap-4">
        <CourseCompletionChart userId={user.id} />

        <div>
          <QuizMarkChart userId={user.id} />
        </div>
      </div>

      <div className="mt-8 mb-24">
        <CourseTable userId={user.id} />
      </div>
    </PageContainer>
  );
};

export default Page;
