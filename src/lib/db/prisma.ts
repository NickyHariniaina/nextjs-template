import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL is required in production');
}

const dbUrl = connectionString || "postgresql://localhost:5432/hackaton";
const adapter = new PrismaPg({ connectionString: dbUrl });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}