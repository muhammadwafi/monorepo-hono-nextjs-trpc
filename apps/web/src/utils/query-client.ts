import {
	QueryCache,
	QueryClient,
	defaultShouldDehydrateQuery,
	isServer,
	keepPreviousData,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import superjson from 'superjson';

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30 * 1000,
				placeholderData: keepPreviousData,
			},
			dehydrate: {
				serializeData: superjson.serialize,
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === 'pending',
			},
			hydrate: {
				deserializeData: superjson.deserialize,
			},
		},
		queryCache: new QueryCache({
			onError: (error) => {
				toast.error(error.message, {
					action: {
						label: 'Retry',
						onClick: () => {
							queryClient.invalidateQueries();
						},
					},
				});
			},
		}),
	});
}

let browserQueryClient: QueryClient;
export function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	}
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}

export const queryClient = getQueryClient();
