import { z } from 'zod';

export const createProjectSchema = z.object({
    body: z.object({
        name: z.string({
            message: 'Project name is required',
        }).min(3, 'Project name must be at least 3 characters'),

        description: z.string().optional(),

        workspaceId: z.string({
            message: 'Workspace ID is required',
        }).regex(/^[0-9a-fA-F]{24}$/, 'Invalid Workspace ID format'),
    }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>['body'];