import { LecturePresence } from '@/types/models';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dispatch, SetStateAction, useState } from 'react';

interface DataTableProps {
    columns: ColumnDef<LecturePresence, any>[];
    data: LecturePresence[];
    filter: ColumnFiltersState;
    setFilter: Dispatch<SetStateAction<ColumnFiltersState>>
}

function PresenceDataTable({ columns, data, filter, setFilter }: DataTableProps) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const Thead = (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </TableHeader>
    );

    const Tbody = (
        <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
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
                        Aluno não encontrado.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );

    return (
        <div className="rounded-md border">
            <Table>
                {Thead}
                {Tbody}
            </Table>
        </div>
    );
}

export default PresenceDataTable;
