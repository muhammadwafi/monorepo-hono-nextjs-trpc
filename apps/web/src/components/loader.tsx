export function Loader() {
	return (
		<div className="flex items-center justify-center pt-8">
			<svg
				className="relative flex h-8 w-8 animate-spin-fast text-primary"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					className="absolute h-full w-full rounded-full border-3 border-b-primary opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path
					className="absolute h-full w-full rounded-full border-3 border-b-primary opacity-75"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					fill="currentColor"
				/>
			</svg>
		</div>
	);
}
