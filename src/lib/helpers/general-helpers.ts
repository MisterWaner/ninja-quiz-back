import pool from '../../database/config';
import { SubjectResponse } from '../../domain/quiz/subject/subject.schema';
import { ThemeResponse } from '../../domain/quiz/theme/theme.schema';

export function stringWithoutAccents(string: string): string {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function lowerCaseString(string: string): string {
    return string.toLocaleLowerCase();
}

export function normalizedString(string: string): string {
    return stringWithoutAccents(lowerCaseString(string)).replace(/\s/g, '-');
}

export function formatDateToISODateString(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function formatDateToString(date: Date): string {
    return date.toString().split('T')[0];
}

export function subjectExsits(subjectId: SubjectResponse['id']): boolean {
    const subject = pool.query<SubjectResponse>(
        'SELECT 1 FROM subjects WHERE id = $1',
        [subjectId]
    );

    return !!subject;
}

export function themeExsits(themeId: ThemeResponse['id']): boolean {
    const theme = pool.query<ThemeResponse>(
        'SELECT 1 FROM themes WHERE id = $1',
        [themeId]
    );

    return !!theme;
}