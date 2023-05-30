import { notFound } from "next/navigation"
import { buttonVariants, Mdx } from "@/components"
import { allAuthors, allPosts } from "contentlayer/generated"

import "@/styles/mdx.css"

import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Author, Page } from "@/components"
import { cn, formatDate } from "@/utils"
import { env } from "~/env.mjs"

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

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <Page>
      <div className="text-center">
        <h1>{post.title}</h1>

        {post.date && (
          <time
            dateTime={post.date}
            className="text-muted-foreground block text-sm my-2"
          >
            Published on {formatDate(post.date)}
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

      <Mdx code={post.body.code} />

      <hr className="mt-12" />

      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          See all posts
        </Link>
      </div>
    </Page>
  )
}
