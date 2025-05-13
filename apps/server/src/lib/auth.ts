import { accessControl, admin, superadmin, user } from '@repo/better-auth';
import { db } from '@repo/db';
import * as authSchema from '@repo/db/schema/auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { APIError } from 'better-auth/api';
import { createAuthMiddleware } from 'better-auth/api';
import { admin as adminPlugin } from 'better-auth/plugins';
import { openAPI } from 'better-auth/plugins';
import type { SuccessContext } from 'better-auth/react';
import { resend } from './resend';

export const auth = betterAuth({
	appName: process.env.APP_NAME || 'App',
	database: drizzleAdapter(db, {
		schema: authSchema,
		provider: 'pg',
	}),
	user: {
		additionalFields: {
			role: {
				type: 'string',
				nullable: false,
				defaultValue: 'user',
				returned: true,
			},
		},
		changeEmail: {
			enabled: true,
			sendChangeEmailVerification: async (
				{ user, newEmail, url, token },
				request,
			) => {
				console.log(`User: ${user}`);
				console.log(`Click the link to change email: ${url}`);
				console.log(`Token: ${token}`);
			},
		},
	},
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			const path = ctx.path;
			if (path.startsWith('/sign-in/email')) {
				const newSession = ctx.context.newSession;
				if (newSession) {
					const returned = ctx.context.returned;
					return ctx.json({
						...(returned as object),
						user: {
							...newSession.user,
						},
					});
				}
			}
		}),
	},
	trustedOrigins: [process.env.CORS_ORIGIN || ''],
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		sendResetPassword: async ({ user, url, token }, request) => {
			const { error } = await resend.emails.send({
				from: `${process.env.APP_NAME} <onboarding@resend.dev>`,
				to: user.email,
				subject: 'Reset password',
				html: `
					<p>Hi ${user.name},</p>
					<p>Someone recently requested a password change for your ${process.env.APP_NAME} account. If this was you, you can set a new password here:</p>
					<p></p>
					<p>${url}</p>
					<p></p>
					<p>If you don't want to change your password or didn't request this, just ignore and delete this message.</p>
					<p>This link will expire in 1 hour.</p>
				`,
			});

			if (error) {
				throw new APIError('BAD_REQUEST', {
					code: 'MAIL_ERROR',
					message: `Something went wrong. Please try again later or contact us at ${process.env.SUPPORT_EMAIL}.`,
				});
			}
		},
		resetPasswordTokenExpiresIn: 3600, // 1 hour
	},
	socialProviders: {
		google: {
			enabled: true,
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			redirectURI:
				`${process.env.BETTER_AUTH_URL}/api/auth/callback/google` || '',
		},
	},
	onAPIError: {
		throw: true,
		onError: (error, ctx) => {
			// Custom error handling logic
			console.error('Auth error:', error);
		},
		errorURL: `${process.env.API_URL}/auth-error'`,
	},
	plugins: [
		openAPI(),
		adminPlugin({
			defaultRole: 'user',
			adminRoles: ['admin', 'superadmin'],
			accessControl,
			roles: {
				admin,
				superadmin,
				user,
			},
		}),
	],
});
