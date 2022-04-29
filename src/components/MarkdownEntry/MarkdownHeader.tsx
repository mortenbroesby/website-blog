import { Box, Avatar, Text, createStyles } from "@mantine/core";

import { parseDate } from "~/utils";

const useStyles = createStyles((theme) => ({
  description: {
    marginBottom: theme.spacing.md,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: theme.spacing.sm,

    "@media (max-width: 755px)": {
      minWidth: "100%",
      flexWrap: "wrap",
    },
  },

  paragraph: {
    fontSize: theme.fontSizes.md,

    "@media (max-width: 755px)": {
      fontSize: theme.fontSizes.sm,
    },
  },

  alignEnd: {
    marginLeft: "auto",

    "@media (max-width: 755px)": {
      minWidth: "100%",
    },
  },

  separator: {
    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  date: {
    "@media (max-width: 755px)": {
      minWidth: "100%",
    },
  },
}));

const Paragraph = ({ children, ...remainingProps }) => {
  const { classes } = useStyles();

  return (
    <Text className={classes.paragraph} {...remainingProps}>
      {children}
    </Text>
  );
};

export const MarkdownHeader = ({ date, children }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.description}>
      <Avatar src="/images/profile.jpeg" size="sm" radius="lg" />
      <Paragraph>Morten Broesby-Olsen</Paragraph>
      <Paragraph className={classes.separator}>/</Paragraph>
      <Paragraph className={classes.date}>{parseDate(date)}</Paragraph>

      {children}
    </Box>
  );
};
