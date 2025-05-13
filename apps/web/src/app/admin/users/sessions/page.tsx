import { NavTabs } from '@/components/nav-tabs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sessions',
	description: 'Manage users sessions',
};

const tabItems = [
	{ title: 'All Users', url: '/users', isActive: true },
	{ title: 'Sessions', url: '/users/sessions', isActive: false },
	{ title: 'Inactive', url: '/users/inactive', isActive: false },
];

export default function UsersSessionPage() {
	return (
		<div className="flex flex-col gap-6">
			<NavTabs items={tabItems} className="px-4 lg:px-6" />
		</div>
	);
}
