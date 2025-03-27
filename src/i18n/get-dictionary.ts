import type { ValidLocale } from './config'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: ValidLocale) =>
  dictionaries[locale]()
