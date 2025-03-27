import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { isValidLocale, defaultLocale } from '@/i18n/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Home',
  description: 'Comfortable spaces waiting for you.',
  openGraph: {
    title: 'My Home - Comfortable Living Spaces',
    description:
      'Explore our comfortable and well-equipped living spaces, perfect for your stay.',
    images: [
      {
        url: '/images/living/livingRoom1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Main Living Room',
      },
      {
        url: '/images/living/livingRoom2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Family Living Area',
      },
      {
        url: '/images/living/livingRoom3.jpeg',
        width: 1200,
        height: 630,
        alt: 'TV Room',
      },
    ],
    locale: 'en_US',
    type: 'website',
    siteName: 'My Home',
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
