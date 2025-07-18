import {FastifyRequest, FastifyReply} from "fastify";
import {HistoryQuestionService} from "./historicalDates.question.service";
import {ThemeService} from "../../../themes/theme.service";
import {Quiz} from "../../../../models/Quiz";
import {MultipleChoiceQuestion} from '../../../../models/Question';
import {generateNumberId} from '../../../../lib/id-generators';

const themeService = new ThemeService();

export class HistoricalDatesQuizController {
    constructor(private historicalQuestionService: HistoryQuestionService) {
    }

    subjectId = 3

    getRandomHistoricalDateQuestions = async (request: FastifyRequest, reply: FastifyReply) => {
        const id: number = generateNumberId()
        const questionType = "multiple"
        const length: number = 10
        const theme = 'Dates historiques'
        const themeId = await themeService.getThemeByNameAndReturnId(theme)
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({length}, () => this.historicalQuestionService.generateRandomHistoricalDatesQuestion())
        )

        const quiz = new Quiz(id, questionType, questions, theme, themeId, this.subjectId);

        reply.status(200).send(quiz);
    }
}