import Link from "next/link";
import { ActionIcon, Box, createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  avatar: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export const AvatarLink = ({ children, href, ...properties }) => {
  const { classes } = useStyles();

  return (
    <Link href={href}>
      <ActionIcon {...properties}>
        <Box className={classes.avatar}>{children}</Box>
      </ActionIcon>
    </Link>
  );
};
