import { z } from 'zod';

const themeCore = {
    name: z.string().trim(),
    path: z.string().trim(),
    subjectId: z.number().int().positive(),
};

const createThemeSchema = z.object({
    ...themeCore,
    name: themeCore.name.min(4, {
        message: 'Le nom du thème doit contenir au moins 4 caractères',
    }),
    path: themeCore.path.min(4, {
        message: 'Le chemin du thème doit contenir au moins 4 caractères',
    }),
    subjectId: themeCore.subjectId.min(1, {
        message: "L'ID du sujet doit être un entier positif",
    }),
});

export const themeResponseSchema = z.object({
    ...themeCore,
    id: z.string(),
});

export type CreateThemeInput = z.infer<typeof createThemeSchema>;
export type ThemeResponse = z.infer<typeof themeResponseSchema>;
