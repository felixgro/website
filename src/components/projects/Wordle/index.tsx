import { FC, useEffect, useState } from 'react';
import Board from './Board';
import style from './wordle.module.scss';

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

	useEffect(() => {
		switch (gameState) {
			case GameState.WON:
				console.log('congrats!');
				break;
			case GameState.LOST:
				console.log('you lost... the word was: ' + solution);
				break;

		}
	}, [gameState, solution]);

	return (
		<div className={style.gameWrapper}>
			<Board
				gameState={gameState}
				solution={solution}
				maxTries={maxTries}
				onWin={() => setGameState(GameState.WON)}
				onLoose={() => setGameState(GameState.LOST)}
			/>
			{gameState === GameState.WON || gameState === GameState.LOST ?
				<div className={style.modal}>
					<h3>{gameState === GameState.WON ? 'You did it!' : 'You Lost!'}</h3>
					{gameState === GameState.WON ? (
						<p>Congrats!</p>
					) : (
						<p>The word you were looking for was <span>{solution}</span>.</p>
					)}

				</div>
				: null}
		</div>
	);
};

export default Wordle;
