import {
	ActivityIcon,
	AnalyticsIcon,
	DashboardIcon,
	IntegrationsIcon,
	RevenueIcon,
	UsersIcon,
} from '@/components/icons';
import { CircleHelpIcon, SettingsIcon } from 'lucide-react';

export interface InternalMenuItem {
	title: string;
	url: string;
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type InternalMenu = InternalMenuItem[];

export interface InternalMenuGroupItem extends InternalMenuItem {
	items: InternalMenu;
}
export type InternalMenuGroup = InternalMenuGroupItem[];

export const ADMIN_ROLES = new Set<string>(['superadmin', 'admin']);

export const mainMenu: InternalMenuGroup = [
	{
		title: 'Overview',
		url: '#',
		items: [
			{ url: '/admin', title: 'Dashboard', icon: DashboardIcon },
			{ url: '/admin/analytics', title: 'Analytics', icon: AnalyticsIcon },
			{ url: '/admin/revenue', title: 'Revenue', icon: RevenueIcon },
		],
	},
	{
		title: 'Management',
		url: '#',
		items: [
			{ url: '/admin/users', title: 'Users', icon: UsersIcon },
			{
				url: '/admin/integrations',
				title: 'Integrations',
				icon: IntegrationsIcon,
			},
		],
	},
];

export const secondaryMenu: InternalMenu = [
	{ url: '/settings', title: 'Settings', icon: SettingsIcon },
	{ url: '/help', title: 'Help', icon: CircleHelpIcon },
];

export const dashboardMenu: InternalMenuGroup = [
	{
		title: 'Overview',
		url: '#',
		items: [
			{ url: '/dashboard', title: 'Dashboard', icon: DashboardIcon },
			{ url: '/dashboard/activity', title: 'Activity', icon: ActivityIcon },
		],
	},
];
