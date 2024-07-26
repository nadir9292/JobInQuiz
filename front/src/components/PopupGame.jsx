import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Typography } from "@material-tailwind/react"

const PopupGame = (props) => {
  let [isOpen, setIsOpen] = useState(true)
  const { msg, color } = props
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeModal()
    }, 900)
    return () => clearTimeout(timeoutId)
  }, [])
  const closeModal = async () => {
    setIsOpen(false)
  }

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center bg-black bg-opacity-50">
          <motion.div
            className={`${color} px-4 py-9 rounded-xl`}
            initial={popVariant.hidden}
            animate={popVariant.visible}
          >
            <Typography className="text-white text-xl font-bold">
              {msg}
            </Typography>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export const popVariant = {
  hidden: {
    opacity: 0,
    y: -100,
    x: -100,
  },
  visible: {
    opacity: 1,
    rotate: 360,
    y: 0,
    x: 0,
  },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 50,
  },
}

export default PopupGame
