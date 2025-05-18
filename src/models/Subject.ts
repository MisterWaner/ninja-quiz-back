import { Theme } from './Theme';

export class Subject {
    constructor(
        public id: number,
        public name: string,
        public subjectPath: string,
        public themes: Theme[]
    ) {}
}
