import { notFound } from "next/navigation"
import { Author, Mdx, Page } from "@/components"
import { allAuthors, allPages } from "contentlayer/generated"

import "@/styles/mdx.css"

import { Metadata } from "next"
import { formatDate } from "@/utils"

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params) {
  const slug = params?.slug?.join("/")
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  const authors = page.authors
    .map((author) =>
      allAuthors.find(({ slug }) => slug === `/authors/${author}`)
    )
    .filter(Boolean) as (typeof allAuthors)[number][]

  return (
    <Page>
      <div className="text-center">
        <h1>{page.title}</h1>

        {page.date && (
          <time
            dateTime={page.date}
            className="text-muted-foreground block text-sm my-2"
          >
            Updated on {formatDate(page.date)}
          </time>
        )}

        {authors?.length ? (
          <div className="mt-4">
            {authors.map((author) => (
              <Author author={author} key={author._id} />
            ))}
          </div>
        ) : null}
      </div>

      <hr className="mt-6 mb-8" />

      <Mdx code={page.body.code} />
    </Page>
  )
}
