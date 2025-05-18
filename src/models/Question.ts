export type QuestionType = 'direct' | 'multiple' | 'trueOrFalse';

export interface QuestionBase {
    id: number;
    questionText: string;
}

export class DirectQuestion implements QuestionBase {
    constructor(
        public id: number,
        public questionText: string,
        public correctAnswer: string
    ) {
        this.id = id;
        this.questionText = questionText;
        this.correctAnswer = correctAnswer;
    }
}

export class MultipleChoiceQuestion implements QuestionBase {
    constructor(
        public id: number,
        public questionText: string,
        public options: string[],
        public correctAnswer: string | string[],
        public imgUrl?: string
    ) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.imgUrl = imgUrl;
    }
}

export class TrueFalseQuestion implements QuestionBase {
    constructor(
        public id: number,
        public questionText: string,
        public options: boolean[],
        public correctAnswer: boolean | string
    ) {
        this.id = id;
        this.questionText = questionText;
        this.correctAnswer = correctAnswer;
        this.options = options;
    }
}