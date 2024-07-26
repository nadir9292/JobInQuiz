import NavBar from "../src/components/NavBar"
import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import Popup from "../src/components/Popup"
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react"
import axios from "axios"
import { useRouter } from "next/router"
import ParticlesComponent from "../src/components/ParticlesComponent"
import Resizer from "react-image-file-resizer"

const Register = () => {
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
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const [base64, setBase64] = useState(null)
  const [openCollapse, setOpenCollapse] = useState(false)
  const toggleOpen = () => setOpenCollapse((cur) => !cur)

  const handleOpen = () => {
    changeIsError()
    setOpenPopup(!openPopup)
  }
  const router = useRouter()

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

    if (
      event.currentTarget.name.value &&
      event.currentTarget.name.value !== "" &&
      openCollapse
    ) {
      Object.assign(body, { company_name: event.currentTarget.name.value })
      Object.assign(body, { role_id: 3 })
    } else {
      Object.assign(body, { company_name: null })
      Object.assign(body, { role_id: 2 })
    }
    axios
      .post("http://localhost:3002/api/v1/auth/register", body)
      .then(function (response) {
        if (response.data.access_token) {
          saveJwt(response.data.access_token)
          axios
            .post(
              "http://localhost:3002/api/v1/add/profil-picture",
              {
                image: base64,
              },
              {
                headers: {
                  Authorization: `Bearer ${response.data.access_token}`,
                },
              }
            )
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })

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

  const regsiterWithGoogle = () => {
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
      className={`bg-cover bg-center min-h-screen ${
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
          className="bg-transparent w-192 px-4 md:px-8 md:py-2"
          shadow={false}
        >
          <p className="text-zinc-100 text-center font-passion text-45xl md:text-5xl -mb-8 text-shadow-lg shadow-gray-900/50">
            REGISTER
          </p>
          <p className="font-normal font-dancing text-2xl text-center text-zinc-100 text-shadow-lg shadow-gray-900/50">
            Nice to meet you! Enter your details to login.
          </p>
          <Button
            size="sm"
            className="flex items-center justify-between mt-4 mb-2 w-64 mx-auto text-sm bg-deepBrownPrimary"
            onClick={() => regsiterWithGoogle()}
          >
            Register with Google
            <img src="/logo_google.png" height={25} width={25} />
          </Button>
          <form onSubmit={handleFormSubmit} className="mt-8 mb-2 ">
            <div className="mb-1 flex flex-col gap-6 overflow-y-auto max-h-96 ">
              <Checkbox
                onClick={toggleOpen}
                label={
                  <Typography className="text-zinc-100 text-xl">
                    Are you a company ?
                  </Typography>
                }
              />
              <Input
                size="lg"
                name="company_name"
                placeholder="Your company name"
                type="text"
                className={`border-4 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100 ${
                  !openCollapse ? "hidden" : ""
                }`}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
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
                  className="rounded-full border border-2 border-zinc-100 mx-auto"
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
              <a href="/login" className="font-medium text-blue-500 underline">
                Sign in here
              </a>
            </Typography>
          </form>
        </Card>
        <Popup msg={error} open={openPopup} handleOpen={handleOpen} />
      </div>
    </div>
  )
}

export default Register
