import { AppLayout } from '@/components/layout/internal/app-layout';
import { dataTableConfig } from '@/config/data-table';
import { ADMIN_ROLES } from '@/config/internal';
import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type * as React from 'react';

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data } = await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	});

	if (!data?.user) {
		return redirect('/login');
	}

	if (data?.user && !ADMIN_ROLES.has(data?.user?.role ?? '')) {
		return redirect('/404');
	}

	return (
		<AppLayout>
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 pt-2 pb-4 md:gap-6">{children}</div>
			</div>
		</AppLayout>
	);
}
