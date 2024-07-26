import React from "react"
import { Card } from "@material-tailwind/react"
import DataTable from "react-data-table-component"

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Created at",
    selector: (row) => row.created_at,
    sortable: true,
  },
]

const ThemeTable = (props) => {
  const { domains } = props

  return (
    <Card className="shadow-xl">
      <div className="max-w-full max-h-[620px] overflow-auto py-2 px-4">
        <DataTable columns={columns} data={domains.data} />
      </div>
    </Card>
  )
}

export default ThemeTable
