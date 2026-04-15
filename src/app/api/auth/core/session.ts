'use server';
import crypto from 'crypto';
import { Roles } from '@/types/User';
import { createUserSessionDB } from '@/lib/users';
import { cookies } from 'next/headers';

const SESSION_EXPIRATION_DAYS = 60 * 60 * 24 * 7;

type sessionSchema = {
	id: number;
	role: Roles;
};

export async function createUserSession(user: sessionSchema) {
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
