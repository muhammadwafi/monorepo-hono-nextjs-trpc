import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRoleIcon } from '@/components/user-role-icon';
import { cn } from '@/lib/utils';
import { formatDate, formatTime } from '@/lib/utils';
import { getInitials } from '@/lib/utils';
import type { DataTableRowAction } from '@/types/data-table';
import type { User } from '@repo/db/schema/auth';
import type { ColumnDef } from '@tanstack/react-table';
import {
	CalendarPlusIcon,
	CalendarSyncIcon,
	CircleCheckIcon,
	CircleXIcon,
	Clock2Icon,
	EllipsisVerticalIcon,
	EyeIcon,
	MailIcon,
	PencilIcon,
	TextIcon,
	Trash2Icon,
	UserLockIcon,
	VerifiedIcon,
} from 'lucide-react';
import * as React from 'react';

interface GetUsersTableColumnsProps {
	setRowAction: React.Dispatch<
		React.SetStateAction<DataTableRowAction<User> | null>
	>;
}

export function getUsersTableColumns({
	setRowAction,
}: GetUsersTableColumnsProps): ColumnDef<User>[] {
	return [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
					className="size-5 dark:border-white/25"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
					className="size-5 dark:border-white/25"
				/>
			),
			enableSorting: false,
			enableHiding: false,
			size: 30,
		},
		{
			id: 'name',
			accessorKey: 'name',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			cell: ({ row }) => {
				const image = row.original.image;

				return (
					<div className="flex items-center gap-2">
						<Avatar className="size-6.5 rounded-full">
							{image && <AvatarImage src={image} />}
							<AvatarFallback className="size-7 rounded-full bg-radial-[at_120%_90%] from-smoke-300 to-90% to-smoke-700 text-[10px] text-white">
								{getInitials(row.getValue('name') || row.getValue('email'))}
							</AvatarFallback>
						</Avatar>
						<span className="max-w-[31.25rem] truncate font-medium">
							{row.getValue('name')}
						</span>
					</div>
				);
			},
			meta: {
				label: 'Name',
				placeholder: 'Search name...',
				variant: 'text',
				icon: TextIcon,
			},
			enableColumnFilter: true,
		},
		{
			id: 'email',
			accessorKey: 'email',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Email" />
			),
			meta: {
				label: 'Email',
				placeholder: 'Search email...',
				variant: 'text',
				icon: MailIcon,
			},
			enableColumnFilter: true,
		},
		{
			id: 'role',
			accessorKey: 'role',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Role" />
			),
			cell: ({ row }) => {
				const role: string = row.getValue('role');
				return (
					<Badge variant="outline" className="text-sm">
						<div className="flex items-center gap-1.5 pr-1">
							<UserRoleIcon role={role} />
							<span>{role}</span>
						</div>
					</Badge>
				);
			},
			meta: {
				label: 'Role',
				variant: 'multiSelect',
				options: ['admin', 'superadmin', 'user'].map((role) => ({
					label: role.charAt(0).toUpperCase() + role.slice(1),
					value: role,
					icon: () => <UserRoleIcon role={role} />,
				})),
				icon: UserLockIcon,
			},
			enableColumnFilter: true,
		},
		{
			id: 'emailVerified',
			accessorKey: 'emailVerified',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Verified" />
			),
			cell: ({ row }) => {
				const isVerified = row.getValue('emailVerified');
				return (
					<Badge
						variant={isVerified ? 'success' : 'outline'}
						className={cn({
							'text-muted-foreground': !isVerified,
						})}
					>
						{isVerified ? 'Verified' : 'Not verified'}
					</Badge>
				);
			},
			meta: {
				label: 'Email verified',
				variant: 'boolean',
				options: [
					{
						label: 'Verified',
						value: 'true',
						icon: CircleCheckIcon,
					},
					{
						label: 'Not verified',
						value: 'false',
						icon: CircleXIcon,
					},
				],
				icon: VerifiedIcon,
			},
			enableColumnFilter: true,
		},
		{
			id: 'createdAt',
			accessorKey: 'createdAt',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Created At" />
			),
			cell: ({ cell }) => {
				const formattedDatetime = formatDate(cell.getValue<Date>(), {
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
					hour12: false,
				});

				return (
					<div className="flex flex-col gap-1" title={formattedDatetime}>
						<time dateTime={cell.getValue<Date>().toISOString()}>
							{formatDate(cell.getValue<Date>())}
						</time>
						<div className="flex items-center text-muted-foreground text-xs">
							<Clock2Icon size={12} className="mr-1" />
							{formatTime(cell.getValue<Date>())}
						</div>
					</div>
				);
			},
			meta: {
				label: 'Created at',
				variant: 'dateRange',
				icon: CalendarPlusIcon,
			},
			enableColumnFilter: true,
		},
		{
			id: 'updatedAt',
			accessorKey: 'updatedAt',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Last update" />
			),
			cell: ({ cell }) => {
				const formattedDatetime = formatDate(cell.getValue<Date>(), {
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
					hour12: false,
				});

				return (
					<div className="flex flex-col gap-1" title={formattedDatetime}>
						<time dateTime={cell.getValue<Date>().toISOString()}>
							{formatDate(cell.getValue<Date>())}
						</time>
						<div className="flex items-center text-muted-foreground text-xs">
							<Clock2Icon size={12} className="mr-1" />
							{formatTime(cell.getValue<Date>())}
						</div>
					</div>
				);
			},
			meta: {
				label: 'Updated at',
				variant: 'dateRange',
				icon: CalendarSyncIcon,
			},
			enableColumnFilter: true,
		},
		{
			id: 'actions',
			cell: function Cell({ row }) {
				const [isUpdatePending, startUpdateTransition] = React.useTransition();

				return (
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button
								aria-label="Open menu"
								variant="ghost"
								className="flex size-8 p-0 data-[state=open]:bg-muted"
							>
								<EllipsisVerticalIcon className="size-4" aria-hidden="true" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-40">
							<DropdownMenuItem
								onSelect={() => setRowAction({ row, variant: 'update' })}
							>
								<PencilIcon />
								Edit
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-destructive focus:bg-destructive/10 focus:text-red-500 dark:text-red-400 dark:focus:text-red-300 focus:[&_svg:not([class*='text-'])]:text-red-500 dark:focus:[&_svg:not([class*='text-'])]:text-red-300"
								onSelect={() => setRowAction({ row, variant: 'delete' })}
							>
								<Trash2Icon />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
			size: 30,
		},
	];
}
