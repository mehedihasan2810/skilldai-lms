"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { CourseConfig, exampleCourse } from "@/config";
import { SidebarNavItem } from "@/types/nav";
import { useCourseTrackStore } from "@/lib/stores/course-store";
import { Check } from "lucide-react";


const sidebarNavs = [
  {
    title: "Introduction",
    href: "/docs",
    items: [],
  },
  {
    title: "Installation",
    href: "/docs/installation",
    items: [],
  },
  {
    title: "components.json",
    href: "/docs/components-json",
    items: [],
  },
  {
    title: "Theming",
    href: "/docs/theming",
    items: [],
  },
  {
    title: "Dark mode",
    href: "/docs/dark-mode",
    items: [],
  },
  {
    title: "CLI",
    href: "/docs/cli",
    label: "Updated",
    items: [],
  },
  {
    title: "Typography",
    href: "/docs/components/typography",
    items: [],
  },
  {
    title: "Open in v0",
    href: "/docs/v0",
    items: [],
    label: "New",
  },
  {
    title: "Figma",
    href: "/docs/figma",
    items: [],
  },
  {
    title: "Changelog",
    href: "/docs/changelog",
    items: [],
  },
];

export interface CourseSidebarNavProps {
  config: CourseConfig;
  courseId: string;
  courseSections: any[];
  currentSectionId: string;
  userId: string;
}

export function CourseSidebarNav({
  config,
  courseId,
  courseSections,
  currentSectionId,
  userId,
}: CourseSidebarNavProps) {
  const pathname = usePathname();

  const items = pathname?.startsWith("/charts")
    ? config.chartsNav
    : config.sidebarNav;

  // console.log({ courseSidenavs });

  const data = useCourseTrackStore((state) => state);

  // console.log(data.bears);

  // console.log({ courseSections });

  return items.length ? (
    <div className="w-full">
      {/* {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && ( */}
      <CourseSidebarNavItems
        courseId={courseId}
        items={courseSections}
        pathname={pathname}
        currentSectionId={currentSectionId}
        userId={userId}
      />
      {/* )}
        </div>
      ))} */}
    </div>
  ) : null;
}

interface CourseSidebarNavItemsProps {
  items: any[];
  pathname: string | null;
  courseId: string;
  currentSectionId: string;
  userId: string;
}

export function CourseSidebarNavItems({
  items,
  pathname,
  courseId,
  currentSectionId,
  userId,
}: CourseSidebarNavItemsProps) {


  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max gap-2 ">
      {items.map(
        (item, index) => (
          // item.href && !item.disabled ? (
          <Link
            title={item.title}
            key={index}
            href={`/course/${courseId}/?section=${item.id}`}
            className={cn(
              "group flex gap-2 items-center rounded-md  px-3 py-2 hover:bg-secondary hover:text-secondary-foreground ",
              { "bg-secondary": item.id === currentSectionId }
              // item.disabled && "cursor-not-allowed opacity-60",
              // pathname === item.href
              //   ? "font-medium text-foreground"
              //   : "text-muted-foreground"
            )}
            // target={item.external ? "_blank" : ""}
            // rel={item.external ? "noreferrer" : ""}
          >
            <div className="p-2 rounded-full bg-sky-800 size-7 flex justify-center items-center text-sm text-white dark:text-foreground">
              {/* {index + 1} */}
              {item.completed_users.includes(userId) ? <Check className="font-bold" /> : index + 1}
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Chapter {index + 1}
              </p>
              <p className="text-sm">
                {item.title.split("").length > 18
                  ? `${item.title.slice(0, 18)}...`
                  : item.title}
              </p>
            </div>

            {/* {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )} */}
          </Link>
        )
        // ) : (
        //   <span
        //     key={index}
        //     className={cn(
        //       "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
        //       item.disabled && "cursor-not-allowed opacity-60"
        //     )}
        //   >
        //     {item.title}
        //     {item.label && (
        //       <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
        //         {item.label}
        //       </span>
        //     )}
        //   </span>
        // )
      )}
    </div>
  ) : null;
}

const courseSidenavs = exampleCourse[0].sections.map((section) => {
  return {
    title: section.title,
    href: `/course/${section.slug}`,
    // href: `/course/${section.title.replaceAll(" ", "-")}-${uid.rnd()}`,
    items: [],
  };
});
