import { z } from 'zod';

const filterVariants = [
	'text',
	'number',
	'range',
	'date',
	'dateRange',
	'boolean',
	'select',
	'multiSelect',
] as const;

const filterOperators = [
	'iLike',
	'notILike',
	'eq',
	'ne',
	'inArray',
	'notInArray',
	'isEmpty',
	'isNotEmpty',
	'lt',
	'lte',
	'gt',
	'gte',
	'isBetween',
	'isRelativeToToday',
] as const;

export const filterItemSchema = z.object({
	id: z.string(),
	value: z.union([z.string(), z.array(z.string())]),
	variant: z.enum(filterVariants),
	operator: z.enum(filterOperators),
	filterId: z.string(),
});

export const sortingItemSchema = z.object({
	id: z.string(),
	desc: z.boolean(),
});

export const searchParamsSchema = z.object({
	page: z.coerce.number().int().default(1),
	perPage: z.coerce.number().int().default(10),
	sort: z.array(sortingItemSchema).default([{ id: 'createdAt', desc: true }]),
	joinOperator: z.enum(['and', 'or']).default('and'),
});

export type FilterItemSchema = z.infer<typeof filterItemSchema>;
export type JoinOperator = 'and' | 'or';

export interface ColumnSort {
	desc: boolean;
	id: string;
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, 'id'> {
	id: Extract<keyof TData, string>;
}

export interface ExtendedColumnFilter<TData> extends FilterItemSchema {
	id: Extract<keyof TData, string>;
}
