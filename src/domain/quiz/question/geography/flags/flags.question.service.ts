import { GeoFlagsQuestionRepository } from '../../../../../application/question.repository';
import { MultipleChoiceQuestion } from '../../question.schema';
import { generateNumberId } from '../../../../../lib/id-generators';
import {
    shuffleOptionsInMultipleChoiceQuestion,
    getRandomItem,
    generateMultipleChoiceQuestionOptions,
} from '../../../../../lib/helpers/quiz-helpers';
import { fetchAsianCountries } from '../datas/asianDatas';
import { fetchAfricanCountries } from '../datas/africanDatas';
import { fetchEuropeanCountries } from '../datas/europeanDatas';
import { fetchAmericanCountries } from '../datas/americanDatas';
import { fetchOceanianCountries } from '../datas/oceanianDatas';

export class FlagsQuestionService implements GeoFlagsQuestionRepository {
    async generateEuropeanFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchEuropeanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return {
            id,
            questionText,
            options: options.flat() as string[],
            correctAnswer: correctAnswer,
            imgUrl: imageUrl,
        };
    }

    async generateAfricanFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAfricanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return {
            id,
            questionText,
            options: options.flat() as string[],
            correctAnswer: correctAnswer,
            imgUrl: imageUrl,
        };
    }

    async generateAsianFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAsianCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common),
            correctAnswer
        );

        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return {
            id,
            questionText,
            options: options.flat() as string[],
            correctAnswer: correctAnswer,
            imgUrl: imageUrl,
        };
    }

    async generateAmericanFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAmericanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return {
            id,
            questionText,
            options: options.flat() as string[],
            correctAnswer: correctAnswer,
            imgUrl: imageUrl,
        };
    }

    async generateOceanianFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchOceanianCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return {
            id,
            questionText,
            options: options.flat() as string[],
            correctAnswer: correctAnswer,
            imgUrl: imageUrl,
        };
    }

    async generateRandomFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const randomData = [
            this.generateAfricanFlagsQuestion.bind(this),
            this.generateEuropeanFlagsQuestion.bind(this),
            this.generateAsianFlagsQuestion.bind(this),
            this.generateAmericanFlagsQuestion.bind(this),
            this.generateOceanianFlagsQuestion.bind(this),
        ];

        const randomFlags =
            randomData[Math.floor(Math.random() * randomData.length)];
        return randomFlags();
    }
}
