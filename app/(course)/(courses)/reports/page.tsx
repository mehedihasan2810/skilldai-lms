import PageContainer from "@/components/dashboard/page-container";

import React from "react";
import CourseTable from "./_components/course-table";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { CourseCompletionChart } from "./_components/course-status-chart";
import { QuizMarkChart } from "./_components/quiz-mark-chart";
import { ReportTopData } from "./_components/report-top-data";

const items = [
  { title: "Home", link: "/reports" },
  { title: "Reports", link: "/reports" },
];

const Page = () => {
  return (
    <PageContainer scrollable>
      <Breadcrumbs items={items} />
      <ReportTopData />

      <div className="grid 2xl:grid-cols-2 mt-8 gap-4">
        <CourseCompletionChart />

        <div>
          <QuizMarkChart />
        </div>
      </div>

      <div className="mt-8 mb-24">
        <CourseTable />
      </div>
    </PageContainer>
  );
};

export default Page;
