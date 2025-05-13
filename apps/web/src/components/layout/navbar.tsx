'use client';

import type { MenuItems } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps extends React.ComponentProps<'ul'> {
	className?: string;
	items?: MenuItems;
}

export function Navbar({ className, items, ...props }: NavbarProps) {
	const pathname = usePathname();

	return (
		<ul
			className={cn(
				'relative ml-3 flex size-full items-center gap-1 font-normal text-sm',
				className,
			)}
			{...props}
		>
			{items?.map((item) => (
				<li
					key={item.label}
					className={cn('relative flex h-full items-center', {
						'after:-translate-x-1/2 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-1/2 after:bg-foreground':
							pathname.startsWith(item.link),
					})}
				>
					<Link
						href={item.link}
						aria-label={item.label}
						className={cn(
							'flex h-8 items-center rounded-sm px-3 text-foreground/70 hover:bg-muted hover:text-foreground',
							{
								'text-foreground': pathname.startsWith(item.link),
							},
						)}
						aria-current="page"
					>
						{item.label}
					</Link>
				</li>
			))}
		</ul>
	);
}
