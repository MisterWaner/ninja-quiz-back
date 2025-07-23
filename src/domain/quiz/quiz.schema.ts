import { z } from 'zod';

import { themeResponseSchema } from './theme/theme.schema';
import { subjectResponseSchema } from './subject/subject.schema';
import {
    questionTypeSchema,
    directQuestionSchema,
    multipleChoiceQuestionSchema,
    trueFalseQuestionSchema,
} from './question/question.schema';

const quizSchema = z.object({
    id: z.number().int().positive(),
    questionType: questionTypeSchema,
    questions: z.union([
        z.array(directQuestionSchema),
        z.array(multipleChoiceQuestionSchema),
        z.array(trueFalseQuestionSchema),
    ]),
    theme: themeResponseSchema.shape.name,
    themeId: themeResponseSchema.shape.id,
    subjectId: subjectResponseSchema.shape.id,
});

export type Quiz = z.infer<typeof quizSchema>;