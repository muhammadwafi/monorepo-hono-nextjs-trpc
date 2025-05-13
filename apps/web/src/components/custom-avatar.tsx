import { getInitials } from '@/lib/utils';
import type React from 'react';

// function stringToGradient(name: string, email: string): string {
// 	const combined = name + email;
// 	let hash = 0;

// 	for (let i = 0; i < combined.length; i++) {
// 		hash = combined.charCodeAt(i) + ((hash << 5) - hash);
// 	}

// 	// Generate a base hue from the hash
// 	let baseHue = Math.abs(hash) % 360;

// 	// Avoid lime/yellow range (50–90°), shift away if needed
// 	if (baseHue >= 80 && baseHue <= 90) {
// 		baseHue = (baseHue + 90) % 360;
// 	}

// 	// Select a second hue using a visually pleasing contrast
// 	const schemeOptions = [30, 60, 120, 160, 180]; // angles for harmony
// 	const angle = schemeOptions[Math.abs(hash) % schemeOptions.length];
// 	const secondHue = (baseHue + angle) % 360;

// 	// Generate direction
// 	const directions = [
// 		'to top',
// 		'to bottom',
// 		'135deg',
// 		'225deg',
// 		'circle at top left',
// 		'circle at top right',
// 		'circle at bottom left',
// 		'circle at bottom right',
// 	];

// 	const direction = directions[Math.abs(hash * 7) % directions.length];
// 	const gradientType = direction.startsWith('circle')
// 		? 'radial-gradient'
// 		: 'linear-gradient';

// 	// Balanced saturation & lightness
// 	const color1 = `hsl(${baseHue}, 70%, 60%)`;
// 	const color2 = `hsl(${secondHue}, 90%, 50%)`;

// 	return `${gradientType}(${direction}, ${color1}, ${color2})`;
// }

function stringToGradient(name: string, email: string): string {
	const combined = name + email;
	let hash = 0;

	for (let i = 0; i < combined.length; i++) {
		hash = combined.charCodeAt(i) + ((hash << 5) - hash);
	}

	const tailwindColorFamilies = [
		{ name: 'red', baseHue: 0 },
		{ name: 'orange', baseHue: 24 },
		{ name: 'amber', baseHue: 42 },
		{ name: 'yellow', baseHue: 52 },
		{ name: 'lime', baseHue: 80 },
		{ name: 'green', baseHue: 142 },
		{ name: 'emerald', baseHue: 160 },
		{ name: 'teal', baseHue: 170 },
		{ name: 'cyan', baseHue: 190 },
		{ name: 'sky', baseHue: 200 },
		{ name: 'blue', baseHue: 220 },
		{ name: 'indigo', baseHue: 250 },
		{ name: 'violet', baseHue: 270 },
		{ name: 'purple', baseHue: 280 },
		{ name: 'fuchsia', baseHue: 305 },
		{ name: 'pink', baseHue: 330 },
		{ name: 'rose', baseHue: 345 },
	];

	const colorIndex1 = Math.abs(hash) % tailwindColorFamilies.length;
	let colorIndex2 =
		(colorIndex1 + 5 + (Math.abs(hash) % 7)) % tailwindColorFamilies.length;
	if (colorIndex2 === colorIndex1)
		colorIndex2 = (colorIndex1 + 3) % tailwindColorFamilies.length;

	const hue1 = tailwindColorFamilies[colorIndex1].baseHue;
	const hue2 = tailwindColorFamilies[colorIndex2].baseHue;

	const colorStops = [
		`hsl(${hue1}, 85%, 75%)`,
		`hsl(${hue1}, 90%, 60%)`,
		`hsl(${hue2}, 90%, 55%)`,
		`hsl(${hue2}, 100%, 45%)`,
	];

	let x = -10 + (Math.abs(hash * 11) % 150);
	let y = 10 + (Math.abs(hash * 17) % 150);

	if (Math.abs(x - 50) < 8) x = (x + 25) % 100;
	if (Math.abs(y - 50) < 8) y = (y + 35) % 100;

	const position = `circle farthest-corner at ${x}% ${y}%`;

	return `radial-gradient(${position}, ${colorStops.join(', ')})`;
}

interface AvatarProps {
	name: string;
	email: string;
}

export const CustomAvatar: React.FC<AvatarProps> = ({ name, email }) => {
	const background = stringToGradient(name, email);
	const initial = name ? getInitials(name) : '?';

	return (
		<div
			className="center flex size-8 items-center justify-center rounded-full font-semibold text-sm text-white uppercase"
			style={{
				background,
			}}
		>
			{initial}
		</div>
	);
};
