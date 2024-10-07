import { CourseSidebarNav } from "@/components/sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { courseConfig } from "@/config"

interface CourseLayoutProps {
  children: React.ReactNode
}

export default function CourseLayout({ children }: CourseLayoutProps) {
  return (
    <div className="border-b">
      <div className="max-w-6xl mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        {/* <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <CourseSidebarNav config={courseConfig} />
          </ScrollArea>
        </aside> */}
        {children}
      </div>
    </div>
  )
}