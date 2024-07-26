import { Card, Typography } from "@material-tailwind/react"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import { useContext, useEffect, useState } from "react"
import { Circle } from "rc-progress"
import { AppContext } from "../src/components/AppContext"
import UseMediaQuery from "../src/components/UseMediaService"

const Candidates = () => {
  const {
    jwt,
    logout,
    isError,
    myProfile,
    isLightMode,
    toggleLightMode,
    quiz,
  } = useContext(AppContext)
  const smallScreen = UseMediaQuery("(max-width: 768px)")
  const [quizSelect, setQuizSelect] = useState("")
  const [totalPoints, setTotalPoints] = useState(0)
  const [candidatsList, setCandidatsList] = useState([])

  const handleChangeQuiz = (event) => {
    setQuizSelect(event.target.value)
  }

  useEffect(() => {
    if (quiz && quiz.data) {
      let selected = quiz.data.filter((q) => q.id == quizSelect)
      if (selected && selected[0] && selected[0].questions) {
        setTotalPoints(
          selected[0].questions.reduce((accumulator, currentQuestion) => {
            return accumulator + currentQuestion.points
          }, 0)
        )
        setCandidatsList(selected[0].candidats_list)
      }
    }
  }, [quizSelect])

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
      <div className="flex justify-center md:mt-2 ">
        <Card
          className="bg-transparent mt-4 md:mt-12 mx-4 w-96 w-200"
          shadow={false}
        >
          <Typography
            variant="h6"
            color="white"
            className="py-2 font-montserrat font-bold text-left font-bold text-xl text-center"
          >
            Select the quiz
          </Typography>
          <select
            name="quizSelected"
            onChange={handleChangeQuiz}
            className="block w-full p-2 rounded-lg bg-transparent text-sm border border-2 text-zinc-100 my-2"
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
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 items-center my-8 ${
              smallScreen ? " overflow-y-auto max-h-150" : ""
            }`}
          >
            {candidatsList.map((candidate, index) => (
              <div
                key={index}
                value={candidate.id}
                className="md:hover:scale-105"
              >
                <div className="text-xl text-zinc-100 border border-2 mx-auto rounded-xl px-2 py-3 shadow-xl w-64">
                  <Typography className="text-zinc-100 font-bold text-center my-2">
                    {candidate.name} {(candidate.points / totalPoints) * 100}%
                  </Typography>
                  <div className="flex flex-col md:flex-row w-full">
                    <Circle
                      percent={(candidate.points / totalPoints) * 100}
                      strokeWidth={smallScreen ? 3 : 6}
                      strokeColor={{
                        "0%": "red",
                        "50%": "orange",
                        "100%": "green",
                      }}
                      className={`text-zinc-100 mx-auto ${
                        smallScreen ? "h-24" : "h-36"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Candidates
