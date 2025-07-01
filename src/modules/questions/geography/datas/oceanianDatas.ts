import type {Country} from '../../../../types/entities';
import {oceanianDatas} from '../../../../api/geography/oceanianApi';

export async function fetchOceanianCountries(): Promise<Country[]> {
    return oceanianDatas.map((country: Country) => ({
        name: {common: country.name.common},
        capital: country.capital,
        flags: {svg: country.flags.svg, png: country.flags.png},
    }));
}
