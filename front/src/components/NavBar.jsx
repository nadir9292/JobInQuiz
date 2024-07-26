import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { Button, Drawer, ListItem } from "@material-tailwind/react"
import GenerateLink from "../components/GenerateLink"

const navigationUser = [
  { name: "Random", href: "/classic-mode", current: false },
]

const navigationCompany = [
  { name: "Quiz", href: "/create-quiz", current: false },
  { name: "Questions", href: "/create-question", current: false },
  { name: "My candidates", href: "/candidates", current: false },
  { name: "Random", href: "/classic-mode", current: false },
]

const navigationAdmin = [
  { name: "Quiz", href: "/create-quiz", current: false },
  { name: "Questions", href: "/create-question", current: false },
  { name: "Levels", href: "/create-level", current: false },
  { name: "Themes", href: "/create-theme", current: false },
  { name: "Random", href: "/classic-mode", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const NavBar = (props) => {
  const { jwt, logout, myProfile, isLightMode, toggleLightMode, quiz } = props
  const [navigation, setNavigation] = useState([])
  const [open, setOpen] = useState(false)
  const [displayedRole, setDisplayedRole] = useState("")
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false)

  const handleOpen2 = () => {
    setOpenGenerateDialog(!openGenerateDialog)
  }

  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  useEffect(() => {
    switch (myProfile?.role_id) {
      case 1:
        setNavigation(navigationAdmin)
        setDisplayedRole("ADMIN")
        break
      case 2:
        setNavigation(navigationUser)
        setDisplayedRole("USER")
        break
      case 3:
        setNavigation(navigationCompany)
        setDisplayedRole("COMPANY")
        break
      default:
        setNavigation(navigationUser)
        setDisplayedRole("USER")
    }
  }, [myProfile?.role_id])

  return (
    <>
      <div as="nav" className="bg-transparent">
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 navbar">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo and main navigation */}
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                <div className="sm:hidden">
                  <Button className="bg-transparent" onClick={openDrawer}>
                    <Bars3Icon className="h-8 w-8 font-bold" />
                  </Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <h1 className="text-3xl text-center font-bold hover:scale-110 font-passion mr-6 text-zinc-100 hidden sm:block">
                      JOB'IN QUIZ
                    </h1>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 border rounded-xl shadow-xl py-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-zinc-100"
                            : "text-zinc-100 text-xl font-montserrat hover:scale-110 hover:text-zinc-100",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <Button
                      hidden={displayedRole != "COMPANY"}
                      onClick={() => setOpenGenerateDialog(!openGenerateDialog)}
                      className="text-zinc-100 text-xl font-montserrat hover:text-zinc-100 px-3 py-2 text-sm font-medium bg-transparent"
                    >
                      Generate link
                    </Button>
                  </div>
                </div>
              </div>

              {/* Profile dropdown */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {jwt ? (
                  <Menu as="div" className="relative ml-3">
                    <div className="flex items-center">
                      <h1 className="text-center text-sm text-zinc-100 uppercase font-bold w-16 truncate">
                        {myProfile?.name}
                      </h1>
                      <Menu.Button className="relative flex rounded-full bg-bluePrimary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-12 w-12 rounded-full border border-zinc-100 border-2 shadow-xl"
                          src={
                            myProfile.photo ? myProfile.photo : "/profile.png"
                          }
                          alt=""
                        />
                      </Menu.Button>
                      {isLightMode ? (
                        <Button
                          className="bg-transparent"
                          onClick={toggleLightMode}
                        >
                          <MoonIcon className="text-zinc-100 h-8 w-8" />
                        </Button>
                      ) : (
                        <Button
                          className="bg-transparent"
                          onClick={toggleLightMode}
                        >
                          <SunIcon className="text-zinc-100 h-8 w-8" />
                        </Button>
                      )}
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <h1 className="block px-4 py-2 text-sm text-gray-700 italic">
                            ({displayedRole})
                          </h1>
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/my-profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <h1
                              onClick={logout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-red-500 font-bold"
                              )}
                            >
                              Sign out
                            </h1>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="border rounded-xl shadow-xl">
                    <Link href="/login">
                      <Button className="bg-transparent hover:scale-110 text-md md:text-lg">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-transparent hover:scale-110">
                        Register
                      </Button>
                    </Link>
                    {isLightMode ? (
                      <Button
                        className="bg-transparent"
                        onClick={toggleLightMode}
                      >
                        <MoonIcon className="text-zinc-100 h-4 w-4 py-auto font-bold" />
                      </Button>
                    ) : (
                      <Button
                        className="bg-transparent"
                        onClick={toggleLightMode}
                      >
                        <SunIcon className="text-zinc-100 h-4 w-4 font-bold" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
        <GenerateLink
          open={openGenerateDialog}
          quiz={quiz}
          myProfile={myProfile}
          handleOpen={handleOpen2}
        />
      </div>
      {/* Mobile menu panel */}
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="inset-0 z-50 bg-white navbar flex flex-col"
      >
        <div className="flex items-center justify-between p-4 z-50">
          <Link href="/">
            <h1 className="text-3xl text-center font-bold font-passion mr-6 text-gray-900">
              JOB'IN QUIZ
            </h1>
          </Link>
          <Button variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon className="text-gray-900 font-bold h-8 w-8 " />
          </Button>
        </div>
        {navigation.map((item) => (
          <ListItem
            key={item.name}
            className={classNames(
              item.current ? "bg-gray-900 text-zinc-100" : "text-gray-900",
              "rounded-md font-bold text-xl ml-4 py-2"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            <Link href={item.href}>{item.name}</Link>
          </ListItem>
        ))}
        <div className="mt-auto p-4">
          <Button
            hidden={displayedRole != "COMPANY"}
            onClick={() => setOpenGenerateDialog(!openGenerateDialog)}
            className="text-gray-900 rounded-md font-bold text-xl ml-4 py-2 bg-transparent "
          >
            Generate link
          </Button>
        </div>
      </Drawer>
    </>
  )
}

export default NavBar
