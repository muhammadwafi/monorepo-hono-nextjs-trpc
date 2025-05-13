'use client';

import type { Table } from '@tanstack/react-table';
import type * as React from 'react';

import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

interface DataTableAdvancedToolbarProps<TData>
	extends React.ComponentProps<'div'> {
	table: Table<TData>;
	isLoading?: boolean;
	tableAction?: React.ReactNode;
}

export function DataTableAdvancedToolbar<TData>({
	table,
	children,
	className,
	isLoading,
	tableAction,
	...props
}: DataTableAdvancedToolbarProps<TData>) {
	return (
		<div
			role="toolbar"
			aria-orientation="horizontal"
			className={cn('flex w-full items-start justify-between gap-2', className)}
			{...props}
		>
			<div className="flex flex-1 flex-wrap items-center gap-2">{children}</div>
			<div className="flex items-center gap-2">
				{isLoading && <Spinner className="mr-1 h-5 w-5" />}
				<DataTableViewOptions table={table} />
				{tableAction}
			</div>
		</div>
	);
}
