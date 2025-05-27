import type { Country } from '../../../../types/entities';
import { americanDatas } from '../../../../api/geography/americanApi';

export async function fetchAmericanCountries(): Promise<Country[]> {
    const datas = americanDatas.map((country: Country) => ({
        name: { common: country.name.common },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));

    return datas;
}
