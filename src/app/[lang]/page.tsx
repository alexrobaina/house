import { ValidLocale, defaultLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { Space } from '@/types'
import ClientPage from '@/app/[lang]/client-page'

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as ValidLocale
  const dict = await getDictionary(locale || defaultLocale)

  const spaces: Space[] = [
    {
      title: dict.spaces.livingRoom.title,
      description: dict.spaces.livingRoom.description,
      photos: [
        {
          name: dict.spaces.livingRoom.items.main,
          src: '/images/living/livingRoom1.jpeg',
        },
        {
          name: dict.spaces.livingRoom.items.main || '',
          src: '/images/living/livingRoom2.jpeg',
        },
        {
          name: dict.spaces.livingRoom.items.main || '',
          src: '/images/living/livingRoom3.jpeg',
        },
      ],
    },
    {
      title: dict.spaces.patio.title,
      description: dict.spaces.patio.description,
      photos: [
        {
          name: dict.spaces.patio.items.main,
          src: '/images/patio/patio1.jpeg',
        },
      ],
    },
    {
      title: dict.spaces.bedrooms.title,
      description: dict.spaces.bedrooms.description,
      photos: [
        {
          name: dict.spaces.bedrooms.items.main || 'Bedroom',
          src: '/images/bedrooms/bedroom.jpeg',
        },
        {
          name: dict.spaces.bedrooms.items.main || 'Bedroom',
          src: '/images/bedrooms/bedroom2.jpeg',
        },
        {
          name: dict.spaces.bedrooms.items.main || 'Bedroom',
          src: '/images/bedrooms/bedroom3.jpeg',
        },
      ],
    },
    {
      title: dict.spaces.bathrooms.title,
      description: dict.spaces.bathrooms.description,
      photos: [
        {
          name: dict.spaces.bathrooms.items.main,
          src: '/images/bathrooms/bathroom.jpeg',
        },
        {
          name: dict.spaces.bathrooms.items.main,
          src: '/images/bathrooms/bathroom1.jpeg',
        },
        {
          name: '',
          src: '/images/bathrooms/bathroom2.jpeg',
        },
      ],
    },
    {
      title: dict.spaces.kitchen.title,
      description: dict.spaces.kitchen.description,
      photos: [
        {
          name: dict.spaces.kitchen.items.main,
          src: '/images/kitchen/kitchen.jpeg',
        },
        {
          name: dict.spaces.kitchen.items.dining,
          src: '/images/kitchen/kitchen2.jpeg',
        },
        {
          name: dict.spaces.kitchen.items.dining,
          src: '/images/kitchen/kitchen3.jpeg',
        },
        {
          name: dict.spaces.kitchen.items.dining,
          src: '/images/kitchen/kitchen4.jpeg',
        },
      ],
    },
  ]

  return <ClientPage dict={dict} spaces={spaces} />
}
