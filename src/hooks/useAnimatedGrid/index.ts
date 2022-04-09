import { useState } from 'react';
import AnimatedGrid, { AnimatedGridConfig } from './Grid';

export default function useAnimatedGrid (config: AnimatedGridConfig) {
	const [grid] = useState<AnimatedGrid>(new AnimatedGrid(config));
	return grid;
}
