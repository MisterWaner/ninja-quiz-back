import { Theme } from '../../models/Theme';
import { ThemeRepository } from '../../application/theme.repository';
import pool from '../../database/config';
import { normalizedString } from '../../lib/helpers/general-helpers';
import { SubjectService } from '../subjects/subject.service';

const subjectService = new SubjectService();

export class ThemeService implements ThemeRepository {
    static getThemeByName(theme: string) {
        throw new Error('Method not implemented.');
    }
    async createTheme(theme: Theme): Promise<void> {
        const subjectName = await subjectService
            .getSubjectById(theme.subjectId)
            .then((s) => s.name);
        if (!subjectName) throw new Error('Subject not found');

        const prefix = normalizedString(subjectName)
            .substring(0, 4)
            .toUpperCase();
        const result = await pool.query<{ count: number }>(
            'SELECT COUNT(*) AS count FROM themes WHERE subject_id = $1',
            [theme.subjectId]
        );
        const existingCount = result.rows[0].count;

        const id = `${prefix}_${existingCount + 1}`;

        const { name, subjectId } = theme;
        const themePath = normalizedString(name);
        const subjectExists = (await subjectService.getSubjects()).find(
            (subj) => subj.id === subjectId
        );

        if (!subjectExists) {
            throw new Error('Subject not found');
        }

        await pool.query(
            `INSERT INTO themes (id, name, subject_id, themePath) VALUES ($1, $2, $3, $4)`,
            [id, name, subjectId, themePath]
        );
    }

    async getThemes(): Promise<Theme[]> {
        const result = await pool.query('SELECT * FROM themes');

        const themes = result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            themePath: row.themePath,
            subjectId: row.subject_id,
        })) as Theme[];

        if (!themes) throw new Error('No themes found');

        return themes;
    }

    async getThemeById(id: string): Promise<Theme> {
        const result = await pool.query<Theme>(
            `
            SELECT * FROM themes WHERE id = $1`,
            [id]
        );

        const theme = result.rows[0];

        if (!theme) throw new Error('No theme found');

        return theme;
    }

    async getThemeByNameAndReturnId(name: Theme['name']): Promise<Theme['id']> {
        const result = await pool.query<Theme>(
            'SELECT * FROM themes WHERE name = $1',
            [name]
        );

        const theme = result.rows[0];
        if (!theme) throw new Error('No theme found');

        return theme.id;
    }

    async updateTheme(
        id: string,
        name: Theme['name'],
        themePath: Theme['themePath']
    ): Promise<void> {
        const theme = await this.getThemeById(id);

        if (!theme) throw new Error('No theme found');

        await pool.query(
            'UPDATE themes SET name = $1, themePath = $2 WHERE id = $3',
            [name, themePath, id]
        );
    }

    async deleteTheme(id: string): Promise<void> {
        const theme = await this.getThemeById(id);
        if (!theme) throw new Error('No theme found');

        await pool.query('DELETE FROM themes WHERE id = $1', [id]);
    }

    async reset(): Promise<void> {
        await pool.query('DELETE FROM themes');
        await pool.query('ALTER SEQUENCE themes_id_seq RESTART WITH 1');
    }
}
