import { NextPage } from 'next';
import Head from '@components/base/Head';
import { Repository, RepositoryLanguages } from '../types/github';
import GithubTicker from '../components/base/GithubTicker';

type HomeProps = {
	projects: Repository[];
};

const Home: NextPage<HomeProps> = ({ projects }) => {
	return (
		<>
			<Head />

			<main>
				<section id='intro' className='grid-cell'>
					<h1>Hello World!</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</section>

				<section id='github-project'>
					<div className='grid-cell'>
						<GithubTicker projects={projects} />
					</div>
					<div className='grid-cell'>
						<h2>Github Projects</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Quis, accusamus eius aut tempore officia eaque pariatur
							voluptatibus ab suscipit facilis molestiae sed ullam fugiat
							inventore. Adipisci atque cumque facere sed.
						</p>
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;

export async function getStaticProps() {
	const { GH_USER, GH_TOKEN } = process.env;

	const isValidRepository = (r: Repository): boolean => {
		return (
			!!r.description &&
			!r.private &&
			!r.fork &&
			!r.description.includes('[private]')
		);
	};

	const getLanguageStats = async (
		repo: Repository
	): Promise<RepositoryLanguages> => {
		const res = await fetch(`https://api.github.com/users/${GH_USER}/repos`, {
			headers: {
				Authorization: `token ${GH_TOKEN}`,
				'Content-Type': 'application/json'
			}
		});
		return await res.json();
	};

	const ghReposRaw = await fetch(
		`https://api.github.com/users/${GH_USER}/repos`,
		{
			headers: {
				Authorization: `token ${GH_TOKEN}`,
				'Content-Type': 'application/json'
			}
		}
	);

	const ghRepos: Repository[] = (await ghReposRaw.json()).filter(
		isValidRepository
	);

	// TODO: Add languages
	const langs = await getLanguageStats(ghRepos[0]);

	return {
		props: {
			projects: ghRepos
		}
	};
}
