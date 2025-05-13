import type { Metadata } from 'next';
import { UsersTable } from './_components/users-table';

export const metadata: Metadata = {
	title: 'Users',
	description: 'Manage all users',
};

export default function UsersPage() {
	return (
		<div className="flex flex-col gap-6">
			<div className="border-b px-4 pb-4 lg:px-6">
				<h2 className="text-lg">Users</h2>
				<p className="text-muted-foreground text-sm">
					Manage users and their roles
				</p>
			</div>
			<div className="px-4 lg:px-6">
				<UsersTable />
			</div>
		</div>
	);
}
