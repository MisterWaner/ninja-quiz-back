import { FastifyInstance } from 'fastify';
import { MathQuizController } from '../../modules/questions/math/math.quiz.controller';
import { MathQuestionService } from '../../modules/questions/math/math.question.service';
import { Quiz } from '../../models/Quiz';

const mathQuestionService = new MathQuestionService();
const mathQuizController = new MathQuizController(mathQuestionService);

export async function mathRouter(fastify: FastifyInstance) {
    const routes = [
        {url: '/addition', handler: mathQuizController.getAddition},
        {url: '/soustraction', handler: mathQuizController.getSubstraction},
        {url: '/multiplication', handler: mathQuizController.getMultiplication},
        {url: '/calculs-aleatoires', handler: mathQuizController.getRandomOperation},
    ]

    routes.forEach(({url, handler}) => {
        fastify.get<{Reply: Quiz}>(url, {}, handler.bind(mathQuizController));
    })
}