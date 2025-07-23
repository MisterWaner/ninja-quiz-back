import { FastifyInstance } from 'fastify';
import { MathQuizController } from '../../domain/quiz/question/math/math.quiz.controller';
import { MathQuestionService } from '../../domain/quiz/question/math/math.question.service';
import { Quiz } from '../../domain/quiz/quiz.schema';

const mathQuestionService = new MathQuestionService();
const mathQuizController = new MathQuizController(mathQuestionService);

export async function mathRouter(fastify: FastifyInstance) {
    const routes = [
        {url: '/addition', handler: mathQuizController.getAddition},
        {url: '/soustraction', handler: mathQuizController.getSubstraction},
        {url: '/multiplication', handler: mathQuizController.getMultiplication},
        {url: '/calculs-aleatoires', handler: mathQuizController.getRandomOperation},
        {url: '/comparaison-entiers', handler: mathQuizController.getIntegerComparison},
        {url: '/comparaison-decimales', handler: mathQuizController.getDecimalComparison},
    ]

    routes.forEach(({url, handler}) => {
        fastify.get<{Reply: Quiz}>(url, {}, handler.bind(mathQuizController));
    })
}