import 'server-only';

import { signUpUser } from '@/types/User';
import { prisma } from '@/lib/prisma';

export async function getUser(email: string) {
	return await prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: number) {
	return await prisma.user.findUnique({ where: { id } });
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
}

export async function deleteUserSessionDB(sessionId: string) {
	await prisma.session.delete({ where: { sessionId } });
}
