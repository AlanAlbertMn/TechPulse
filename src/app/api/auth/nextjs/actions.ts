'use server';

import {
	EXISTING_ACCOUNT,
	signInSchema,
	signUpSchema,
	signUpUser,
} from '@/types/User';
import { redirect } from 'next/navigation';
import { createUser, getUser } from '@/lib/users';
import {
	comparePasswords,
	generateSalt,
	hashPassword,
} from '../core/passwordHasher';
import { createUserSession, deleteUserSession } from '../core/session';

// Server Actions are public HTTP endpoints: anyone can call them with any
// payload, so never trust the shape/content of the arguments.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signIn(unsafeData: signInSchema) {
	const email = String(unsafeData?.email ?? '').trim();
	const password = String(unsafeData?.password ?? '');
	if (!email || !password) return 'Unable to log you in';

	const user = await getUser(email);
	if (!user) return 'Unable to log you in';

	const isCorrectPassword = await comparePasswords({
		hashedPassword: user.password,
		typedPassword: password,
		userSalt: user.salt,
	});
	if (!isCorrectPassword) return 'Unable to log you in';
	await createUserSession(user);

	redirect('/');
}

export async function signUp(unsafeData: signUpSchema) {
	const name = String(unsafeData?.name ?? '').trim();
	const email = String(unsafeData?.email ?? '').trim();
	const password = String(unsafeData?.password ?? '');
	const confirmPassword = String(unsafeData?.confirmPassword ?? '');

	if (name.length < 2) return 'Please enter your name';
	if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email';
	if (password.length < 8) return 'Password must be at least 8 characters';
	if (password !== confirmPassword) return 'Passwords do not match';

	const existingUser = await getUser(email);
	if (existingUser) {
		return EXISTING_ACCOUNT;
	}

	try {
		//Hash the password to store it safely in the db
		const userSalt = await generateSalt();
		const hashedPassword = await hashPassword(password, userSalt);

		const user: signUpUser = {
			name,
			email,
			password: hashedPassword,
			salt: userSalt,
		};

		const createdUser = await createUser(user);
		await createUserSession(createdUser);
	} catch {
		return 'Unable to create account';
	}

	// Never return the created user to the client: it contains the password
	// hash and salt. redirect() must be called outside try/catch.
	redirect('/');
}

export async function logOut() {
	await deleteUserSession();
	redirect('/');
}
