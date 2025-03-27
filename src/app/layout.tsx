import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { isValidLocale, defaultLocale } from '@/i18n/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Home',
  description: 'Comfortable spaces waiting for you.',
  // add image
  openGraph: {
    images: [
      {
        url: '/images/living/livingRoom1.jpeg',
      },
    ],
  },
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: Promise<{ lang?: string }>
}) {
  const resolvedParams = await params
  const lang =
    resolvedParams?.lang && isValidLocale(resolvedParams.lang)
      ? resolvedParams.lang
      : defaultLocale

  return (
    <html lang={lang} className={inter.className}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
