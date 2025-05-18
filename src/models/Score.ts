import { User } from './User';
import { Subject } from './Subject';
import { Theme } from './Theme';

export class Score {
    constructor(
        public id: number,
        public userId: User['id'],
        public subjectId: Subject['id'],
        public themeId: Theme['id'],
        public value: number,
        public date: Date
    ) {}
}
