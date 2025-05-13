import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { Button } from './button';

const alertDisimissableVariant = cva(
	'relative flex items-start space-x-2 rounded-md border p-2 pr-9 text-sm',
	{
		variants: {
			variant: {
				default: 'border-input text-muted-foreground dark:text-white',
				error:
					'border-red-500 bg-red-500/5 text-red-500 dark:bg-red-500/20 dark:text-red-200',
				success:
					'border-green-600 bg-green-500/5 text-green-600 dark:bg-green-500/20 dark:text-green-200',
				warning:
					'border-amber-600 bg-amber-500/5 text-amber-600 dark:bg-amber-500/20 dark:text-amber-200',
				info: 'border-blue-600 bg-blue-500/5 text-blue-500 dark:bg-blue-500/20 dark:text-blue-200',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

interface AlertDismissableProps {
	className?: string;
	variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
	show: boolean;
	handleShow: (show: boolean | ((prevShow: boolean) => boolean)) => void;
	children: React.ReactNode;
}

const AlertDismissable = ({
	className,
	variant,
	show,
	handleShow,
	children,
	...props
}: AlertDismissableProps) => {
	const toggleAlert = () => {
		handleShow((prevShow) => !prevShow);
	};

	return (
		show && (
			<div
				data-slot="alert"
				role="alert"
				className={cn(alertDisimissableVariant({ variant }), className)}
				{...props}
			>
				{children}
				<Button
					variant="ghost"
					size="icon"
					className="absolute top-1.5 right-1 h-6 w-6 hover:bg-muted"
					onClick={toggleAlert}
				>
					<X className="h-4 w-4" />
				</Button>
			</div>
		)
	);
};

export { AlertDismissable, alertDisimissableVariant };
