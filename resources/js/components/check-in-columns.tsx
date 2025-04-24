import { ColumnDef } from "@tanstack/react-table"

export type CheckInColumnsType = {
    presence: boolean,
    name: string,
    email: string,
}

export const checkInColumns: ColumnDef<CheckInColumnsType>[] = [
    {
        accessorKey: "presence",
        header: "Presença"
    },
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "email",
        header: "Email"
    }
]

