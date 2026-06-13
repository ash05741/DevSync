import { Request, Response } from 'express';
import { Project } from '../models/project.model';
import { Workspace } from '../models/workspace.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const createProjectHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, description, workspaceId } = req.body;
        const userId = (req as AuthRequest).userId;

        // 1. Security Check: Does the workspace exist AND is the user a member?
        const workspace = await Workspace.findOne({
            _id: workspaceId,
            members: userId, // This prevents unauthorized cross-workspace creation
        });

        if (!workspace) {
            res.status(403).json({ message: 'Forbidden: You do not have access to this workspace' });
            return;
        }

        // 2. Create the Project
        const project = await Project.create({
            name,
            description,
            workspaceId,
            ownerId: userId,
            status: 'ACTIVE',
        });

        res.status(201).json({
            status: 'success',
            data: {
                project,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};