import { Request, Response } from 'express';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { Workspace } from '../models/workspace.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const createTaskHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { title, description, projectId, assigneeId, parentTaskId, priority } = req.body;
        const userId = (req as AuthRequest).userId;

        // 1. Verify the Project exists
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        // 2. Security Check: Is the user a member of the workspace that owns this project?
        const workspace = await Workspace.findOne({
            _id: project.workspaceId,
            members: userId,
        });

        if (!workspace) {
            res.status(403).json({ message: 'Forbidden: You do not have access to this project' });
            return;
        }

        // 3. Create the Task
        const task = await Task.create({
            title,
            description,
            projectId,
            assigneeId,    // Optional: Who is working on it
            parentTaskId,  // Optional: Is this a subtask?
            priority: priority || 'MEDIUM',
            status: 'TODO',
        });

        res.status(201).json({
            status: 'success',
            data: {
                task,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};