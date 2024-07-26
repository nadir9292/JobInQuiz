import { Button, Card, CardBody, Typography } from "@material-tailwind/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/24/solid"
import { XMarkIcon } from "@heroicons/react/24/outline"

const GenerateLink = (props) => {
  const { open, handleOpen, quiz, myProfile } = props
  const [quizSelect, setQuizSelect] = useState("")
  const [link, setLink] = useState("")
  const [copied, setCopied] = useState(false)

  const handleChangeQuiz = (event) => {
    setQuizSelect(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const context = {
      id_user: myProfile.id,
      quiz_id: quizSelect,
    }
    setLink(
      `http://localhost:3001/quiz?context=${btoa(JSON.stringify(context))}`
    )
  }

  return (
    <>
      {open ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 mb-32 h-screen backdrop-blur-sm">
          <motion.div
            className={"rounded-xl"}
            initial={popVariant.hidden}
            animate={popVariant.visible}
          >
            <Card className="h-screen bg-cover bg-pricing flex justify-between flex-col h-full w-96 md:w-128 rounded-xl shadow-xl relative py-10">
              <div className="flex w-full justify-end -mt-8">
                <Button className="bg-transparent" onClick={handleOpen}>
                  <XMarkIcon className="h-8 w-8 text-xl" />
                </Button>
              </div>
              <CardBody className="mx-4">
                <Typography className="font-passion text-3xl md:text-4xl text-zinc-100 text-center">
                  Generate your Quiz link
                </Typography>
                <form className="mx-2" onSubmit={handleFormSubmit}>
                  <Typography
                    variant="h6"
                    color="white"
                    className="py-2 font-montserrat font-bold text-left font-bold text-xl"
                  >
                    Select the quiz
                  </Typography>
                  <select
                    name="quizSelected"
                    onChange={handleChangeQuiz}
                    className="block w-full p-2 rounded-lg bg-transparent text-sm border border-2 text-zinc-100"
                  >
                    <option>select a quiz</option>
                    {Array.isArray(quiz.data) && quiz.data.length > 0 ? (
                      quiz.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.title}
                        </option>
                      ))
                    ) : (
                      <option></option>
                    )}
                  </select>
                  <Button
                    type="submit"
                    className="w-full my-8 bg-bluePrimary"
                    disabled={quizSelect === ""}
                  >
                    Generate
                  </Button>
                </form>
                <div
                  className={`flex items-center w-full  mx-auto ${
                    link === "" ? "hidden" : ""
                  }`}
                >
                  <input
                    value={link}
                    type="text"
                    readOnly={true}
                    name="responseAi"
                    className="text-zinc-100 text-sm bg-transparent flex-grow placeholder:text-white border border-2 p-3 rounded-lg mx-2"
                  />
                  <button
                    className="flex items-center mx-4"
                    onClick={() => {
                      navigator.clipboard.writeText(link)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }}
                  >
                    {copied ? (
                      <CheckIcon className="h-4 w-4 text-white" />
                    ) : (
                      <DocumentDuplicateIcon className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export const popVariant = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
  },
  transition: {
    type: "spring",
    stiffness: 150,
    damping: 150,
  },
}

export default GenerateLink
