import { MathQuestionRepository } from '../../../application/question.repository';
import { DirectQuestion } from '../../../models/Question';
import { generateNumberId } from '../../../lib/id-generators';

export class MathQuestionService implements MathQuestionRepository {
    generateAddition(): DirectQuestion {
        const id = generateNumberId();
        const number1 = Math.floor(Math.random() * 100);
        const number2 = Math.floor(Math.random() * 100);
        const questionText = `Quel est le résultat de ${number1} + ${number2} ?`;
        const correctAnswer = (number1 + number2).toString();

        return new DirectQuestion(id, questionText, correctAnswer);
    }

    generateSubstraction(): DirectQuestion {
        const id = generateNumberId();
        const number1 = Math.floor(Math.random() * 100);
        const number2 = Math.floor(Math.random() * 100);
        let questionText: string;
        let correctAnswer: string;

        if (number1 > number2) {
            questionText = `Quel est le résultat de ${number1} - ${number2} ?`;
            correctAnswer = (number1 - number2).toString();
        } else if (number1 < number2) {
            questionText = `Quel est le résultat de ${number2} - ${number1} ?`;
            correctAnswer = (number2 - number1).toString();
        } else {
            questionText = `Quel est le résultat de ${number1} - ${number2} ?`;
            correctAnswer = '0';
        }

        return new DirectQuestion(id, questionText, correctAnswer);
    }

    generateMultiplication(): DirectQuestion {
        const id = generateNumberId();
        const number1 = Math.floor(Math.random() * 10);
        const number2 = Math.floor(Math.random() * 10);
        const questionText = `Quel est le résultat de ${number1} x ${number2} ?`;
        const correctAnswer = (number1 * number2).toString();

        return new DirectQuestion(id, questionText, correctAnswer);
    }

    generateRandomOperation(): DirectQuestion {
        const operations = [
            this.generateAddition.bind(this),
            this.generateSubstraction.bind(this),
            this.generateMultiplication.bind(this),
        ];

        const randomOperation =
            operations[Math.floor(Math.random() * operations.length)];
        return randomOperation();
    }
}
