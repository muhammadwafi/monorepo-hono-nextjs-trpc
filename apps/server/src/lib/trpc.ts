import type { statement } from '@repo/better-auth';
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { auth } from './auth';
import type { Context } from './context';

export const t = initTRPC.context<Context>().create({
	transformer: superjson,
});

/**
 * tRPC create new routers and subrouters in tRPC API
 * @see https://trpc.io/docs/router
 */
export const router = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this.
 * It verifies the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Authentication required',
			cause: 'No session',
		});
	}
	return next({
		ctx: {
			...ctx,
			session: ctx.session,
		},
	});
});

/**
 * Permission (authenticated with permission) procedure
 *
 * If you want a query or mutation to not only check
 * authenticated user but with it's permission access use this permission procedure.
 * It uses the `better-auth` to check the user permission.
 *
 * @see https://www.better-auth.com/docs/plugins/admin#permissions
 */
type Resource = keyof typeof statement;
type Action<R extends Resource> = (typeof statement)[R][number];

export const permissionProcedure = <R extends Resource, A extends Action<R>>(
	permissions: Record<R, A[]>,
) =>
	protectedProcedure.use(async ({ ctx, next }) => {
		const userId = ctx.session?.user?.id;
		if (!userId) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}

		const { success } = await auth.api.userHasPermission({
			body: {
				userId,
				permissions,
			},
		});

		if (!success) {
			throw new TRPCError({
				code: 'FORBIDDEN',
				message: 'You are not authorized to perform this action',
			});
		}

		return next({
			ctx: {
				...ctx,
				session: ctx.session,
			},
		});
	});
