import { HistoricalDateQuestion } from '../historical.schema';
import { historicalDates } from '../../../../../api/history/dateApi';

export async function fetchHistoricalDates(): Promise<
    HistoricalDateQuestion[]
> {
    return historicalDates.map((historicalDate: HistoricalDateQuestion) => ({
        question: historicalDate.question,
        year: historicalDate.year,
    }));
}
