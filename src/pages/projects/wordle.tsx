import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from '@components/Head';
import Wordle from '@components/projects/Wordle';
import { decrypt } from '@utils/crypto';

type WordlePageProps = {
	secretWord: string;
	maxTries?: number;
};

const Worlde: NextPage<WordlePageProps> = ({ secretWord, maxTries }) => {
	return (
		<>
			<Head title="Wordle Clone" />
			<Wordle solution={secretWord} maxTries={maxTries} />
		</>
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
