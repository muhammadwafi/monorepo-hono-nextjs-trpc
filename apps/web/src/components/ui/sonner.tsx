import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			style={
				{
					fontFamily: 'inherit',
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
					'--border-radius': '12px',
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:!bg-zinc-900 group-[.toaster]:!text-white group-[.toaster]:!border-transparent group-[.toaster]:!shadow-toast !py-3 !pl-4 !pr-8 !items-start group-[.toaster]:!w-[356px] group-[.toaster]:!flex group-[.toaster]:!items-center group-[.toaster]:!text-sm',
					description: 'group-[.toast]:!text-muted-foreground',
					actionButton:
						'group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground',
					cancelButton:
						'group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground',
					closeButton:
						'group-[.toast]:!bg-transparent group-[.toast]:!size-6 hover:group-[.toast]:!bg-white/10 group-[.toast]:!-right-0.5 group-[.toast]:!border-none group-[.toast]:!top-[19px] group-[.toast]:!left-[unset] [&>svg]:!size-4 [&>svg]:!text-white/70 hover:[&>svg]:!text-white',
					icon: '!mt-0.5',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
