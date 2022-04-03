import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import style from '../../styles/modules/Wordle.module.css';

type BoardRowProps = {
	solution: string;
	idx: number;
	attempt: number;
	onFinished: () => void;
};

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
	}, [state]);

	return (
		<div ref={cell} className={style.boardCell}>
			{value}
		</div>
	);
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
		// if (char === 'h') {
		// 	e.preventDefault();
		// }
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
