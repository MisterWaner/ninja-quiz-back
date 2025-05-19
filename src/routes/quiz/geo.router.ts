import { FastifyInstance } from 'fastify';
import { CapitalsQuizController } from '../../modules/questions/geography/capitals/capitals.quiz.controller';
import { CapitalsQuestionService } from '../../modules/questions/geography/capitals/capitals.question.service';
import { FlagsQuestionService } from '../../modules/questions/geography/flags/flags.question.service';
import { FlagsQuizController } from '../../modules/questions/geography/flags/flags.quiz.controller';
import { Quiz } from '../../models/Quiz';

const capitalsQuestionService = new CapitalsQuestionService();
const capitalsQuizController = new CapitalsQuizController(capitalsQuestionService);

const flagsQuestionService = new FlagsQuestionService();
const flagsQuizController = new FlagsQuizController(flagsQuestionService);

export async function geoRouter(fastify: FastifyInstance) {
    const routes = [
        {url: '/capitales-europeennes', handler: capitalsQuizController.getEuropeanCapitals},
        {url: '/capitales-africaines', handler: capitalsQuizController.getAfricanCapitals},
        {url: '/capitales-asiatiques', handler: capitalsQuizController.getAsianCapitals},
        {url: '/capitales-americaines', handler: capitalsQuizController.getAmericanCapitals},
        {url: '/capitales-oceaniques', handler: capitalsQuizController.getOceanianCapitals},
        {url: '/capitales-aleatoires', handler: capitalsQuizController.getRandomCapitals},
        {url: '/drapeaux-europeens', handler: flagsQuizController.getEuropeanFlags},
        {url: '/drapeaux-africains', handler: flagsQuizController.getAfricanFlags},
        {url: '/drapeaux-asiatiques', handler: flagsQuizController.getAsianFlags},
        {url: '/drapeaux-americains', handler: flagsQuizController.getAmericanFlags},
        {url: '/drapeaux-oceaniques', handler: flagsQuizController.getOceanianFlags},
        {url: '/drapeaux-aleatoires', handler: flagsQuizController.getRandomFlags},
    ]

    routes.forEach(({url, handler}) => {
        fastify.get<{Reply: Quiz}>(url, {}, handler.bind(capitalsQuizController));
    })
}