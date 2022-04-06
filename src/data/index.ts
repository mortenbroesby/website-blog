export interface PageProps {
  title: string;
  href: string;
}

export const availablePages: PageProps[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Snippets",
    href: "/snippets",
  },
];
