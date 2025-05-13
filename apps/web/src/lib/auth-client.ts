import { accessControl, admin, superadmin, user } from '@repo/better-auth';
import { adminClient } from 'better-auth/client/plugins';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	plugins: [
		inferAdditionalFields({
			user: {
				role: {
					type: 'string',
				},
			},
		}),
		adminClient({
			accessControl,
			roles: {
				admin,
				superadmin,
				user,
			},
		}),
	],
});

export const { useSession, signOut } = authClient;
