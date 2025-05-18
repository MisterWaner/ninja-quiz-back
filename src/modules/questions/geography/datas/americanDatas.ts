import type { Country } from '../../../../types/entities';

const americanDatasUrl =
    'https://restcountries.com/v3.1/region/americas?fields=name,flags,capital,translations';

export async function fetchAmericanCountries(): Promise<Country[]> {
    const response = await fetch(americanDatasUrl);
    const data: Country[] = await response.json();

    const americanDatas = data.map((country: Country) => ({
        name: { common: country?.translations?.fra.common || '' },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));

    return americanDatas;
}
