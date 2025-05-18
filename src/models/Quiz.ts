import { Theme } from './Theme';
import {
    DirectQuestion,
    TrueFalseQuestion,
    MultipleChoiceQuestion,
} from './Question';

export class Quiz {
    constructor(
        public id: number,
        public questionType: 'direct' | 'multiple-choice' | 'true-false',
        public questions:
            | DirectQuestion[]
            | MultipleChoiceQuestion[]
            | TrueFalseQuestion[],
        public theme: Theme['name']
    ) {
        this.id = id;
        this.questionType = questionType;
        this.questions = questions;
        this.theme = theme;
    }
}
