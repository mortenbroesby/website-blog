import Head from "next/head";
import { Container, Divider } from "@mantine/core";

import { Page } from "../../components/Page";
import { Breadcrumbs } from "../../components/Breadcrumbs";

import { getAllContentIds, getContentData, ContentData } from "../../lib/data";
import { MarkdownEntry } from "../../components/MarkdownEntry";

export default function Post({ data }: { data: ContentData }) {
  const { id, title } = data;

  return (
    <Page>
      <Head>
        <title>Morten Broesby-Olsen :: {title}</title>
      </Head>

      <Container pt={20} pb={20}>
        <Breadcrumbs
          items={[
            { title: "Home", href: "/" },
            { title: "Blog", href: "/blog" },
            { title: title, href: `/blog/${id}` },
          ]}
        />

        <Divider mt={20} mb={20} />

        <MarkdownEntry data={data} />
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
