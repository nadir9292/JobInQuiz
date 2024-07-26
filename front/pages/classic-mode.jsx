import { Button, Card, Typography } from "@material-tailwind/react"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import PopupGame from "../src/components/PopupGame"
import axios from "axios"

const Classic = () => {
  const {
    jwt,
    logout,
    isError,
    myProfile,
    isLightMode,
    toggleLightMode,
    quiz,
  } = useContext(AppContext)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [listOfAnswerIds, setListOfAnswerIds] = useState([])
  const [win, setWin] = useState(false)
  const [loose, setLoose] = useState(false)

  const quizFakeData = {
    id: 2,
    title: "Quiz Mbappé",
    slug: "quiz-mbappe",
    level_id: 2,
    level_name: "Medium",
    created_at: "il y a 2 minutes",
    updated_at: "il y a 2 minutes",
    questions: [
      {
        id: 4,
        title:
          "Kylian Mbappé a marqué un doublé contre le Brésil en quart de final de la Coupe du Monde 2018.",
        points: 300,
        level_id: 2,
        domain_id: 2,
        created_at: "il y a 5 minutes",
        updated_at: "il y a 5 minutes",
        user: {
          id: 2,
          name: "nadir",
          lastname: "Mansouri",
          email: "nadirbtssio@gmail.com",
          quiz_answers: [],
          created_at: "il y a 19 heures",
          updated_at: "il y a 19 heures",
        },
        answers: [
          {
            id: 9,
            answer: "VRAI",
            correct_answer: false,
            question_id: 4,
            created_at: "il y a 5 minutes",
            updated_at: "il y a 5 minutes",
          },
          {
            id: 10,
            answer: "FAUX",
            correct_answer: true,
            question_id: 4,
            created_at: "il y a 5 minutes",
            updated_at: "il y a 5 minutes",
          },
        ],
      },
      {
        id: 5,
        title: "Kylian Mbappé a gagné le Ballon d’Or en 2019 et en 2020.",
        points: 300,
        level_id: 1,
        domain_id: 1,
        created_at: "il y a 5 minutes",
        updated_at: "il y a 5 minutes",
        user: {
          id: 2,
          name: "nadir",
          lastname: "Mansouri",
          email: "nadirbtssio@gmail.com",
          quiz_answers: [],
          created_at: "il y a 19 heures",
          updated_at: "il y a 19 heures",
        },
        answers: [
          {
            id: 11,
            answer: "VRAI",
            correct_answer: false,
            question_id: 5,
            created_at: "il y a 5 minutes",
            updated_at: "il y a 5 minutes",
          },
          {
            id: 12,
            answer: "FAUX",
            correct_answer: true,
            question_id: 5,
            created_at: "il y a 5 minutes",
            updated_at: "il y a 5 minutes",
          },
        ],
      },
      {
        id: 6,
        title: "Son nom complet est Kylian Mbappé Lottin.",
        points: 300,
        level_id: 1,
        domain_id: 1,
        created_at: "il y a 5 minutes",
        updated_at: "il y a 5 minutes",
        user: {
          id: 2,
          name: "nadir",
          lastname: "Mansouri",
          email: "nadirbtssio@gmail.com",
          quiz_answers: [],
          created_at: "il y a 19 heures",
          updated_at: "il y a 19 heures",
        },
        answers: [
          {
            id: 13,
            answer: "VRAI",
            correct_answer: true,
            question_id: 6,
            created_at: "il y a 5 minutes",
            updated_at: "il y a 5 minutes",
          },
          {
            id: 14,
            answer: "FAUX",
            correct_answer: false,
            question_id: 6,
            created_at: "il y a 5 minutes",
            updated_at: "il y a 5 minutes",
          },
        ],
      },
      {
        id: 7,
        title:
          "Mbappé a débuté au PSG en 2017 contre son gré. Il aurait préféré le Real Madrid.",
        points: 300,
        level_id: 1,
        domain_id: 1,
        created_at: "il y a 4 minutes",
        updated_at: "il y a 4 minutes",
        user: {
          id: 2,
          name: "nadir",
          lastname: "Mansouri",
          email: "nadirbtssio@gmail.com",
          quiz_answers: [],
          created_at: "il y a 19 heures",
          updated_at: "il y a 19 heures",
        },
        answers: [
          {
            id: 15,
            answer: "VRAI",
            correct_answer: false,
            question_id: 7,
            created_at: "il y a 4 minutes",
            updated_at: "il y a 4 minutes",
          },
          {
            id: 16,
            answer: "FAUX",
            correct_answer: true,
            question_id: 7,
            created_at: "il y a 4 minutes",
            updated_at: "il y a 4 minutes",
          },
        ],
      },
      {
        id: 8,
        title:
          "Son père était footballeur et sa mère a joué professionnellement au handball.",
        points: 100,
        level_id: 1,
        domain_id: 1,
        created_at: "il y a 4 minutes",
        updated_at: "il y a 4 minutes",
        user: {
          id: 2,
          name: "nadir",
          lastname: "Mansouri",
          email: "nadirbtssio@gmail.com",
          quiz_answers: [],
          created_at: "il y a 19 heures",
          updated_at: "il y a 19 heures",
        },
        answers: [
          {
            id: 17,
            answer: "VRAI",
            correct_answer: true,
            question_id: 8,
            created_at: "il y a 4 minutes",
            updated_at: "il y a 4 minutes",
          },
          {
            id: 18,
            answer: "FAUX",
            correct_answer: false,
            question_id: 8,
            created_at: "il y a 4 minutes",
            updated_at: "il y a 4 minutes",
          },
        ],
      },
      {
        id: 9,
        title:
          "Il est entré dans l’histoire grâce à un coup du chapeau contre Barcelone en coupe de l’UEFA en février 2021.",
        points: 300,
        level_id: 1,
        domain_id: 1,
        created_at: "il y a 3 minutes",
        updated_at: "il y a 3 minutes",
        user: {
          id: 2,
          name: "nadir",
          lastname: "Mansouri",
          email: "nadirbtssio@gmail.com",
          quiz_answers: [],
          created_at: "il y a 19 heures",
          updated_at: "il y a 19 heures",
        },
        answers: [
          {
            id: 19,
            answer: "VRAI",
            correct_answer: true,
            question_id: 9,
            created_at: "il y a 3 minutes",
            updated_at: "il y a 3 minutes",
          },
          {
            id: 20,
            answer: "FAUX",
            correct_answer: false,
            question_id: 9,
            created_at: "il y a 3 minutes",
            updated_at: "il y a 3 minutes",
          },
        ],
      },
      {
        id: 10,
        title: "Mbappé a fait ses débuts en Ligue 1 au Paris Saint-Germain.",
        points: 100,
        level_id: 1,
        domain_id: 2,
        created_at: "il y a 3 minutes",
        updated_at: "il y a 3 minutes",
        user: {
          id: 2,
          name: "nadir",
          lastname: "Mansouri",
          email: "nadirbtssio@gmail.com",
          quiz_answers: [],
          created_at: "il y a 19 heures",
          updated_at: "il y a 19 heures",
        },
        answers: [
          {
            id: 21,
            answer: "VRAI",
            correct_answer: false,
            question_id: 10,
            created_at: "il y a 3 minutes",
            updated_at: "il y a 3 minutes",
          },
          {
            id: 22,
            answer: "FAUX",
            correct_answer: true,
            question_id: 10,
            created_at: "il y a 3 minutes",
            updated_at: "il y a 3 minutes",
          },
        ],
      },
      {
        id: 11,
        title: "Kylian Mbappé a gagné le Golden Boy en 2017.",
        points: 300,
        level_id: 1,
        domain_id: 1,
        created_at: "il y a 3 minutes",
        updated_at: "il y a 3 minutes",
        user: {
          id: 2,
          name: "nadir",
          lastname: "Mansouri",
          email: "nadirbtssio@gmail.com",
          quiz_answers: [],
          created_at: "il y a 19 heures",
          updated_at: "il y a 19 heures",
        },
        answers: [
          {
            id: 23,
            answer: "VRAI",
            correct_answer: true,
            question_id: 11,
            created_at: "il y a 3 minutes",
            updated_at: "il y a 3 minutes",
          },
          {
            id: 24,
            answer: "FAUX",
            correct_answer: false,
            question_id: 11,
            created_at: "il y a 3 minutes",
            updated_at: "il y a 3 minutes",
          },
        ],
      },
    ],
  }

  const handleAnswerSubmit = (answer) => {
    listOfAnswerIds.push({
      [answer.question_id.toString()]: answer.id.toString(),
    })

    setSelectedAnswer(answer)
    if (answer.correct_answer) {
      setIsCorrect(true)
    } else {
      setIsWrong(true)
    }
    setTimeout(() => {
      setIsCorrect(false)
      setIsWrong(false)
      setSelectedAnswer(null)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }, 500)
  }

  const getResult = () => {
    axios
      .post(
        "http://localhost:3002/api/v1/quiz/user/answer/1",
        {
          questions_answers: [listOfAnswerIds],
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        console.log("response : ", response)
      })
      .catch(function (error) {
        console.log("error : ", error)
      })
  }

  const currentQuestion = quizFakeData.questions[currentQuestionIndex]

  return (
    <div
      className={`bg-cover bg-center min-h-screen  ${
        !win
          ? `${
              isLightMode
                ? "md:bg-normal bg-mobile"
                : "md:bg-normal2 bg-mobile2"
            }`
          : "md:win bg-win_mobile"
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
        <Card className="bg-transparent mx-auto w-192 h-192" shadow={false}>
          {currentQuestion ? (
            <>
              <div className="flex justify-between mx-4 my-4">
                <Typography className="text-zinc-100 text-sm mb-16 text-center underline">
                  {quizFakeData.level_name}
                </Typography>
                <Typography className="text-zinc-100 text-sm mb-16 text-center italic">
                  {quizFakeData.title}
                </Typography>
                <Typography className="text-xl text-zinc-100 font-bold py-2 px-2 w-16">
                  {currentQuestionIndex}/{quizFakeData.questions.length}
                </Typography>
              </div>
              <div className="rounded-xl mx-4 px-4 py-16 ">
                <Typography className="text-zinc-100 text-xl md:text-3xl font-bold mb-16 text-center h-48">
                  {currentQuestion.title}
                </Typography>
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
                {(isCorrect && (
                  <PopupGame msg="CORRECT" color="bg-green-500" />
                )) ||
                  (isWrong && <PopupGame msg="WRONG" color="bg-red-500" />)}
              </div>
            </>
          ) : (
            <>
              <Typography className="mt-8 text-zinc-100 text-4xl md:text-45xl font-passion text-center">
                Congratulations !!
              </Typography>
              <Typography className="mt-8 text-zinc-100 text-3xl md:text-43xl font-passion text-center">
                Votre score est de
              </Typography>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Classic
