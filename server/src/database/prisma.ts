import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '../generated/prisma/client';

const currentDir = dirname(fileURLToPath(import.meta.url));

config({
  path: [
    resolve(currentDir, '../../.env'),
    resolve(currentDir, '../../../.env'),
    resolve(process.cwd(), '.env'),
  ],
});

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured');
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });

export async function connectDb() {
  await prisma.$connect();
}

export async function disconnectDb() {
  await prisma.$disconnect();
}
