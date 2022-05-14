import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from '@components/base/Head';
import Wordle from '@components/projects/Wordle';
import { decrypt } from '@lib/crypto';

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

	if (context.query.s && typeof context.query.s === 'string') {
		const decrypted = decrypt(context.query.s as string);
		maxTries = parseInt(decrypted[decrypted.length - 1]);
		secretWord = decrypted.slice(0, -1);
	} else {
		const words: string[] = await import('@components/projects/Wordle/words.json');
		const randomId = Math.floor(Math.random() * words.length);
		secretWord = words[randomId];
	}

	return {
		props: { secretWord, maxTries }
	};
};
