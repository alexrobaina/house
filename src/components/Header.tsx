'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { locales, localeNames, type ValidLocale } from '@/i18n/config'

interface HeaderProps {
  title: string
  subtitle: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const params = useParams()
  const currentLang = params.lang as ValidLocale

  return (
    <header className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Language switcher */}
        <div className="flex justify-end mb-4 space-x-2">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                currentLang === locale
                  ? 'bg-white text-blue-500'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {localeNames[locale]}
            </Link>
          ))}
        </div>

        {/* Title and subtitle */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">{title}</h1>
          <p className="text-xl">{subtitle}</p>
        </div>
      </div>
    </header>
  )
}
