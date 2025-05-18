import { Quiz } from '../models/Quiz';

export interface QuizRepository {
    createQuiz(): Promise<Quiz>;
}
