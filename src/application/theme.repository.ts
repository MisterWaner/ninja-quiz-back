import { Theme } from '../models/Theme';

export interface ThemeRepository {
    createTheme(theme: Theme): Promise<void>;
    getThemes(): Promise<Theme[]>;
    getThemeById(id: string): Promise<Theme>;
    getThemeByNameAndReturnId(name: Theme['name']): Promise<Theme['id']>;
    updateTheme(
        id: string,
        name: Theme['name'],
        themePath: Theme['themePath']
    ): Promise<void>;
    deleteTheme(id: string): Promise<void>;
}
