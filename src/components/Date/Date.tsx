import { Text } from "@mantine/core";

import { parseISO, format } from "date-fns";

export function Date({ dateString }) {
  const date = parseISO(dateString);
  const formattedDate = format(date, "LLLL d, yyyy");

  return <Text>{formattedDate}</Text>;
}
