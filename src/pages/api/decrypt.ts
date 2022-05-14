// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { decrypt } from '@lib/crypto';

type Data = {
	decrypted: string | undefined;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const secret = req.query.s as string;

	if (
		!secret ||
		typeof secret !== 'string'
	) {
		res.status(405).end('Method Not Allowed');
	}

	const decrypted = decrypt(secret);

	res.status(200).json({ decrypted });
}
