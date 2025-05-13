import Providers from '@/app/providers';
import { META_THEME_COLORS, siteConfig } from '@/config/site';
import type { Metadata, Viewport } from 'next';
import { Gabarito } from 'next/font/google';
import '@/styles/globals.css';

const fontSans = Gabarito({
	variable: '--font-gabarito-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		template: `%s | ${siteConfig.name}`,
		default: siteConfig.name,
	},
	description: siteConfig.description,
};

export const viewport: Viewport = {
	themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
					}}
				/>
			</head>
			<body
				className={`${fontSans.variable} antialiased md:subpixel-antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
