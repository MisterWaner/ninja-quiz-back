import { HistoryQuestionRepository } from '../../../../../application/question.repository';
import { MultipleChoiceQuestion } from '../../question.schema';
import {
    getRandomItem,
    shuffleOptionsInMultipleChoiceQuestion,
    generateMultipleChoiceQuestionOptions,
} from '../../../../../lib/helpers/quiz-helpers';
import { generateNumberId } from '../../../../../lib/id-generators';
import { fetchHistoricalDates } from '../datas/historicalDatesData';
import { HistoricalDateQuestion } from '../historical.schema';

export class HistoryQuestionService implements HistoryQuestionRepository {
    async generateRandomHistoricalDatesQuestion(): Promise<MultipleChoiceQuestion> {
        const id: number = generateNumberId();
        const historicalDateData: HistoricalDateQuestion[] =
            await fetchHistoricalDates();
        const selectedDate: HistoricalDateQuestion =
            getRandomItem(historicalDateData);
        const questionText = selectedDate.question;
        const correctAnswer = selectedDate.year;

        const options = generateMultipleChoiceQuestionOptions(
            historicalDateData.map(
                (historicalDate: HistoricalDateQuestion) => historicalDate.year
            ),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return {
            id,
            questionText,
            options,
            correctAnswer,
        };
    }
}
