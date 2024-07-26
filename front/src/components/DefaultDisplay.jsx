import { Card, Typography } from "@material-tailwind/react"

const DefaultDisplay = () => {
  return (
    <Card
      className="bg-transparent mx-auto w-11/12 sm:w-3/4 md:w-192 h-auto mt-16"
      shadow={false}
    >
      <div className="flex flex-col sm:flex-row justify-between mx-4 my-4">
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-16 rounded-full bg-gray-300 animate-pulse"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-32 rounded-full bg-gray-300 animate-pulse"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-16 rounded-full bg-gray-300 animate-pulse"
        >
          &nbsp;
        </Typography>
      </div>
      <div className="rounded-xl mx-4 px-4 py-16 w-full">
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-11/12 sm:w-96 rounded-full bg-gray-300 animate-pulse mx-auto"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-11/12 sm:w-48 rounded-full bg-gray-300 animate-pulse mx-auto"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-11/12 sm:w-72 rounded-full bg-gray-300 animate-pulse mx-auto"
        >
          &nbsp;
        </Typography>
        <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Typography
            as="div"
            variant="h1"
            className="h-3 w-11/12 sm:w-48 rounded-full bg-gray-300 animate-pulse mx-auto py-4 my-4"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="h1"
            className="mb-4 h-3 w-11/12 sm:w-48 rounded-full bg-gray-300 animate-pulse mx-auto py-4 my-4"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="h1"
            className="mb-4 h-3 w-11/12 sm:w-48 rounded-full bg-gray-300 animate-pulse mx-auto py-4 my-4"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="h1"
            className="mb-4 h-3 w-11/12 sm:w-48 rounded-full bg-gray-300 animate-pulse mx-auto py-4 my-4"
          >
            &nbsp;
          </Typography>
        </div>
      </div>
    </Card>
  )
}

export default DefaultDisplay
