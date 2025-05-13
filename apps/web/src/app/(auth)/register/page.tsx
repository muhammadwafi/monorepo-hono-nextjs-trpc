import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { RegisterForm } from './register-form';

export default function RegisterPage() {
	return (
		<section className="mx-auto w-full max-w-sm">
			<Card className="border-0 py-0 shadow-lg-glow">
				<CardContent className="p-0.5">
					<div className="space-y-6 rounded-[12px] bg-zinc-50 p-6 dark:bg-smoke-950/80">
						<div>
							<h3 className="font-semibold text-lg">Register</h3>
							<p className="text-muted-foreground text-sm">
								Create your {siteConfig.name.toLowerCase()} account.
							</p>
						</div>
						<RegisterForm />
					</div>
					<div className="p-4 text-center text-muted-foreground text-sm">
						Already have an account?{' '}
						<Link href="/login" className="text-foreground hover:underline">
							Log in
						</Link>
					</div>
				</CardContent>
			</Card>
			<div className="mx-auto mt-6 max-w-3xs text-balance text-center text-muted-foreground text-xs [&_a]:text-foreground [&_a]:hover:underline [&_a]:hover:underline-offset-2">
				By creating an account, you agree to our{' '}
				<Link href="#">Terms of Service</Link> and{' '}
				<Link href="#">Privacy Policy</Link>.
			</div>
		</section>
	);
}
