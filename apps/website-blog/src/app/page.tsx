/* eslint-disable react/no-unescaped-entities */
import { Avatar, Page } from "@/components"

export default function RootPage() {
  return (
    <Page>
      <div className="container max-w-4xl py-2">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[auto,140px]">
          <div className="flex flex-col justify-center">
            <p className="my-2">
              Hey there 👋 - I'm{" "}
              <b className="font-semibold">Morten Broesby-Olsen</b>
            </p>

            <p className="my-2">
              <i>"A Danish guy with an international mindset"</i>
            </p>

            <p>
              I'm a software engineer with a passion for web technologies 🚀
            </p>

            <p>I love teaching and helping people, and learning new things.</p>

            <p className="my-2">I'm also a father and husband 👨‍👩‍👦.</p>
          </div>

          <div className="flex flex-col justify-center">
            <Avatar src="/images/profile.jpeg" alt="Me" className="w-full" />
          </div>
        </div>
      </div>
    </Page>
  )
}
