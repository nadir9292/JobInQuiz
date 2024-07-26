import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <hr className="w-48 md:w-192 h-px mt-2 mx-auto bg-white border-0 rounded md:my-2 " />
      <Link href="/">
        <p className="text-white md:text-lg hover:scale-110 hover:text-blue-400 text-md text-center font-montserrat md:-mb-12 -mb-8 text-shadow-lg shadow-gray-900/50 underline">
          About us
        </p>
      </Link>
    </footer>
  )
}

export default Footer
