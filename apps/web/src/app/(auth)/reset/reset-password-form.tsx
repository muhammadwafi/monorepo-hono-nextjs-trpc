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
import { PasswordInput } from '@/components/ui/password-input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { Show } from '@/lib/conditional-rendering';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlertIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export function ResetPasswordForm() {
	const router = useRouter();
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const form = useForm({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (value: z.infer<typeof formSchema>) => {
		await authClient.resetPassword(
			{
				newPassword: value.password,
				token: 'token',
			},
			{
				onSuccess: () => {
					router.push('/dashboard');
				},
				onError: (error) => {
					setErrorMessage(error?.error?.message);
					setShowAlert(true);
				},
			},
		);
	};

	return (
		<div className="space-y-2">
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<PasswordInput
										className="h-10"
										placeholder="Your new password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<PasswordInput
										className="h-10"
										placeholder="Confirm your new password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="h-10 w-full"
						disabled={
							!form.formState.isDirty ||
							!form.formState.isValid ||
							form.formState.isSubmitting
						}
					>
						<Show>
							<Show.When condition={form.formState.isSubmitting}>
								<Spinner className="mr-2 h-4 w-4" /> Please wait
							</Show.When>
							<Show.Else>Reset</Show.Else>
						</Show>
					</Button>
				</form>
			</Form>
		</div>
	);
}
