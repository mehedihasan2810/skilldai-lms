import { format, formatDistance, subDays } from "date-fns";
export const formatDate = (date: string) => {
  const _date = new Date(date);

  return formatDistance(_date, new Date(), { addSuffix: true });
  //   return format(_date, "MMM d, y");
};
