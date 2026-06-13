import { z } from 'zod';

export const registerUserSchema = z.object({
    body: z.object({
        name: z.string({
            message: 'Name is required',
        }).min(2, 'Name must be at least 2 characters long'),

        email: z.string({
            message: 'Email is required',
        }).email('Not a valid email address'),

        password: z.string({
            message: 'Password is required',
        }).min(8, 'Password must be at least 8 characters long'),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string({
            message: 'Email is required',
        }).email('Not a valid email address'),

        password: z.string({
            message: 'Password is required',
        }),
    }),
});

export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RegisterUserInput = z.infer<typeof registerUserSchema>['body'];