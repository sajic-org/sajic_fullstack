import { LecturePresence } from "@/types/models"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<LecturePresence>()

export const presenceColumns = [
    columnHelper.accessor("name", {
        header: () => <div className="">Nome do Aluno</div>,
        cell: row => <div className="">{row.getValue()}</div>,
    }),

    columnHelper.accessor("date", {
        header: () => <div className="">Data</div>,
        cell: row => <div className="">{row.getValue()}</div>,
    }),

    columnHelper.accessor("course", {
        header: () => <div className="text-right">Curso</div>,
        cell: row => <div className="text-right pr-1.5">{row.getValue()}</div>,
    }),

    columnHelper.accessor("semester", {
        header: () => <div className="text-center">Semestre</div>,
        cell: row => <div className="text-center">{row.getValue()}</div>,
    }),
]
