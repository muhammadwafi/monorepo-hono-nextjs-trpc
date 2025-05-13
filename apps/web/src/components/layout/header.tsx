'use client';

import { Brand } from '@/components/brand/brand';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/config/site';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { Navbar } from './navbar';

export function Header() {
	const { data: session, isPending } = useSession();

	return (
		<header className="fixed top-0 left-0 isolate flex h-14 w-full justify-center border-b bg-background/70 backdrop-blur-md">
			<nav className="relative flex size-full max-w-4xl items-center justify-between px-4">
				<Link
					href="/"
					aria-label="Home"
					className="relative z-10 flex h-8 items-center gap-2 font-medium tracking-tight"
				>
					<Brand className="h-6" />
				</Link>
				<Navbar items={menuItems} />
				<div className="hidden grow basis-0 items-center justify-end gap-2 md:flex">
					<ThemeToggle className="text-foreground/70" />
					<div className="flex items-center gap-2">
						{session && Object.keys(session).length > 0 ? (
							<Button
								asChild
								variant="invert"
								className="h-8 rounded-sm px-3 font-normal"
							>
								<Link href="/dashboard">Dashboard</Link>
							</Button>
						) : !isPending ? (
							<>
								<Button
									variant="outline"
									className="h-8 rounded-sm px-3 font-normal"
									asChild
								>
									<Link href="/login">Login</Link>
								</Button>
								<Button
									variant="invert"
									className="h-8 rounded-sm px-3 font-normal"
									asChild
								>
									<Link href="/register">Register</Link>
								</Button>
							</>
						) : null}
					</div>
				</div>
			</nav>
		</header>
	);
}
