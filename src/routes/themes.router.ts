import { FastifyInstance } from 'fastify';
import { ThemeController } from '../domain/quiz/theme/theme.controller';
import { ThemeService } from '../domain/quiz/theme/theme.service';
import {
    CreateThemeInput,
    ThemeResponse,
} from '../domain/quiz/theme/theme.schema';

const themeService = new ThemeService();
const themeController = new ThemeController(themeService);

export async function themesRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: CreateThemeInput }>(
        '/',
        {},
        themeController.createTheme
    );
    fastify.get<{ Reply: ThemeResponse[] }>('/', {}, themeController.getThemes);
    fastify.get<{ Params: { id: ThemeResponse['id'] }; Reply: ThemeResponse }>(
        '/:id',
        {},
        themeController.getThemeById
    );
    fastify.put<{
        Params: { id: ThemeResponse['id'] };
        Body: { name: ThemeResponse['name'] };
    }>('/:id', {}, themeController.updateTheme);
    fastify.delete<{ Params: { id: ThemeResponse['id'] } }>(
        '/:id',
        {},
        themeController.deleteTheme
    );
}
