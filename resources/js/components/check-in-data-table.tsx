import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckInColumnsType } from '@/lib/check-in-columns-factory';
import { useState } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DataTableProps {
    columns: ColumnDef<CheckInColumnsType, any>[];
    data: CheckInColumnsType[];
}

function CheckInDataTable({ columns, data }: DataTableProps) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [filterColumn, setFilterColumn] = useState('name');

    const table = useReactTable({
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),

        state: {
            columnFilters,
        },
    });

    return (
        <div className="mx-2">
            <div className="flex items-center justify-center py-4 md:justify-end">
                <Input
                    placeholder="Filtrar por..."
                    value={table.getColumn(filterColumn)?.getFilterValue() as string}
                    onChange={(e) => table.getColumn(filterColumn)?.setFilterValue(e.target.value)}
                    className="w-60 rounded-r-none"
                />
                <Select value={filterColumn} onValueChange={(filter) => setFilterColumn(filter)}>
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
                                    console.log(header.id);

                                    if (header.id != filterColumn && header.id != 'showed_up_presence') {
                                        return (
                                            <TableHead key={header.id} className="max-md:hidden">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    }

                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className={`${i % 2 == 0 && 'bg-primary-blue/15 hover:bg-primary-blue/25'} data-[state=selected]:bg-green-100/50 data-[state=selected]:hover:bg-green-100`}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const cellName = cell.column.id;

                                        // Hide column not selected on smaller screens
                                        if (cellName != filterColumn && cellName != 'showed_up_presence') {
                                            return (
                                                <TableCell key={cell.id} className="max-md:hidden">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        }

                                        return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>;
                                    })}
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
    );
}

export default CheckInDataTable;
