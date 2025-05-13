'use client';

import { AppHeader } from '@/components/layout/internal/app-header';
import { AppSidebar } from '@/components/layout/internal/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type * as React from 'react';

export function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />
				<div className="flex flex-1 flex-col">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
