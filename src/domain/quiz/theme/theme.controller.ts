import { FastifyRequest, FastifyReply } from 'fastify';
import { ThemeService } from './theme.service';
import { CreateThemeInput, ThemeResponse } from './theme.schema';
import { normalizedString } from '../../../lib/helpers/general-helpers';

export class ThemeController {
    constructor(private themeService: ThemeService) {
        this.createTheme = this.createTheme.bind(this);
        this.updateTheme = this.updateTheme.bind(this);
        this.deleteTheme = this.deleteTheme.bind(this);
        this.getThemeById = this.getThemeById.bind(this);
        this.getThemes = this.getThemes.bind(this);
    }

    async createTheme(
        request: FastifyRequest<{ Body: CreateThemeInput }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const theme = request.body;

            if (!theme.name) {
                throw reply.status(400).send('Missing theme name');
            }

            const themeExists = (await this.themeService.getThemes()).find(
                (th) => th.name === theme.name
            );

            if (themeExists) {
                throw reply.status(409).send('Theme already exists');
            }

            await this.themeService.createTheme(theme);
            reply.status(201).send('Theme created');
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getThemes(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const themes = await this.themeService.getThemes();
            if (!themes || themes.length === 0)
                reply.status(404).send('No themes found');

            reply.status(200).send(themes);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async getThemeById(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const { id } = request.params;
            const theme = await this.themeService.getThemeById(id);

            if (!theme) reply.status(404).send('Theme not found');

            reply.status(200).send(theme);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async updateTheme(
        request: FastifyRequest<{
            Params: { id: ThemeResponse['id'] };
            Body: { name: string };
        }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const { id } = request.params;
            const { name } = request.body;
            const path = normalizedString(name);

            const theme = await this.themeService.getThemeById(id);
            if (!theme) {
                reply.status(404).send('Theme not found');
                return;
            }

            await this.themeService.updateTheme(id, name, path);
            reply.status(200).send('Theme updated');
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    async deleteTheme(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const { id } = request.params;
            const theme = await this.themeService.getThemeById(id);
            if (!theme) {
                reply.status(404).send('Theme not found');
                return;
            }

            await this.themeService.deleteTheme(id);
            reply.status(204).send('Theme deleted');
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}
