import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Home',
  description: 'Comfortable spaces waiting for you.',
}

interface LayoutProps {
  children: React.ReactNode
  params: { lang: string }
}

export default function Layout({ children }: LayoutProps) {
  return children
}
