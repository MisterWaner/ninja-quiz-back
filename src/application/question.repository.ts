import { DirectQuestion, MultipleChoiceQuestion } from '../models/Question';

export interface MathQuestionRepository {
    generateAddition(): DirectQuestion;
    generateSubtraction(): DirectQuestion;
    generateMultiplication(): DirectQuestion;
    generateRandomOperation(): DirectQuestion;
}

export interface GeoCapitalsQuestionRepository {}

export interface GeoFlagsQuestionRepository {}