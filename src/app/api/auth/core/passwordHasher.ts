'use server';
import crypto from 'node:crypto';

export async function hashPassword(
	password: string,
	salt: string,
): Promise<string> {
	return new Promise((resolve, reject) => {
		crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
			if (error) reject(error);
			resolve(hash.toString('hex').normalize());
		});
	});
}

export async function generateSalt() {
	return crypto.randomBytes(16).toString('hex').normalize();
}

export async function comparePasswords({
	hashedPassword,
	typedPassword,
	userSalt,
}: {
	hashedPassword: string;
	typedPassword: string;
	userSalt: string;
}) {
	const typedHashedPassword = await hashPassword(typedPassword, userSalt);

	//To prevent timing based attacks timinSafeEquals is used
	return crypto.timingSafeEqual(
		Buffer.from(typedHashedPassword, 'hex'),
		Buffer.from(hashedPassword, 'hex'),
	);
}
