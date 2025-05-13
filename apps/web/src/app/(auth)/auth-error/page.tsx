import { Card, CardContent } from '@/components/ui/card';
import { CircleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import type { SearchParams } from 'nuqs/server';
import { createLoader, parseAsString } from 'nuqs/server';
import { z } from 'zod';

interface PageProps {
	searchParams: Promise<SearchParams>;
}

const errorParamsLoader = {
	error: parseAsString.withDefault('access_denied'),
	error_description: parseAsString.withDefault(''),
};

const loadErrorParams = createLoader(errorParamsLoader);

const errorParamsSchema = z.object({
	error: z.string().default('access_denied'),
	error_description: z.string().optional(),
});

export default async function AuthErrorPage({ searchParams }: PageProps) {
	const errParams = await loadErrorParams(searchParams);
	const params = errorParamsSchema.parse(errParams);

	return (
		<section className="mx-auto w-full max-w-sm">
			<Card className="border-0 py-0 shadow-lg-glow">
				<CardContent className="p-0.5">
					<div className="rounded-[12px] bg-zinc-50 p-6 dark:bg-smoke-950/80">
						<div className="mt-1 text-center">
							<div className="mb-2 flex items-center justify-center space-x-2">
								<CircleAlertIcon size={20} className="text-destructive" />
								<h3 className="font-semibold text-lg">Authentication failed</h3>
							</div>
							<p className="text-muted-foreground">
								We're unable to process your request. Please try again to{' '}
								<Link href="/login" className="text-foreground hover:underline">
									log in
								</Link>{' '}
								or{' '}
								<Link
									href="/register"
									className="text-foreground hover:underline"
								>
									create an account
								</Link>
							</p>
							{params?.error === 'access_denied' && (
								<p className="mt-6 font-mono text-muted-foreground text-xs">
									Error code: {params?.error}
								</p>
							)}
						</div>
					</div>
					<div className="p-4 text-center text-sm">
						<Link
							href="/"
							className="text-muted-foreground hover:text-foreground hover:underline"
						>
							Back to homepage
						</Link>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
