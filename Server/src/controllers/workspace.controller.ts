import { Request, Response } from 'express'; // Import standard Request
import { Workspace } from '../models/workspace.model';
import { CreateWorkspaceInput } from '../validators/workspace.validator';
import { AuthRequest } from '../middleware/auth.middleware'; // Import your custom interface

export const createWorkspaceHandler = async (
  req: Request, // 1. Keep this as a standard Request so the Router stays happy
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;

    // 2. Explicitly cast req to AuthRequest right here to extract the ID
    const ownerId = (req as AuthRequest).userId;

    if (!ownerId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

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
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};