import PageContainer from "@/components/dashboard/page-container";
import { buttonVariants } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

const tools = [
  {
    id: 1,
    title: "AI Course Generator",
    description:
      "Effortlessly generate personalized courses tailored to your needs using our AI. Choose a topic and let our technology design engaging lessons and content just for you!",
    href: "/courses/create",
  },
  {
    id: 2,
    title: "AI Quiz Generator",
    description:
      "Transform your documents into engaging quizzes with our AI. Upload your files, and let our tool create tailored questions to enhance understanding and retention!",
    href: "/quiz-from-doc",
  },
  {
    id: 3,
    title: "AI Lesson Plan Generator",
    description:
      "Design comprehensive lesson plans effortlessly with our AI. Input your topic, and our tool generates structured, detailed plans to make teaching more effective and efficient!",
    href: "/lesson-plan-generator",
  },
  {
    id: 4,
    title: "AI Worksheet Generator",
    description:
      "Effortlessly create engaging worksheets with our AI.Specify a topic, and our tool generates customized, printable worksheets to enhance classroom learning!",
    href: "/worksheet-generator",
  },
  {
    id: 5,
    title: "PDF Chat",
    description:
      "Chat with your PDF documents effortlessly. Upload, ask questions, and get answers instantly using advanced AI-powered PDF analysis.",
    href: "/pdf-chat",
  },
  {
    id: 6,
    title: "AI Skill Assessment",
    description:
      "Evaluate skills effortlessly with our AI-powered tool. Generate personalized assessments to measure knowledge, track progress, and identify areas for improvement!",
    href: "/skill-assessment",
  },
  {
    id: 7,
    title: "Explore Careers",
    description:
      "Explore Careers analyzes your resume and suggests personalized career paths based on your skills, experience, and goals.",
    href: "/explore-careers",
  },
  // {
  //   id: 7,
  //   title: "NCERT",
  //   description: "The NCERT curriculum is based on the National Curriculum Framework (NCF) developed by the National Council of Educational Research and Training. The curriculum is designed to provide a comprehensive and holistic education to students from pre-primary to higher secondary levels",
  //   href: "/ncert",
  // },
];

const teacherOnlyTools = ["/lesson-plan-generator", "/worksheet-generator"];

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  const user = session.user;

  const { error, data } = await supabase
    .from("user_info")
    .select("id,profession")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error(error);
    // throw new Error(error.message);
  }

  const isRoleTeacher = data?.profession === "Teacher";

  const filteredTools = isRoleTeacher
    ? tools
    : tools.filter((navItem) => !teacherOnlyTools.includes(navItem.href ?? ""));

  return (
    <PageContainer scrollable>
      <h2 className="text-2xl font-bold mb-3">AI Tools</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredTools.map((tool, i) => (
          <div
            key={i}
            className="p-6 rounded-lg shadow bg-card text-card-foreground border border-border/60 flex flex-col justify-between"
          >
            <div>
              <Link href="#">
                <h5 className="mb-2 text-xl font-semibold tracking-tight ">
                  {tool.title}
                </h5>
              </Link>
              <p className="mb-3 font-normal text-muted-foreground">
                {tool.description}
              </p>
            </div>
            <Link
              href={tool.href}
              className={buttonVariants({ className: "w-fit" })}
            >
              Try It
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Page;
