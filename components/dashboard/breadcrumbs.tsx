import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { ChevronRight, Slash } from "lucide-react";
  import { Fragment } from "react";
  import { cn } from "@/lib/utils";
  
  type BreadcrumbItemProps = {
    title: string;
    link: string;
  };
  
  export function Breadcrumbs({
    items,
    currentStep,
  }: {
    items: BreadcrumbItemProps[];
    currentStep?: string;
  }) {
    console.log({ currentStep });
  
    const activeItem = currentStep ? "Create agent" : "Create organization";
  
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <Fragment key={item.title}>
              {/* {true && ( */}
              <BreadcrumbItem
                className={cn("text-base", {
                  "text-primary": activeItem === item.title,
                })}
              >
                {currentStep && item.title === "Create organization" && "✔"}
                {item.title}
                {/* <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink> */}
              </BreadcrumbItem>
              {/* )} */}
              {index < items.length - 1 && (
                <BreadcrumbSeparator className="[&>svg]:size-4" />
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  