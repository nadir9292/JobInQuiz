import axios from "axios"
import { createContext, useCallback, useEffect, useState } from "react"

export const AppContext = createContext(null)

const AppContextProvider = (props) => {
  const [jwt, setJwt] = useState(null)
  const [isError, setIsError] = useState(false)
  const [levels, setLevels] = useState([])
  const [domains, setDomains] = useState([])
  const [questions, setQuestions] = useState([])
  const [quiz, setQuiz] = useState([])
  const [myProfile, setMyProfile] = useState([])
  const [isLightMode, setIsLightMode] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => setJwt(localStorage.getItem("access_token")), [])

  const saveJwt = useCallback((jwt) => {
    localStorage.setItem("access_token", jwt)
    setJwt(jwt)
    if (jwt) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3002/api/v1/profil",
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          setMyProfile(response.data.data)
        } catch (error) {
          console.error("Error fetching myProfile:", error)
        }
      }
      fetchUserData()
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("access_token")
    setJwt(null)
  }, [])

  const changeIsError = () => {
    setIsError(!isError)
  }

  useEffect(() => {
    const updateContext = () => {
      setJwt(localStorage.getItem("access_token"))
    }
    window.addEventListener("storage", updateContext)
    return () => window.removeEventListener("storage", updateContext)
  }, [])

  // ----------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          levelsResponse,
          domainsResponse,
          questionsResponse,
          quizResponse,
          profileResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3002/api/v1/levels"),
          axios.get("http://localhost:3002/api/v1/domains"),
          axios.get("http://localhost:3002/api/v1/questions"),
          axios.get("http://localhost:3002/api/v1/quizzes"),
        ])

        setLevels(levelsResponse.data)
        setDomains(domainsResponse.data)
        setQuestions(questionsResponse.data)
        setQuiz(quizResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchLevels = async () => {
      if (!jwt) return
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/profil",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        setMyProfile(response.data.data)
      } catch (error) {
        console.error("Error fetching myProfile:", error)
      }
    }

    fetchLevels()
  }, [jwt])

  // ----------------------------------------------------------------

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("isLightMode")
      if (storedTheme !== null) {
        setIsLightMode(JSON.parse(storedTheme))
      } else {
        const prefersLightMode = window.matchMedia(
          "(prefers-color-scheme: light)"
        ).matches
        setIsLightMode(prefersLightMode)
      }
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("isLightMode", JSON.stringify(isLightMode))
    }
  }, [isLightMode, isInitialized])

  const toggleLightMode = () => setIsLightMode(!isLightMode)

  return (
    <AppContext.Provider
      {...props}
      value={{
        saveJwt,
        logout,
        jwt,
        isError,
        changeIsError,
        levels,
        domains,
        questions,
        quiz,
        myProfile,
        isLightMode,
        toggleLightMode,
      }}
    />
  )
}

export default AppContextProvider
