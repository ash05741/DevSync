import { Router } from 'express';
import { createWorkspaceHandler } from '../controllers/workspace.controller';
import { validate } from '../middleware/validate.middleware';
import { AuthRequest, requireAuth } from '../middleware/auth.middleware';
import { createWorkspaceSchema } from '../validators/workspace.validator';

const router = Router();

// POST /api/v1/workspaces
// Notice the middleware chain: Bouncer -> Shield -> Controller
router.post('/', requireAuth, validate(createWorkspaceSchema), createWorkspaceHandler);

export default router;