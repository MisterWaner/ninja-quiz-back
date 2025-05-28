// Mixes the different options of a multiple choice question
export function shuffleOptionsInMultipleChoiceQuestion<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

// Returns a random integer between min and max (inclusive)
export function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns a random item from an array
export function getRandomItem<T>(array: T[]): T {
    const randomIndex = getRandomInteger(0, array.length - 1);
    return array[randomIndex];
}

// Generates three wrong answers
export function generateMultipleChoiceQuestionOptions<T>(options: T[], correctAnswer: T): T[] {
    const filteredOptions = options.filter((option) => option !== correctAnswer)
    const wrongAnswers = new Set<T>();
    while (wrongAnswers.size < 3) {
        const randomAnswer = getRandomItem(filteredOptions);
        wrongAnswers.add(randomAnswer);
    }
    return Array.from(wrongAnswers);
}
