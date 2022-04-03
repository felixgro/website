const crypt = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypt.randomBytes(16);

export type EncryptedData = {
	iv: string;
	content: string;
};

export const encrypt = (text: string): EncryptedData => {
	const cipher = crypt.createCipheriv(algorithm, secretKey, iv);

	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex')
	};
};

export const decrypt = (data: EncryptedData) => {
	const decipher = crypt.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(data.iv, 'hex')
	);

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(data.content, 'hex')),
		decipher.final()
	]);

	return decrpyted.toString();
};
