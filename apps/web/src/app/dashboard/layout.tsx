import { AppLayout } from '@/components/layout/internal/app-layout';
import type * as React from 'react';

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AppLayout>
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 pt-2 pb-4 md:gap-6">{children}</div>
			</div>
		</AppLayout>
	);
}
