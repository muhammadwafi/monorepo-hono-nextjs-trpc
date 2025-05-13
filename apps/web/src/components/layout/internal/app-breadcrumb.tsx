'use client';

import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const AppBreadcrumb = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	const paths = usePathname();
	const pathNames = paths.split('/').filter((path) => path);

	return (
		<Breadcrumb {...props}>
			<BreadcrumbList className={className}>
				{React.Children.toArray(
					pathNames.map((link, index) => {
						const href = `/${pathNames.slice(0, index + 1).join('/')}`;
						const itemLabel =
							link[0].toUpperCase() + link.slice(1, link.length);
						return pathNames.length !== index + 1 ? (
							<>
								<BreadcrumbItem key={`${link}-${index}`}>
									<BreadcrumbLink asChild>
										<Link href={href}>{itemLabel}</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator key={`${link}-${index}`} />
							</>
						) : (
							<BreadcrumbPage key={`${link}-${index}`}>
								{itemLabel}
							</BreadcrumbPage>
						);
					}),
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
