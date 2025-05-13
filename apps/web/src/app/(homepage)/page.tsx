'use client';

import { HeroSection } from '@/components/hero-section';
import { trpc } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
	const healthCheck = useQuery(trpc.healthCheck.queryOptions());

	return (
		<div className="mx-auto max-w-4xl px-4 py-2">
			<HeroSection />
			<div className="grid gap-6">
				<section className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">API Status</h2>
					<div className="flex items-center gap-2">
						<div
							className={`h-2 w-2 rounded-full ${healthCheck.data ? 'bg-green-500' : 'bg-red-500'}`}
						/>
						<span className="text-muted-foreground text-sm">
							{healthCheck.isLoading
								? 'Checking...'
								: healthCheck.data
									? 'Connected'
									: 'Disconnected'}
						</span>
					</div>
				</section>
			</div>
		</div>
	);
}
