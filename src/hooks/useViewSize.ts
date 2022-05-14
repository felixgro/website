import { useState, useEffect } from 'react';
import debounce from '../lib/debouce';

type ViewSizeOptions = {
	debounce?: number;
};

export default function useViewSize(opts?: ViewSizeOptions) {
	const [size, setSize] = useState({
		width: 0,
		height: 0
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		const debouncedResize = debounce(handleResize, opts?.debounce ?? 100);

		window.addEventListener('resize', debouncedResize);
		return () => window.removeEventListener('resize', debouncedResize);
	}, []);

	return size;
}
