import { FastifyRequest, FastifyReply } from 'fastify';
import { CapitalsQuestionService } from './capitals.question.service';
import { ThemeService } from '../../../../modules/themes/theme.service';
import { Quiz } from '../../../../models/Quiz';
import { MultipleChoiceQuestion } from '../../../../models/Question';
import { generateNumberId } from '../../../../lib/id-generators';

const themeService = new ThemeService();

export class CapitalsQuizController {
    constructor(private capitalsQuestionService: CapitalsQuestionService) {}
    subjectId = 2;

    getEuropeanCapitals = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'european-capitals';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.capitalsQuestionService.generateEuropeanCapitalsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getAfricanCapitals = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'african-capitals';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.capitalsQuestionService.generateAfricanCapitalsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getAsianCapitals = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'asian-capitals';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.capitalsQuestionService.generateAsianCapitalsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getAmericanCapitals = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'american-capitals';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.capitalsQuestionService.generateAmericanCapitalsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getOceanianCapitals = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'oceanic-capitals';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.capitalsQuestionService.generateOceanianCapitalsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getRandomCapitals = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'random-capitals';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.capitalsQuestionService.generateRandomCapitalsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };
}
