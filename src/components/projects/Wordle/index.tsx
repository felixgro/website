import { FC, useState } from 'react';
import Board from './Board';

type WordleProps = {
	solution: string;
	maxTries?: number;
};

export enum GameState {
	PLAYING,
	WON,
	LOST
}

const Wordle: FC<WordleProps> = ({ solution, maxTries = 8 }) => {
	const [gameState, setGameState] = useState(GameState.PLAYING);

	const onWin = () => {
		setGameState(GameState.WON);
		console.log('congrats!');
	};

	const onLoose = () => {
		setGameState(GameState.LOST);
		console.log('the word you were looking for was:', solution);
	};

	return (
		<Board
			gameState={gameState}
			solution={solution}
			maxTries={maxTries}
			onWin={onWin}
			onLoose={onLoose}
		/>
	);
};

export default Wordle;
