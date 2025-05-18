import type { Country } from '../../../../types/entities';

const oceanianDatasUrl =
    'https://restcountries.com/v3.1/region/oceania?fields=name,flags,capital,translations';

export async function fetchOceanianCountries(): Promise<Country[]> {
    const response = await fetch(oceanianDatasUrl);
    const data: Country[] = await response.json();

    const oceanianDatas = data.map((country: Country) => ({
        name: { common: country?.translations?.fra.common || '' },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));

    return oceanianDatas;
}
