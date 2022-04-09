import React, { FC, useMemo, useRef, useState } from 'react';
import BoardCell from './BoardCell';
import style from '@styles/modules/Wordle.module.css';

type BoardRowProps = {
	solution: string;
	idx: number;
	attempt: number;
	onFinished: () => void;
};

const BoardRow: FC<BoardRowProps> = ({
	solution,
	idx,
	attempt,
	onFinished
}) => {
	const rowElement = useRef<HTMLDivElement>(null);
	const inputElement = useRef<HTMLInputElement>(null);
	const [guess, setGuess] = useState('');

	const [stateMap, setStateMap] = useState<number[]>(
		Array(solution.length).fill(-1)
	);

	const valueMap = useMemo<string[]>(() => {
		if (!guess) return [];
		return guess.toUpperCase().split('');
	}, [guess]);

	const validateGuess = (e: any) => {
		const char = (e.data as string).toLowerCase();

		// TODO: check for valid input
	};

	const handleGuessUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGuess(e.target.value);
	};

	const handleGuessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// check if guess has correct length
		if (guess.length !== solution.length) return;

		// analyse guess
		const stateMap = Array(solution.length).fill(-1);

		for (let i = 0; i < solution.length; i++) {
			const guessChar = guess[i].toLowerCase();
			const solutionChar = solution[i].toLowerCase();

			if (guessChar === solutionChar) {
				stateMap[i] = 2;
			} else if (solution.toLowerCase().includes(guessChar)) {
				stateMap[i] = 1;
			} else {
				stateMap[i] = 0;
			}
		}

		// set state
		setStateMap(stateMap);

		setFocusState('blur');
		onFinished();
	};

	const setFocusState = (state: 'focus' | 'blur') => {
		if (!rowElement.current) return;

		if (state === 'focus') {
			rowElement.current.classList.add(style.rowInFocus);
		} else {
			rowElement.current.classList.remove(style.rowInFocus);
		}
	};

	return (
		<div className={style.boardRow} ref={rowElement}>
			<form onSubmit={handleGuessSubmit}>
				<label htmlFor={`guess-${idx}`}>{`Guess ${idx + 1}`}</label>
				<input
					type='text'
					id={`guess-${idx}`}
					ref={inputElement}
					onFocus={() => setFocusState('focus')}
					onBlur={() => setFocusState('blur')}
					onChange={handleGuessUpdate}
					onBeforeInput={validateGuess}
					disabled={attempt !== idx}
					maxLength={solution.length}
					className={style.boardRowInput}
				/>
			</form>
			<div className={style.boardCellWrapper} aria-hidden={true}>
				{Array.from({ length: solution.length }).map((_, i) => (
					<BoardCell
						key={i}
						idx={i}
						state={stateMap[i]}
						value={valueMap[i]}
					/>
				))}
			</div>
		</div>
	);
};

export default BoardRow;
