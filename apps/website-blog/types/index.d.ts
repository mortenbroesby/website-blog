export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type NavConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}
