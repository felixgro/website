import { FC, useState, useEffect } from 'react';
import { GameState } from '.';
import BoardRow from './BoardRow';
import style from '@styles/modules/Wordle.module.css';

type BoardProps = {
	gameState: GameState;
	onWin: () => void;
	onLoose: () => void;
	maxTries: number;
	solution: string;
};

const Board: FC<BoardProps> = ({ maxTries, solution }) => {
	const [curAttempt, setCurAttempt] = useState(0);

	const gotoNextRow = () => {
		setCurAttempt(curAttempt => curAttempt + 1);
	};

	useEffect(() => {
		if (curAttempt < maxTries) {
			// select next input
			const nextInput = document.querySelector<HTMLInputElement>(
				`#guess-${curAttempt}`
			);
			nextInput?.focus();
		}
	}, [curAttempt]);

	return (
		<div className={style.boardRowWrapper}>
			{Array.from({ length: maxTries }).map((_, idx) => (
				<BoardRow
					key={idx}
					idx={idx}
					solution={solution}
					attempt={curAttempt}
					onFinished={gotoNextRow}
				/>
			))}
		</div>
	);
};

export default Board;
