import { motion } from "framer-motion"
import { Button, Card } from "@material-tailwind/react"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

const InfoJobinquiz = (props) => {
  const { openInfo } = props

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: openInfo ? 1 : 0, y: openInfo ? 0 : 50 }}
      transition={{ duration: 0.6 }}
      className={`mt-8 mx-auto w-full ${openInfo ? "block" : "hidden"}`}
    >
      <Card className="bg-transparent m-2">
        <div className="ml-4 md:ml-32 w-72">
          <h1 className="text-zinc-100 text-2xl md:text-35xl w-96 md:w-150 py-4 text-pretty">
            Discover "Job'in Quiz" – streamline your hiring with customizable
            quizzes. Create an account, generate quiz links, and get instant
            candidate results. Simplify recruitment now!
          </h1>
          <Link href="/register">
            <Button className="flex items-center justify-center bg-transparent border border-2 w-72">
              Go to register
              <span>
                <ArrowRightEndOnRectangleIcon className="h-10 w-10 mx-4" />
              </span>
            </Button>
          </Link>
        </div>
        <div className="ml-4 md:ml-32">
          <h1 className="text-zinc-100 text-4xl font-bold mt-48">
            Why Job'in quiz?{" "}
          </h1>
          <h1 className="text-zinc-100 text-2xl md:text-35xl w-96 md:w-150 py-4 text-pretty">
            Traditional hiring methods are often rigid and inefficient. Job'in
            Quiz offers dynamic, customizable quizzes that adapt to real-world
            skills and scenarios, providing accurate candidate assessments.
            Simplify your recruitment process and find the perfect fit for your
            team with Job'in Quiz.
          </h1>
          <Link href="/pricing">
            <Button className="flex items-center justify-center bg-transparent border border-2 w-72">
              Try now
              <span className="mx-4 font-bold ">$</span>
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

export default InfoJobinquiz
