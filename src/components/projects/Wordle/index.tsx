import { FC, useEffect, useState } from 'react';
import WordleForm from './WordleForm';
import Board from './Board';
import style from './Wordle.module.scss';

type WordleProps = {
	solution: string;
	maxTries?: number;
};

export enum GameState {
	PLAYING,
	WON,
	LOST
}

const Wordle: FC<WordleProps> = ({ solution, maxTries }) => {
	maxTries = maxTries || 6;
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
		<main className={style.main}>
			<section>
				<header className='grid-cell'>
					<div>
						<h1>Worlde Clone</h1>
					</div>
					<div>
					</div>
				</header>

				<article className='grid-cell'>
					<div>
						<h2>Lorem ipsum, dolor sit amet</h2>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum ad nobis nam architecto possimus vero natus voluptate! Enim, voluptates aut quibusdam labore dolorum dignissimos officia suscipit ducimus modi doloribus natus?
						</p>
					</div>
				</article>
			</section>

			<section className='grid-cell'>
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
			</section>

			<section className='grid-cell'>
				<WordleForm />
			</section>
		</main>
	);
};

export default Wordle;
