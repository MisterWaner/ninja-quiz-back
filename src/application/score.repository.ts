import { Score } from '../models/Score';
import { User } from '../models/User';
import type {
    UserGlobalScore,
    UserDailyScore,
    UserGlobalScoreSortedBySubject,
    UserGlobalScoreSortedByTheme,
    UserAverageScoreSortedByTheme,
    UserAverageScoreSortedBySubject
} from '../types/entities';
import { Subject } from '../models/Subject';

export interface ScoreRepository {
    addUserScore(score: Omit<Score, 'id'>): Promise<void>;
    getUsersGlobalScore(): Promise<UserGlobalScore[]>;
    getUsersDailyScore(): Promise<UserDailyScore[]>;
    getUserGlobalScore(userId: User['id']): Promise<Score[]>;
    getUserDailyScore(userId: User['id']): Promise<Score[]>;
    getUserDailyScoresSortedByTheme(userId: User['id']): Promise<Score[]>;
    getUserDailyScoresBySubject(
        userId: User['id'],
        subjectId: Subject['id']
    ): Promise<Score[]>;
    getUserAverageScoreByTheme(userId: User['id']): Promise<UserAverageScoreSortedByTheme[]>;
    getUserAverageScoreBySubject(userId: User['id']): Promise<UserAverageScoreSortedBySubject[]>;
    getUserGlobalScoresSortedByTheme(
        userId: User['id']
    ): Promise<UserGlobalScoreSortedByTheme[]>;
    getUserGlobalScoresSortedBySubject(
        userId: User['id']
    ): Promise<UserGlobalScoreSortedBySubject[]>;
}
