import { LecturePresence } from "@/types/models"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<LecturePresence>()

export const presenceColumns = [
    columnHelper.accessor("name", {
        header: () => <div className="md:pl-5">Nome do Aluno</div>,
        cell: row => <div className="md:pl-8">{row.getValue()}</div>,
    }),

    columnHelper.accessor("date", {
        header: () => <div className="text-center">Data</div>,
        cell: row => <div className="text-center">{row.getValue()}</div>,
    }),

    columnHelper.accessor("lecture_count", {
        header: () => <div className="text-right md:pr-5">Palestras Assistidas</div>,
        cell: row => <div className="text-right md:pr-8">{row.getValue()}</div>,
    })
]
