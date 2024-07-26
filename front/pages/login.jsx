import NavBar from "../src/components/NavBar"
import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import { Card, Input, Button, Typography } from "@material-tailwind/react"
import Popup from "../src/components/Popup"
import axios from "axios"
import { useRouter } from "next/router"
import ParticlesComponent from "../src/components/ParticlesComponent"

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const {
    jwt,
    logout,
    saveJwt,
    isError,
    changeIsError,
    myProfile,
    isLightMode,
    toggleLightMode,
  } = useContext(AppContext)
  const handleOpen = () => {
    changeIsError()
    setOpenPopup(!openPopup)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post("http://localhost:3002/api/v1/auth/login", {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      })
      .then(function (response) {
        if (response.data.access_token) {
          saveJwt(response.data.access_token)
          setTimeout(() => router.push("/"), 1000)
        } else {
          setError("Error JWT")
        }
      })
      .catch(function (error) {
        setError(error?.response?.data?.message || "Error 403")
        handleOpen()
      })
  }

  const loginWithGoogle = () => {
    axios
      .get("http://localhost:3002/api/v1/authenticate/google")
      .then(function (response) {
        router.push(response.data.url)
      })
      .catch(function (error) {
        console.log(error)
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
      />
      <div className="flex justify-center md:mt-2">
        <Card
          className="bg-transparent w-192 px-4 py-2 md:px-12 md:py-4"
          shadow={false}
        >
          <p className="text-zinc-100 text-center font-passion text-45xl md:text-5xl -mb-8 text-shadow-lg shadow-gray-900/50">
            LOGIN
          </p>
          <p className="mt-1 font-normal font-dancing text-2xl text-center text-zinc-100 text-shadow-lg shadow-gray-900/50">
            Nice to meet you! Enter your details to login.
          </p>
          <Button
            size="sm"
            className="flex items-center justify-between mt-4 mb-2 w-64 mx-auto text-sm bg-deepBrownPrimary"
            onClick={() => loginWithGoogle()}
          >
            Login with Google
            <img src="/logo_google.png" height={25} width={25} />
          </Button>
          <form onSubmit={handleFormSubmit} className="mt-8 mb-2 ">
            <div className="mb-1 flex flex-col gap-6 overflow-y-auto h-96 max-h-96">
              <Typography
                variant="h6"
                color="white"
                className="-mb-3 font-montserrat font-bold"
              >
                Your Email
              </Typography>
              <Input
                size="lg"
                name="email"
                placeholder="name@mail.com"
                className="border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                variant="h6"
                color="white"
                className="-mb-3 font-montserrat font-bold"
              >
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                placeholder="********"
                className="border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-zinc-100"
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
              Login
            </Button>
            <Typography
              color="white"
              className="mt-4 text-center font-normal italic"
            >
              You don't have a account ?{" "}
              <a
                href="/register"
                className="font-medium text-blue-500 underline"
              >
                Sign up here
              </a>
            </Typography>
            <Popup msg={error} open={openPopup} handleOpen={handleOpen} />
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Login
