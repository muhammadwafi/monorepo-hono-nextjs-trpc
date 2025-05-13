import { auth } from '@/lib/auth';
import { db } from '@repo/db';
import { user } from '@repo/db/schema/auth';
import { eq } from 'drizzle-orm';

async function seed() {
	const email = process.env.SUPERADMIN_EMAIL || 'superadmin@email.com';
	const password = process.env.SUPERADMIN_PASSWORD || 'superadmin123';
	const name = process.env.SUPERADMIN_NAME || 'Superadmin';

	const data = await auth.api.signUpEmail({
		body: {
			email,
			password,
			name: name,
		},
	});

	if (!data) {
		throw new Error('Failed to create user');
	}

	// update created user role to superadmin
	await db
		.update(user)
		.set({
			role: 'superadmin',
		})
		.where(eq(user.id, data.user.id));
}

seed()
	.catch((error) => {
		console.error('Seed process failed:', error);
		process.exit(1);
	})
	.finally(() => {
		console.log('Seed process finished. Exiting...');
		process.exit(0);
	});
