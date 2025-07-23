import { z } from 'zod';
import { themeResponseSchema } from '../theme/theme.schema';

const subjectCore = {
    name: z.string().trim(),
    path: z.string().trim(),
};

const createSubjectSchema = z.object({
    ...subjectCore,
    name: subjectCore.name.min(4, {
        message: 'Le nom du sujet doit contenir au moins 4 caractères',
    }),
    path: subjectCore.path.min(4, {
        message: 'Le chemin du sujet doit contenir au moins 4 caractères',
    }),
})

export const subjectResponseSchema = z.object({
    ...subjectCore,
    id: z.number().int().positive(),
    themes: z.array(themeResponseSchema)
});

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
export type SubjectResponse = z.infer<typeof subjectResponseSchema>;
