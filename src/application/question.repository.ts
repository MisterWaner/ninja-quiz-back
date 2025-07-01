import { DirectQuestion, MultipleChoiceQuestion } from '../models/Question';

export interface MathQuestionRepository {
    generateAddition(): DirectQuestion;
    generateSubstraction(): DirectQuestion;
    generateMultiplication(): DirectQuestion;
    generateRandomOperation(): DirectQuestion;
}

export interface GeoCapitalsQuestionRepository {
    generateEuropeanCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAfricanCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAsianCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAmericanCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateOceanianCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateRandomCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
}

export interface GeoFlagsQuestionRepository {
    generateEuropeanFlagsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAfricanFlagsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAsianFlagsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAmericanFlagsQuestion(): Promise<MultipleChoiceQuestion>;
    generateOceanianFlagsQuestion(): Promise<MultipleChoiceQuestion>;
    generateRandomFlagsQuestion(): Promise<MultipleChoiceQuestion>;
}

export interface HistoryQuestionRepository {
    generateRandomHistoricalDatesQuestion(): Promise<MultipleChoiceQuestion>
}