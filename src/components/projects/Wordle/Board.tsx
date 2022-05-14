import { FC, useState, useEffect, useRef } from 'react';
import { GameState } from '.';
import BoardRow from './BoardRow';
import style from './Wordle.module.scss';

type BoardProps = {
	gameState: GameState;
	onWin: () => void;
	onLoose: () => void;
	maxTries: number;
	solution: string;
};

const Board: FC<BoardProps> = ({ maxTries, solution, onWin, onLoose }) => {
	const [curAttempt, setCurAttempt] = useState(0);
	const marker = useRef<HTMLDivElement>(null);

	const handleRowFinished = (won = false) => {
		setCurAttempt(curAttempt => {
			if (won) {
				onWin();
				return -1;
			} else if (curAttempt + 1 < maxTries) {
				return curAttempt + 1;
			} else {
				onLoose();
				return -1;
			}
		});
	};

	const setMarkerFocus = (state: 'focus' | 'blur') => {
		if (!marker.current) return;
		marker.current.classList.toggle(style.markerFocus, state === 'focus');
	}

	useEffect(() => {
		if (curAttempt === -1) {
			marker.current!.style.opacity = '0';
			return;
		}

		const nextInput = document.querySelector<HTMLInputElement>(
			`#guess-${curAttempt}`
		);

		if (nextInput) {
			marker.current!.style.transform = `translateY(${curAttempt * 64 + curAttempt * 8}px)`;
			nextInput.focus();
		}
	}, [curAttempt, maxTries]);

	return (
		<div className={style.boardRowWrapper}>
			<div ref={marker} className={style.marker} aria-hidden="true">
				<div></div>
				<div></div>
			</div>
			{Array.from({ length: maxTries }).map((_, idx) => (
				<BoardRow
					key={idx}
					idx={idx}
					solution={solution}
					attempt={curAttempt}
					onFinished={handleRowFinished}
					onFocus={() => setMarkerFocus('focus')}
					onBlur={() => setMarkerFocus('blur')}
				/>
			))}
		</div>
	);
};

export default Board;
