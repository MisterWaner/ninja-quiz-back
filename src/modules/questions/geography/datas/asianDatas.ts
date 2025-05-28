import type { Country } from '../../../../types/entities';
import { asianDatas } from '../../../../api/geography/asianApi';

export async function fetchAsianCountries(): Promise<Country[]> {
    const datas = asianDatas.map((country: Country) => ({
        name: { common: country.name.common },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));

    return datas;
}
