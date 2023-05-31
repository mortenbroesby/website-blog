import { notFound } from "next/navigation"
import { buttonVariants, Mdx } from "@/components"
import { allAuthors, allPosts, allSnippets } from "contentlayer/generated"

import "@/styles/mdx.css"

import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Author, Page } from "@/components"
import { cn, formatDate } from "@/utils"

interface SnippetPageProps {
  params: {
    slug: string[]
  }
}

async function getSnippetFromParams(params) {
  const slug = params?.slug?.join("/")
  const post = allSnippets.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: SnippetPageProps): Promise<Metadata> {
  const post = await getSnippetFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
  }
}

export async function generateStaticParams(): Promise<
  SnippetPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: SnippetPageProps) {
  const snippet = await getSnippetFromParams(params)

  if (!snippet) {
    notFound()
  }

  const authors = snippet.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <Page>
      <div className="text-center">
        <h1>{snippet.title}</h1>

        {snippet.date && (
          <time
            dateTime={snippet.date}
            className="text-muted-foreground block text-sm my-2"
          >
            Published on {formatDate(snippet.date)}
          </time>
        )}

        {authors?.length ? (
          <div className="mt-4">
            {authors.map((author) =>
              author ? <Author author={author} /> : null
            )}
          </div>
        ) : null}
      </div>

      <hr className="mt-6 mb-8" />

      <Mdx code={snippet.body.code} />

      <hr className="mt-12" />

      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/snippets"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          See all snippets
        </Link>
      </div>
    </Page>
  )
}
