import { authClient } from '@/lib/auth-client';
import { type NextRequest, NextResponse } from 'next/server';

const authPath = new Set<string>([
	'/login',
	'/register',
	'/reset',
	'/forgot-password',
]);
const internalPath = new Set<string>(['/dashboard', '/admin']);
const adminRoles = new Set<string>(['superadmin', 'admin']);

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const { data: session } = await authClient.getSession({
		fetchOptions: {
			headers: request.headers,
		},
	});

	// If the user is not logged in, redirect them to the login page
	if (!session && internalPath.has(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// if the user is logged in, redirect them to the dashboard
	if (session && authPath.has(request.nextUrl.pathname)) {
		// if the user is an admin, redirect them to the admin dashboard
		if (adminRoles.has(session?.user?.role ?? '')) {
			return NextResponse.redirect(new URL('/admin', request.url));
		}

		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	// if user is a normal user and try to access /admin, return 404
	if (
		session &&
		session.user.role === 'user' &&
		pathname.startsWith('/admin')
	) {
		return NextResponse.error(); // throw 404 page
	}

	// if user is an admin and try to access /admin, return 404
	if (
		session &&
		adminRoles.has(session?.user?.role ?? '') &&
		pathname.startsWith('/dashboard')
	) {
		return NextResponse.error(); // throw 404 page
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api/ routes
		 * 2. /_next/ (Next.js internals)
		 * 3. /_proxy/ (proxies for third-party services)
		 * 4. Metadata files: favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest
		 */
		'/((?!api/|_next/|_proxy/|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)',
	],
};
