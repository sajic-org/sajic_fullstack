import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckInColumnsType } from "@/lib/check-in-columns-factory"
import { Input } from "./ui/input"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface DataTableProps {
    columns: ColumnDef<CheckInColumnsType, any>[]
    data: CheckInColumnsType[]
}

function CheckInDataTable({ columns, data }: DataTableProps) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [filterColumn, setFilterColumn] = useState("name")

    const table = useReactTable({
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),

        state: {
            columnFilters,
        }
    })

    return (
        <div className="mx-2">
            <div className="flex items-center md:justify-end justify-center py-4">
                <Input
                    placeholder="Filtrar por..."
                    value={(table.getColumn(filterColumn)?.getFilterValue() as string)}
                    onChange={(e) =>
                        table.getColumn(filterColumn)?.setFilterValue(e.target.value)
                    }
                    className="w-60 rounded-r-none"
                />
                <Select
                    value={filterColumn}
                    onValueChange={(filter) => setFilterColumn(filter)}
                >
                    <SelectTrigger className="rounded-l-none border-l-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Nome</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Sem resultados
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CheckInDataTable
