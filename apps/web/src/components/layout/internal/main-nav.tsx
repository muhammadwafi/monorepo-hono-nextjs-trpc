'use client';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { InternalMenuGroup } from '@/config/internal';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNav({
	menu,
	...props
}: {
	menu: InternalMenuGroup;
} & React.ComponentProps<'div'>) {
	const pathname = usePathname();
	return (
		<>
			{menu.map((item) => (
				<Collapsible key={item.title} defaultOpen className="group/collapsible">
					<SidebarGroup key={item.title} {...props}>
						<SidebarGroupLabel
							asChild
							className="mb-1 h-6 rounded text-muted-foreground text-xs hover:bg-sidebar-accent/50 [&>svg]:size-3"
						>
							<CollapsibleTrigger>
								{item.title}
								<ChevronRightIcon
									size={10}
									className="ml-1 transition-transform group-data-[state=open]/collapsible:rotate-90"
								/>
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent className="flex flex-col gap-2">
								<SidebarMenu>
									{item.items.map((subitem) => (
										<SidebarMenuItem key={subitem.title}>
											<SidebarMenuButton
												asChild
												tooltip={subitem.title}
												className="rounded-sm text-zinc-600 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground dark:text-smoke-200 [&>svg]:size-5.5"
												isActive={pathname === subitem.url}
											>
												<Link href={subitem.url}>
													{subitem.icon && <subitem.icon />}
													<span>{subitem.title}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			))}
		</>
	);
}
