import { FastifyRequest, FastifyReply } from 'fastify';
import { FlagsQuestionService } from './flags.question.service';
import { ThemeService } from '../../../theme/theme.service';
import { Quiz } from '../../../quiz.schema';
import { MultipleChoiceQuestion } from '../../question.schema';
import { generateNumberId } from '../../../../../lib/id-generators';

const themeService = new ThemeService();

export class FlagsQuizController {
    constructor(private flagsQuestionService: FlagsQuestionService) {}
    subjectId = 2;

    getEuropeanFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'Drapeaux européens';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateEuropeanFlagsQuestion()
            )
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

    getAfricanFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'Drapeaux africains';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateAfricanFlagsQuestion()
            )
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

    getAsianFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'Drapeaux asiatiques';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateAsianFlagsQuestion()
            )
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

    getAmericanFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'Drapeaux américains';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateAmericanFlagsQuestion()
            )
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

    getOceanianFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'Drapeaux océaniques';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateOceanianFlagsQuestion()
            )
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

    getRandomFlags = async (request: FastifyRequest, reply: FastifyReply) => {
        const id = generateNumberId();
        const questionType = 'multiple';
        const length: number = 10;
        const theme = 'Drapeaux aléatoires';
        const themeId = await themeService.getThemeByNameAndReturnId(theme);
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.flagsQuestionService.generateRandomFlagsQuestion()
            )
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
}
