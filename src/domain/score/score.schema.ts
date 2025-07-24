import { z } from 'zod';
import { userResponseSchema } from '../user/user.schema';
import { themeResponseSchema } from '../quiz/theme/theme.schema';
import { subjectResponseSchema } from '../quiz/subject/subject.schema';

const scoreCore = {
    id: z.number().int().positive(),
    userId: userResponseSchema.shape.id,
    subjectId: subjectResponseSchema.shape.id,
    themeId: themeResponseSchema.shape.id,
    value: z
        .number()
        .int()
        .min(0, {
            message: 'Le score doit être un entier positif ou nul',
        })
        .max(10, {
            message: 'Le score ne peut pas dépasser 10',
        }),
    date: z.date({
        error: 'La date est requise',
    }),
};

const createScoreSchema = z.object({
    ...scoreCore,
});

const scoreResponseSchema = z.object({
    ...scoreCore,
});

export const userGlobalScoreSchema = z.object({
    userId: scoreCore.userId,
    username: userResponseSchema.shape.username,
    totalScore: z.number().int().min(0),
});

export const userGlobalScoreSortedBySubject = z.object({
    userId: scoreCore.userId,
    username: userResponseSchema.shape.username,
    totalScore: z.number().int().min(0),
    subjectName: subjectResponseSchema.shape.name,
});

export const userGlobalScoreSortedByTheme = z.object({
    userId: scoreCore.userId,
    username: userResponseSchema.shape.username,
    totalScore: z.number().int().min(0),
    themeName: themeResponseSchema.shape.name,
});

export const userAverageScoreSortedByTheme = z.object({
    userId: scoreCore.userId,
    username: userResponseSchema.shape.username,
    averageScore: z.number().int().min(0),
    totalScore: z.number().int().min(0),
    themeName: themeResponseSchema.shape.name,
});
export const userAverageScoreSortedBySubject = z.object({
    userId: scoreCore.userId,
    username: userResponseSchema.shape.username,
    averageScore: z.number().int().min(0),
    totalScore: z.number().int().min(0),
    subjectName: subjectResponseSchema.shape.name,
});

export const userDailyScoreSchema = z.object({
    userId: scoreCore.userId,
    username: userResponseSchema.shape.username,
    totalScore: z.number().int().min(0),
    date: scoreCore.date,
});

export type CreateScoreInput = z.infer<typeof createScoreSchema>;
export type ScoreResponse = z.infer<typeof scoreResponseSchema>;
export type UserGlobalScore = z.infer<typeof userGlobalScoreSchema>;
export type UserGlobalScoreSortedBySubject = z.infer<
    typeof userGlobalScoreSortedBySubject
>;
export type UserGlobalScoreSortedByTheme = z.infer<
    typeof userGlobalScoreSortedByTheme
>;
export type UserAverageScoreSortedByTheme = z.infer<
    typeof userAverageScoreSortedByTheme
>;
export type UserAverageScoreSortedBySubject = z.infer<
    typeof userAverageScoreSortedBySubject
>;
export type UserDailyScore = z.infer<typeof userDailyScoreSchema>;
