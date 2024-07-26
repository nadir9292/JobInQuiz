import { Button, Input, Typography } from "@material-tailwind/react"

const CreateQuestionWithAI = () => {
  return (
    <form>
      <div className="mb-1 flex flex-col gap-6 w-80">
        <Typography variant="lead" color="white">
          Question
        </Typography>
        <Input
          size="lg"
          name="question"
          placeholder="Quelle est la capital de la France ?"
          className="bg-white border"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Button
          type="submit"
          fullWidth
          className="mt-4 mx-auto hover:bg-yellow-600"
          color="yellow"
        >
          Generate question
        </Button>
      </div>
    </form>
  )
}

export default CreateQuestionWithAI
