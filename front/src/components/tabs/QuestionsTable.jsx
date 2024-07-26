import React, { useEffect, useState } from "react"
import { Card } from "@material-tailwind/react"
import DataTable from "react-data-table-component"

const columns = [
  {
    name: "Question",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Points",
    selector: (row) => row.points,
    sortable: true,
  },
  {
    name: "Created at",
    selector: (row) => row.created_at,
    sortable: true,
  },
]

const QuestionTable = (props) => {
  const { questions } = props

  return (
    <Card className="shadow-xl">
      <div className="max-w-full max-h-[620px] overflow-auto py-2 px-4">
        <DataTable columns={columns} data={questions.data} />
      </div>
    </Card>
  )
}

export default QuestionTable
