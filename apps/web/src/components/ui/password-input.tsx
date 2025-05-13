'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

function PasswordInput({
	className,
	type,
	...props
}: React.ComponentProps<'input'>) {
	const [showPassword, setShowPassword] = React.useState(false);
	const disabled =
		props.value === '' || props.value === undefined || props.disabled;
	return (
		<>
			<div className="relative">
				<Input
					type={showPassword ? 'text' : 'password'}
					className={cn('hide-password-toggle relative pr-10', className)}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute top-[1px] right-[1px] bottom-[1px] h-[calc(100%_-_2px)] px-3 py-2 hover:bg-secondary"
					onClick={() => setShowPassword((prev) => !prev)}
					disabled={disabled}
				>
					{showPassword && !disabled ? (
						<EyeOffIcon size={18} aria-hidden="true" />
					) : (
						<EyeIcon size={18} aria-hidden="true" />
					)}
					<span className="sr-only">
						{showPassword ? 'Hide password' : 'Show password'}
					</span>
				</Button>

				{/* hides browsers password toggles */}
				<style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
			</div>
			{/* Custom error password field */}
			{/* {error && error.type === 'custom' && (
				<fieldset className="rounded-lg border p-3">
					<legend className="px-1 font-medium text-destructive text-sm">
						Your password must be:
					</legend>
					<ul className="-mt-1 columns-1 space-y-1 text-sm md:columns-2">
						{Object.keys(error.message as Record<string, unknown>).map((m, i) => {
							const { pass, message } = error?.message[m];

							return (
								<li className="flex items-center space-x-1" key={i}>
									{pass ? (
										<CheckIcon
											size={14}
											className="text-green-500"
											strokeWidth={3}
										/>
									) : (
										<XIcon
											size={14}
											className="text-destructive"
											strokeWidth={3}
										/>
									)}
									<div
										className={cn(
											'text-muted-foreground',
											pass && 'line-through',
										)}
									>
										{message}
									</div>
								</li>
							);
						})}
					</ul>
				</fieldset>
			)} */}
		</>
	);
}

export { PasswordInput };
