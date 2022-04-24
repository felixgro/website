import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Wordle from '@components/projects/Wordle';
import Badge from '@components/shared/Badge';
import { decrypt } from '@utils/crypto';
import style from '@styles/pages/wordle.module.scss';
import dynamic from 'next/dynamic';

const MetricCard = dynamic(
	() => import('@components/shared/MetricCard'),
	{ ssr: false }
);

type WordlePageProps = {
	secretWord: string;
	maxTries?: number;
};

const Worlde: NextPage<WordlePageProps> = ({ secretWord, maxTries }) => {
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

	return (
		<div>
			<Head>
				<title>Worlde Clone</title>
			</Head>

			<main className={style.main}>
				<section>
					<header className='grid-cell'>
						<div>
							<h1>Worlde</h1>
							<Badge label={'1.0.0'} />
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
					<Wordle solution={secretWord} maxTries={maxTries ?? 6} />
				</section>
			</main>
		</div >
	);
};

export default Worlde;

export const getServerSideProps: GetServerSideProps = async context => {
	let secretWord: string = '';
	let maxTries: number | null = null;

	if (context.query.q && context.query.i && context.query.t) {
		const content = context.query.q as string;
		const iv = context.query.i as string;
		maxTries = parseInt(context.query.t as string, 10);
		secretWord = decrypt({ content, iv });
	} else {
		const words: string[] = await import('@components/projects/Wordle/words.json');
		const randomId = Math.floor(Math.random() * words.length);
		secretWord = words[randomId];
	}

	return {
		props: { secretWord, maxTries }
	};
};
