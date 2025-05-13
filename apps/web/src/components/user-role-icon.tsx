import { DoubleRingIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { User } from '@repo/db/schema/auth';
import type * as React from 'react';

interface UserRoleIconProps
	extends Omit<React.SVGProps<SVGSVGElement>, 'role'> {
	role: User['role'];
	className?: string;
}

export function UserRoleIcon({ role, className, ...props }: UserRoleIconProps) {
	return (
		<>
			{role === 'superadmin' ? (
				<DoubleRingIcon
					className={cn('size-3 text-orange-400', className)}
					{...props}
				/>
			) : role === 'admin' ? (
				<DoubleRingIcon
					className={cn('size-3 text-blue-500', className)}
					{...props}
				/>
			) : (
				<DoubleRingIcon
					className={cn('size-3 text-smoke-300', className)}
					{...props}
				/>
			)}
		</>
	);
}
