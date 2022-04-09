export enum BoxPosition {
	TOP_LEFT = 0,
	TOP_RIGHT,
	BOTTOM_LEFT,
	BOTTOM_RIGHT
}

export type Coords = {
	x: number;
	y: number;
};

export default class GridPoint {
	public el: HTMLElement;
	public boxPos: BoxPosition;

	private _coords: Coords | undefined;

	constructor (el: HTMLElement, boxPos: BoxPosition) {
		this.el = el;
		this.boxPos = boxPos;
	}

	get coords (): Coords {
		if (!this._coords) this.updateCoords();
		return this._coords!;
	}

	public updateCoords (): void {
		const { top, left, width, height } = this.el.getBoundingClientRect();

		switch (this.boxPos) {
			case BoxPosition.TOP_LEFT:
				this._coords = {
					x: left,
					y: top
				};
				break;
			case BoxPosition.TOP_RIGHT:
				this._coords = {
					x: left + width,
					y: top
				};
				break;
			case BoxPosition.BOTTOM_LEFT:
				this._coords = {
					x: left,
					y: top + height
				};
				break;
			case BoxPosition.BOTTOM_RIGHT:
				this._coords = {
					x: left + width,
					y: top + height
				};
				break;
		}
	}
}
