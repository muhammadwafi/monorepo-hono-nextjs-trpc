'use client';

import type * as React from 'react';

import { Brand } from '@/components/brand/brand';
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '@/components/ui/sidebar';
import {
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { dashboardMenu, mainMenu, secondaryMenu } from '@/config/internal';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { MainNav } from './main-nav';
import { SecondaryNav } from './secondary-nav';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data, isPending } = authClient.useSession();
	const menu = data?.user?.role === 'user' ? dashboardMenu : mainMenu;

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<Link
					href="/"
					aria-label="Dashboard"
					className="relative z-10 flex h-8 items-center gap-2 px-3.5 font-medium tracking-tight"
				>
					<Brand className="h-6" />
				</Link>
			</SidebarHeader>
			<SidebarContent>
				{isPending ? (
					<>
						<SidebarMenu className="mt-4 gap-3.5 px-3.5 py-1">
							{Array.from({ length: 5 }).map((_, index) => (
								<SidebarMenuItem key={index}>
									<Skeleton className="h-3.5 w-11/12" />
								</SidebarMenuItem>
							))}
						</SidebarMenu>
						<SidebarMenu className="mt-auto gap-3.5 px-3.5 pb-6">
							{Array.from({ length: 2 }).map((_, index) => (
								<SidebarMenuItem key={index}>
									<Skeleton className="h-3.5 w-11/12" />
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</>
				) : (
					<>
						<MainNav menu={menu} className="px-3.5 py-1" />
						<SecondaryNav
							items={secondaryMenu}
							className="mt-auto mb-3 px-3.5"
						/>
					</>
				)}
			</SidebarContent>
		</Sidebar>
	);
}
