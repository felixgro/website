import GridLine from './GridLine';
import GridPoint, { BoxPosition } from './GridPoint';
import { RefObject } from 'react';

export type AnimatedGridConfig = {
	duration: number;
	easing: string;
	lineWidth: number;
	lineColor: string;
	svg: RefObject<SVGSVGElement>;
};

export default class AnimatedGrid {
	private lines: GridLine[] = [];
	private config: AnimatedGridConfig;

	constructor (config: AnimatedGridConfig) {
		this.config = config;
	}

	get isEmpty (): boolean {
		return this.lines.length === 0;
	}

	public setGridCells (cells: NodeListOf<HTMLElement>): this {
		const linesHor: GridLine[] = [];
		const linesVer: GridLine[] = [];

		// instanciate all possible Lines for every cell element
		cells.forEach(el => {
			const topLeft = new GridPoint(el, BoxPosition.TOP_LEFT);
			const topRight = new GridPoint(el, BoxPosition.TOP_RIGHT);
			const bottomLeft = new GridPoint(el, BoxPosition.BOTTOM_LEFT);
			const bottomRight = new GridPoint(el, BoxPosition.BOTTOM_RIGHT);

			linesHor.push(
				new GridLine(topLeft, topRight, this.config.lineWidth),
				new GridLine(bottomLeft, bottomRight, this.config.lineWidth)
			);

			linesVer.push(
				new GridLine(topLeft, bottomLeft, this.config.lineWidth),
				new GridLine(topRight, bottomRight, this.config.lineWidth)
			);
		});

		// filter and combine repeated horizontal lines
		this.lines = [
			...this.filterHorizontalLines(linesHor),
			...this.filterVerticalLines(linesVer)
		];

		return this;
	}

	public generate (content: RefObject<HTMLDivElement>): this {
		if (!this.config.svg.current) return this;
		const svg = this.config.svg.current;
		svg.innerHTML = '';
		const parentBcr = svg.parentElement!.getBoundingClientRect();
		svg.setAttribute('width', `${parentBcr.width}`);
		svg.setAttribute('height', `${parentBcr.height}`);
		const lineElements = this.lines.map(line => line.generate(parentBcr));
		svg.append(...lineElements);
		return this;
	}

	public positionate (): this {
		this.lines.forEach(line => line.updatePositions());
		this.generate();
		return this;
	}

	public animateIn (): this {
		this.lines.forEach(line =>
			line.animateIn(this.config.duration, this.config.easing)
		);
		return this;
	}

	public animateOut (): this {
		this.lines.forEach(line =>
			line.animateOut(this.config.duration / 3, this.config.easing)
		);
		return this;
	}

	public destroy (total = false): this {
		this.lines.forEach(line => line.destroy());
		if (total) this.lines = [];
		return this;
	}

	private filterHorizontalLines (linesHor: GridLine[]): GridLine[] {
		const filteredHor: GridLine[] = [];

		while (linesHor.length > 0) {
			let currRow: GridLine[] = [linesHor.shift()!];

			let idx = 0;
			let addedInIteration = false;
			while (true) {
				let hasAdded = false;
				const currLine = linesHor[idx];
				const firstLine = currRow[0];
				const lastLine = currRow[currRow.length - 1];

				if (!currLine || !firstLine || !lastLine) break;

				if (currLine.pointA.coords.y === firstLine.pointA.coords.y) {
					// check if current line is within curHor
					if (
						currLine.pointA.coords.x >= firstLine.pointA.coords.x &&
						currLine.pointB.coords.x <= lastLine.pointB.coords.x
					) {
						linesHor.splice(idx, 1);

						// check if curHor is within current line
					} else if (
						firstLine.pointA.coords.x >= currLine.pointA.coords.x &&
						lastLine.pointB.coords.x <= currLine.pointB.coords.x
					) {
						currRow = linesHor.splice(idx, 1);
						hasAdded = true;
						addedInIteration = true;

						// check if current Line extends pointA of curHor
					} else if (
						currLine.pointA.coords.x >= firstLine.pointA.coords.x &&
						currLine.pointA.coords.x <= lastLine.pointB.coords.x
					) {
						currRow.unshift(linesHor.splice(idx, 1)[0]);
						hasAdded = true;
						addedInIteration = true;

						// check if current Line extends pointB of curHor
					} else if (
						currLine.pointB.coords.x >= firstLine.pointA.coords.x &&
						currLine.pointB.coords.x <= lastLine.pointB.coords.x
					) {
						currRow.push(linesHor.splice(idx, 1)[0]);
						hasAdded = true;
						addedInIteration = true;
					}
				}

				idx++;

				if (!addedInIteration && idx >= linesHor.length) {
					break;
				} else if (hasAdded || idx >= linesHor.length) {
					idx = 0;
					addedInIteration = false;
				}
			}

			const pointA = new GridPoint(
				currRow[0].pointA.el,
				currRow[0].pointA.boxPos
			);
			const pointB = new GridPoint(
				currRow[currRow.length - 1].pointB.el,
				currRow[currRow.length - 1].pointB.boxPos
			);

			filteredHor.push(new GridLine(pointA, pointB, this.config.lineWidth));
		}

		return filteredHor;
	}

	private filterVerticalLines (linesVer: GridLine[]): GridLine[] {
		const filteredVer: GridLine[] = [];

		while (linesVer.length > 0) {
			let currCol: GridLine[] = [linesVer.shift()!];

			let idx = 0;
			let addedInIteration = false;
			while (true) {
				let hasAdded = false;
				const currLine = linesVer[idx];
				const firstLine = currCol[0];
				const lastLine = currCol[currCol.length - 1];

				if (!currLine || !firstLine || !lastLine) break;

				if (currLine.pointA.coords.x === firstLine.pointA.coords.x) {
					// check if current line is within curCol
					if (
						currLine.pointA.coords.y >= firstLine.pointA.coords.y &&
						currLine.pointB.coords.y <= lastLine.pointB.coords.y
					) {
						linesVer.splice(idx, 1);

						// check if curCol is within current line
					} else if (
						firstLine.pointA.coords.y >= currLine.pointA.coords.y &&
						lastLine.pointB.coords.y <= currLine.pointB.coords.y
					) {
						currCol = linesVer.splice(idx, 1);
						hasAdded = true;
						addedInIteration = true;

						// check if current Line extends pointA of curCol
					} else if (
						currLine.pointA.coords.y <= firstLine.pointA.coords.y &&
						currLine.pointB.coords.y >= firstLine.pointA.coords.y &&
						currLine.pointB.coords.y <= lastLine.pointB.coords.y
					) {
						currCol.unshift(linesVer.splice(idx, 1)[0]);
						hasAdded = true;
						addedInIteration = true;

						// check if current Line extends pointB of curCol
					} else if (
						currLine.pointA.coords.y >= firstLine.pointA.coords.y &&
						currLine.pointA.coords.y <= lastLine.pointB.coords.y &&
						currLine.pointB.coords.y >= lastLine.pointB.coords.y
					) {
						currCol.push(linesVer.splice(idx, 1)[0]);
						hasAdded = true;
						addedInIteration = true;
					}
				}

				idx++;

				if (!addedInIteration && idx >= linesVer.length) {
					break;
				} else if (hasAdded || idx >= linesVer.length) {
					idx = 0;
					addedInIteration = false;
				}
			}

			const pointA = new GridPoint(
				currCol[0].pointA.el,
				currCol[0].pointA.boxPos
			);
			const pointB = new GridPoint(
				currCol[currCol.length - 1].pointB.el,
				currCol[currCol.length - 1].pointB.boxPos
			);

			filteredVer.push(new GridLine(pointA, pointB, this.config.lineWidth));
		}

		return filteredVer;
	}
}
