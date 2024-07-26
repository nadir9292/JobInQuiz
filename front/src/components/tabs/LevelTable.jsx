import React, { useEffect, useState } from "react"
import { Card } from "@material-tailwind/react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import DataTable from "react-data-table-component"
import EditLevel from "./EditLevel"

const LevelTable = (props) => {
  const { levels, jwt } = props
  const [updatedLevels, setUpdatedLevels] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(null)

  const handleOpen = () => {
    setOpenPopup(!openPopup)
  }

  useEffect(() => {
    setUpdatedLevels(levels)
  }, [levels])

  const handleEdit = (row) => {
    setSelectedLevel(row)
    setOpenPopup(!openPopup)
  }

  const handleDelete = (row) => {
    console.log("Delete", row)
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
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
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex">
          <button
            onClick={() => handleEdit(row)}
            className="mr-2 bg-transparent text-orange-500 py-1 px-2 rounded flex items-center"
          >
            <PencilSquareIcon className="h-5 w-5 mr-1" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="mr-2 bg-transparent text-red-500 py-1 px-2 rounded flex items-center"
          >
            <TrashIcon className="h-5 w-5 mr-1" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <Card className="shadow-xl">
      <div className="max-w-full max-h-[620px] overflow-auto py-2 px-4">
        <DataTable columns={columns} data={updatedLevels.data} />
      </div>
      <EditLevel
        open={openPopup}
        handleOpen={handleOpen}
        row={selectedLevel}
        jwt={jwt}
      />
    </Card>
  )
}

export default LevelTable
