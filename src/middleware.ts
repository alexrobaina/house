import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, locales, type ValidLocale } from './i18n/config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for image files and other static assets
  if (pathname.startsWith('/images/') || 
      pathname.startsWith('/_next/') || 
      pathname.includes('.')) {
    return
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || defaultLocale
  const validLocale = locales.includes(locale as ValidLocale) ? locale : defaultLocale

  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(
    new URL(`/${validLocale}${pathname}`, request.url)
  )
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next|images|favicon.ico).*)',
  ],
}
