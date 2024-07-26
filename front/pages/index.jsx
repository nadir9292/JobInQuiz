import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import { Card } from "@material-tailwind/react"
import { motion } from "framer-motion"
import ParticlesComponent from "../src/components/ParticlesComponent"
import { useContext, useEffect, useState } from "react"
import InfoJobinquiz from "../src/components/InfoJobinquiz"
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid"
import Tilt from "react-parallax-tilt"
import { useRouter } from "next/router"

const Home = () => {
  const {
    jwt,
    logout,
    isError,
    myProfile,
    isLightMode,
    toggleLightMode,
    saveJwt,
    quiz,
  } = useContext(AppContext)
  const [openInfo, setOpenInfo] = useState(false)
  const [scale, setScale] = useState(1.15)
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (token && token !== "" && token !== "null") {
      saveJwt(token)
    }
  }, [token])

  const scrollDown = () => {
    setOpenInfo(!openInfo)
  }

  return (
    <>
      <ParticlesComponent isError={isError} />
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
        <NavBar
          jwt={jwt}
          logout={logout}
          myProfile={myProfile}
          isLightMode={isLightMode}
          toggleLightMode={toggleLightMode}
          quiz={quiz}
        />
        <Card
          className="bg-transparent overflow-auto max-h-3/4-screen"
          shadow={false}
        >
          <motion.ul
            className="mt-16 mx-auto"
            initial="hidden"
            animate="visible"
            variants={list}
          >
            <motion.li variants={item}>
              <p className="text-zinc-100 md:text-4xl text-2xl text-center font-dancing md:-mb-12 -mb-8 text-shadow-lg shadow-gray-900/50">
                Unlock Potential
              </p>
            </motion.li>
            <motion.li variants={item}>
              <Tilt scale={scale} transitionSpeed={2500}>
                <p className="md:text-5xl whitespace-nowrap text-45xl text-center text-zinc-100 font-bold font-passion md:-mb-32 -mb-16 text-shadow-lg shadow-gray-900/50">
                  JOB'IN
                </p>
                <p className="md:text-5xl whitespace-nowrap text-45xl text-center text-zinc-100 font-bold font-passion md:-mb-12 -mb-8 text-shadow-lg shadow-gray-900/50">
                  QUIZ
                </p>
              </Tilt>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-zinc-100 md:text-4xl text-2xl text-center font-dancing mx-auto  text-shadow-lg shadow-gray-900/50">
                Discover Talent
              </p>
            </motion.li>
          </motion.ul>
          <h1 className="mt-16 text-zinc-100 mx-auto font-bold uppercase">
            Read more
          </h1>
          <h1
            onClick={scrollDown}
            className="mx-auto text-zinc-100 font-bold my-2 cursor-pointer"
          >
            <ChevronDoubleDownIcon className="h-10 w-10" />
          </h1>
          <InfoJobinquiz openInfo={openInfo} />
        </Card>
      </div>
    </>
  )
}

export const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  hidden: { opacity: 0 },
}
export const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
  transition: {
    when: "afterChildren",
  },
}

export default Home
