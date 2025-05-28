import { GeoCapitalsQuestionRepository } from '../../../../application/question.repository';
import { MultipleChoiceQuestion } from '../../../../models/Question';
import { generateNumberId } from '../../../../lib/id-generators';
import {
    shuffleOptionsInMultipleChoiceQuestion,
    getRandomItem,
    generateMultipleChoiceQuestionOptions,
} from '../../../../lib/helpers/quiz-helpers';
import { fetchEuropeanCountries } from '../datas/europeanDatas';
import { fetchAfricanCountries } from '../datas/africanDatas';
import { fetchAsianCountries } from '../datas/asianDatas';
import { fetchAmericanCountries } from '../datas/americanDatas';
import { fetchOceanianCountries } from '../datas/oceanianDatas';

export class CapitalsQuestionService implements GeoCapitalsQuestionRepository {
    async generateEuropeanCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchEuropeanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quelle est la capitale de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.capital.toString();

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.capital.toString()),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }

    async generateAfricanCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAfricanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quelle est la capitale de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.capital.toString();

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.capital.toString()),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }

    async generateAsianCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAsianCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quelle est la capitale de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.capital.toString();

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.capital.toString()),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }

    async generateAmericanCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAmericanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quelle est la capitale de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.capital.toString();

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.capital.toString()),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }
    async generateOceanianCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchOceanianCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quelle est la capitale de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.capital.toString();

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.capital.toString()),
            correctAnswer
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }

    async generateRandomCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        const randomData = [
            this.generateAfricanCapitalsQuestion.bind(this),
            this.generateEuropeanCapitalsQuestion.bind(this),
            this.generateAsianCapitalsQuestion.bind(this),
            this.generateAmericanCapitalsQuestion.bind(this),
            this.generateOceanianCapitalsQuestion.bind(this),
        ];

        const randomCapitals =
            randomData[Math.floor(Math.random() * randomData.length)];
        return randomCapitals();
    }
}
