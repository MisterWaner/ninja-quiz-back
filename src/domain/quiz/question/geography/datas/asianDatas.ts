import { Country } from '../country.schemas';
import { asianDatas } from '../../../../../api/geography/asianApi';

export async function fetchAsianCountries(): Promise<Country[]> {
    return asianDatas.map((country: Country) => ({
        name: { common: country.name.common },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));
}
