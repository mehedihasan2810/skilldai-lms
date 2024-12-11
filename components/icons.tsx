import { AreaChart, ArrowRight, Book, BookOpenCheck, GraduationCap, LucideIcon, Plus, ShieldQuestion } from "lucide-react";

export type Icon = LucideIcon;


type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  plus: Plus,
  book: Book,
  arrowRight: ArrowRight,
  chartArea: AreaChart,
  bookOpen: BookOpenCheck,
  shieldQuestion: ShieldQuestion,
  graduationCap: GraduationCap
}