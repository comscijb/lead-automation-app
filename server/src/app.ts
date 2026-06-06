import express from 'express';
import cors from 'cors';
import leadRoutes from './routes/leadRoutes';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ?? 'http://localhost:5000' }));
app.use(express.json());
app.get('/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/leads', leadRoutes);

export default app;
