import { format, parseISO } from "date-fns"

export function parseDate(dateString: string) {
  const date = parseISO(dateString)
  const formattedDate = format(date, "LLLL d, yyyy")
  return formattedDate
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
