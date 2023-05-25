import { parseISO, format } from "date-fns";

export function parseDate(dateString: string) {
  const date = parseISO(dateString);
  const formattedDate = format(date, "LLLL d, yyyy");
  return formattedDate;
}
