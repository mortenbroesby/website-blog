import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  blockQuote: {
    fontSize: "inherit !important",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
  },
  message: {
    fontSize: "inherit !important",
  },

  citation: {
    "&:before": {
      WebkitFontSmoothing: "antialiased",
      marginRight: "0.25em",
    },

    fontSize: "inherit !important",
    fontStyle: "normal",
    fontWeight: "700",
    color: `${
      theme.colorScheme === "dark" ? theme.white : theme.colors.dark[3]
    }!important`,
  },
}));

export const BlockQuote = ({ children, citation, ...properties }) => {
  const { classes } = useStyles();

  return (
    <blockquote className={classes.blockQuote} {...properties}>
      {children}
      <cite
        className={classes.citation}
        dangerouslySetInnerHTML={{ __html: citation }}
      />
    </blockquote>
  );
};
