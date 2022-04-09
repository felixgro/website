// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { encrypt, EncryptedData } from '@utils/crypto';

type Data = {
	encrypted: string;
	cleanSecret: string;
};

export default function handler (
	req: NextApiRequest,
	res: NextApiResponse<EncryptedData>
) {
	const query = req.query.q;
	if (!query || typeof query !== 'string') {
		res.status(405).end('Method Not Allowed');
	}

	const encrypted = encrypt(query as string);

	res.status(200).json(encrypted);
}
