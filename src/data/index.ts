export interface PageProps {
  title: string;
  href: string;
}

export const AVAILABLE_PAGES: PageProps[] = [
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
  {
    title: "Uses",
    href: "/uses",
  },
];
