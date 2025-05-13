import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { ForgotPasswordForm } from './forgot-password-form';

export default function ForgotPasswordPage() {
	return (
		<section className="mx-auto w-full max-w-sm">
			<Card className="border-0 py-0 shadow-lg-glow">
				<CardContent className="p-0.5">
					<div className="space-y-6 rounded-[12px] bg-zinc-50 p-6 dark:bg-smoke-950/80">
						<div>
							<h3 className="font-semibold text-lg">Reset your password</h3>
							<p className="text-muted-foreground text-sm">
								Enter the email address associated with your account and we'll
								send you a link to reset your password.
							</p>
						</div>
						<ForgotPasswordForm />
						<div className="text-center text-muted-foreground text-sm">
							Return to{' '}
							<Link href="/login" className="text-foreground hover:underline">
								Log in
							</Link>
						</div>
					</div>
					<div className="p-4 text-center text-muted-foreground text-sm">
						New to {siteConfig.name}?{' '}
						<Link href="/register" className="text-foreground hover:underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
