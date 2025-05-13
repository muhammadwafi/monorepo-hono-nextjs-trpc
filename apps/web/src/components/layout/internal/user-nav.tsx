'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { authClient, useSession } from '@/lib/auth-client';
import { getInitials } from '@/lib/utils';
import {
	CircleUserRoundIcon,
	LogOutIcon,
	SettingsIcon,
	ShieldUserIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UserNav() {
	const router = useRouter();
	const { data: session, isPending } = useSession();

	if (isPending || !session?.user) {
		return <Skeleton className="size-8 rounded-full" />;
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="cursor-pointer hover:opacity-90 focus:outline-none">
				<Avatar className="size-8 rounded-full">
					{session?.user?.image && <AvatarImage src={session?.user?.image} />}
					<AvatarFallback className="size-8 rounded-full bg-radial-[at_120%_90%] from-smoke-300 to-90% to-smoke-700 text-white">
						{getInitials(session?.user?.name || session?.user?.email)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="mt-2.5 w-48">
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						{isPending ? (
							<Skeleton className="h-8 w-8 rounded-full" />
						) : (
							<Avatar className="h-8 w-8 rounded-full">
								{session?.user?.image && (
									<AvatarImage
										src={session?.user?.image}
										alt={session?.user?.name}
									/>
								)}
								<AvatarFallback className="size-8 rounded-full bg-radial-[at_120%_90%] from-smoke-300 to-90% to-smoke-700 text-[10px] text-white">
									{getInitials(session?.user?.name || session?.user?.email)}
								</AvatarFallback>
							</Avatar>
						)}
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">
								{isPending ? (
									<Skeleton className="mb-1 h-3 w-18 rounded" />
								) : (
									session?.user?.name
								)}
							</span>
							<span className="truncate text-muted-foreground text-xs">
								{isPending ? (
									<Skeleton className="h-3 w-26 rounded" />
								) : (
									session?.user?.email
								)}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<CircleUserRoundIcon /> Profile
				</DropdownMenuItem>
				<DropdownMenuItem>
					<ShieldUserIcon /> Account
				</DropdownMenuItem>
				<DropdownMenuItem>
					<SettingsIcon />
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="focus:bg-destructive/10 focus:text-red-500 dark:focus:text-red-300 focus:[&_svg:not([class*='text-'])]:text-red-500 dark:focus:[&_svg:not([class*='text-'])]:text-red-300"
					onSelect={() => {
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									router.push('/');
								},
							},
						});
					}}
				>
					<LogOutIcon />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
