import {
    ThemeResponse,
    CreateThemeInput,
} from '../domain/quiz/theme/theme.schema';

export interface ThemeRepository {
    createTheme(theme: CreateThemeInput): Promise<void>;
    getThemes(): Promise<ThemeResponse[]>;
    getThemeById(id: ThemeResponse['id']): Promise<ThemeResponse>;
    getThemeByNameAndReturnId(
        name: ThemeResponse['name']
    ): Promise<ThemeResponse['id']>;
    updateTheme(
        id: ThemeResponse['id'],
        name: ThemeResponse['name'],
        path: ThemeResponse['path']
    ): Promise<void>;
    deleteTheme(id: ThemeResponse['id']): Promise<void>;
}
