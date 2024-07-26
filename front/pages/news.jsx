import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import ParticlesComponent from "../src/components/ParticlesComponent"
import NavBar from "../src/components/NavBar"
import { Card, CardBody, CardHeader } from "@material-tailwind/react"
import Link from "next/link"

const News = () => {
  const {
    jwt,
    logout,
    isError,
    myProfile,
    quiz,
    isLightMode,
    toggleLightMode,
  } = useContext(AppContext)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=eadca53aad004c7c9e85a28a1fc98f4a"
        )
        console.log(response.data.articles)
        setArticles(response.data.articles)
      } catch (error) {
        console.error("Error fetching articles:", error)
      }
    }

    fetchArticles()
  }, [])

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
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-16 overflow-auto max-h-3/4-screen">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((item, index) => (
            <Card
              shadow={false}
              className="bg-purplePrimary mx-2 my-2 h-56 text-zinc-100 overflow-auto"
            >
              <CardHeader
                shadow={false}
                className="bg-transparent text-xl font-bold my-2 grid grid-cols-2 text-zinc-100"
              >
                <img
                  width={150}
                  height={150}
                  className="rounded-xl shadow-lg"
                  src={item.urlToImage ? item.urlToImage : "/template_news.png"}
                />
                {item.title}
              </CardHeader>
              <CardBody className="mx-2">
                <div>{item.description}</div>
                <div>
                  <Link
                    href={item.url}
                    className="text-sm text-blue-700 underline"
                  >
                    <h1 className="truncate">{item.url}</h1>
                  </Link>
                </div>
                <div className="flex justify-between mx-2 my-1 text-sm">
                  <div>{item.author}</div>
                  <div className="italic">{item.publishedAt}</div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <div>nothing hire</div>
        )}
      </div>
    </div>
  )
}

export default News
