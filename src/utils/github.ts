import { NextApiRequest, NextApiResponse } from 'next';
import { Repository, RepositoryLanguages } from '../types/github';

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

export default async function handler (
	req: NextApiRequest,
	res: NextApiResponse<Repository[]>
) {
	if (req.method !== 'GET') {
		res.status(405).end('Method Not Allowed');
	}

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

	res.status(200).json(ghRepos);
}
