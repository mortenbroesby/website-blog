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
    title: "About me",
    href: "/about-me",
  },
  {
    title: "Uses",
    href: "/uses",
  },
];
