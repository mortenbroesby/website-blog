import { FC } from "react";
import { Anchor } from "@mantine/core";
import Link from "next/link";

export interface LinkProps {
  title: string;
  href: string;
}

const LinkComponent: FC<LinkProps> = (properties) => {
  const { title, href, ...remainingProps } = properties;

  return (
    <Link href={href}>
      <Anchor href={href} {...remainingProps}>
        {title}
      </Anchor>
    </Link>
  );
};

export { LinkComponent as Link };
