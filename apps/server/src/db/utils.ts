/**
 * @see https://gist.github.com/rphlmr/0d1722a794ed5a16da0fdf6652902b15
 */

import { type AnyColumn, not, sql } from 'drizzle-orm';

export function takeFirstOrNull<TData>(data: TData[]) {
	return data[0] ?? null;
}

export function takeFirstOrThrow<TData>(data: TData[], errorMessage?: string) {
	const first = takeFirstOrNull(data);

	if (!first) {
		throw new Error(errorMessage ?? 'Item not found');
	}

	return first;
}

export function isEmpty<TColumn extends AnyColumn>(column: TColumn) {
	return sql<boolean>`
    case
      when ${column} is null then true
      when ${column} = '' then true
      when ${column}::text = '[]' then true
      when ${column}::text = '{}' then true
      else false
    end
  `;
}
