import { FastifyInstance } from 'fastify';
import { CapitalsQuizController } from '../../domain/quiz/question/geography/capitals/capitals.quiz.controller';
import { FlagsQuizController } from '../../domain/quiz/question/geography/flags/flags.quiz.controller';
import { CapitalsQuestionService } from '../../domain/quiz/question/geography/capitals/capitals.question.service';
import { FlagsQuestionService } from '../../domain/quiz/question/geography/flags/flags.question.service';
import { Quiz } from '../../domain/quiz/quiz.schema';

const capitalsQuestionService = new CapitalsQuestionService();
const capitalsQuizController = new CapitalsQuizController(
    capitalsQuestionService
);

const flagsQuestionService = new FlagsQuestionService();
const flagsQuizController = new FlagsQuizController(flagsQuestionService);

export async function geoRouter(fastify: FastifyInstance) {
    const capitalsRoutes = [
        {
            url: '/capitales-europeennes',
            handler: capitalsQuizController.getEuropeanCapitals,
        },
        {
            url: '/capitales-africaines',
            handler: capitalsQuizController.getAfricanCapitals,
        },
        {
            url: '/capitales-asiatiques',
            handler: capitalsQuizController.getAsianCapitals,
        },
        {
            url: '/capitales-americaines',
            handler: capitalsQuizController.getAmericanCapitals,
        },
        {
            url: '/capitales-oceaniques',
            handler: capitalsQuizController.getOceanianCapitals,
        },
        {
            url: '/capitales-aleatoires',
            handler: capitalsQuizController.getRandomCapitals,
        },
    ];

    const flagsRoutes = [
        {
            url: '/drapeaux-europeens',
            handler: flagsQuizController.getEuropeanFlags,
        },
        {
            url: '/drapeaux-africains',
            handler: flagsQuizController.getAfricanFlags,
        },
        {
            url: '/drapeaux-asiatiques',
            handler: flagsQuizController.getAsianFlags,
        },
        {
            url: '/drapeaux-americains',
            handler: flagsQuizController.getAmericanFlags,
        },
        {
            url: '/drapeaux-oceaniques',
            handler: flagsQuizController.getOceanianFlags,
        },
        {
            url: '/drapeaux-aleatoires',
            handler: flagsQuizController.getRandomFlags,
        },
    ];

    capitalsRoutes.forEach(({ url, handler }) => {
        fastify.get<{ Reply: Quiz }>(
            url,
            {},
            handler.bind(capitalsQuizController)
        );
    });

    flagsRoutes.forEach(({ url, handler }) => {
        fastify.get<{ Reply: Quiz }>(
            url,
            {},
            handler.bind(flagsQuizController)
        );
    });
}
