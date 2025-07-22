import { UserResponse } from '../domain/user/user.schema';
import { Score } from '../models/Score';

export type Country = {
    name: {
        common: string;
    };
    flags: {
        png: string;
        svg: string;
    };
    capital: string[];
};

export type HistoricalDateQuestion = {
    id?: number;
    question: string;
    year: number;
}

export type UserGlobalScore = {
    userId: UserResponse['id'];
    username: UserResponse['username'];
    totalScore: number;
};

export type UserGlobalScoreSortedBySubject = {
    userId: UserResponse['id'];
    username: UserResponse['username'];
    totalScore: number;
    subjectName: string;
}

export type UserGlobalScoreSortedByTheme = {
    userId: UserResponse['id'];
    username: UserResponse['username'];
    totalScore: number;
    themeName: string;
}

export type UserAverageScoreSortedByTheme = {
    userId: UserResponse['id'];
    username: UserResponse['username'];
    averageScore: number;
    totalScore: number;
    themeName: string;
}

export type UserAverageScoreSortedBySubject = {
    userId: UserResponse['id'];
    username: UserResponse['username'];
    averageScore: number;
    totalScore: number;
    subjectName: string;
}

export type UserDailyScore = {
    userId: UserResponse['id'];
    username: UserResponse['username'];
    totalScore: number;
    date: Score['date'];
};

