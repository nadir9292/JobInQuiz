import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import PopupGame from "../src/components/PopupGame"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import DefaultDisplay from "../src/components/DefaultDisplay"
import Link from "next/link"

const Quiz = () => {
  const {
    jwt,
    logout,
    isError,
    myProfile,
    quiz,
    isLightMode,
    changeIsError,
    toggleLightMode,
    saveJwt,
  } = useContext(AppContext)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [quizById, setQuizById] = useState(null)
  const [listOfAnswerIds, setListOfAnswerIds] = useState([])
  const searchParams = useSearchParams()
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [error, setError] = useState("")
  const [base64, setBase64] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [isWait, setIsWait] = useState(false)
  const [openResultDialog, setopenResultDialog] = useState(false)
  const [results, setResults] = useState(null)

  const handleFormSubmit = (event) => {
    event.preventDefault()

    let body = {
      name: event.currentTarget.name.value,
      lastname: event.currentTarget.lastname.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      password_confirmation: event.currentTarget.password_confirmation.value,
      role_id: 2,
    }
    axios
      .post("http://localhost:3002/api/v1/auth/register", body)
      .then(function (response) {
        if (response.data.access_token) {
          saveJwt(response.data.access_token)
          setTimeout(() => {
            getResult(response.data.access_token)
            setIsWait(true)
          }, 3000)
          setIsWait(false)
        } else {
          setError("Error JWT")
        }
      })
      .catch(function (error) {
        console.log(error)
        setError(error?.response?.data?.message || "Error 403")
        handleOpen()
      })
  }

  const addPicture = (event) => {
    const file = event.target.files[0]

    if (file) {
      Resizer.imageFileResizer(
        file,
        150,
        150,
        "PNG",
        25,
        0,
        (uri) => {
          setBase64(uri)
          console.log(uri)
        },
        "base64"
      )
    }
  }

  const handleOpen = () => {
    changeIsError()
    setOpenPopup(!openPopup)
  }

  useEffect(() => {
    const context = searchParams.get("context")
    if (context && quiz?.data?.length > 0) {
      setCurrentQuiz(JSON.parse(atob(context)))
      const parsedContext = JSON.parse(atob(context))
      const foundQuiz = quiz.data.find(
        (q) => q.id === Number(parsedContext.quiz_id)
      )
      setQuizById(foundQuiz)
    }
  }, [searchParams, quiz])

  const handleAnswerSubmit = (answer) => {
    setListOfAnswerIds((prev) => [...prev, { [answer.question_id]: answer.id }])

    setSelectedAnswer(answer)
    setFeedback(answer.correct_answer ? "CORRECT" : "WRONG")

    setTimeout(() => {
      setFeedback(null)
      setSelectedAnswer(null)
      setCurrentQuestionIndex((prev) => prev + 1)
    }, 500)
  }

  const transformAnswers = (answersArray) => {
    return answersArray.reduce((acc, answerObj) => {
      const [questionId, answerId] = Object.entries(answerObj)[0]
      acc[questionId] = answerId
      return acc
    }, {})
  }

  const getResult = (jwtData) => {
    const transformedAnswers = transformAnswers(listOfAnswerIds)

    axios
      .post(
        `http://localhost:3002/api/v1/quiz/user/answer/${currentQuiz.quiz_id}`,
        { questions_answer: transformedAnswers },
        { headers: { Authorization: `Bearer ${jwtData}` } }
      )
      .then((response) => {
        setResults(response.data)
        setopenResultDialog(true)
      })
      .catch((error) => console.log("error : ", error))
  }

  const currentQuestion = quizById?.questions?.[currentQuestionIndex]

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
      <div className="flex justify-center mt-4 md:mt-8">
        {quizById ? (
          <Card className="bg-transparent mx-auto w-192 h-192" shadow={false}>
            <div className="flex justify-between mx-4 pt-2 md:my-4">
              <h1 className="text-white text-sm mb-16 text-center underline">
                {quizById.level_name}
              </h1>
              <h1 className="text-white text-sm mb-16 w-48 md:w-full text-center italic">
                {quizById.title}
              </h1>
              <h1 className="text-sm md:text-xl text-white font-bold py-2 px-2 w-16">
                {currentQuestionIndex}/{quizById.questions.length}
              </h1>
            </div>
            {currentQuestion ? (
              <div className="rounded-xl mx-4 px-4">
                <h1 className="text-white text-xl md:text-3xl font-bold text-center h-40 md:h-48">
                  {currentQuestion.title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentQuestion.answers.map((answer) => (
                    <Button
                      key={answer.id}
                      onClick={() => handleAnswerSubmit(answer)}
                      className="mb-2 mx-auto bg-purplePrimary hover:scale-105 w-72"
                      fullWidth
                    >
                      {answer.answer}
                    </Button>
                  ))}
                </div>
                {feedback && (
                  <PopupGame
                    msg={feedback}
                    color={
                      feedback === "CORRECT" ? "bg-green-500" : "bg-red-500"
                    }
                  />
                )}
              </div>
            ) : (
              <div>
                <h1 className="text-center text-2xl md:text-4xl font-bold text-zinc-100 mx-2">
                  Congratulations, the quiz is over
                </h1>
                <h1 className="text-center text-xl md:text-4xl text-zinc-100 mx-2">
                  Create your account
                </h1>
                <form onSubmit={handleFormSubmit} className="mt-8 mb-2 mx-2">
                  <div className="mb-1 flex flex-col gap-6 overflow-y-auto max-h-96 ">
                    <Typography variant="h6" color="white" className="-mb-3">
                      Profile Picture
                    </Typography>
                    <Input
                      size="lg"
                      name="picture"
                      onChange={addPicture}
                      placeholder="add your profile picture"
                      type="file"
                      className="border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {base64 && (
                      <img
                        src={base64}
                        height={100}
                        width={100}
                        className="rounded-xl mx-auto"
                        alt="Uploaded profile"
                      />
                    )}
                    <Typography variant="h6" color="white" className="-mb-3">
                      Firstname
                    </Typography>
                    <Input
                      size="lg"
                      name="name"
                      placeholder="firstname"
                      className="border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography variant="h6" color="white" className="-mb-3">
                      Lastname
                    </Typography>
                    <Input
                      size="lg"
                      name="lastname"
                      placeholder="lastname"
                      className="border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography variant="h6" color="white" className="-mb-3">
                      Email
                    </Typography>
                    <Input
                      size="lg"
                      type="email"
                      name="email"
                      placeholder="email@email.com"
                      className="border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography variant="h6" color="white" className="-mb-3">
                      Password
                    </Typography>
                    <Input
                      type="password"
                      size="lg"
                      name="password"
                      placeholder="********"
                      className="border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography variant="h6" color="white" className="-mb-3">
                      Password Confirmation
                    </Typography>
                    <Input
                      type="password"
                      size="lg"
                      name="password_confirmation"
                      placeholder="********"
                      className="border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <Button
                    className="mt-6 bg-deepBrownPrimary"
                    type="submit"
                    fullWidth
                  >
                    REGISTER
                  </Button>
                  <Typography
                    color="white"
                    className="mt-4 text-center font-normal italic"
                  >
                    You already have a account ?{" "}
                    <a
                      href="/login"
                      className="font-medium text-blue-500 underline"
                    >
                      Sign in here
                    </a>
                  </Typography>
                </form>
              </div>
            )}
          </Card>
        ) : (
          <DefaultDisplay />
        )}
      </div>
      {results && openResultDialog ? (
        <Card className="fixed inset-0 flex items-center justify-center z-50 mb-32 h-screen bg-transparent backdrop-blur-sm">
          <CardBody className="grid grid-cols-1 bg-brownPrimary h-48 w-96 md:w-128 rounded-xl">
            <h1 className="text-center text-xl md:text-2xl font-bold text-zinc-100 py-6">
              Your result is {results.point_obtenus}pts on{" "}
              {results.points_possible}pts{" "}
            </h1>
            <Link className="mx-auto" href="/">
              <Button className="mx-auto my-6">Please go back</Button>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Quiz
