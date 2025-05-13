import type * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'flex h-9 w-full min-w-0 rounded-md border border-border bg-background px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
				// 'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
				// 'focus-visible:ring-2 focus-visible:ring-ring/70',
				'focus-visible:border-ring dark:focus-visible:border-primary',
				'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:focus-visible:aria-invalid:border-destructive',
				'hover:border-dark/30 dark:hover:border-smoke-100/30',
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
