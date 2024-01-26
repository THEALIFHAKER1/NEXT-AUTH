import { siteConfig } from "@/config/site"

interface HeaderProps {
  label: string
}

export default function Header({ label }: HeaderProps) {
  return (
    <header
      className={"flex w-full flex-col items-center justify-center gap-y-4"}
    >
      <h1 className={"text-3xl font-semibold"}>{"🔐" + siteConfig.name}</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </header>
  )
}
