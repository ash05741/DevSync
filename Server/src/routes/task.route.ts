import { Router } from 'express';
import { createTaskHandler } from '../controllers/task.controller';
import { validate } from '../middleware/validate.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import { createTaskSchema } from '../validators/task.validator';

const router = Router();

// POST /api/v1/tasks
router.post('/', requireAuth, validate(createTaskSchema), createTaskHandler);

export default router;