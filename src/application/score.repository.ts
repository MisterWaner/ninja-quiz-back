import { Score } from '../models/Score';
import { User } from '../models/User';
import { Subject } from '../models/Subject';
import { Theme } from '../models/Theme';


export interface ScoreRepository {
    updateUserScore(id: string, value: number): Promise<void>;
    updateUserScoreByTheme(id: string, themeId: string, value: number): Promise<void>;
    updateUserScoreBySubject(id: string, subjectId: string, value: number): Promise<void>;
    getUsersGlobalScore(): Promise<Score[]>;
    getUsersDailyScore(): Promise<Score[]>;
    getUserGlobalScore(id: string): Promise<Score>;
    getUserDailyScore(id: string): Promise<Score>;
}