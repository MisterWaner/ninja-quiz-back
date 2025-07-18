import {FastifyInstance} from "fastify";
import {HistoryQuestionService} from "../../modules/questions/history/dates/historicalDates.question.service";
import {HistoricalDatesQuizController} from "../../modules/questions/history/dates/historicalDates.quiz.controller";
import {Quiz} from "../../models/Quiz";

const historyQuestionService = new HistoryQuestionService();
const historicalDatesQuizController = new HistoricalDatesQuizController(historyQuestionService)

export async function historyRouter(fastify: FastifyInstance) {
    const historyRoutes = [
        {url: '/dates-historiques', handler: historicalDatesQuizController.getRandomHistoricalDateQuestions}
    ]

    historyRoutes.forEach(({url, handler}) => {
        fastify.get<{ Reply: Quiz }>(
            url,
            {},
            handler.bind(historicalDatesQuizController)
        )
    })
}