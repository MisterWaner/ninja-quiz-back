export function stringWithoutAccents(string: string): string {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function lowerCaseString(string: string): string {
    return string.toLocaleLowerCase();
}

export function normalizedString(string: string): string {
    return stringWithoutAccents(lowerCaseString(string)).replace(/\s/g, '-');
}
