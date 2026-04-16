'use server';

import { signUpUser, User } from '@/types/User';
import sql from 'better-sqlite3';

const db = sql('techpulse.db');

export async function getUser(email: string): Promise<User> {
	return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User;
}

export async function getUserById(id: number): Promise<User> {
	return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User;
}

export async function createUser(user: signUpUser): Promise<User> {
	db.prepare(
		'INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?, ?)',
	).run(user.name, user.email, user.password, user.salt);
	return getUser(user.email);
}

export async function createUserSessionDB(
	sessionId: string,
	userId: number,
	userRole: string,
) {
	db.prepare(
		'INSERT INTO sessions (sessionId, userId, userRole) VALUES (?, ?, ?)',
	).run(sessionId, userId.toString(), userRole);
}

export async function findUserFromSessionId(sessionId: string) {
	return db
		.prepare('SELECT * FROM sessions WHERE sessionId = ?')
		.get(sessionId);
}

export async function deleteUserSessionDB(sessionId: string) {
	db.prepare('DELETE FROM sessions WHERE sessionId = ?').run(sessionId);
}
