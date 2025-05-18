import { FastifyInstance } from 'fastify';
import { MathQuizController } from '../../modules/questions/math/math.quiz.controller';
import { MathQuestionService } from '../../modules/questions/math/math.question.service';
import { Quiz } from '../../models/Quiz';

const mathQuestionService = new MathQuestionService();
const mathQuizController = new MathQuizController(mathQuestionService);

export async function mathRouter(fastify: FastifyInstance) {
    fastify.get<{Reply: Quiz}>('/addition', {}, mathQuizController.getAddition);
    fastify.get<{Reply: Quiz}>('/soustraction', {}, mathQuizController.getSubstraction);
    fastify.get<{Reply: Quiz}>('/multiplication', {}, mathQuizController.getMultiplication);
    fastify.get<{Reply: Quiz}>('/calculs-aleatoires', {}, mathQuizController.getRandomOperation);
}