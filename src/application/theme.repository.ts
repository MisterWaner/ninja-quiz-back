import { Theme } from '../models/Theme';

export interface ThemeRepository {
    createTheme(theme: Theme): Promise<void>;
    getThemes(): Promise<Theme[]>;
    getThemeById(id: number): Promise<Theme>;
    updateTheme(
        id: number,
        name: Theme['name'],
        themePath: Theme['themePath']
    ): Promise<void>;
    deleteTheme(id: number): Promise<void>;
}
