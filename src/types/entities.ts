import { User } from '../models/User';
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

export type UserGlobalScore = {
    userId: User['id'];
    username: User['username'];
    totalScore: number;
};

export type UserGlobalScoreSortedBySubject = {
    userId: User['id'];
    username: User['username'];
    totalScore: number;
    subjectName: string;
}

export type UserGlobalScoreSortedByTheme = {
    userId: User['id'];
    username: User['username'];
    totalScore: number;
    themeName: string;
}

export type UserDailyScore = {
    userId: User['id'];
    username: User['username'];
    totalScore: number;
    date: Score['date'];
};

