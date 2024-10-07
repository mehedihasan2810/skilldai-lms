"use client"

import { notFound } from "next/navigation";
// import { allDocs } from "contentlayer/generated"

// import "@/styles/mdx.css"
import type { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

// import { siteConfig } from "@/config/site"
// import { getTableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils";
// import { Mdx } from "@/components/mdx-components"
// import { OpenInV0Cta } from "@/components/open-in-v0-cta"
// import { DocsPager } from "@/components/pager"
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardTableOfContents } from "@/components/toc";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import { CourseSidebarNav } from "@/components/sidebar-nav";
import { courseConfig, exampleCourse } from "@/config";
import Markdown from "@/components/markdown/markdown";
import { Separator } from "@/components/ui/separator";
import {  RadialProgress } from "@/components/circle-progres";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface DocPageProps {
  params: {
    courseSlug: string;
  };
}

// async function getDocFromParams({ params }: DocPageProps) {
//   const slug = params.slug?.join("/") || ""
//   const doc = allDocs.find((doc) => doc.slugAsParams === slug)

//   if (!doc) {
//     return null
//   }

//   return doc
// }

// export async function generateMetadata({
//   params,
// }: DocPageProps): Promise<Metadata> {
//   const doc = await getDocFromParams({ params })

//   if (!doc) {
//     return {}
//   }

//   return {
//     title: doc.title,
//     description: doc.description,
//     openGraph: {
//       title: doc.title,
//       description: doc.description,
//       type: "article",
//       url: absoluteUrl(doc.slug),
//       images: [
//         {
//           url: siteConfig.ogImage,
//           width: 1200,
//           height: 630,
//           alt: siteConfig.name,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: doc.title,
//       description: doc.description,
//       images: [siteConfig.ogImage],
//       creator: "@shadcn",
//     },
//   }
// }

// export async function generateStaticParams(): Promise<
//   DocPageProps["params"][]
// > {
//   return allDocs.map((doc) => ({
//     slug: doc.slugAsParams.split("/"),
//   }))
// }

export default  function DocPage({ params }: DocPageProps) {
  // const doc = await getDocFromParams({ params })

  // if (!doc) {
  //   notFound()
  // }

  // const toc = await getTableOfContents(doc.body.raw)

  console.log(params.courseSlug);

  const content = exampleCourse[0].sections.find(
    (section) => section.slug === params.courseSlug
  );

  return (
    <>
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-6 pr-6 lg:py-8">
          <CourseSidebarNav config={courseConfig} />
        </ScrollArea>
      </aside>
      <main 
      className="relative py-6 lg:py-8"
      // className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
      >

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full flex justify-center items-center bg-sky-800 text-xl font-bold">1</div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Chapter 1</p>
                <p>{content?.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div>0%</div>
                <div className="text-sm text-muted-foreground">
                 0/5 chapters
                </div>
              </div>
            {/* <RadialProgress/> */}
            <div className="size-8">
            <CircularProgressbar value={50} strokeWidth={12}  />
            </div>
            </div>
          </div>

          <Separator className="my-10"/>


        <div className="mx-auto w-full min-w-0">
          <Markdown text={content?.content} />

          {/* <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <div className="text-foreground">doc.title</div>
        </div> */}
          {/* <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
            doc.title
          </h1>
          {"doc.description" && (
            <p className="text-base text-muted-foreground">
              <Balancer>{"doc.description"}</Balancer>
            </p>
          )}
        </div> */}
          {/* {"doc.links" ? (
          <div className="flex items-center space-x-2 pt-4">
            {"doc.links?.doc" && (
              <Link
                href={"doc.links.doc"}
                target="_blank"
                rel="noreferrer"
                // className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
            {"doc.links?.api" && (
              <Link
                href={"doc.links.api"}
                target="_blank"
                rel="noreferrer"
                // className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                API Reference
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
          </div>
        ) : null} */}
          {/* <div className="pb-12 pt-8">
          code
          <Mdx code={doc.body.code} />
        </div> */}
          {/* <DocsPager doc={doc} /> */}
        </div>
        {/* <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] pt-4">
            <ScrollArea className="h-full pb-10">
              {doc.toc && <DashboardTableOfContents toc={toc} />}
              toc
              <OpenInV0Cta className="mt-6 max-w-[80%]" />
            </ScrollArea>
          </div>
        </div> */}
      </main>
    </>
  );
}

// import { ScrollArea } from "@/components/ui/scroll-area";
// import Link from "next/link";
// import React from "react";

// const Page = () => {
//   return (
//     <div>
//       <div className="border-b fixed left-0 top-0 bg-background w-full">
//         <div className="flex justify-between p-4 max-w-7xl  mx-auto">
//           <Link href="/">Skilld AI</Link>{" "}
//           <div>
//             <Link href="#">Courses</Link> <Link href="#">Courses</Link>
//           </div>
//         </div>
//       </div>

//       <div className="flex max-w-7xl mx-auto">
//         <ScrollArea className="h-screen border shrink-0">
//         <div className="flex flex-col gap-4 pt-16">
//           <Link href="#">Section 1</Link>
//           <Link href="#">Section 1</Link>
//           <Link href="#">Section 1</Link>
//           <Link href="#">Section 1</Link>
//           <Link href="#">Section 1</Link>
//         </div>
//         </ScrollArea>
//         <ScrollArea className="h-screen border pt-16 w-full grow">
//         <div className="border">
//           hello
//         </div>
//         </ScrollArea>
//       </div>
//     </div>
//   );
// };

// export default Page;
