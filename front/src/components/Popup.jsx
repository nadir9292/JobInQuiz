import { Button, DialogHeader, DialogFooter } from "@material-tailwind/react"
import { motion } from "framer-motion"
import { useState } from "react"
import Tilt from "react-parallax-tilt"

const Popup = (props) => {
  const { msg, open, handleOpen, positive } = props
  const [scale, setScale] = useState()

  return (
    <>
      {open ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 mb-32 h-screen backdrop-blur-sm">
          <motion.div
            className={"rounded-xl"}
            initial={popVariant.hidden}
            animate={popVariant.visible}
          >
            <Tilt scale={scale} transitionSpeed={2500}>
              <div
                className={`flex justify-between flex-col h-56 w-80 md:w-128 rounded-xl shadow-xl relative border border-2
                ${positive ? "bg-green-500" : "bg-redPrimary"}`}
              >
                <DialogHeader className="text-white font-montserrat font-bold text-lg md:text-2xl">
                  {msg}
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="flex justify-end bg-transparent text-2xl text-white hover:scale-110"
                    onClick={handleOpen}
                  >
                    <span>ok</span>
                  </Button>
                </DialogFooter>
              </div>
            </Tilt>
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
    stiffness: 950,
    damping: 300,
  },
}

export default Popup
