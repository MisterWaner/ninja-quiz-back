import type { Country } from '../../../../types/entities';

const africanDatasUrl =
    'https://restcountries.com/v3.1/region/africa?fields=name,flags,capital,translations';

export async function fetchAfricanCountries(): Promise<Country[]> {
    const response = await fetch(africanDatasUrl);
    const data: Country[] = await response.json();

    const africanDatas = data.map((country: Country) => ({
        name: { common: country?.translations?.fra.common || '' },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));

    return africanDatas;
}
