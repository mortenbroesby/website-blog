import Link from "next/link";
import { Card as MantineCard, createStyles, Text } from "@mantine/core";
import { Date } from "~/components";

const useStyles = createStyles((theme) => ({
  card: {
    cursor: "pointer",
    width: "100%",
  },
}));

export const Card = ({ title, href, date }) => {
  const { classes } = useStyles();

  return (
    <Link href={href}>
      <MantineCard shadow="sm" p="xl" className={classes.card}>
        <Text weight={600} size="lg">
          {title}
        </Text>

        <Date dateString={date} />
      </MantineCard>
    </Link>
  );
};
