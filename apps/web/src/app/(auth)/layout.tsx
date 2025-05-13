import { Logo } from '@/components/brand/logo';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import type * as React from 'react';

export default function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<section className="flex min-h-screen w-full flex-col items-center justify-center bg-muted dark:bg-background">
			<main className="flex h-full w-full max-w-md flex-col items-center">
				<Link href="/" className="mb-6 flex items-center space-x-2">
					<Logo className="size-6" />
					<div className="font-semibold text-lg tracking-tight">
						{siteConfig.name}
					</div>
				</Link>
				{children}
			</main>
		</section>
	);
}
