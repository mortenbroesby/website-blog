import { notFound } from "next/navigation"
import { Mdx, Page } from "@/components"
import { allPages } from "contentlayer/generated"

import "@/styles/mdx.css"

import { Metadata } from "next"

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

  return (
    <Page>
      <div className="container max-w-4xl py-2">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="font-heading mt-2 inline-block text-3xl leading-tight">
              {page.title}
            </h1>
          </div>
        </div>

        <hr />

        <Mdx code={page.body.code} />
      </div>
    </Page>
  )
}
