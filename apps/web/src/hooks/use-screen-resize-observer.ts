import { useEffect, useState } from 'react';

interface ScreenSize {
	width: number;
	height: number;
}

export const useScreenResizeObserver = (): ScreenSize => {
	const [screenSize, setScreenSize] = useState<ScreenSize>({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
	});

	useEffect(() => {
		const handleResize = (entries: ResizeObserverEntry[]): void => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				setScreenSize({ width, height });
			}
		};

		const resizeObserver = new ResizeObserver(handleResize);

		// Observe the document body for size changes
		if (document.body) {
			resizeObserver.observe(document.body);
		}

		// Cleanup function
		return (): void => {
			if (document.body) {
				resizeObserver.unobserve(document.body);
			}
			resizeObserver.disconnect();
		};
	}, []);

	return screenSize;
};
