import { FC, useEffect, useRef, useState } from 'react';
import { RouterState } from '@hooks/useRouterState';
import AnimatedGrid, { AnimatedGridConfig } from './Grid';
import useViewSize from '@hooks/useViewSize';
import styles from './Grid.module.scss';

type Props = {
	className: string;
	config: AnimatedGridConfig;
	routerState: RouterState;
};

const Grid: FC<Props> = ({ children, routerState, config, className = '' }) => {
	const [grid] = useState(new AnimatedGrid(config));
	const gridSVG = useRef<SVGSVGElement>(null);
	const content = useRef<HTMLDivElement>(null);

	const { width } = useViewSize({ debounce: 120 });

	// Set important elements on first render
	useEffect(() => {
		grid.setRefs(gridSVG, content);
	}, [grid]);

	// Generate new grid on resize without animation
	useEffect(() => {
		if (grid.isEmpty) return;
		grid.generate(false);
	}, [width, grid]);

	// Generate & animate new grid on route change
	useEffect(() => {
		switch (routerState) {
			case RouterState.INITIAL:
				grid.generate();
				break;
			case RouterState.LOADING:
				grid.animateOut();
				break;
			case RouterState.LOADED:
				grid.generate();
				break;
		}
	}, [routerState, grid]);

	return (
		<div className={`${styles.gridWrapper} ${className}`}>
			<div ref={content}>{children}</div>
			<div className={styles.svgWrapper} aria-hidden={true}>
				<svg ref={gridSVG} className={styles.svg}></svg>
			</div>
		</div>
	);
};

export default Grid;
