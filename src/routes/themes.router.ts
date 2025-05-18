import { FastifyInstance } from 'fastify';
import { ThemeController } from '../modules/themes/theme.controller';
import { ThemeService } from '../modules/themes/theme.service';
import { Theme } from '../models/Theme';

const themeService = new ThemeService();
const themeController = new ThemeController(themeService);

export async function themesRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: Theme }>('/', {}, themeController.createTheme);
    fastify.get<{ Reply: Theme[] }>('/', {}, themeController.getThemes);
    fastify.get<{ Params: { id: number }; Reply: Theme }>(
        '/:id',
        {},
        themeController.getThemeById
    );
    fastify.put<{ Params: { id: number }; Body: { name: Theme['name'] } }>(
        '/:id',
        {},
        themeController.updateTheme
    );
    fastify.delete<{ Params: { id: number } }>(
        '/:id',
        {},
        themeController.deleteTheme
    );
}