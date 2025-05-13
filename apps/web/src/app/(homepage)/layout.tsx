import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<main className="mx-auto w-full pt-24">{children}</main>
			<Footer />
		</>
	);
}
