import Image from "next/image";
import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: "50%",

    minWidth: 200,
    minHeight: 200,
    [theme.fn.smallerThan("sm")]: {
      minWidth: 160,
      minHeight: 160,
    },
  },

  image: {
    position: "relative",
    borderRadius: "50%",

    minWidth: 200,
    minHeight: 200,
    [theme.fn.smallerThan("sm")]: {
      minWidth: 160,
      minHeight: 160,
    },
  },
}));

export const Avatar = ({ src, alt, ...properties }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.image} {...properties}>
      <Image className={classes.image} src={src} alt={alt} layout="fill" />
    </div>
  );
};
