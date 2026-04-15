'use server';
import crypto from 'crypto';
import { sessionSchema, User } from '@/types/User';
import { createUserSessionDB, findUserFromSessionId } from '@/lib/users';
import { cookies } from 'next/headers';

const SESSION_EXPIRATION_DAYS = 60 * 60 * 24 * 7;

export async function getUserFromSession() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get('sessionId')?.value;
	if (sessionId == null) return null;

	return await getUserSessionById(sessionId);
}

async function getUserSessionById(sessionId: string) {
	const user = (await findUserFromSessionId(sessionId)) as sessionSchema;
	return user ? user : null;
}

export async function createUserSession(user: User) {
	const sessionId = crypto.randomBytes(512).toString('hex').normalize();
	//Save in db
	await createUserSessionDB(sessionId, user.id, user.role);
	//Save locally
	const cookieStore = await cookies();
	cookieStore.set('sessionId', sessionId, {
		httpOnly: true,
		secure: true,
		expires: Date.now() + SESSION_EXPIRATION_DAYS * 1000,
		sameSite: 'lax',
	});
}
