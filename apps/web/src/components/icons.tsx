import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function GoogleLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			className={className}
			viewBox="0 0 256 262"
			{...props}
		>
			<path
				fill="#4285F4"
				d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
			/>
			<path
				fill="#34A853"
				d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
			/>
			<path
				fill="#FBBC05"
				d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
			/>
			<path
				fill="#EB4335"
				d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
			/>
		</svg>
	);
}

export function ArrowLeftIcon({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className={cn('size-4 fill-none stroke-2 stroke-current', className)}
			{...props}
		>
			<line
				x1="5"
				y1="12"
				x2="19"
				y2="12"
				className="translate-x-2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100"
			/>
			<polyline
				points="12 5 5 12 12 19"
				className="translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0"
			/>
		</svg>
	);
}

export function ArrowRightIcon({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className={cn('size-4 fill-none stroke-2 stroke-current', className)}
			{...props}
		>
			<line
				x1="5"
				y1="12"
				x2="19"
				y2="12"
				className="translate-x-3 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100"
			/>
			<polyline
				points="12 5 19 12 12 19"
				className="-translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0"
			/>
		</svg>
	);
}

export function DashboardIcon({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			className={className}
			{...props}
		>
			{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
			<path
				fill="currentColor"
				d="M2 6.21c0-1.984 0-2.977.659-3.593S4.379 2 6.5 2s3.182 0 3.841.617C11 3.233 11 4.226 11 6.21v11.58c0 1.984 0 2.977-.659 3.593S8.621 22 6.5 22s-3.182 0-3.841-.617C2 20.767 2 19.774 2 17.79z"
				opacity=".5"
			/>
			<path
				fill="currentColor"
				d="M13 15.4c0-2.074 0-3.111.659-3.756S15.379 11 17.5 11s3.182 0 3.841.644C22 12.29 22 13.326 22 15.4v2.2c0 2.074 0 3.111-.659 3.756S19.621 22 17.5 22s-3.182 0-3.841-.644C13 20.71 13 19.674 13 17.6zm0-9.9c0-1.087 0-1.63.171-2.06a2.3 2.3 0 0 1 1.218-1.262C14.802 2 15.327 2 16.375 2h2.25c1.048 0 1.573 0 1.986.178c.551.236.99.69 1.218 1.262c.171.43.171.973.171 2.06s0 1.63-.171 2.06a2.3 2.3 0 0 1-1.218 1.262C20.198 9 19.673 9 18.625 9h-2.25c-1.048 0-1.573 0-1.986-.178a2.3 2.3 0 0 1-1.218-1.262C13 7.13 13 6.587 13 5.5"
			/>
		</svg>
	);
}

export function UsersIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			className={className}
			{...props}
		>
			{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
			<circle cx="12" cy="6" r="4" fill="currentColor" />
			<path
				fill="currentColor"
				d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
				opacity=".5"
			/>
		</svg>
	);
}

export function AnalyticsIcon({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			className={className}
			{...props}
		>
			{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
			<path
				fill="currentColor"
				d="M6.222 4.601a9.5 9.5 0 0 1 1.395-.771c1.372-.615 2.058-.922 2.97-.33c.913.59.913 1.56.913 3.5v1.5c0 1.886 0 2.828.586 3.414s1.528.586 3.414.586H17c1.94 0 2.91 0 3.5.912c.592.913.285 1.599-.33 2.97a9.5 9.5 0 0 1-10.523 5.435A9.5 9.5 0 0 1 6.222 4.601"
				opacity=".5"
			/>
			<path
				fill="currentColor"
				d="M21.446 7.069a8.03 8.03 0 0 0-4.515-4.515C15.389 1.947 14 3.344 14 5v4a1 1 0 0 0 1 1h4c1.657 0 3.053-1.39 2.446-2.931"
			/>
		</svg>
	);
}

export function SidebarLeftClose({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1rem"
			height="1rem"
			className={className}
			{...props}
		>
			{/* Icon from ProIcons by ProCode - https://github.com/ProCode-Software/proicons/blob/main/LICENSE */}
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M3.75 7.25a3.5 3.5 0 0 1 3.5-3.5h9.5a3.5 3.5 0 0 1 3.5 3.5v9.5a3.5 3.5 0 0 1-3.5 3.5h-9.5a3.5 3.5 0 0 1-3.5-3.5zm5.797-3.5v16.5"
			/>
		</svg>
	);
}

export function SidebarLeftOpen({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1rem"
			height="1rem"
			className={className}
			{...props}
		>
			{/* Icon from ProIcons by ProCode - https://github.com/ProCode-Software/proicons/blob/main/LICENSE */}
			<g fill="none">
				<path
					fill="currentColor"
					d="M7.25 3.75a3.5 3.5 0 0 0-3.5 3.5v9.5a3.5 3.5 0 0 0 3.5 3.5h2.297V3.75z"
				/>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M9.547 3.75H7.25a3.5 3.5 0 0 0-3.5 3.5v9.5a3.5 3.5 0 0 0 3.5 3.5h2.297m0-16.5h7.203a3.5 3.5 0 0 1 3.5 3.5v9.5a3.5 3.5 0 0 1-3.5 3.5H9.547m0-16.5v16.5"
				/>
			</g>
		</svg>
	);
}

export function RevenueIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			className={className}
			viewBox="0 0 24 24"
			{...props}
		>
			{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
			<path
				fill="currentColor"
				d="M5.75 7a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
			/>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M21.188 8.004q-.094-.005-.2-.004h-2.773C15.944 8 14 9.736 14 12s1.944 4 4.215 4h2.773q.106.001.2-.004c.923-.056 1.739-.757 1.808-1.737c.004-.064.004-.133.004-.197V9.938c0-.064 0-.133-.004-.197c-.069-.98-.885-1.68-1.808-1.737m-3.217 5.063c.584 0 1.058-.478 1.058-1.067c0-.59-.474-1.067-1.058-1.067s-1.06.478-1.06 1.067c0 .59.475 1.067 1.06 1.067"
				clipRule="evenodd"
			/>
			<path
				fill="currentColor"
				d="M21.14 8.002c0-1.181-.044-2.448-.798-3.355a4 4 0 0 0-.233-.256c-.749-.748-1.698-1.08-2.87-1.238C16.099 3 14.644 3 12.806 3h-2.112C8.856 3 7.4 3 6.26 3.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87C2 8.401 2 9.856 2 11.694v.112c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.749.748 1.698 1.08 2.87 1.238c1.14.153 2.595.153 4.433.153h2.112c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238q.305-.308.526-.66c.45-.72.504-1.602.504-2.45l-.15.001h-2.774C15.944 16 14 14.264 14 12s1.944-4 4.215-4h2.773q.079 0 .151.002"
				opacity=".5"
			/>
		</svg>
	);
}

export function IntegrationsIcon({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			className={className}
			{...props}
		>
			{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M17.5 2.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25V9.5a.75.75 0 0 1-1.5 0V7.25H14.5a.75.75 0 0 1 0-1.5h2.25V3.5a.75.75 0 0 1 .75-.75"
				clipRule="evenodd"
			/>
			<path
				fill="currentColor"
				d="M2 6.5c0-2.121 0-3.182.659-3.841S4.379 2 6.5 2s3.182 0 3.841.659S11 4.379 11 6.5s0 3.182-.659 3.841S8.621 11 6.5 11s-3.182 0-3.841-.659S2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22s-3.182 0-3.841-.659S13 19.621 13 17.5"
			/>
			<path
				fill="currentColor"
				d="M2 17.5c0-2.121 0-3.182.659-3.841S4.379 13 6.5 13s3.182 0 3.841.659S11 15.379 11 17.5s0 3.182-.659 3.841S8.621 22 6.5 22s-3.182 0-3.841-.659S2 19.621 2 17.5"
				opacity=".5"
			/>
		</svg>
	);
}

export function DoubleRingIcon({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			className={className}
			{...props}
		>
			{/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
			<path
				fill="currentColor"
				d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2a8 8 0 0 1 8 8a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8m0 2a6 6 0 0 0-6 6a6 6 0 0 0 6 6a6 6 0 0 0 6-6a6 6 0 0 0-6-6m0 2a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4"
			/>
		</svg>
	);
}

export function ActivityIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			className={className}
			{...props}
		>
			<path
				fill="currentColor"
				d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12"
				opacity=".5"
			/>
			<path
				fill="currentColor"
				d="M7 16.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zm0-3.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5zM22 5a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
			/>
		</svg>
	);
}

export function WarningCircleIcon({
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			className={className}
			{...props}
		>
			<path
				opacity=".4"
				d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
				fill="currentColor"
			/>
			<path
				d="M12 13.75c.41 0 .75-.34.75-.75V8c0-.41-.34-.75-.75-.75s-.75.34-.75.75v5c0 .41.34.75.75.75ZM12.92 15.619c-.05-.12-.12-.23-.21-.33-.1-.09-.21-.16-.33-.21a1 1 0 0 0-.76 0c-.12.05-.23.12-.33.21-.09.1-.16.21-.21.33-.05.12-.08.25-.08.38s.03.26.08.38c.05.13.12.23.21.33.1.09.21.16.33.21.12.05.25.08.38.08s.26-.03.38-.08.23-.12.33-.21c.09-.1.16-.2.21-.33.05-.12.08-.25.08-.38s-.03-.26-.08-.38Z"
				fill="currentColor"
			/>
		</svg>
	);
}
