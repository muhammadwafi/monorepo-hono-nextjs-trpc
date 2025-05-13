'use client';

import type * as React from 'react';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { InternalMenu } from '@/config/internal';
import { usePathname } from 'next/navigation';

export function SecondaryNav({
	items,
	...props
}: {
	items: InternalMenu;
} & React.ComponentProps<'div'>) {
	const pathname = usePathname();

	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								className="rounded-sm text-zinc-500 data-[active=true]:bg-primary dark:text-smoke-200"
								isActive={pathname.startsWith(item.url)}
							>
								<a href={item.url}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
