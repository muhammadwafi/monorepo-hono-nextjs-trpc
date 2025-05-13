import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export default function LayoutLoader({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex min-h-[300px] w-full items-center', className)}
			{...props}
		>
			<Spinner className="mx-auto" />
		</div>
	);
}
