import * as React from "react"
import { useMDXComponent } from "next-contentlayer/hooks"

const components = {
  h1: ({ className, ...props }) => <h1 {...props} />,
  h2: ({ className, ...props }) => <h2 {...props} />,
  h3: ({ className, ...props }) => <h3 {...props} />,
  h4: ({ className, ...props }) => <h4 {...props} />,
  h5: ({ className, ...props }) => <h5 {...props} />,
  h6: ({ className, ...props }) => <h6 {...props} />,
  a: ({ className, ...props }) => <a {...props} />,
  p: ({ className, ...props }) => <p {...props} />,
  ul: ({ className, ...props }) => <ul {...props} />,
  ol: ({ className, ...props }) => <ol {...props} />,
  li: ({ className, ...props }) => <li {...props} />,
  blockquote: ({ className, ...props }) => <blockquote {...props} />,
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div>
      <table {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props} />
  ),
  th: ({ className, ...props }) => <th {...props} />,
  td: ({ className, ...props }) => <td {...props} />,
  pre: ({ className, ...props }) => <pre {...props} />,
  code: ({ className, ...props }) => <code {...props} />,
  BlockQuote: ({ className, ...props }) => <blockquote {...props} />,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component: any = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
