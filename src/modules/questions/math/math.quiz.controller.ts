import { FastifyRequest, FastifyReply } from 'fastify';
import { MathQuestionService } from './math.question.service';
import { ThemeService } from '../../../modules/themes/theme.service';
import { Quiz } from '../../../models/Quiz';
import { DirectQuestion } from '../../../models/Question';
import { generateNumberId } from '../../../lib/id-generators';

const themeService = new ThemeService();

export class MathQuizController {
    constructor(private mathQuestionService: MathQuestionService) {}
    subjectId = 1;

    getAddition = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Addition';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateAddition()
        );
        

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getSubstraction = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Soustraction';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateSubstraction()
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getMultiplication = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Multiplication';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateMultiplication()
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getIntergerComparison = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Comparaison entiers';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateIntegerComparison()
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getDecimalComparison = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Comparaison décimales';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateDecimalComparison()
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };

    getRandomOperation = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Calculs aléatoires';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateRandomOperation()
        );

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    };
}
