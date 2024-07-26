import { useEffect } from "react"
import AppContextProvider from "../src/components/AppContext"
import "../styles/globals.css"
import { motion } from "framer-motion"
import Head from "next/head"

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log(
              "-------------------------------------------------------------------"
            )
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            )
            console.log(
              "-------------------------------------------------------------------"
            )
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err)
          })
      })
    }
  }, [])

  return (
    <AppContextProvider>
      <main className="font-montserrat">
        <motion.div
          initial={transition.pageInitial}
          animate={transition.pageAnimate}
          variants={transition}
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
            <title>Job'in quiz</title>
            <meta name="description" content="Job'in quiz" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="black-translucent"
            />
            <meta
              name="viewport"
              content="width=device-width; initial-scale=1; viewport-fit=cover"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
            <meta name="theme-color" content="#FF914D" />
            <link rel="apple-touch-icon" href="/icons/logo-256.png" />
            <link
              rel="apple-touch-icon"
              sizes="192x192"
              href="/icons/logo-192.png"
            />
            <link rel="manifest" href="/manifest.json" />

            <meta
              name="viewport"
              content="initial-scale=1, viewport-fit=cover, width=device-width"
            ></meta>
            <meta name="apple-mobile-web-app-capable" content="yes"></meta>
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="black-translucent"
            ></meta>
            <link
              rel="apple-touch-startup-image"
              href="/background_mobile.png"
              sizes="2048x2732"
            />
          </Head>
          <Component {...pageProps} />
        </motion.div>
      </main>
    </AppContextProvider>
  )
}

export const transition = {
  pageInitial: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(01px)",
  },
  pageAnimate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
}

export default MyApp
