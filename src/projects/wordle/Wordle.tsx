import { FC, useEffect, useState } from 'react';
import BoardRow from './BoardRow';
import style from '../../styles/modules/Wordle.module.css';

type WordleProps = {
	solution: string;
	maxTries?: number;
};

const Wordle: FC<WordleProps> = ({ solution, maxTries = 8 }) => {
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

export default Wordle;
