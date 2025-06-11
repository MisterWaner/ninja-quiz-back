import { Theme } from './Theme';
import {
    DirectQuestion,
    TrueFalseQuestion,
    MultipleChoiceQuestion,
} from './Question';
import { Subject } from './Subject';

export class Quiz {
    constructor(
        public id: number,
        public questionType: 'direct' | 'multiple' | 'trueOrFalse',
        public questions:
            | DirectQuestion[]
            | MultipleChoiceQuestion[]
            | TrueFalseQuestion[],
        public theme: Theme['name'],
        public themeId: Theme['id'],
        public subjectId: Subject['id'],
    ) {
        this.id = id;
        this.questionType = questionType;
        this.questions = questions;
        this.theme = theme;
        this.themeId = themeId;
        this.subjectId = subjectId;
    }
}
