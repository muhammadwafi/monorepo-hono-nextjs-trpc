import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { ResetPasswordForm } from './reset-password-form';

export default function ResetPasswordPage() {
	return (
		<section className="mx-auto w-full max-w-sm">
			<Card className="border-0 py-0 shadow-lg-glow">
				<CardContent className="p-0.5">
					<div className="space-y-6 rounded-[12px] bg-zinc-50 p-6 dark:bg-smoke-950/80">
						<div>
							<h3 className="font-semibold text-lg">Set new password</h3>
							<p className="text-muted-foreground text-sm">
								Enter your new password.
							</p>
						</div>
						<ResetPasswordForm />
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
