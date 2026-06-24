import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authroutes from './routes/auth.route';
import workspaceRoutes from './routes/workspace.route';
import projectRoutes from './routes/project.route';
import taskRoutes from './routes/task.route';

dotenv.config();

connectDB();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authroutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/api/ping', (req, res) => {
    res.status(200).json({ message: 'Server is awake and running.' });
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'DevSync API is operation' })
});

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})