import { createStyles, Divider, Box, Text, Avatar } from "@mantine/core";
import { MDXRemote } from "next-mdx-remote";

import { ContentData } from "~/lib";
import { calculateReadTime, parseDate } from "~/utils";

import { Code, EditableCode } from "~/components";

const components = {
  Code,
  EditableCode,
};

const useStyles = createStyles((theme) => ({
  description: {
    marginBottom: theme.spacing.md,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: theme.spacing.sm,
  },

  paragraph: {
    fontSize: theme.fontSizes.md,

    "@media (max-width: 755px)": {
      fontSize: theme.fontSizes.sm,
    },
  },

  alignEnd: {
    marginLeft: "auto",
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

interface MarkdownEntryProps {
  data: ContentData;
  showReadTime?: boolean;
}

export const MarkdownEntry = (properties: MarkdownEntryProps) => {
  const { data, showReadTime = false } = properties;
  const { classes } = useStyles();

  const { metadata, source, content } = data;
  const { title, date } = metadata;

  const readTime = calculateReadTime(content);

  const readTimeComponent = showReadTime ? (
    <Paragraph className={classes.alignEnd}>{readTime} min read</Paragraph>
  ) : null;

  return (
    <>
      <h1>{title}</h1>

      <Box className={classes.description}>
        <Avatar src="/images/profile.jpeg" size="sm" radius="lg" />
        <Paragraph>Morten Broesby-Olsen</Paragraph>
        <Paragraph>/</Paragraph>
        <Paragraph>{parseDate(date)}</Paragraph>

        {readTimeComponent}
      </Box>

      <Divider />

      <MDXRemote {...source} components={components} />
    </>
  );
};
