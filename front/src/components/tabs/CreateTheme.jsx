import { Button, Input, Typography } from "@material-tailwind/react"
import axios from "axios"
import { useState } from "react"
import Popup from "../Popup"

const CreateTheme = (props) => {
  const { jwt } = props
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const [positivPopup, setPositivPopup] = useState(false)

  const handleOpen = () => {
    setOpenPopup(!openPopup)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post(
        "http://localhost:3002/api/v1/domain/store",
        {
          name: event.currentTarget.name.value,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        setPositivPopup(true)
        setError(`Le Theme < ${response.data.data.name} > a bien été ajouté !`)
        setOpenPopup(!openPopup)
        setTimeout(() => window.location.reload(), 2000)
      })
      .catch(function (error) {
        setPositivPopup(false)
        setError(error?.response?.data?.message || "Error 403")
        setOpenPopup(!openPopup)
      })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="lead" color="white">
          Label
        </Typography>
        <Input
          size="lg"
          name="name"
          className="border border-2 border-white text-white"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Button
          type="submit"
          fullWidth
          className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
        >
          Create your Theme
        </Button>
      </div>
      <Popup
        msg={error}
        open={openPopup}
        handleOpen={handleOpen}
        positive={positivPopup}
      />
    </form>
  )
}

export default CreateTheme
