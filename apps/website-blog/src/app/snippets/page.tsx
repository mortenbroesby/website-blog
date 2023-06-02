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

  const targetDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)]

  return (
    <Page>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 text-center">
        <div className="flex-1 space-y-4">
          <h1>Snippets</h1>

          <p className="text-l italic text-muted-foreground">
            {targetDescription}
          </p>
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

const descriptions = [
  "Exploring the world of programming with informative code snippets.",
  "Unlocking the power of coding through practical code examples.",
  "Discover useful programming techniques with concise code snippets.",
  "Enhance your coding skills with insightful code examples.",
  "Practical examples and tips for efficient programming.",
  "Learn by example: Explore practical code snippets to deepen your programming knowledge.",
  "Get inspired by real-world code snippets for practical programming insights.",
  "Unveiling effective coding practices through informative code snippets.",
  "Explore the intricacies of programming through illustrative code examples.",
  "Discover concise and actionable code snippets that enhance your programming expertise.",
]
