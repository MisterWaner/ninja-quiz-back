import { FastifyInstance } from 'fastify';
import { CapitalsQuizController } from '../../modules/questions/geography/capitals/capitals.quiz.controller';
import { CapitalsQuestionService } from '../../modules/questions/geography/capitals/capitals.question.service';
import { Quiz } from '../../models/Quiz';

const capitalsQuestionService = new CapitalsQuestionService();
const capitalsQuizController = new CapitalsQuizController(capitalsQuestionService);

export async function geoRouter(fastify: FastifyInstance) {
    const routes = [
        {url: '/capitales-europeennes', handler: capitalsQuizController.getEuropeanCapitals},
        {url: '/capitales-africaines', handler: capitalsQuizController.getAfricanCapitals},
        {url: '/capitales-asiatiques', handler: capitalsQuizController.getAsianCapitals},
        {url: '/capitales-americaines', handler: capitalsQuizController.getAmericanCapitals},
        {url: '/capitales-oceaniques', handler: capitalsQuizController.getOceanianCapitals},
        {url: '/capitales-aleatoires', handler: capitalsQuizController.getRandomCapitals},
    ]

    routes.forEach(({url, handler}) => {
        fastify.get<{Reply: Quiz}>(url, {}, handler.bind(capitalsQuizController));
    })
}