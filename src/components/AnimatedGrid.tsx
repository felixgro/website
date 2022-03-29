import { FC, useEffect, useRef, useState } from 'react';
import useViewSize from '../hooks/useViewSize';
import styles from '../styles/modules/AnimatedGrid.module.css';

const lineWidth = 2;

interface Position {
	x: number;
	y: number;
}

enum GridLinePosition {
	TOP,
	RIGHT,
	BOTTOM,
	LEFT
}

class Grid {
	private lines: GridLine[] = [];

	constructor (elements?: NodeListOf<HTMLElement>) {
		if (elements) this.setGridCells(elements);
	}

	public setGridCells (elements: NodeListOf<HTMLElement>): this {
		elements.forEach(el => {
			this.lines.push(
				new GridLine(el, GridLinePosition.TOP),
				new GridLine(el, GridLinePosition.RIGHT),
				new GridLine(el, GridLinePosition.BOTTOM),
				new GridLine(el, GridLinePosition.LEFT)
			);
		});

		return this;
	}

	public generate (svg: SVGSVGElement) {
		const parentBcr = svg.parentElement!.getBoundingClientRect();
		svg.setAttribute('width', `${parentBcr.width}`);
		svg.setAttribute('height', `${parentBcr.height}`);
		const lineElements = this.lines.map(line => line.generate(parentBcr));
		svg.append(...lineElements);
		// window.addEventListener('resize', () => {
		// 	this.destroy();
		// 	this.generate(svg);
		// });
	}

	public destroy (): this {
		this.lines.forEach(line => line.destroy());
		return this;
	}
}

class GridLine {
	private line: SVGLineElement | undefined = undefined;
	private element: HTMLElement;
	private pos: GridLinePosition;
	private fromPos: Position | undefined = undefined;
	private toPos: Position | undefined = undefined;

	constructor (element: HTMLElement, position: GridLinePosition) {
		this.element = element;
		this.pos = position;
		window.addEventListener('resize', this.updatePositionCoords.bind(this));
	}

	get isHorizontal (): boolean {
		return (
			this.pos === GridLinePosition.TOP ||
			this.pos === GridLinePosition.BOTTOM
		);
	}

	get from (): Position {
		if (this.fromPos === undefined) this.updatePositionCoords();
		return this.fromPos!;
	}

	get to (): Position {
		if (this.toPos === undefined) this.updatePositionCoords();
		return this.toPos!;
	}

	public generate (parentBcr: DOMRect) {
		let { x, y } = this.from;
		let { x: x2, y: y2 } = this.to;

		x -= parentBcr.x;
		y -= parentBcr.y;
		x2 -= parentBcr.x;
		y2 -= parentBcr.y;

		this.line = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'line'
		);
		this.line.setAttribute('x1', `${x}`);
		this.line.setAttribute('y1', `${y}`);
		this.line.setAttribute('x2', `${x2}`);
		this.line.setAttribute('y2', `${y2}`);
		this.line.setAttribute('stroke', '#ccc');
		if (
			(this.isHorizontal && y > 0 && y < parentBcr.height) ||
			(!this.isHorizontal && x > 0 && x < parentBcr.width)
		) {
			this.line.setAttribute('stroke-width', `${lineWidth}`);
		} else {
			this.line.setAttribute('stroke-width', `${lineWidth * 2}`);
		}

		return this.line;
	}

	public destroy () {
		window.removeEventListener(
			'resize',
			this.updatePositionCoords.bind(this)
		);

		if (this.line) this.line.remove();
	}

	private updatePositionCoords () {
		const { top, left, width, height } = this.element.getBoundingClientRect();

		switch (this.pos) {
			case GridLinePosition.TOP:
				this.fromPos = { x: left, y: top };
				this.toPos = { x: left + width, y: top };
				break;
			case GridLinePosition.RIGHT:
				this.fromPos = { x: left + width, y: top };
				this.toPos = { x: left + width, y: top + height };
				break;
			case GridLinePosition.BOTTOM:
				this.fromPos = { x: left, y: top + height };
				this.toPos = { x: left + width, y: top + height };
				break;
			case GridLinePosition.LEFT:
				this.fromPos = { x: left, y: top };
				this.toPos = { x: left, y: top + height };
				break;
		}
	}
}

const AnimatedGrid: FC = ({ children }) => {
	const gridElement = useRef<SVGSVGElement>(null);
	const content = useRef<HTMLDivElement>(null);

	const [grid] = useState<Grid>(new Grid());

	const { width } = useViewSize({ debounce: 240 });

	useEffect(() => {
		if (!content.current || !gridElement.current) return;
		if (gridElement.current.children.length === 0) {
			const gridCells = content.current.querySelectorAll<HTMLElement>(
				`.grid-cell`
			);
			grid.setGridCells(gridCells).generate(gridElement.current);
			gridElement.current.classList.add(styles.visible);
		}
	}, [children, grid]);

	useEffect(() => {
		if (!gridElement.current || !content.current) return;
		gridElement.current.setAttribute(
			'width',
			`${content.current.clientWidth}`
		);
		grid.destroy().generate(gridElement.current);
	}, [width, grid]);

	return (
		<div className='overlay'>
			<div ref={content}>{children}</div>
			<div className={styles.svgWrapper}>
				<svg ref={gridElement} className={styles.svg}></svg>
			</div>
		</div>
	);
};

export default AnimatedGrid;
