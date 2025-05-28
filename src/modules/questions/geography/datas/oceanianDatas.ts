import type { Country } from '../../../../types/entities';
import { oceanianDatas } from '../../../../api/geography/oceanianApi';

export async function fetchOceanianCountries(): Promise<Country[]> {
    const datas = oceanianDatas.map((country: Country) => ({
        name: { common: country.name.common },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));

    return datas;
}
