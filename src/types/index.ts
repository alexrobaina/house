export interface Photo {
  name: string
  src: string
}

export interface Space {
  title: string
  description: string
  photos: Photo[]
}

export interface Dictionary {
  home: {
    welcome: string
    subtitle: string
    contact: string
    address: string
  }
  spaces: {
    bedrooms: {
      title: string
      description: string
      items: {
        main?: string
        second?: string
        guest?: string
      }
    }
    bathrooms: {
      title: string
      description: string
      items: {
        main: string
      }
    }
    kitchen: {
      title: string
      description: string
      items: {
        main: string
        dining: string
      }
    }
    livingRoom: {
      title: string
      description: string
      items: {
        main: string
        family?: string
        tv?: string
      }
    }
    patio: {
      title: string
      description: string
      items: {
        main: string
      }
    }
  }
  footer: {
    rights: string
  }
}
