import type { Country } from '../../../../types/entities';

const asianDatasUrl =
    'https://restcountries.com/v3.1/region/asia?fields=name,flags,capital,translations';

export async function fetchAsianCountries(): Promise<Country[]> {
    const response = await fetch(asianDatasUrl);
    const data: Country[] = await response.json();

    const asianDatas = data.map((country: Country) => ({
        name: { common: country?.translations?.fra.common || '' },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));

    return asianDatas;
}
