import Link from "next/link"

export default function Page() {
  return (
    <div>
      <h1>To infinity and beyond!</h1>
      <Link href="/blog">
        <b>Go to Blog</b>
      </Link>
    </div>
  )
}
