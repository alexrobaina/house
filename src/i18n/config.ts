export const defaultLocale = 'en'
export const locales = ['en', 'es'] as const
export type ValidLocale = typeof locales[number]

export const localeNames: Record<ValidLocale, string> = {
  en: 'English',
  es: 'Español',
}

export function isValidLocale(locale: string): locale is ValidLocale {
  return locales.includes(locale as ValidLocale)
}
