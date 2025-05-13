import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

export const statement = {
	user: Array.from(
		new Set([...defaultStatements.user, 'update', 'read', 'unban']),
	),
	session: defaultStatements.session,
} as const;

export const accessControl = createAccessControl(statement);

export const superadmin = accessControl.newRole({
	user: [
		'create',
		'read',
		'update',
		'delete',
		'list',
		'ban',
		'unban',
		'impersonate',
		'set-password',
		'set-role',
	],
	session: adminAc.statements.session,
});

export const admin = accessControl.newRole({
	user: ['create', 'read', 'update', 'delete', 'ban', 'unban'],
});

export const user = accessControl.newRole({
	user: ['read', 'update', 'delete'],
});
