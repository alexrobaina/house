import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { isValidLocale, defaultLocale } from '@/i18n/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Home',
  description: 'Comfortable spaces waiting for you.',
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: { lang?: string }
}) {
  const lang =
    params?.lang && isValidLocale(params.lang) ? params.lang : defaultLocale

  return (
    <html lang={lang} className={inter.className}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
