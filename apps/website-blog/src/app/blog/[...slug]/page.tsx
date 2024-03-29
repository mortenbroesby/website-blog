import { notFound } from "next/navigation"
import { buttonVariants, Mdx } from "@/components"
import { allAuthors, allPosts } from "contentlayer/generated"

import "@/styles/mdx.css"

import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Author, Page } from "@/components"
import { cn, formatDate } from "@/utils"
import { HitCounter } from "~/src/components"
import ErrorBoundary from "~/src/components/error-boundary"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

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
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors
    .map((author) =>
      allAuthors.find(({ slug }) => slug === `/authors/${author}`)
    )
    .filter(Boolean) as (typeof allAuthors)[number][]

  return (
    <Page>
      <div className="text-center">
        <h1>{post.title}</h1>

        <div className="flex flex-row text-center justify-center items-center my-2">
          <p className="text-muted-foreground text-sm">
            {formatDate(post.date)}
          </p>
        </div>

        {authors?.length ? (
          <div className="mt-4">
            {authors.map((author) => (
              <Author author={author} key={author._id} />
            ))}
          </div>
        ) : null}
      </div>

      <hr className="mt-6 mb-8" />

      <Mdx code={post.body.code} />

      <hr className="mt-12" />

      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          See all posts
        </Link>
      </div>

      <div className="flex justify-center">
        <ErrorBoundary>
          <HitCounter slug={post.slugAsParams} trackView />
        </ErrorBoundary>
      </div>
    </Page>
  )
}
