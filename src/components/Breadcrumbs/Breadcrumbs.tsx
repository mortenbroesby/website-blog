import { FC } from "react";
import { Breadcrumbs } from "@mantine/core";

import { Link, LinkProps } from "~/components";

interface BreadcrumbProps {
  items: LinkProps[];
}

const BreadcrumbsComponent: FC<BreadcrumbProps> = (properties) => {
  const { items, ...remainingProps } = properties;

  const mappedBreadcrumbs = items.map((item, index) => {
    const { title, href } = item;

    return <Link title={title} href={href} key={index} />;
  });

  return (
    <Breadcrumbs separator="→" {...remainingProps}>
      {mappedBreadcrumbs}
    </Breadcrumbs>
  );
};

export { BreadcrumbsComponent as Breadcrumbs };
