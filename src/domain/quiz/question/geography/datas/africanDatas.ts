import { Country } from '../country.schemas';
import { africanDatas } from '../../../../../api/geography/africanApi';

export async function fetchAfricanCountries(): Promise<Country[]> {
    return africanDatas.map((country: Country) => ({
        name: { common: country.name.common },
        capital: country.capital,
        flags: { svg: country.flags.svg, png: country.flags.png },
    }));
}
