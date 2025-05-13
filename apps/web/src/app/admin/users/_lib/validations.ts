import type { User } from '@repo/db/schema/auth';
import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	parseAsStringEnum,
} from 'nuqs/server';
import * as z from 'zod';

import { getFiltersStateParser, getSortingStateParser } from '@/lib/parsers';

export const searchParamsSchema = {
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser<User>().withDefault([
		{ id: 'createdAt', desc: true },
	]),
	// advanced filter
	filters: getFiltersStateParser().withDefault([]),
	joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and'),
};

export const createUserSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z.string().min(8, 'Password should be at least 8 characters'),
	role: z.enum(['user', 'admin', 'superadmin']).default('user'),
});

export const updateUserSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	role: z.enum(['user', 'admin', 'superadmin']).default('user'),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
