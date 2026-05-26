'use server';

import { signUpUser } from '@/types/User';
import { prisma } from '@/lib/prisma';

export async function getUser(email: string) {
	return await prisma.user.findFirst({ where: { email } });
}

export async function getUserById(id: number) {
	return await prisma.user.findFirst({ where: { id } });
}

export async function createUser(user: signUpUser) {
	return await prisma.user.create({ data: user });
}

export async function createUserSessionDB(
	sessionId: string,
	userId: number,
	userRole: string,
) {
	await prisma.session.create({ data: { sessionId, userId, userRole } });
	// db.prepare(
	// 	'INSERT INTO sessions (sessionId, userId, userRole) VALUES (?, ?, ?)',
	// ).run(sessionId, userId.toString(), userRole);
}

export async function findUserFromSessionId(sessionId: string) {
	return await prisma.session.findFirst({ where: { sessionId } });
	// return db
	// 	.prepare('SELECT * FROM sessions WHERE sessionId = ?')
	// 	.get(sessionId);
}

export async function deleteUserSessionDB(sessionId: string) {
	await prisma.session.delete({ where: { sessionId } });
	// db.prepare('DELETE FROM sessions WHERE sessionId = ?').run(sessionId);
}
