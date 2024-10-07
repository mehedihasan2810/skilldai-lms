"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "./ui";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { courseConfig } from "@/config";
import Image from "next/image";
import { getSectionsByCourseId } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const sectionId = searchParams.get("section");

  console.log({ sectionId });

  const params = useParams<{ courseSlug: string }>();

  console.log({ params });

  const {
    data: courseSections,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["sections", params.courseSlug],
    queryFn: async () => await getSectionsByCourseId(params.courseSlug),
  });

  console.log({ courseSections });

  const sectionLinkJsx = error ? (
    <p>Something went wrong!</p>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    courseSections!.map((section, index) => (
      <Link
        onClick={() => {
          setOpen(false);
        }}
        title={section.title}
        key={index}
        href={`/course/${params.courseSlug}/?section=${section.id}`}
        className={cn(
          "group flex gap-2 sections-center rounded-md  px-3 py-2 hover:bg-secondary hover:text-secondary-foreground mr-4",
          { "bg-secondary": section.id === sectionId }
          // section.disabled && "cursor-not-allowed opacity-60",
          // pathname === section.href
          //   ? "font-medium text-foreground"
          //   : "text-muted-foreground"
        )}
        // target={section.external ? "_blank" : ""}
        // rel={section.external ? "noreferrer" : ""}
      >
        <div className="p-2 rounded-full bg-sky-800 size-7 flex justify-center items-center text-sm">
          {index + 1}
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Chapter {index + 1}</p>
          <p className="text-sm">
            {section.title.split("").length > 18
              ? `${section.title.slice(0, 18)}...`
              : section.title}
          </p>
        </div>

        {/* {item.label && (
        <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
          {item.label}
        </span>
      )} */}
      </Link>
      // <MobileLink
      //   key={section.id}
      //   href={`/course/${params.courseSlug}/?section=${section.id}`}
      //   onOpenChange={setOpen}
      //   className="hover:bg-secondary hover:text-secondary-foreground px-4 rounded-md py-2 mr-2"
      // >
      //   {section.title}
      // </MobileLink>
    ))
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 pt-20">
        <MobileLink
          href="/"
          className="flex items-center gap-2"
          onOpenChange={setOpen}
        >
          <Image
            src="/skilld-logo.png"
            alt="Skilld logo"
            width={30}
            height={30}
          />
          {/* <Icons.logo className="mr-2 h-4 w-4" /> */}
          <span className="font-bold text-lg">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">{sectionLinkJsx}</div>
          {/* <div className="flex flex-col space-y-2">
            {courseConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className="text-muted-foreground"
                          >
                            {item.title}
                            {item.label && (
                              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                {item.label}
                              </span>
                            )}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div> */}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
