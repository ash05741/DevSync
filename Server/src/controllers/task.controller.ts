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

export const getProjectTasksHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { projectId } = req.params;
        const userId = (req as AuthRequest).userId;

        // 1. Find the project to locate its parent workspace
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
            res.status(403).json({ message: 'Forbidden: You do not have access to these tasks' });
            return;
        }

        // 3. Fetch all tasks linked to this project
        const tasks = await Task.find({ projectId });

        res.status(200).json({
            status: 'success',
            results: tasks.length,
            data: {
                tasks,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateTaskHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { taskId } = req.params;
        const { status, priority, title, description, assigneeId } = req.body;
        const userId = (req as AuthRequest).userId;

        // 1. Find the exact task
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // 2. Find the project to locate its parent workspace
        const project = await Project.findById(task.projectId);
        if (!project) {
            res.status(404).json({ message: 'Parent project not found' });
            return;
        }

        // 3. Security Check: Is the user a member of the workspace?
        const workspace = await Workspace.findOne({
            _id: project.workspaceId,
            members: userId,
        });

        if (!workspace) {
            res.status(403).json({ message: 'Forbidden: You do not have permission to edit this task' });
            return;
        }

        // 4. Update the fields if they were provided in the request
        if (status) task.status = status;
        if (priority) task.priority = priority;
        if (title) task.title = title;
        if (description) task.description = description;
        if (assigneeId !== undefined) task.assigneeId = assigneeId;

        await task.save();

        res.status(200).json({
            status: 'success',
            data: {
                task,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const deleteTaskHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { taskId } = req.params;
        const userId = (req as AuthRequest).userId;

        // 1. Find the exact task
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // 2. Find the project to locate its parent workspace
        const project = await Project.findById(task.projectId);
        if (!project) {
            res.status(404).json({ message: 'Parent project not found' });
            return;
        }

        // 3. Security Check: Is the user a member of the workspace?
        const workspace = await Workspace.findOne({
            _id: project.workspaceId,
            members: userId,
        });

        if (!workspace) {
            res.status(403).json({ message: 'Forbidden: You do not have permission to delete this task' });
            return;
        }

        // 4. Annihilate the task
        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            status: 'success',
            message: 'Task successfully deleted',
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};