import { FastifyRequest, FastifyReply } from 'fastify';
import { MathQuestionService } from './math.question.service';
import { Quiz } from '../../../models/Quiz';
import { DirectQuestion } from '../../../models/Question';
import { generateNumberId } from '../../../lib/id-generators';

export class MathQuizController {
    constructor(private mathQuestionService: MathQuestionService) {}

    getAddition(request: FastifyRequest, reply: FastifyReply) {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'addition';
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateAddition()
        );

        const quiz = new Quiz(id, questionType, questions, theme);
        console.log(quiz);

        reply.status(200).send(quiz);
    }

    getSubstraction(request: FastifyRequest, reply: FastifyReply) {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'substraction';
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateSubtraction()
        );

        const quiz = new Quiz(id, questionType, questions, theme);

        reply.status(200).send(quiz);
    }

    getMultiplication(request: FastifyRequest, reply: FastifyReply) {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'multiplication';
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateMultiplication()
        );

        const quiz = new Quiz(id, questionType, questions, theme);

        reply.status(200).send(quiz);
    }

    getRandomOperation(request: FastifyRequest, reply: FastifyReply) {
        const id = generateNumberId();
        const length = 10;
        const questionType = 'direct';
        const theme = 'random-operation';
        const questions: DirectQuestion[] = Array.from({ length }, () =>
            this.mathQuestionService.generateRandomOperation()
        );

        const quiz = new Quiz(id, questionType, questions, theme);

        reply.status(200).send(quiz);
    }

}
