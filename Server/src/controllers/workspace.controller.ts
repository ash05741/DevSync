import { Response } from "express";
import { Workspace } from "../models/workspace.model";
import { CreateWorkspaceInput } from "../validators/workspace.validator";
import { AuthRequest } from "../middleware/auth.middleware";

export const createWorkspaceHandler = async (req: AuthRequest, res: Response): Promise<void> => {

    try {
        const { name, description } = req.body;

        const ownerId = req.body;

        const workspace = await Workspace.create({
            name,
            description,
            ownerId,
            members: [ownerId],
        });

        res.status(201).json({
            status: 'success',
            data: {
                workspace,
            }
        })
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }
}