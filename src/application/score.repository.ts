import {
    CreateScoreInput,
    ScoreResponse,
    UserAverageScoreSortedBySubject,
    UserAverageScoreSortedByTheme,
    UserDailyScore,
    UserGlobalScore,
    UserGlobalScoreSortedBySubject,
    UserGlobalScoreSortedByTheme,
} from '../domain/score/score.schema';
import { UserResponse } from '../domain/user/user.schema';
import { SubjectResponse } from '../domain/quiz/subject/subject.schema';

export interface ScoreRepository {
    addUserScore(score: Omit<CreateScoreInput, 'id'>): Promise<void>;
    getUsersGlobalScore(): Promise<UserGlobalScore[]>;
    getUsersDailyScore(): Promise<UserDailyScore[]>;
    getUserGlobalScore(userId: UserResponse['id']): Promise<ScoreResponse[]>;
    getUserDailyScore(userId: UserResponse['id']): Promise<ScoreResponse[]>;
    getUserDailyScoresSortedByTheme(
        userId: UserResponse['id']
    ): Promise<ScoreResponse[]>;
    getUserDailyScoresBySubject(
        userId: UserResponse['id'],
        subjectId: SubjectResponse['id']
    ): Promise<ScoreResponse[]>;
    getUserAverageScoreByTheme(
        userId: UserResponse['id']
    ): Promise<UserAverageScoreSortedByTheme[]>;
    getUserAverageScoreBySubject(
        userId: UserResponse['id']
    ): Promise<UserAverageScoreSortedBySubject[]>;
    getUserGlobalScoresSortedByTheme(
        userId: UserResponse['id']
    ): Promise<UserGlobalScoreSortedByTheme[]>;
    getUserGlobalScoresSortedBySubject(
        userId: UserResponse['id']
    ): Promise<UserGlobalScoreSortedBySubject[]>;
}
