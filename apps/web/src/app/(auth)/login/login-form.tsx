'use client';

import { GoogleLogo } from '@/components/icons';
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
import { SectionDivider } from '@/components/ui/section-divider';
import { Spinner } from '@/components/ui/spinner';
import { ADMIN_ROLES } from '@/config/internal';
import { siteConfig } from '@/config/site';
import { authClient } from '@/lib/auth-client';
import { Show } from '@/lib/conditional-rendering';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password should not be empty'),
});

export function LoginForm() {
	const router = useRouter();
	const [showAlert, setShowAlert] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const [isPending, startTransition] = React.useTransition();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const loginWithGoogle = async () => {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: `${siteConfig.url}/dashboard`,
			errorCallbackURL: '/login?error=1',
		});
	};

	const onSubmit = async (value: z.infer<typeof formSchema>) => {
		await authClient.signIn.email(
			{
				email: value.email,
				password: value.password,
			},
			{
				onSuccess: ({ data }) => {
					if (ADMIN_ROLES.has(data?.user?.role ?? '')) {
						router.push('/admin');
					} else {
						router.push('/dashboard');
					}
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
			<Button
				variant="outline"
				className="relative h-10 w-full"
				disabled={isPending}
				onClick={() => startTransition(async () => await loginWithGoogle())}
			>
				{isPending ? (
					<Spinner className="me-1 h-4.5 w-4.5" />
				) : (
					<GoogleLogo className="me-1 size-4.5" />
				)}
				Continue with Google
			</Button>

			<SectionDivider className="text-muted-foreground">or</SectionDivider>

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
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel>Password</FormLabel>
									<Link
										href="/forgot-password"
										className="ml-auto inline-block text-sm hover:text-primary dark:hover:text-muted-foreground"
									>
										Forgot password?
									</Link>
								</div>
								<FormControl>
									<PasswordInput
										className="h-10"
										placeholder="Your secret password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mt-4">
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
									<Spinner className="mr-2 h-4 w-4" /> Logging in
								</Show.When>
								<Show.Else>Continue</Show.Else>
							</Show>
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
