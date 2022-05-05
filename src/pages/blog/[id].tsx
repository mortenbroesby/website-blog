import Head from "next/head";
import { Container, Divider } from "@mantine/core";

import { getAllContentIds, getContentData, ContentData } from "~/lib";
import { Page, Breadcrumbs, MarkdownEntry } from "~/components";

export default function Post({ data }: { data: ContentData }) {
  const { id, metadata } = data;
  const { title } = metadata;

  return (
    <Page>
      <Head>
        <title>Morten Broesby-Olsen :: {title}</title>
      </Head>

      <Container pt={20} pb={20}>
        <Breadcrumbs
          items={[
            { title: "Home", href: "/" },
            { title: "Tech Blog", href: "/blog" },
            { title: title, href: `/blog/${id}` },
          ]}
        />

        <Divider mt={20} mb={20} />

        <MarkdownEntry data={data} showReadTime />
      </Container>
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = getAllContentIds("posts");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getContentData("posts", params.id);

  return {
    props: {
      data,
    },
  };
}
