interface FooterProps {
  rights: string
}

export default function Footer({ rights }: FooterProps) {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-600">
        © {new Date().getFullYear()} My Home. {rights}
      </div>
    </footer>
  )
}
