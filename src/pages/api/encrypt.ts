// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { encrypt } from '@lib/crypto';

type Data = {
	encrypted: string;
	cleanSecret: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ encrypted: string }>
) {
	const query = req.query.q;
	if (!query || typeof query !== 'string') {
		res.status(405).end('Method Not Allowed');
	}

	try {
		const encrypted = encrypt(query as string);

		return res.status(200).json({ encrypted });
	} catch (err) {
		console.log(err);
	}
}
