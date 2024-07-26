import {
  Button,
  Typography,
  Checkbox,
  Input,
  Card,
} from "@material-tailwind/react"
import axios from "axios"
import { useState } from "react"
import Popup from "../Popup"
import {
  DocumentDuplicateIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"

const CreateQuestionClassic = (props) => {
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const [openAiDialog, setOpenAiDialog] = useState(false)
  const { levels, domains, jwt, changeIsError } = props
  const [copied, setCopied] = useState(false)
  const [responseAi, setResponseAi] = useState("")
  const [themeSelected, setThemeSelected] = useState("hasard")
  const [levelSelected, setLevelSelected] = useState("hasard")
  const [positivPopup, setPositivPopup] = useState(false)

  const handleChangeTheme = (event) => {
    setThemeSelected(event.target.value)
  }

  const handleChangeLevel = (event) => {
    setLevelSelected(event.target.value)
  }

  const handleOpen = () => {
    if (!positivPopup) changeIsError()
    setOpenPopup(!openPopup)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const answers = {}

    // Vérifier chaque réponse avant de l'ajouter à l'objet
    if (event.currentTarget.answer1 && event.currentTarget.answer1.value) {
      answers[event.currentTarget.answer1.value] =
        event.currentTarget.answer1Checkbox.checked
    }
    if (event.currentTarget.answer2 && event.currentTarget.answer2.value) {
      answers[event.currentTarget.answer2.value] =
        event.currentTarget.answer2Checkbox.checked
    }
    if (event.currentTarget.answer3 && event.currentTarget.answer3.value) {
      answers[event.currentTarget.answer3.value] =
        event.currentTarget.answer3Checkbox.checked
    }
    if (event.currentTarget.answer4 && event.currentTarget.answer4.value) {
      answers[event.currentTarget.answer4.value] =
        event.currentTarget.answer4Checkbox.checked
    }

    axios
      .post(
        "http://localhost:3002/api/v1/question/store",
        {
          title: event.currentTarget.question.value,
          level_id: event.currentTarget.level.value,
          domain_id: event.currentTarget.domain.value,
          answers: answers,
          points: event.currentTarget.points.value,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        setMsg(response.data.message)
        setOpenPopup(true)
        setPositivPopup(true)
      })
      .catch(function (error) {
        setMsg(error.response.data.message)
        setPositivPopup(false)
        setOpenPopup(true)
        changeIsError()
        setError(error?.response?.data?.message || "Error 403")
      })
  }

  const handleAskAi = () => {
    axios
      .post(
        "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
        {
          prompt: `Génère une seule question (sans les réponses) sur le theme de la ${themeSelected} avec une difficulté plutot ${levelSelected}`,
          max_tokens: 256,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      )
      .then(function (response) {
        // process.env.OPENAI_API_KEY
        let responseFormatted = response.data.choices[0].text.split("\n")
        setResponseAi(responseFormatted[2])
      })
      .catch(function (error) {
        setOpenPopup(true)
        changeIsError()
        setError(error?.response?.data?.message || "Error 403")
      })
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-1 flex flex-col gap-6 w-80 md:w-128 overflow-y-auto h-96 md:h-full h-[650px]">
          <Button
            className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
            onClick={() => setOpenAiDialog(!openAiDialog)}
          >
            no idea ?
          </Button>
          <div className="overflow-y-auto max-h-128 grid grid-cols-1 gap-4">
            <Input
              type="text"
              name="question"
              placeholder="Quelle est la capitale de la France ?"
              className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
            />
            <div className="flex items-center">
              <Input
                type="text"
                name="answer1"
                placeholder="answer 1"
                className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
              />
              <Checkbox
                label={
                  <Typography color="white" className="text-sm italic">
                    Good answer ?
                  </Typography>
                }
                name="answer1Checkbox"
                color="yellow"
                className="ml-2"
              />
            </div>
            <div className="flex items-center">
              <Input
                type="text"
                name="answer2"
                placeholder="answer 2"
                className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
              />
              <Checkbox
                label={
                  <Typography color="white" className="text-sm italic">
                    Good answer ?
                  </Typography>
                }
                name="answer2Checkbox"
                color="yellow"
                className="ml-2"
              />
            </div>
            <div className="flex items-center">
              <Input
                type="text"
                name="answer3"
                placeholder="answer 3"
                className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
              />
              <Checkbox
                label={
                  <Typography color="white" className="text-sm italic">
                    Good answer ?
                  </Typography>
                }
                name="answer3Checkbox"
                color="yellow"
                className="ml-2"
              />
            </div>
            <div className="flex items-center">
              <Input
                type="text"
                name="answer4"
                placeholder="answer 4"
                className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
              />
              <Checkbox
                label={
                  <Typography color="white" className="text-sm italic">
                    Good answer ?
                  </Typography>
                }
                name="answer4Checkbox"
                color="yellow"
                className="ml-2"
              />
            </div>
            <Typography variant="lead" color="white">
              Theme
            </Typography>
            <select
              name="domain"
              autoComplete="Theme"
              className="block w-full p-2 rounded-lg bg-transparent border border-2 text-gray-900"
            >
              {Array.isArray(domains.data) && domains.data.length > 0 ? (
                domains.data.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option></option>
              )}
            </select>
            <Typography variant="lead" color="white">
              Difficulty
            </Typography>
            <select
              name="level"
              autoComplete="Difficulty"
              className="block w-full p-2 rounded-lg bg-transparent border border-2 text-gray-900"
            >
              {Array.isArray(levels.data) && levels.data.length > 0 ? (
                levels.data.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option></option>
              )}
            </select>
            <Typography variant="lead" color="white">
              Points
            </Typography>
            <Input
              type="number"
              name="points"
              className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
          >
            Create your question
          </Button>
        </div>
        <Popup
          msg={msg}
          open={openPopup}
          handleOpen={handleOpen}
          positive={positivPopup}
        />
      </form>
      {openAiDialog ? (
        <Card className="fixed inset-0 flex items-center justify-center z-50 mb-32 h-screen bg-transparent backdrop-blur-sm">
          <div className="flex justify-between py-5 px-3 flex-col w-80 md:w-128 rounded-xl shadow-xl relative bg-yellow-500">
            <div className="flex w-full justify-end">
              <Button
                className="bg-transparent"
                onClick={() => setOpenAiDialog(false)}
              >
                <XMarkIcon className="h-8 w-8 text-xl" />
              </Button>
            </div>
            <Typography className="italic text-white text-md my-2 text-center">
              Don't you have any ideas? Ask our AI, to help you find
              inspiration.
            </Typography>
            <Typography className="font-bold text-white text-xl my-2">
              Theme
            </Typography>
            <select
              name="domainAskAi"
              autoComplete="Theme"
              onChange={handleChangeTheme}
              className="block w-full p-2 rounded-lg bg-transparent border border-2 text-gray-900"
            >
              {Array.isArray(domains.data) && domains.data.length > 0 ? (
                domains.data.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option></option>
              )}
            </select>
            <Typography className="font-bold text-white text-xl my-2">
              Difficulty
            </Typography>
            <select
              name="levelAskAi"
              onChange={handleChangeLevel}
              autoComplete="Difficulty"
              className="block w-full p-2 rounded-lg bg-transparent border border-2 text-gray-900"
            >
              {Array.isArray(levels.data) && levels.data.length > 0 ? (
                levels.data.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option></option>
              )}
            </select>
            <Button
              onClick={() => handleAskAi()}
              className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
            >
              Generate
            </Button>
            <div className="flex items-center w-full py-8 mx-auto">
              <input
                value={responseAi}
                type="text"
                readOnly={true}
                name="responseAi"
                className="text-white bg-transparent flex-grow placeholder:text-white border border-2 p-3 rounded-lg mx-2"
              />
              <button
                className="flex items-center mx-4"
                onClick={() => {
                  navigator.clipboard.writeText(responseAi)
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
          </div>
        </Card>
      ) : null}
    </>
  )
}

export default CreateQuestionClassic
