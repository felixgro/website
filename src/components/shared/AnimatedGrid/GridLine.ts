import GridPoint from './GridPoint';

export default class GridLine {
	private line: SVGLineElement | undefined = undefined;

	constructor (
		public pointA: GridPoint,
		public pointB: GridPoint,
		private width: number
	) {}

	get length (): number {
		return Math.sqrt(
			Math.pow(this.pointA.coords.x - this.pointB.coords.x, 2) +
				Math.pow(this.pointA.coords.y - this.pointB.coords.y, 2)
		);
	}

	get isHorizontal (): boolean {
		return this.pointA.coords.y === this.pointB.coords.y;
	}

	public updatePositions (): void {
		this.pointA.updateCoords();
		this.pointB.updateCoords();
	}

	public generate (parentBcr: DOMRect) {
		this.destroy();
		let { x, y } = this.pointA.coords;
		let { x: x2, y: y2 } = this.pointB.coords;

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
			(this.isHorizontal && (y === 0 || y === parentBcr.height)) ||
			(!this.isHorizontal && (x === 0 || x === parentBcr.width))
		) {
			this.line.setAttribute('stroke-width', `${this.width * 2}`);
		} else {
			this.line.setAttribute('stroke-width', `${this.width}`);
		}

		Object.assign(this.line.style, {
			strokeDasharray: `${this.length * 2}`,
			strokeDashoffset: `${this.length * 2}`
		});

		return this.line;
	}

	public animateIn (duration: number, easing: string) {
		if (!this.line) return;

		this.line
			.animate(
				[
					{
						strokeDashoffset: '0'
					}
				],
				{
					duration,
					easing
				}
			)
			.addEventListener('finish', () => {
				this.line!.style.strokeDashoffset = `0`;
			});
	}

	public animateOut (duration: number, easing: string) {
		if (!this.line) return;
		const lengthDouble = this.length * 2;

		this.line
			.animate(
				[
					{
						strokeDashoffset: `${lengthDouble}`
					}
				],
				{
					duration,
					easing
				}
			)
			.addEventListener('finish', () => {
				this.line!.style.strokeDashoffset = `${lengthDouble}`;
				this.destroy();
			});
	}

	public destroy () {
		if (this.line) this.line.remove();
	}
}
