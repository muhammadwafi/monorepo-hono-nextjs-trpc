'use client';

import { AlertDismissable } from '@/components/ui/alert-dismissable';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { UserRoleIcon } from '@/components/user-role-icon';
import { authClient } from '@/lib/auth-client';
import { Show } from '@/lib/conditional-rendering';
import { trpc } from '@/utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { CircleAlertIcon } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { createUserSchema } from '../_lib/validations';

interface CreateUserProps extends React.ComponentProps<'div'> {
	setIsOpen?: (value: boolean) => void;
}

const USER_ROLES = ['user', 'admin', 'superadmin'] as const;

export function UserCreateForm({
	setIsOpen,
	className,
	...props
}: CreateUserProps) {
	const queryClient = useQueryClient();

	const [showAlert, setShowAlert] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const [isPending, startTransition] = React.useTransition();

	const form = useForm({
		mode: 'onBlur',
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			role: 'user',
		},
	});

	const onSubmit = (value: z.infer<typeof createUserSchema>) => {
		startTransition(async () => {
			const { data, error } = await authClient.admin.createUser({
				name: value.name,
				email: value.email,
				password: value.password,
				role: value.role,
			});

			if (error) {
				setShowAlert(true);
				setErrorMessage(error?.message || 'Something went wrong');
			} else {
				form.reset();
				setIsOpen?.(false);
				toast.success(`User ${data.user.name} has been created`);
				queryClient.invalidateQueries({
					queryKey: trpc.users.list.queryKey(),
				});
			}
		});
	};

	return (
		<div className="space-y-2" {...props}>
			<AlertDismissable
				variant="error"
				show={showAlert}
				handleShow={setShowAlert}
				className="mb-6 space-x-2"
			>
				<CircleAlertIcon size={16} className="h-5 min-w-4" />
				<span>{errorMessage}</span>
			</AlertDismissable>

			<Form {...form}>
				<form
					method="POST"
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. John Doe"
										{...field}
										className="h-10"
										required
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. john@mail.com"
										className="h-10"
										required
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput
										className="h-10"
										placeholder="Your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem className="grid w-full gap-2">
								<FormLabel>Role</FormLabel>
								<FormControl>
									<RadioGroup
										className="grid-cols-3"
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										{USER_ROLES.map((role) => (
											<FormItem
												key={role}
												className="relative flex cursor-pointer flex-col items-center gap-2 rounded-md border border-border px-2 py-3 text-center not-last:outline-none transition-[color,box-shadow] hover:border-dark/30 has-data-[state=checked]:border-primary has-focus-visible:border-ring has-data-[state=checked]:bg-primary/8 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 hover:has-data-[state=checked]:border-primary dark:hover:border-smoke-100/30"
											>
												<FormControl>
													<RadioGroupItem value={role} className="sr-only" />
												</FormControl>
												<UserRoleIcon role={role} className="size-6" />
												<FormLabel className="cursor-pointer text-foreground text-xs after:absolute after:inset-0">
													{role.charAt(0).toUpperCase() + role.slice(1)}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="mt-4">
						<Button
							type="submit"
							className="h-10 w-full"
							disabled={!form.formState.isValid || form.formState.isSubmitting}
						>
							<Show>
								<Show.When condition={form.formState.isSubmitting || isPending}>
									<Spinner className="h-4 w-4" /> Saving changes
								</Show.When>
								<Show.Else>Save changes</Show.Else>
							</Show>
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
