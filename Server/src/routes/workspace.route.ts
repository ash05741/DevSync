import { Router } from 'express';
import { createWorkspaceHandler, getUserWorkspacesHandler } from '../controllers/workspace.controller';
import { validate } from '../middleware/validate.middleware';
import { AuthRequest, requireAuth } from '../middleware/auth.middleware';
import { createWorkspaceSchema } from '../validators/workspace.validator';

const router = Router();

router.post('/', requireAuth, validate(createWorkspaceSchema), createWorkspaceHandler);

router.get('/', requireAuth, getUserWorkspacesHandler);

export default router;