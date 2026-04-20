export type signUpSchema = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type signUpUser = {
	name: string;
	email: string;
	password: string;
	salt: string;
};

export type signInSchema = {
	email: string;
	password: string;
};

export type User = {
	id: number;
	name: string;
	email: string;
	password: string;
	salt: string;
	role: Roles;
};

export enum Roles {
	User = 'User',
	Admin = 'Admin',
}

export type sessionSchema = {
	sessionId: string;
	userId: number;
	userRole: Roles;
	expiresAt: string;
};
