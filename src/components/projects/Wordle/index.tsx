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

const Wordle: FC<WordleProps> = ({ solution, maxTries }) => {
	maxTries = maxTries || 5;
	const [gameState, setGameState] = useState(GameState.PLAYING);

	const generateGameLink = (e: any) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const secretWord = formData.getAll('word')[0];
		const maxTriesValue = formData.getAll('maxtries')[0];

		fetch(`/api/encrypt?q=${secretWord}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(({ content, iv }) => {
				const { origin, pathname } = location;
				const url =
					origin + pathname + `?q=${content}&i=${iv}&t=${maxTriesValue}`;

				navigator.clipboard.writeText(url);
				console.log(url + ' copied to clipboard');
			});
	};

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
						<button className='button--primary'>Create Wordle</button>
						<button className='button--secondary' onClick={() => location.reload()}>Reset</button>
					</div>

					<form onSubmit={generateGameLink}>
						<h2>Generate Wordle</h2>
						<label>Word (max: 8 Characters)</label>
						<input type='text' name='word' maxLength={8} />
						<label>Max Tries</label>
						<input
							type='number'
							name='maxtries'
							defaultValue={6}
							min={3}
							max={10}
						/>
						<button type='submit' className='button--primary'>Generate & Copy Link</button>
					</form>
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
		</main>
	);
};

export default Wordle;
