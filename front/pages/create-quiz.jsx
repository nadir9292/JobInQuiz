import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import ParticlesComponent from "../src/components/ParticlesComponent"
import NavBar from "../src/components/NavBar"
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react"
import Popup from "../src/components/Popup"
import axios from "axios"
import DataTable from "react-data-table-component"

const CreateQuiz = () => {
  const {
    jwt,
    logout,
    isError,
    questions,
    levels,
    myProfile,
    isLightMode,
    toggleLightMode,
    quiz,
  } = useContext(AppContext)
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const [positivPopup, setPositivPopup] = useState(false)
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([])

  const columns = [
    {
      name: "Choose questions : ",
      cell: (row) => (
        <div className="flex">
          <Checkbox
            onClick={() => selectNewQuestion(row.id)}
            index={row.id}
          ></Checkbox>
          <Typography className="font-bold mx-4">{row.title}</Typography>
        </div>
      ),
    },
  ]

  const selectNewQuestion = (questionIdSelected) => {
    setSelectedQuestionIds((prevSelectedQuestionIds) => {
      if (prevSelectedQuestionIds.includes(questionIdSelected)) {
        return prevSelectedQuestionIds.filter((id) => id !== questionIdSelected)
      } else {
        return [...prevSelectedQuestionIds, questionIdSelected]
      }
    })
  }

  const handleOpen = () => {
    setOpenPopup(!openPopup)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post(
        "http://localhost:3002/api/v1/quiz/store",
        {
          title: event.currentTarget.title.value,
          level_id: event.currentTarget.level.value,
          questions_ids: selectedQuestionIds,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        setPositivPopup(true)
        setError(`${response.data.message}`)
        setOpenPopup(!openPopup)
        setTimeout(() => window.location.reload(), 2000)
      })
      .catch(function (error) {
        setPositivPopup(false)
        setError(error?.response?.data?.message || "Error 403")
        setOpenPopup(!openPopup)
      })
  }

  return (
    <div
      className={`bg-cover bg-center min-h-screen  ${
        !isError
          ? `${
              isLightMode
                ? "md:bg-normal bg-mobile"
                : "md:bg-normal2 bg-mobile2"
            }`
          : "md:bg-error bg-error_mobile"
      }`}
    >
      <ParticlesComponent isError={isError} />
      <NavBar
        jwt={jwt}
        logout={logout}
        myProfile={myProfile}
        isLightMode={isLightMode}
        toggleLightMode={toggleLightMode}
        quiz={quiz}
      />
      <div className="flex justify-center mt-8 md:mt-16">
        <Card className="bg-transparent mx-auto" shadow={false}>
          <div className="flex justify-center mb-4 w-80 md:w-192 p-2 bg-transparent rounded-lg mx-auto">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography className="text-4xl text-zinc-100 font-bold mb-4 text-center">
                  Create your custom quiz
                </Typography>
                <div className="overflow-y-auto max-h-128 grid grid-cols-1 gap-6">
                  <Typography className="text-xl font-bold text-zinc-100">
                    Select your questions
                  </Typography>
                  <Input
                    size="lg"
                    name="title"
                    className="border border-2 border-white placeholder:text-zinc-100 text-zinc-100 font-bold py-2 px-1.5"
                    placeholder="Title"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography className="text-xl font-bold text-zinc-100">
                    Difficulty
                  </Typography>
                  <select
                    name="level"
                    autoComplete="Difficulty"
                    className="block w-full py-2 px-3 rounded-lg bg-transparent border border-2 text-zinc-100 font-bold"
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
                  <Typography className="text-xl font-bold text-zinc-100">
                    Select your questions
                  </Typography>
                  <div className="rounded-xl h-96 overflow-auto">
                    <DataTable columns={columns} data={questions.data} />
                  </div>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
                >
                  Create your Quiz
                </Button>
              </div>
              <Popup
                msg={error}
                open={openPopup}
                handleOpen={handleOpen}
                positive={positivPopup}
              />
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CreateQuiz
