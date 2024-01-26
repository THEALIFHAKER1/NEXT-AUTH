import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "NEXT AUTH",
  author: "THEALIFHAKER1",
  description:
    "A simple authentication system using Next.js, AuthJS, React, Tailwind CSS, and shadcn/ui.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://next-auth/ae1.pro",
  },
  links: {
    github: "https://github.com/THEALIFHAKER1/NEXT-AUTH",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
