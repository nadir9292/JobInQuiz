import { useContext, useState, useEffect } from "react"
import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import { Button, Card, Input, Typography } from "@material-tailwind/react"
import axios from "axios"
import { DefaultSkeleton } from "../src/components/DefaultSkeleton"
import Resizer from "react-image-file-resizer"

const MyProfile = () => {
  const {
    jwt,
    logout,
    isError,
    myProfile,
    isLightMode,
    toggleLightMode,
    quiz,
  } = useContext(AppContext)
  const [profileData, setProfileData] = useState(null)
  const [base64, setBase64] = useState(null)
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [hide, setHide] = useState(true)
  const api = axios.create({
    baseURL: "http://localhost:3002/api/v1",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      const updateProfile = api.put("/update/profil", {
        name,
        lastname,
        email,
      })

      const addProfilePicture = api.post("/add/profil-picture", {
        image: base64,
      })

      const [updateResponse, addResponse] = await Promise.all([
        updateProfile,
        addProfilePicture,
      ])

      console.log(addResponse)

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (myProfile) {
      setProfileData(myProfile)
      setName(myProfile.name)
      setLastname(myProfile.lastname)
      setEmail(myProfile.email)
    }
  }, [myProfile])

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
      <NavBar
        jwt={jwt}
        logout={logout}
        myProfile={myProfile}
        isLightMode={isLightMode}
        toggleLightMode={toggleLightMode}
        quiz={quiz}
      />
      <div className="flex justify-center mt-4 md:mt-8">
        <Card className="bg-transparent md:w-192" shadow={false}>
          <div className="grid grid-cols-1">
            {profileData ? (
              <div className="max-h-[600px] md:max-h-[800px] overflow-auto px-2">
                <div>
                  <Typography className="text-2xl text-zinc-100 uppercase my-16 text-center">
                    {profileData.name} {profileData.lastname}
                  </Typography>
                  {profileData.photo ? (
                    <img
                      alt="profile image"
                      src={profileData.photo}
                      height={150}
                      width={150}
                      className="rounded-full border border-2 border-zinc-100 mx-auto"
                    />
                  ) : (
                    <img
                      alt="profile image default"
                      src="/profile.png"
                      height={150}
                      width={150}
                      className="rounded-full border border-2 border-zinc-100 mx-auto"
                    />
                  )}
                  <Typography className="text-xl text-zinc-100 uppercase my-16 text-center">
                    {profileData.email}
                  </Typography>
                </div>
                <Button
                  className="w-full bg-orange-600 shadow-xl"
                  onClick={() => setHide(!hide)}
                >
                  ↓ Update your profile ↓
                </Button>
                <form
                  onSubmit={handleFormSubmit}
                  className={`mt-8 mb-2 ${hide ? "hidden" : ""}`}
                >
                  <div className="mb-1 flex flex-col gap-6 overflow-y-auto max-h-96">
                    <Typography variant="h6" color="white" className="-mb-3">
                      Profile Picture
                    </Typography>
                    <Input
                      size="lg"
                      name="picture"
                      onChange={addPicture}
                      placeholder="add your profile picture"
                      type="file"
                      className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
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
                    <Input
                      size="lg"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="firstname"
                      className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Input
                      size="lg"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      placeholder="lastname"
                      className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Input
                      size="lg"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      placeholder="email@email.com"
                      className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-zinc-100 placeholder:text-zinc-100"
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
                    Change your profile
                  </Button>
                </form>
              </div>
            ) : (
              <div className="my-16 mx-auto">
                <DefaultSkeleton />
                <DefaultSkeleton />
                <DefaultSkeleton />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MyProfile
