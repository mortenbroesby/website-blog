import { FC } from "react";
import { Anchor, createStyles, Text } from "@mantine/core";
import NextLink from "next/link";

export interface LinkProps {
  title: string;
  href: string;
}

const useStyles = createStyles((theme) => ({
  link: {
    fontSize: 16,

    "@media (max-width: 755px)": {
      fontSize: 14,
    },
  },
}));

const Link: FC<LinkProps> = (properties) => {
  const { title, href, ...remainingProps } = properties;
  const { classes } = useStyles();

  return (
    <NextLink href={href}>
      <Anchor href={href} {...remainingProps}>
        <Text className={classes.link}>{title}</Text>
      </Anchor>
    </NextLink>
  );
};

export { Link };
