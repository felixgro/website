import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Repository, RepositoryLanguages } from '../types/github';
import GithubTicker from '../components/GithubTicker';
import Glow from '../components/shared/Glow';

type HomeProps = {
	projects: Repository[];
};

const Home: NextPage<HomeProps> = ({ projects }) => {
	return (
		<>
			<Head>
				<title>Hello World!</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<section id='intro' className='grid-cell'>
					<h1>Hello World!</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

					<Glow>
						<div
							style={{
								position: 'relative',
								width: '400px',
								boxSizing: 'border-box',
								padding: '40px',
								margin: '50px',
								background: 'rgba(255,255,255,0.3)',
								boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.03)'
							}}
						>
							<h2 style={{ marginTop: 0 }}>Glow</h2>
							<p style={{ marginBottom: 0 }}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Minima molestiae ullam doloribus.
							</p>
						</div>
					</Glow>
					<div
						style={{
							position: 'relative',
							width: '400px',
							boxSizing: 'border-box',
							padding: '40px',
							margin: '50px',
							background: 'rgba(255,255,255,0.3)',
							boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.03)'
						}}
					>
						<h2 style={{ marginTop: 0 }}>Glow</h2>
						<p style={{ marginBottom: 0 }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Minima molestiae ullam doloribus.
						</p>
					</div>
					<div
						style={{
							position: 'relative',
							width: '400px',
							boxSizing: 'border-box',
							padding: '40px',
							margin: '50px',
							background: 'rgba(255,255,255,0.3)',
							boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.03)'
						}}
					>
						<h2 style={{ marginTop: 0 }}>Glow</h2>
						<p style={{ marginBottom: 0 }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Minima molestiae ullam doloribus.
						</p>
					</div>
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

export async function getStaticProps () {
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