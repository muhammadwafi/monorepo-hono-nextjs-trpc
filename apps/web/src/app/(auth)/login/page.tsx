import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { LoginForm } from './login-form';

export default function LoginPage() {
	return (
		<section className="mx-auto w-full max-w-sm">
			<Card className="border-0 py-0 shadow-lg-glow">
				<CardContent className="p-0.5">
					<div className="space-y-6 rounded-[12px] bg-zinc-50 p-6 dark:bg-smoke-950/80">
						<div>
							<h3 className="font-semibold text-lg">Log in</h3>
							<p className="text-muted-foreground text-sm">
								Please log in to continue.
							</p>
						</div>
						<LoginForm />
					</div>
					<div className="p-4 text-center text-muted-foreground text-sm">
						Dont have an account?{' '}
						<Link href="/register" className="text-foreground hover:underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
