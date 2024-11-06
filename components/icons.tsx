import { AreaChart, ArrowRight, Book, LucideIcon, Plus } from "lucide-react";

export type Icon = LucideIcon;


type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  plus: Plus,
  book: Book,
  arrowRight: ArrowRight,
  chartArea: AreaChart
}