import { db } from "../../database/database";
import { Subject } from "../../models/Subject";
import { Theme } from "../../models/Theme";

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

export function subjectExsits(subjectId: Subject['id']): boolean {
    const subject = db.prepare('SELECT 1 FROM subjects WHERE id = ?').get(subjectId) as Subject;

    return !!subject;
}

export function themeExsits(themeId: Theme['id']): boolean {
    const theme = db.prepare('SELECT 1 FROM themes WHERE id = ?').get(themeId) as Theme;

    return !!theme;
}