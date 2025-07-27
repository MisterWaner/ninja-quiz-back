import { Quiz } from "../domain/quiz/quiz.schema";

export interface QuizRepository {
    createQuiz(): Promise<Quiz>;
}
