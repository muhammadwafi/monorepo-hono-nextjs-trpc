import { filterColumns } from '@/db/filter-columns';
import {
	type ExtendedColumnFilter,
	filterItemSchema,
	sortingItemSchema,
} from '@/types/data-table';
import { db } from '@repo/db';
import { type User, user } from '@repo/db/schema/auth';
import { asc, count, desc, eq } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const usersFilterSchema = z.object({
	page: z.number().default(1),
	perPage: z.number().default(2),
	sort: z.array(sortingItemSchema).default([{ id: 'createdAt', desc: true }]),
	joinOperator: z.enum(['and', 'or']).default('and'),
	filters: z
		.array(filterItemSchema)
		.refine(
			(items) =>
				items.every((item) =>
					[
						'name',
						'email',
						'role',
						'emailVerified',
						'createdAt',
						'updatedAt',
					].includes(item.id),
				),
			{ message: 'Invalid filter key' },
		)
		.default([]),
});

export const userSchema = createSelectSchema(user) as z.ZodType<User>;
export const userListResponseSchema = z.object({
	users: z.array(userSchema),
	total: z.number(),
	pageCount: z.number(),
});

export type UserListFilterResponse = z.infer<typeof userListResponseSchema>;

export async function listUsers(input: z.infer<typeof usersFilterSchema>) {
	const offset = (input.page - 1) * input.perPage;
	const advancedWhere = filterColumns({
		table: user,
		filters: input.filters as ExtendedColumnFilter<typeof user>[],
		joinOperator: input.joinOperator,
	});

	const orderBy =
		input.sort.length > 0
			? input.sort.map((item) =>
					item.desc
						? desc(user[item.id as keyof User])
						: asc(user[item.id as keyof User]),
				)
			: [asc(user.createdAt)];

	const { data, total } = await db.transaction(async (tx) => {
		const data = await tx
			.select()
			.from(user)
			.limit(input.perPage)
			.offset(offset)
			.where(advancedWhere)
			.orderBy(...orderBy);

		const total = await tx
			.select({
				count: count(),
			})
			.from(user)
			.where(advancedWhere)
			.execute()
			.then((res) => res[0]?.count ?? 0);

		return {
			data,
			total,
		};
	});

	const pageCount = Math.ceil(total / input.perPage);

	return { users: data, total, pageCount };
}

export const updateUserSchema = z.object({
	id: z.string(),
	data: z.object({
		name: z.string().optional(),
		email: z.string().email().optional(),
		role: z.enum(['user', 'admin', 'superadmin']).optional(),
	}),
});

export async function updateUser(input: z.infer<typeof updateUserSchema>) {
	const { id, data } = updateUserSchema.parse(input);
	try {
		const [updatedUser] = await db
			.update(user)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(user.id, id))
			.returning();

		if (!updatedUser) {
			throw new Error('User not found');
		}

		return updatedUser;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Unable to update user',
		);
	}
}

export function usersQuery() {
	return {
		list: listUsers,
		update: updateUser,
	};
}
