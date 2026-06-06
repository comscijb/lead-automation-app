import 'dotenv/config';
import app from './app';
import { connectDb, disconnectDb } from './database/prisma';

const PORT = Number(process.env.PORT) || 3333;

async function bootstrap() {
  await connectDb();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  async function shutdown() {
    server.close(async () => {
      await disconnectDb();
      process.exit(0);
    });
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
