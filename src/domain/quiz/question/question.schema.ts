import { z } from 'zod';

export const questionTypeSchema = z.enum(['direct', 'multiple', 'trueOrFalse']);
export type QuestionType = z.infer<typeof questionTypeSchema>;

const questionBaseCore = {
    id: z.number().int().positive(),
    questionText: z.string().trim(),
};

export const directQuestionSchema = z.object({
    ...questionBaseCore,
    correctAnswer: z.string().trim(),
});

export const multipleChoiceQuestionSchema = z.object({
    ...questionBaseCore,
    options: z.array(z.union([z.string(), z.number()])),
    correctAnswer: z.union([z.string(), z.array(z.string()), z.number(), z.array(z.number())]),
    imgUrl: z.string().optional(),
});

export const trueFalseQuestionSchema = z.object({
    ...questionBaseCore,
    options: z.array(z.boolean()),
    correctAnswer: z.union([z.boolean(), z.string()]),
});

export const questionResponseSchema = z.discriminatedUnion('type', [
    directQuestionSchema.extend({ type: z.literal('direct') }),
    multipleChoiceQuestionSchema.extend({ type: z.literal('multiple') }),
    trueFalseQuestionSchema.extend({ type: z.literal('trueOrFalse') }),
]);

export type DirectQuestion = z.infer<typeof directQuestionSchema>;
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceQuestionSchema>;
export type TrueFalseQuestion = z.infer<typeof trueFalseQuestionSchema>;
export type QuestionResponse = z.infer<typeof questionResponseSchema>;
