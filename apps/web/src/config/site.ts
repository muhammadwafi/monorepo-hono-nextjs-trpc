interface SiteConfig {
	name: string;
	url: string;
	description: string;
}

interface MenuItem {
	link: string;
	label: string;
	disabled?: boolean;
}

export type MenuItems = MenuItem[];

export const siteConfig: SiteConfig = {
	name: process.env.APP_NAME || 'App',
	url: process.env.APP_URL || 'http://localhost:3001',
	description: process.env.APP_DESCRIPTION || 'App description',
};

export const menuItems: MenuItems = [
	{ link: '/explore', label: 'Explore' },
	{ link: '/about', label: 'About' },
	{ link: '/blog', label: 'Blog' },
];

export const META_THEME_COLORS = {
	light: '#ffffff',
	dark: '#09090b',
};
