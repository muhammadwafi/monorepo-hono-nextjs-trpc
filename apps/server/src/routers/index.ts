import { protectedProcedure, publicProcedure, router } from '../lib/trpc';
import { usersRouter } from './users';

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return 'OK';
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: 'This is private',
			user: ctx.session.user,
		};
	}),
	users: usersRouter,
});

export type AppRouter = typeof appRouter;
