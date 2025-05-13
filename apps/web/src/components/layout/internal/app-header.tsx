'use client';

import { Logo } from '@/components/brand/logo';
import { SidebarLeftClose, SidebarLeftOpen } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { AppBreadcrumb } from './app-breadcrumb';
import { UserNav } from './user-nav';

export function AppHeader() {
	const { open } = useSidebar();

	return (
		<header className="flex h-12 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:gap-2 lg:px-6">
			<div className="flex w-full items-center gap-1">
				<SidebarTrigger className="-ml-1 hidden md:inline-flex">
					{open ? (
						<SidebarLeftClose className="size-4" />
					) : (
						<SidebarLeftOpen className="size-4" />
					)}
				</SidebarTrigger>
				<Link href="/" className="inline-flex md:hidden">
					<Logo className="size-5" />
				</Link>
				<Separator
					orientation="vertical"
					className="mx-1 data-[orientation=vertical]:h-5"
				/>
				{/* <AppBreadcrumb /> */}
			</div>
			<div className="flex items-center gap-2">
				<ThemeToggle className="text-foreground/70" />
				<UserNav />
				<SidebarTrigger className="inline-flex size-8 md:hidden">
					<MenuIcon className="size-5" />
				</SidebarTrigger>
			</div>
		</header>
	);
}
