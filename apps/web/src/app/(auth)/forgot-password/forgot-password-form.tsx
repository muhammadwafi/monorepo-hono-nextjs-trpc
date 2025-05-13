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
import { Spinner } from '@/components/ui/spinner';
import { siteConfig } from '@/config/site';
import { authClient } from '@/lib/auth-client';
import { Show } from '@/lib/conditional-rendering';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlertIcon, CircleCheckBigIcon } from 'lucide-react';
import { useState } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	email: z.string().email('Invalid email address'),
});

interface IAlertMessage {
	variant: 'success' | 'error';
	message: string;
}

export function ForgotPasswordForm() {
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [alertMessage, setAlertMessage] = useState<IAlertMessage>({
		variant: 'error',
		message: '',
	});

	const form = useForm({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (value: z.infer<typeof formSchema>) => {
		await authClient.forgetPassword(
			{
				email: value.email,
				redirectTo: `${siteConfig.url}/reset-password`,
			},
			{
				onSuccess: () => {
					console.log('Success');
					setAlertMessage({
						variant: 'success',
						message:
							'Your password reset link has been sent to your email address.',
					});
					setShowAlert(true);
				},
				onError: (error) => {
					setAlertMessage({
						variant: 'error',
						message: error?.error?.message,
					});
					setShowAlert(true);
				},
			},
		);
	};

	return (
		<div className="space-y-2">
			<AlertDismissable
				variant={alertMessage.variant}
				show={showAlert}
				handleShow={setShowAlert}
				className="mb-6 space-x-2"
			>
				{alertMessage.variant === 'error' ? (
					<CircleAlertIcon size={16} className="h-5 min-w-4" />
				) : (
					<CircleCheckBigIcon size={16} className="h-5 min-w-4" />
				)}
				<p>{alertMessage.message}</p>
			</AlertDismissable>

			<Form {...form}>
				<form
					method="POST"
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. john@mail.com"
										{...field}
										className="h-10"
										required
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
							<Show.Else>Continue</Show.Else>
						</Show>
					</Button>
				</form>
			</Form>
		</div>
	);
}
