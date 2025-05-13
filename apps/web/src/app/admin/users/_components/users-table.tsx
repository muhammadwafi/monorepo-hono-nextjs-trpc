'use client';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableAdvancedToolbar } from '@/components/data-table/data-table-advanced-toolbar';
import { DataTableFilterMenu } from '@/components/data-table/data-table-filter-menu';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/hooks/use-data-table';
import type { DataTableRowAction } from '@/types/data-table';
import { trpc } from '@/utils/trpc';
import type { User } from '@repo/db/schema/auth';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import React from 'react';
import { searchParamsSchema } from '../_lib/validations';
import { DeleteUserModal } from './delete-user-modal';
import { UserSheet } from './user-sheet';
import { getUsersTableColumns } from './users-table-columns';

export function UsersTable() {
	const [rowAction, setRowAction] =
		React.useState<DataTableRowAction<User> | null>(null);
	const [params] = useQueryStates(searchParamsSchema);

	const columns = React.useMemo(
		() => getUsersTableColumns({ setRowAction }),
		[],
	);

	const userQuery = useQuery(
		trpc.users.list.queryOptions({ ...params, filters: params.filters }),
	);

	const { table } = useDataTable({
		data: userQuery?.data?.users || [],
		columns,
		pageCount: userQuery?.data?.pageCount || 1,
		shallow: false,
		enableAdvancedFilter: true,
		getRowId: (originalRow) => originalRow.id,
	});

	if (userQuery.isPending) {
		return (
			<DataTableSkeleton
				columnCount={6}
				rowCount={5}
				filterCount={2}
				cellWidths={['1.25rem', '6rem', '5rem', '3rem', '6rem', '6rem']}
				shrinkZero
			/>
		);
	}

	return (
		<>
			<DataTable table={table}>
				<DataTableAdvancedToolbar
					table={table}
					isLoading={userQuery.isLoading || userQuery.isFetching}
					tableAction={
						<Button
							size="sm"
							onClick={() => setRowAction({ variant: 'create' })}
						>
							<PlusIcon /> New
						</Button>
					}
				>
					<DataTableFilterMenu table={table} />
				</DataTableAdvancedToolbar>
			</DataTable>
			<UserSheet
				open={['update', 'create'].includes(rowAction?.variant ?? '')}
				action={rowAction?.variant === 'update' ? 'update' : 'create'}
				onOpenChange={() => setRowAction(null)}
				user={rowAction?.row?.original ?? null}
			/>
			<DeleteUserModal
				open={rowAction?.variant === 'delete'}
				onOpenChange={() => setRowAction(null)}
				user={rowAction?.row?.original ?? null}
			/>
		</>
	);
}
