import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import superjson from 'superjson';
import type { AppRouter } from '../../../server/src/routers';
import { queryClient } from './query-client';

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			transformer: superjson,
			url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trpc`,
			fetch(url: string | Request | URL, options: RequestInit | undefined) {
				return fetch(url, {
					...options,
					credentials: 'include',
				});
			},
		}),
	],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
