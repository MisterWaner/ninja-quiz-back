import {HistoricalDateQuestion} from "../../../../types/entities";
import {historicalDates} from "../../../../api/history/dateApi";

export async function fetchHistoricalDates(): Promise<{ question: string; year: number }[]> {
    return historicalDates.map((historicalDate: HistoricalDateQuestion) => ({
        question: historicalDate.question,
        year: historicalDate.year
    }))


}