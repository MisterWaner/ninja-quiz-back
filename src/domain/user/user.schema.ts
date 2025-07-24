import { z } from 'zod';

const userCore = {
    username: z
        .string({
            error: 'Le pseudo est requis',
        })
        .trim()
        .min(4, {
            message: 'Le pseudo doit contenir au moins 4 caractères',
        })
        .max(20, {
            message: 'Le pseudo doit contenir au maximum 20 caractères',
        }),
};

const createUserSchema = z
    .object({
        ...userCore,
        password: z
            .string({
                error: 'Le mot de passe est requis',
            })
            .trim()
            .min(8, {
                message: 'Le mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message:
                    'Le mot de passe doit contenir au maximum 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            ),
        confirmPassword: z
            .string({
                error: 'La confirmation du mot de passe est requise',
            })
            .trim()
            .min(8, {
                message: 'Ton mot de passe doit contenir au moins 8 caractères',
            })
            .max(20, {
                message: 'Ton mot de passe ne doit pas dépasser 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un caractère minuscule, un chiffre et un caractère spécial(#?!@$%^&*-)',
                }
            )
            .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
    });

export const userResponseSchema = z.object({
    id: z.nanoid(),
    password: z
        .string()
        .optional(),
    ...userCore,
});

const loginSchema = z.object({
    username: userCore.username,
    password: z
        .string({
            error: 'Le mot de passe est requis',
        })
        .trim()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères',
        })
        .max(20, {
            message: 'Le mot de passe doit contenir au maximum 20 caractères',
        }),
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
