'use client';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	type SortingState,
	type ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface DataTableProps<TData, TValue> {
	data: TData[];
	columns: ColumnDef<TData, TValue>[];
	isLoading?: boolean;
}

export function DataTable<TData, TValue>({
	data,
	columns,
	isLoading = false,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Card>
			<div className="rounded-md border">
				<table className="w-full">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="border-b px-4 py-2 text-left font-medium text-muted-foreground hover:text-foreground"
										onClick={header.column.getToggleSortingHandler()}
										style={{ cursor: 'pointer' }}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="border-b">
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-4 py-2">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Card>
	);
}

// Export a helper function to create column definitions
export { createColumnHelper };
