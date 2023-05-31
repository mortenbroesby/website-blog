import Link from "next/link"
import { Page } from "@/components"
import { formatDate } from "@/utils"
import { allSnippets } from "contentlayer/generated"
import { compareDesc } from "date-fns"

export const metadata = {
  title: "Snippets",
}

export default async function SnippetPage() {
  const snippets = allSnippets
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <Page>
      <div className="flex flex-row items-start gap-4 text-center">
        <div className="flex-1 space-y-4">
          <h1>Snippets</h1>
        </div>
      </div>

      <hr className="my-8" />

      {snippets?.length ? (
        <div className="grid gap-10">
          {snippets.map((snippet) => (
            <article
              key={snippet._id}
              className="group relative flex flex-col space-y-2"
            >
              <h2>{snippet.title}</h2>

              {snippet.description && (
                <p className="text-muted-foreground">{snippet.description}</p>
              )}

              {snippet.date && (
                <p className="text-muted-foreground text-sm">
                  {formatDate(snippet.date)}
                </p>
              )}

              <Link href={snippet.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No snippets published.</p>
      )}
    </Page>
  )
}
