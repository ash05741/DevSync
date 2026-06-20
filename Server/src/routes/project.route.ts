import { Router } from 'express';
import { createProjectHandler, getWorkspaceProjectsHandler } from '../controllers/project.controller';
import { validate } from '../middleware/validate.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import { createProjectSchema } from '../validators/project.validator';

const router = Router();

// POST /api/v1/projects
router.post('/', requireAuth, validate(createProjectSchema), createProjectHandler);

router.get('/:workspaceId', requireAuth, getWorkspaceProjectsHandler);

export default router;