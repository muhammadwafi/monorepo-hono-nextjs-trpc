import { siteConfig } from '@/config/site';

export function Footer() {
	return (
		<footer className="mt-12 flex min-h-16 w-full items-center justify-center p-1 text-muted-foreground text-xs">
			Copyright © {new Date().getFullYear()} {siteConfig.name}. All rights
			reserved.
		</footer>
	);
}
