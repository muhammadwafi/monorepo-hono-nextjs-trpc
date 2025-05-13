'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as React from 'react';

interface NavTabsItems {
	title: string;
	url: string;
	isActive: boolean;
}

interface NavTabsProps {
	items: NavTabsItems[];
	className?: string;
}

export function NavTabs({ items, className, ...props }: NavTabsProps) {
	const tabContainerRef = React.useRef<HTMLDivElement | null>(null);
	const tabIndicatorRef = React.useRef<HTMLDivElement | null>(null);
	const tabRefs = React.useRef<Array<HTMLAnchorElement | null>>([]);
	const hoverBgRef = React.useRef<HTMLDivElement | null>(null);
	const activeTab = items.find((tab) => tab.isActive);

	// this effect is used to animate the tab indicator when the active tab changes
	React.useEffect(() => {
		// Find the active tab based on the current pathname. Compare the pathname with the data-path attribute of the tab's anchor element.
		const activeTabRef = tabRefs.current.find(
			(ref) => ref?.dataset.path === activeTab?.url,
		);
		if (activeTabRef && tabIndicatorRef.current) {
			// Set the width of the tab indicator to the width of the active tab.
			tabIndicatorRef.current.style.width = `${activeTabRef.offsetWidth}px`;
			// Set the left position of the tab indicator to the left position of the active tab.
			tabIndicatorRef.current.style.left = `${activeTabRef.offsetLeft}px`;
		}
	}, [activeTab]);

	// this effect is used to show and hide the hover background when the mouse enters and leaves the tabs
	React.useEffect(() => {
		const tabsElements = tabRefs.current;
		const tabContainer = tabContainerRef.current;

		const handleMouseEnter = (event: MouseEvent) => {
			const target = event.target as HTMLElement; // Type assertion here
			if (hoverBgRef.current) {
				hoverBgRef.current.style.width = `${target.offsetWidth}px`;
				hoverBgRef.current.style.left = `${target.offsetLeft}px`;
				hoverBgRef.current.style.opacity = '1';
			}
		};

		for (const tab of tabsElements) {
			tab?.addEventListener('mouseenter', handleMouseEnter);
		}

		const handleMouseLeave = () => {
			if (hoverBgRef.current) {
				hoverBgRef.current.style.opacity = '0';
			}
		};

		tabContainer?.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			for (const tab of tabsElements) {
				tab?.removeEventListener('mouseenter', handleMouseEnter);
			}
			tabContainer?.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return (
		<nav
			ref={tabContainerRef}
			className={cn(
				'relative inline-flex h-12 w-full items-center justify-start rounded-none border-b bg-transparent px-2 text-muted-foreground',
				className,
			)}
			role="tablist"
			tabIndex={0}
			{...props}
		>
			{items.map((tab, idx) => (
				<Link
					href={tab.url}
					role="tab"
					aria-selected={tab.isActive}
					tabIndex={0}
					key={tab.url}
					ref={(ref) => {
						tabRefs.current[idx] = ref;
						return undefined;
					}}
					data-path={tab.url}
					data-state={tab.isActive ? 'active' : 'inactive'}
					className={
						'relative z-10 inline-flex h-12 items-center justify-center whitespace-nowrap rounded-none bg-transparent px-4 py-1 text-muted-foreground text-sm shadow-none ring-offset-background transition-none hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:shadow-none '
					}
				>
					{tab.title}
				</Link>
			))}
			{/* the hover background */}
			<div
				ref={hoverBgRef}
				className="absolute bottom-0 z-0 h-full py-2 transition-all motion-reduce:transition-none"
				style={{ opacity: 0 }}
			>
				<div className="h-full w-full rounded-sm bg-muted bg-opacity-10 " />
			</div>
			<div
				ref={tabIndicatorRef}
				// this div animates the width and its left position usong the transition-all class
				className="absolute bottom-0 z-10 transition-all motion-reduce:transition-none"
			>
				<div className="h-0.5 bg-primary" />
			</div>
		</nav>
	);
}
