import React, { FC, KeyboardEventHandler, useMemo, useRef, useState } from 'react';
import BoardCell from './BoardCell';
import style from './wordle.module.scss';

type BoardRowProps = {
	solution: string;
	idx: number;
	attempt: number;
	onFinished: (won: boolean) => void;
	onFocus: () => void;
	onBlur: () => void;
};

const BoardRow: FC<BoardRowProps> = ({
	solution,
	idx,
	attempt,
	onFinished,
	onFocus,
	onBlur
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
		const charCode = char.charCodeAt(0);

		if (
			!charCode ||
			charCode < 97 ||
			charCode > 122
		)
			e.preventDefault();
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
		onFinished(stateMap.every(state => state === 2));
	};

	const setCursorToEnd = () => {
		if (!inputElement.current) return;
		const length = inputElement.current.value.length;

		setTimeout(() => {
			inputElement.current!.setSelectionRange(length, length);
		}, 1);
	}

	const setFocusState = (state: 'focus' | 'blur') => {
		if (!rowElement.current) return;

		if (state === 'focus') {
			onFocus();
			setCursorToEnd();
			rowElement.current.classList.add(style.rowInFocus);
		} else {
			onBlur();
			rowElement.current.classList.remove(style.rowInFocus);
		}
	};

	const preventCursorMovement: KeyboardEventHandler<HTMLInputElement> = (evt) => {
		if (evt.key === 'ArrowLeft' || evt.key === 'ArrowRight' || evt.key === 'ArrowUp' || evt.key === 'ArrowDown') {
			evt.preventDefault();
		}
	}

	return (
		<div className={style.boardRow} ref={rowElement}>

			<form onSubmit={handleGuessSubmit} autoComplete="off">
				<label htmlFor={`guess-${idx}`}>{`Guess ${idx + 1}`}</label>
				<input
					type='text'
					id={`guess-${idx}`}
					ref={inputElement}
					value={guess}
					onFocus={() => setFocusState('focus')}
					onBlur={() => setFocusState('blur')}
					onChange={(e) => setGuess(e.target.value)}
					onClick={setCursorToEnd}
					onKeyDown={preventCursorMovement}
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
