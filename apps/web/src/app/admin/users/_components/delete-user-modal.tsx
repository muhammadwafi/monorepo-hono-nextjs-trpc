import { WarningCircleIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useMediaQuery } from '@/hooks/use-media-query';
import { authClient } from '@/lib/auth-client';
import { trpc } from '@/utils/trpc';
import type { User } from '@repo/db/schema/auth';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { toast } from 'sonner';

interface DeleteUserModalProps
	extends React.ComponentPropsWithRef<typeof Dialog> {
	user: User | null;
}

export function DeleteUserModal({ user, ...props }: DeleteUserModalProps) {
	if (!user) return;

	const queryClient = useQueryClient();
	const [isPending, startTransition] = React.useTransition();
	const isDesktop = useMediaQuery('(min-width: 768px)');

	const onConfirmClicked = () => {
		startTransition(async () => {
			const res = await authClient.admin.removeUser({ userId: user.id });
			if (!res.error) {
				toast.success(`User ${user.name} has been deleted`);
				queryClient.invalidateQueries({ queryKey: trpc.users.list.queryKey() });
				props.onOpenChange?.(false);
				return;
			}

			toast.error(res.error.message);
			props.onOpenChange?.(false);
		});
	};

	if (isDesktop) {
		return (
			<Dialog {...props}>
				<DialogContent className="w-full gap-6 rounded-lg border-none shadow-lg-glow sm:max-w-sm">
					<DialogHeader className="gap-1 sm:text-center">
						<div
							className="-mt-1 flex shrink-0 items-center justify-center"
							aria-hidden="true"
						>
							<WarningCircleIcon className="size-8 text-red-400 dark:text-red-500" />
						</div>
						<div className="flex flex-col">
							<DialogTitle className="mb-0 text-lg">Delete user</DialogTitle>
							<DialogDescription className="text-sm">
								Are you sure you want to remove this user?
							</DialogDescription>
						</div>
					</DialogHeader>
					<div className="space-y-1">
						<div>
							<div className="font-medium">{user.name}</div>
							<div className="text-muted-foreground text-sm">{user.email}</div>
						</div>
						<Separator className="my-2" />
						<p className="text-muted-foreground text-xs leading-tight">
							You are about to remove this user and his account, please be
							careful cause this action cannot be undone.
						</p>
					</div>
					<DialogFooter className="sm:justify-between">
						<DialogClose asChild>
							<Button variant="ghost">Cancel</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							onClick={onConfirmClicked}
							variant="destructive"
						>
							{isPending ? (
								<>
									<Spinner className="h-4 w-4" />
									<span>Deleting user</span>
								</>
							) : (
								'Yes, Delete user'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer {...props}>
			<DrawerContent className="gap-4">
				<DrawerHeader className="text-center">
					<div
						className="-mt-1 flex shrink-0 items-center justify-center"
						aria-hidden="true"
					>
						<WarningCircleIcon className="size-8 text-red-400 dark:text-red-500" />
					</div>
					<div className="flex flex-col">
						<DrawerTitle className="mb-0 text-lg">Delete user</DrawerTitle>
						<DrawerDescription className="text-sm">
							Are you sure you want to remove this user?
						</DrawerDescription>
					</div>
				</DrawerHeader>
				<div className="space-y-1 px-4 py-2">
					<div>
						<div className="font-medium">{user.name}</div>
						<div className="text-muted-foreground text-sm">{user.email}</div>
					</div>
					<Separator className="my-2" />
					<p className="text-muted-foreground text-xs leading-tight">
						You are about to remove this user and his account, please be careful
						cause this action cannot be undone.
					</p>
				</div>
				<DrawerFooter className="pt-2">
					<Button
						disabled={isPending}
						onClick={onConfirmClicked}
						variant="destructive"
					>
						{isPending ? (
							<>
								<Spinner className="h-4 w-4" />
								<span>Deleting user</span>
							</>
						) : (
							'Yes, Delete user'
						)}
					</Button>
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
