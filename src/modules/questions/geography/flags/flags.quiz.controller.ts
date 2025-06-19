import { FastifyRequest, FastifyReply } from 'fastify';
import { FlagsQuestionService } from './flags.question.service';
import { ThemeService } from '../../../../modules/themes/theme.service';
import { Quiz  } from '../../../../models/Quiz';
import { MultipleChoiceQuestion } from '../../../../models/Question';
import { generateNumberId } from '../../../../lib/id-generators';

const themeService = new ThemeService();

export class FlagsQuizController {
    constructor(private flagsQuestionService : FlagsQuestionService) {}
    subjectId = 2;

    getEuropeanFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'european-flags';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateEuropeanFlagsQuestion()
            )
        );
        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getAfricanFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'african-flags';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateAfricanFlagsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getAsianFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'asian-flags';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateAsianFlagsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getAmericanFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'american-flags';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateAmericanFlagsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getOceanianFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'oceanic-flags';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateOceanianFlagsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getRandomFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'random-flags';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateRandomFlagsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };
}