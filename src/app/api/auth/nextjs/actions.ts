import { signInSchema, signUpSchema, signUpUser, User } from '@/types/User';
import { redirect } from 'next/navigation';
import { createUser, getUser } from '@/lib/users';
import {
	comparePasswords,
	generateSalt,
	hashPassword,
} from '../core/passwordHasher';
import { createUserSession, deleteUserSession } from '../core/session';

export async function signIn(unsafeData: signInSchema) {
	const user = await getUser(unsafeData.email);
	if (!user) return 'Unable to log you in';

	const isCorrectPassword = await comparePasswords({
		hashedPassword: user.password,
		typedPassword: unsafeData.password,
		userSalt: user.salt,
	});
	if (!isCorrectPassword) return 'Unable to log you in';
	await createUserSession(user);

	redirect('/');
}

export async function signUp(unsafeData: signUpSchema) {
	// if (!success) return 'Unable to create account'
	const existingUser = await getUser(unsafeData.email);
	if (existingUser) {
		// console.log(existingUser);

		return 'Account already exists for this email';
	}

	try {
		//Hash the password to store it safely in the db
		const userSalt = await generateSalt();
		const hashedPassword = await hashPassword(unsafeData.password, userSalt);

		const user: signUpUser = {
			name: unsafeData.name,
			email: unsafeData.email,
			password: hashedPassword,
			salt: userSalt,
		};

		const createdUser: User = await createUser(user);
		if (createdUser == null) return 'Unable to create account';
		await createUserSession(createdUser);
		return createdUser;
	} catch {
		return 'Unable to create account';
	}
}

export async function logOut() {
	await deleteUserSession();
}
