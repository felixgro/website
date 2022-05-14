import { FC, useEffect, useRef } from 'react';
import style from '@styles/modules/Wordle.module.css';

type BoardCellProps = {
	value: string;
	idx: number;

	/**
	 * -1 -> stateless (guess not finished)
	 * 0 -> wrong letter
	 * 1 -> correct letter, wrong position
	 * 2 -> correct letter & position
	 */
	state: number;
};

const BoardCell: FC<BoardCellProps> = ({ value, state, idx }) => {
	const cell = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (value === undefined || !cell.current) return;

		cell.current.animate(
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(1.1)' },
				{ transform: 'scale(1)' }
			],
			{
				duration: 160,
				easing: 'ease-out'
			}
		);
	}, [value]);

	useEffect(() => {
		if (state === -1) return;

		setTimeout(() => {
			switch (state) {
				case 0:
					cell.current?.classList.add(style.wrongCell);
					break;
				case 1:
					cell.current?.classList.add(style.rightCell);
					break;
				case 2:
					cell.current?.classList.add(style.perfectCell);
					break;
			}
		}, idx * 40);
	}, [state, idx]);

	return (
		<div ref={cell} className={style.boardCell}>
			{value}
		</div>
	);
};

export default BoardCell;
