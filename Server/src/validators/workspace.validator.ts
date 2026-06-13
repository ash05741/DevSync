import { z } from 'zod';

export const createWorkspaceSchema = z.object({
    body: z.object({
        name: z.string({
            message: 'Workspace name is required',
        }).min(3, 'Workspace name must be at least 3 characters'),

        description: z.string().optional(),
    }),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>['body'];