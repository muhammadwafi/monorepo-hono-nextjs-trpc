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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { UserRoleIcon } from '@/components/user-role-icon';
import { Show } from '@/lib/conditional-rendering';
import { trpc } from '@/utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@repo/db/schema/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircleAlertIcon } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { updateUserSchema } from '../_lib/validations';

interface UpdateUserProps extends React.ComponentProps<'div'> {
	user: User | null;
	setIsOpen?: (value: boolean) => void;
}

const USER_ROLES = ['user', 'admin', 'superadmin'] as const;

export function UserUpdateForm({ user, setIsOpen, ...props }: UpdateUserProps) {
	const queryClient = useQueryClient();

	const [showAlert, setShowAlert] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const [isPending, startTransition] = React.useTransition();

	const userMutation = useMutation(
		trpc.users.update.mutationOptions({
			onError: (error) => {
				setShowAlert(true);
				setErrorMessage(error.message);
				setIsOpen?.(false);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.users.list.queryKey(),
				});
				toast.success('User has been updated');
				setIsOpen?.(false);
			},
		}),
	);

	const form = useForm({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			name: user?.name,
			email: user?.email,
			role: (user?.role as 'user' | 'admin' | 'superadmin') ?? 'user',
		},
	});

	const onSubmit = async (value: z.infer<typeof updateUserSchema>) => {
		startTransition(async () => {
			await userMutation.mutateAsync({
				id: user?.id ?? '',
				data: {
					name: value.name,
					email: value.email,
					role: value.role,
				},
			});
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
