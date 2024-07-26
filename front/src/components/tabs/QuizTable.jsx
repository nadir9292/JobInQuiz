import React, { useEffect, useState } from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import DataTable from "react-data-table-component"

const QuizTable = (props) => {
  const { quiz } = props
  const [updatedQuiz, setUpdatedQuiz] = useState([])

  useEffect(() => {
    setUpdatedQuiz(quiz)
  }, [quiz])

  const columns = [
    {
      name: "Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "N° questions",
      selector: (row) => row.questions.length,
      sortable: true,
    },
    {
      name: "level id",
      selector: (row) => row.level_id,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex">
          <button className="mr-2 bg-transparent text-orange-500 py-1 px-2 rounded flex items-center">
            <PencilSquareIcon className="h-5 w-5 mr-1" />
          </button>
          <button className="mr-2 bg-transparent text-red-500 py-1 px-2 rounded flex items-center">
            <TrashIcon className="h-5 w-5 mr-1" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="md:w-1/2 mx-auto">
      <div className="max-w-full max-h-[620px] overflow-auto py-2 px-4 rounded-xl">
        <DataTable columns={columns} data={updatedQuiz.data} />
      </div>
    </div>
  )
}

export default QuizTable
