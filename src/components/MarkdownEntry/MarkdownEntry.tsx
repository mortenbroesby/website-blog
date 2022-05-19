import { createStyles, Divider, Text } from "@mantine/core";
import { MDXRemote } from "next-mdx-remote";

import { ContentData } from "~/lib";
import { calculateReadTime } from "~/utils";

import { Code, EditableCode, BlockQuote } from "~/components";

import { MarkdownHeader } from "./MarkdownHeader";

const components = {
  Code,
  EditableCode,
  BlockQuote,
};

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

      <MarkdownHeader date={date}>{readTimeComponent}</MarkdownHeader>

      <Divider />

      <MDXRemote {...source} components={components} />
    </>
  );
};
