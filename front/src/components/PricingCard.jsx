import {
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react"

const PricingCard = (props) => {
  const { planData } = props

  return (
    <div className="flex flex-col">
      <h1 className="mt-4 text-4xl text-center text-white font-bold font-passion text-shadow-lg shadow-gray-900/50">
        {planData.title}
      </h1>
      <p className="text-center text-sm">{planData.description}</p>
      <h1 className="text-center mt-2 text-3xl text-shadow-lg shadow-gray-900/50">
        {planData.price}
      </h1>
      <List>
        {planData.advantages.map((item, index) => (
          <ListItem key={index} className="text-sm -my-1">
            <ListItemPrefix className="mx-2">
              {item.isChecked === "true" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
            </ListItemPrefix>
            {item.description}
          </ListItem>
        ))}
      </List>
      <Button className="mt-8 mx-4 bg-purplePrimary shadow-xl text-lg">
        {planData.buttonLabel}
      </Button>
    </div>
  )
}

export default PricingCard
