import type {Country} from '../../../../types/entities';
import {europeanDatas} from '../../../../api/geography/europeanApi';

export async function fetchEuropeanCountries(): Promise<Country[]> {
    return europeanDatas.map((country: Country) => ({
        name: {common: country.name.common},
        capital: country.capital,
        flags: {svg: country.flags.svg, png: country.flags.png},
    }));
}
