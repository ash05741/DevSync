import { z } from 'zod';

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string({
            message: 'Task title is missing',
        }).min(3, 'Title must be at least 3 characters'),
        description: z.string().optional(),

        projectId: z.string({
            message: 'project ID is required'
        }).regex(/^[0-9a-fA-F]{24}$/, 'Invalid Project ID format'),

        assigneeId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Assignee ID format').optional(),

        parentTaskId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Parent Task ID format').optional(),

        priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),

    })
})

export type CreatetaskInput = z.infer<typeof createTaskSchema>['body'];