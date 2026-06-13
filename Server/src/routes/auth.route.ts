import { Router } from 'express';
import { registerHandler, loginHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { registerUserSchema, loginSchema } from '../validators/user.validator';

const router = Router();

// POST /api/auth/register
router.post('/register', validate(registerUserSchema), registerHandler);

// POST /api/auth/login
router.post('/login', validate(loginSchema), loginHandler);

export default router;