import { permissionProcedure, router } from '../lib/trpc';
import {
	type UserListFilterResponse,
	updateUserSchema,
	userListResponseSchema,
	usersFilterSchema,
	usersQuery,
} from '../query/users-query';

export const usersRouter = router({
	list: permissionProcedure({ user: ['list'] })
		.input(usersFilterSchema)
		.output(userListResponseSchema)
		.query(async ({ input }): Promise<UserListFilterResponse> => {
			const query = usersQuery();
			return await query.list(input);
		}),
	update: permissionProcedure({ user: ['update'] })
		.input(updateUserSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			const query = usersQuery();
			return await query.update(input);
		}),
});
