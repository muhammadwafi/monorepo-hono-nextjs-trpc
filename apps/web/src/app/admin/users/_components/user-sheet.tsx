'use client';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { User } from '@repo/db/schema/auth';
import type * as React from 'react';
import { UserCreateForm } from './user-create-form';
import { UserUpdateForm } from './user-update-form';

interface UserSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
	action: 'create' | 'update';
	user: User | null;
}

export function UserSheet({
	user,
	action = 'create',
	...props
}: UserSheetProps) {
	if (action === 'update' && !user) return;

	const isDesktop = useMediaQuery('(min-width: 768px)');

	const textVariant = {
		update: {
			title: 'Update user',
			description: 'Update user details',
		},
		create: {
			title: 'Create user',
			description: 'Create a new user',
		},
	};

	const handleClose = (value: boolean) => {
		props.onOpenChange?.(value);
		console.log('value clicked', value);
	};

	return (
		<Sheet {...props}>
			<SheetContent
				side={!isDesktop ? 'bottom' : 'right'}
				className="flex flex-col gap-4"
				onOpenAutoFocus={(event) => event.preventDefault()}
			>
				<SheetHeader className="gap-1">
					<SheetTitle>{textVariant[action].title}</SheetTitle>
					<SheetDescription>{textVariant[action].description}</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 px-4 pb-6">
					{action === 'update' ? (
						<UserUpdateForm user={user} setIsOpen={handleClose} />
					) : (
						<UserCreateForm setIsOpen={handleClose} />
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
