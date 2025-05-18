import { nanoid } from 'nanoid';

export function generateStringId(): string {
    return nanoid(10);
}

export function generateNumberId(): number {
    return Math.floor(Math.random() * 1000);
}