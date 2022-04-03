import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Wordle from '../../projects/wordle/Wordle';
import { decrypt } from '../../utils/crypto';

type WordlePageProps = {
	secretWord: string;
	maxTries?: number;
};

const Worlde: NextPage<WordlePageProps> = ({ secretWord, maxTries }) => {
	const generateGameLink = (e: any) => {
		e.preventDefault();
		// get form data
		const formData = new FormData(e.target as HTMLFormElement);
		const secretWord = formData.getAll('word')[0];
		const maxTriesValue = formData.getAll('maxtries')[0];

		console.log({ secretWord, maxTriesValue });

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

			<main className='grid-cell'>
				<section id='project'>
					<Wordle solution={secretWord} maxTries={maxTries ?? 6} />
				</section>

				<section id='meta'>
					<form onSubmit={generateGameLink}>
						<h2>Generate Wordle</h2>
						<label>Word</label>
						<input type='text' name='word' />
						<label>Max Tires</label>
						<input
							type='number'
							name='maxtries'
							defaultValue={6}
							min={3}
							max={10}
						/>
						<button type='submit'>Generate Link</button>
					</form>
				</section>
			</main>
		</div>
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
		const words = await import('../../projects/wordle/words.json');
		const randomId = Math.floor(Math.random() * words.length);
		// @ts-ignore
		secretWord = words[randomId];
	}

	return {
		props: { secretWord, maxTries }
	};
};
