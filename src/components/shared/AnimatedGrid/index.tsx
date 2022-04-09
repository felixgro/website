import { FC, useEffect, useRef, useState } from 'react';
import { RouterState } from '@hooks/useRouterState';
import AnimatedGrid, { AnimatedGridConfig } from './Grid';
import useViewSize from '@hooks/useViewSize';
import styles from '@styles/modules/AnimatedGrid.module.css';

type AnimatedGridProps = {
	routerState: RouterState;
};

const useAnimatedGrid = (config: AnimatedGridConfig) => {
	const [grid] = useState<AnimatedGrid>(new AnimatedGrid(config));
	return grid;
};

const Grid: FC<AnimatedGridProps> = ({ children, routerState }) => {
	const gridSVG = useRef<SVGSVGElement>(null);
	const content = useRef<HTMLDivElement>(null);

	const grid = useAnimatedGrid({
		duration: 1400,
		easing: 'ease-out',
		lineColor: '#ccc',
		lineWidth: 2,
		svg: gridSVG
	});

	const { width } = useViewSize({ debounce: 240 });

	const generateGrid = (animate = true) => {
		if (!content.current) return;
		const gridCells = content.current!.querySelectorAll<HTMLElement>(
			`.grid-cell`
		);

		const { width, height } = content.current!.getBoundingClientRect();

		gridSVG.current!.setAttribute('width', width + '');
		gridSVG.current!.setAttribute('height', height + '');

		grid.setGridCells(gridCells).generate(content);
		if (animate) grid.animateIn();
	};

	useEffect(() => {
		if (grid.isEmpty) return;
		grid.positionate();
	}, [width]);

	const destroyGrid = () => {
		grid.animateOut();
	};

	useEffect(() => {
		switch (routerState) {
			case RouterState.INITIAL:
				generateGrid();
				break;
			case RouterState.LOADING:
				destroyGrid();
				break;
			case RouterState.LOADED:
				generateGrid();
				break;
		}

		console.log(routerState);
	}, [routerState]);

	return (
		<div className='overlay'>
			<div ref={content}>{children}</div>
			<div className={styles.svgWrapper} aria-hidden={true}>
				<svg ref={gridSVG} className={styles.svg}></svg>
			</div>
		</div>
	);
};

export default Grid;
