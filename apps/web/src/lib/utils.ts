import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Extracts initials from a full name
 *
 * @param name The full name to extract initials from
 * @param fallback Optional fallback value if name is empty or undefined
 * @returns The initials (first letter of each name part) or fallback value
 */
export function getInitials(name?: string | null, fallback = 'UN'): string {
	if (!name) return fallback;

	return (
		name
			.split(' ')
			.map((part) => part[0])
			.filter(Boolean)
			.join('')
			.toUpperCase()
			.substring(0, 2) || fallback
	);
}

/**
 * Truncates a string to a maximum length and appends ellipsis ("...") if needed.
 * Optionally preserves everything after the last occurrence of a given separator (like "@", ".", "/").
 *
 * @param options - An object containing:
 *   - text: The original string to be truncated.
 *   - maxLength: The maximum number of characters to allow before truncation.
 *   - preserveAfterChar (optional): A character (e.g. "@", ".", "/") after which content should be preserved.
 * @returns The truncated string, with "..." added if truncated.
 */
export function truncateText(options: {
	text: string;
	maxLength: number;
	preserveAfterChar?: string;
}): string {
	const { text, maxLength, preserveAfterChar } = options;

	if (!text || text.length <= maxLength) return text;

	if (preserveAfterChar && text.includes(preserveAfterChar)) {
		const index = text.lastIndexOf(preserveAfterChar);
		const tail = text.slice(index);
		const availableLength = maxLength - tail.length - 3; // 3 for "..."

		if (availableLength <= 0) return `...${tail}`;

		const head = text.slice(0, availableLength);
		return `${head}...${tail}`;
	}

	return `${text.slice(0, maxLength)}...`;
}

/**
 * Formats a date string or number into a localized date string.
 *
 * @param date - The date to format. This can be a Date object, a string representation of a date, or a number representing a timestamp.
 * @param opts - Optional Intl.DateTimeFormatOptions to customize the formatting.
 * @returns A formatted date string, or an empty string if the input is invalid.
 */
export function formatDate(
	date: Date | string | number | undefined,
	opts: Intl.DateTimeFormatOptions = {},
) {
	if (!date) return '';

	try {
		return new Intl.DateTimeFormat('en-US', {
			month: opts.month ?? 'long',
			day: opts.day ?? 'numeric',
			year: opts.year ?? 'numeric',
			...opts,
		}).format(new Date(date));
	} catch (_err) {
		return '';
	}
}

/**
 * Extracts the time (hours, minutes, seconds) from a date input and formats it as a string in HH:mm:ss format.
 *
 * @param date - The date to extract the time from. Accepts a Date object, a string representation of a date, or a number representing a timestamp.
 * @returns A string representing the time in HH:mm:ss format, or an empty string if the input is invalid.
 */
export function formatTime(date: Date | string | number | undefined) {
	if (!date) return '';

	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return '';

	const pad = (n: number) => n.toString().padStart(2, '0');
	const hours = pad(d.getHours());
	const minutes = pad(d.getMinutes());
	const seconds = pad(d.getSeconds());

	return `${hours}:${minutes}:${seconds}s`;
}
