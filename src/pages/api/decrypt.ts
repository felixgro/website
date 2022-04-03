// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { decrypt } from '../../utils/crypto';

type Data = {
	decrypted: string | undefined;
};

export default function handler (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const content = req.query.q as string;
	const iv = req.query.i as string;

	if (
		!content ||
		typeof content !== 'string' ||
		!iv ||
		typeof iv !== 'string'
	) {
		res.status(405).end('Method Not Allowed');
	}

	const decrypted = decrypt({ content, iv });

	res.status(200).json({ decrypted });
}
