import { useContext, useState } from "react"
import NavBar from "../src/components/NavBar"
import { AppContext } from "../src/components/AppContext"
import { Card } from "@material-tailwind/react"
import ParticlesComponent from "../src/components/ParticlesComponent"
import CreateQuestionClassic from "../src/components/tabs/CreateQuestionClassic"
import QuestionTable from "../src/components/tabs/QuestionsTable"

const CreateQuestion = () => {
  const {
    jwt,
    logout,
    isError,
    levels,
    domains,
    questions,
    changeIsError,
    myProfile,
    isLightMode,
    toggleLightMode,
    quiz,
  } = useContext(AppContext)
  const [openTab, setOpenTab] = useState(1)

  const handleTabChange = (tab) => {
    setOpenTab(tab)
  }
  const tabContents = [
    {
      id: 1,
      name: "Create Question",
      content: (
        <CreateQuestionClassic
          jwt={jwt}
          levels={levels}
          domains={domains}
          changeIsError={changeIsError}
        />
      ),
    },
    {
      id: 3,
      name: "View all Questions",
      content: <QuestionTable questions={questions} />,
    },
  ]

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
      <div className="flex justify-center mt-4">
        <Card className="bg-transparent mx-auto" shadow={false}>
          <div className="flex justify-center mb-4 w-80 md:w-192 p-2 bg-transparent rounded-lg mx-auto">
            {tabContents.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`text-zinc-100 font-bold flex-1 py-2 px-4 mx-2 md:mx-4 rounded-md text-sm md:text-lg focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                  openTab === tab.id ? "bg-deepBrownPrimary text-zinc-100" : ""
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          {tabContents.map((tab) => (
            <div
              key={tab.id}
              className={`mx-auto w-80 md:w-128 transition-all duration-300 ${
                openTab === tab.id ? "block" : "hidden"
              }`}
            >
              {tab.content}
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

export default CreateQuestion
