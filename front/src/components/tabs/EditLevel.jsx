import { Button, Input, Typography } from "@material-tailwind/react"
import axios from "axios"
import { motion } from "framer-motion"

const EditLevel = (props) => {
  const { open, handleOpen, row, jwt } = props

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .put(
        `http://localhost:3002/api/v1/level/update/${row.id}`,
        {
          name: event.currentTarget.name.value,
          points: event.currentTarget.points.value,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        setTimeout(() => window.location.reload(), 2000)
      })
      .catch(function (error) {
        console.log("AYII", error)
      })
  }

  return (
    <>
      {open ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 mb-32 h-screen backdrop-blur-sm">
          <motion.div
            className={"rounded-xl"}
            initial={popVariant.hidden}
            animate={popVariant.visible}
          >
            <form
              className="grid cols-1 bg-orange-300 py-16 px-8 rounded-xl"
              onSubmit={handleFormSubmit}
            >
              <Typography className="mx-auto mb-4 text-2xl font-bold text-white">
                Edit {row.name}
              </Typography>
              <Input
                size="lg"
                name="name"
                className="border border-2 border-white my-2 placeholder:text-white"
                placeholder="Name"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Input
                size="lg"
                name="points"
                className="border border-2 border-white my-2 placeholder:text-white"
                placeholder="Points"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              <div className="flex">
                <Button
                  className="flex justify-end bg-transparent bg-gray-500 text-white hover:scale-110 mx-2 mt-6"
                  onClick={handleOpen}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  className="flex justify-end bg-red-500 text-white hover:scale-110 mx-2 mt-6"
                >
                  Submit
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export const popVariant = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
  },
  transition: {
    type: "spring",
    stiffness: 150,
    damping: 100,
  },
}

export default EditLevel
