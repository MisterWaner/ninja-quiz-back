import { FastifyRequest, FastifyReply } from 'fastify';
import { MathQuestionService } from './math.question.service';
import { ThemeService } from '../../theme/theme.service';
import { Quiz } from '../../quiz.schema';
import { DirectQuestion } from '../../question/question.schema';
import { generateNumberId } from '../../../../lib/id-generators';

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

        const quiz: Quiz = {
            id,
            questionType,
            questions,
            theme,
            themeId,
            subjectId: this.subjectId,
        };

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

        const quiz = {
            id,
            questionType,
            questions,
            theme,
            themeId,
            subjectId: this.subjectId,
        };

        reply.status(200).send(quiz);
    };

    getMultiplication = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Multiplication';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateMultiplication()
        );

        const quiz = {
            id,
            questionType,
            questions,
            theme,
            themeId,
            subjectId: this.subjectId,
        };

        reply.status(200).send(quiz);
    };

    getIntegerComparison = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Comparaison entiers';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateIntegerComparison()
        );

        const quiz = {
            id,
            questionType,
            questions,
            theme,
            themeId,
            subjectId: this.subjectId
        };

        reply.status(200).send(quiz);
    };

    getDecimalComparison = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Comparaison décimales';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateDecimalComparison()
        );

        const quiz = {
            id,
            questionType,
            questions,
            theme,
            themeId,
            subjectId: this.subjectId
        };

        reply.status(200).send(quiz);
    };

    getRandomOperation = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'Calculs aléatoires';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateRandomOperation()
        );

        const quiz = {
            id,
            questionType,
            questions,
            theme,
            themeId,
            subjectId: this.subjectId
        };

        reply.status(200).send(quiz);
    };
}
