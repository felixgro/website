const crypt = require('crypto');

const algorithm = 'aes-256-ctr';
const { WORDLE_KEY, WORDLE_IV } = process.env;

export const encrypt = (msg: string): string => {
	const cipher = crypt.createCipheriv(algorithm, WORDLE_KEY, Buffer.from(WORDLE_IV!, 'hex'));
	const encrypted = Buffer.concat([cipher.update(msg), cipher.final()]);

	return encrypted.toString('hex');
};

export const decrypt = (encrypted: string): string => {
	const decipher = crypt.createDecipheriv(
		algorithm,
		WORDLE_KEY,
		Buffer.from(WORDLE_IV!, 'hex')
	);

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(encrypted, 'hex')),
		decipher.final()
	]);

	return decrpyted.toString();
};
