import type { SVGProps } from 'react';

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 14 14"
			className={className}
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M7.558.198a.75.75 0 1 0-.75 1.3c1.249.72 1.888 1.977 1.917 3.346c-1.714-2.18-4.668-3.269-7.337-1.728a.75.75 0 0 0 .75 1.3c1.251-.723 2.661-.647 3.863.015C3.26 4.83.83 6.84.83 9.918a.75.75 0 1 0 1.5 0c0-1.434.769-2.613 1.939-3.324c-1.016 2.57-.489 5.672 2.172 7.208a.75.75 0 1 0 .75-1.3c-1.242-.716-1.878-1.972-1.909-3.34C7 11.326 9.95 12.42 12.611 10.884a.75.75 0 0 0-.75-1.3c-1.24.717-2.644.641-3.844-.014c2.74-.399 5.151-2.412 5.151-5.488a.75.75 0 0 0-1.5 0c0 1.442-.768 2.624-1.94 3.334c1.032-2.575.497-5.677-2.171-7.218ZM7 8.001A1.001 1.001 0 1 0 7 6a1.001 1.001 0 0 0 0 2Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
