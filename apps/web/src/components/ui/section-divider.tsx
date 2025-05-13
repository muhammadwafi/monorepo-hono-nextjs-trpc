import { cn } from '@/lib/utils';
import type * as React from 'react';

interface DividerProps {
	className?: string;
	[key: string]: unknown;
}

interface SectionDividerProps extends DividerProps {
	children?: React.ReactNode;
}

const SectionLine: React.FC<DividerProps> = ({ className, ...props }) => {
	return (
		<div
			className={cn('relative h-px w-full flex-1', 'bg-border', className)}
			{...props}
		/>
	);
};

export const SectionDivider: React.FC<SectionDividerProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div
			className={cn('mx-auto flex h-8 w-full items-center gap-6', className)}
			{...props}
		>
			<SectionLine />
			{children}
			<SectionLine />
		</div>
	);
};
