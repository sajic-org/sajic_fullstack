import { ColumnDef } from "@tanstack/react-table"

export type CheckInColumnsType = {
    showed_up: boolean,
    name: string,
    email: string,
}

export const checkInColumns: ColumnDef<CheckInColumnsType>[] = [
    {
        accessorKey: "showed_up",
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

