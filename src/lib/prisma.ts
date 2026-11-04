import 'server-only';
import { PrismaClient } from '@prisma/client';

// Reuse a single PrismaClient across hot reloads in development.
// Without this, every HMR cycle opens a new connection pool and
// Postgres eventually rejects connections ("too many clients").
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}
