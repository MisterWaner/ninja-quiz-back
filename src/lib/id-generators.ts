export async function generateStringId(): Promise<string> {
    const nanoid = await import('nanoid');
    return nanoid.nanoid(10);
}

export function generateNumberId(): number {
    return Math.floor(Math.random() * 1000);
}