import classNames from "classnames"

const className = "font-bold"

const variants = {
  primary:
    "inline-flex items-center m-1 font-montserrat border border-transparent rounded-lg shadow-lg  font-large text-zinc-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  secondary:
    "inline-flex items-center m-1 rounded-lg font-montserrat font-large text-zinc-200 focus:outline-none focus:ring-2 hover:scale-110 focus:ring-offset-2 focus:ring-indigo-500",
  navBar:
    "inline-flex items-center m-1 font-montserrat text-md md:text-lg rounded-xl text-zinc-100 md:text-neutral-800 focus:outline-none focus:ring-2 hover:scale-110 focus:ring-yellow-500 md:focus:ring-neutral-800",
  classicAnswer:
    "inline-flex items-center font-montserrat bg-zinc-100 rounded-full shadow-lg w-64 sm:w-96 h-16 text-md md:text-lg",
  btnValidation:
    "w-full flex items-center font-montserrat justify-center mt-5 border border-transparent rounded-lg shadow-lg font-medium text-zinc-200 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-700",
  btnDelete:
    "focus:outline-none font-montserrat text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
}

const sizes = {
  sm: "py-1 px-1.5",
  md: "py-1.5 px-3",
  lg: "py-3 px-6",
  xl: "py-5 px-7",
}

const bgColor = {
  normal: "bg-zinc-100",
  bad: "bg-red-500",
  good: "bg-green-500",
}

const Button = (props) => {
  const { variant, size, color, ...otherProps } = props

  return (
    <button
      {...otherProps}
      className={classNames(
        className,
        variants[variant],
        sizes[size],
        bgColor[color]
      )}
    />
  )
}

export default Button
