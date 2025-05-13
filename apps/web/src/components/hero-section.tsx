import { ArrowRightIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
	return (
		<div className="mb-12 grid grid-cols-1 gap-10">
			<div className="grid grid-cols-1 gap-6">
				<div className="max-w-3xl font-medium text-5xl tracking-tight sm:text-7xl">
					Revenue platforms for digital creators
				</div>
				<div className="max-w-lg text-balance text-muted-foreground text-xl">
					Everything you need to grow, engage, and monetize your audience — all
					in one place.
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button asChild size="lg" className="font-normal text-base">
					<Link href="/login">Start earning</Link>
				</Button>
				<Button
					asChild
					size="lg"
					variant="ghost"
					className="group flex items-center font-normal text-base"
				>
					<Link href="/login">
						<span>Learn more</span>
						<ArrowRightIcon className="-ml-0.5" />
					</Link>
				</Button>
			</div>
		</div>
	);
}
