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

export const getUserWorkspacesHandler = async (req: Request, res: Response) => {
  try {

    const userId = (req as AuthRequest).userId;

    const workspaces = await Workspace.find({ members: userId });

    res.status(200).json({
      status: "Success",
      results: workspaces.length,
      data: {
        workspaces,
      }
    })

  } catch (error: any) {
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}

export const deleteWorkspaceHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { workspaceId } = req.params;
    const userId = (req as AuthRequest).userId;

    // 1. Security Check: Verify the workspace exists AND the user is a member
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      members: userId,
    });

    if (!workspace) {
      res.status(403).json({ message: 'Forbidden: You do not have permission to delete this workspace' });
      return;
    }

    // 2. Delete the workspace
    await Workspace.findByIdAndDelete(workspaceId);

    res.status(200).json({
      status: 'success',
      message: 'Workspace successfully deleted',
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};