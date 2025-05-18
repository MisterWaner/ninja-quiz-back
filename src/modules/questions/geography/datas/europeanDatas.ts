import type { Country } from '../../../../types/entities';

const europeanDatasUrl =
    'https://restcountries.com/v3.1/region/europe?fields=name,flags,capital,translations';

export async function fetchEuropeanCountries(): Promise<Country[]> {
    const response = await fetch(europeanDatasUrl);
    const data: Country[] = await response.json();

    const europeanDatas = data.map((country: Country) => ({
        name: { common: country?.translations?.fra.common || '' },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));

    return europeanDatas;
}
