import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { User } from '@prisma/client';
import { getUserById } from '@/lib/users';
import { redisClient } from '@/redis/redis';
import { RedisUser } from '@/types/User';

// 7 days, in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;

export async function getUserFromSession(withFullUser: boolean = false) {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get('sessionId')?.value;

	if (sessionId == null) return null;

	const userInfo = await getUserSessionById(sessionId);
	if (userInfo == null) return null;

	if (withFullUser) {
		const userFound = await getUserById(userInfo.userId);
		return userFound;
	} else {
		return userInfo;
	}
}

async function getUserSessionById(sessionId: string) {
	const user = (await redisClient.get(`session:${sessionId}`)) as RedisUser;
	return user ? user : null;
}

export async function createUserSession(user: User) {
	// 32 random bytes (256 bits) is plenty; 512 bytes produced a 1KB cookie
	const sessionId = crypto.randomBytes(32).toString('hex');
	//Save in redis
	await redisClient.set(
		`session:${sessionId}`,
		{ userId: user.id, userRole: user.role },
		{ ex: SESSION_EXPIRATION_SECONDS },
	);
	const cookieStore = await cookies();
	cookieStore.set('sessionId', sessionId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: SESSION_EXPIRATION_SECONDS,
		sameSite: 'lax',
	});
}

export async function deleteUserSession() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get('sessionId')?.value;
	if (sessionId == null) return null;
	await redisClient.del(`session:${sessionId}`);
	cookieStore.delete('sessionId');
}
