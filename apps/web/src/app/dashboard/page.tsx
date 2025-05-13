'use client';

import { authClient } from '@/lib/auth-client';
import { trpc } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
	const { data: session } = authClient.useSession();

	const privateData = useQuery(trpc.privateData.queryOptions());

	return (
		<div className="flex flex-col gap-8 px-4 lg:px-6">
			<div className="">
				<h2 className="text-lg">Dashboard</h2>
				<p className="text-muted-foreground text-sm">
					Preview recent activities
				</p>
			</div>
			<div className="">
				<p>Welcome {session?.user.name}</p>
				<p>privateData: {privateData.data?.message}</p>
			</div>
		</div>
	);
}
