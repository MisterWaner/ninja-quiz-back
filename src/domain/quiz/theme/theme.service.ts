import { ThemeRepository } from '../../../application/theme.repository';
import { ThemeResponse, CreateThemeInput } from './theme.schema';
import pool from '../../../database/config';
import { normalizedString } from '../../../lib/helpers/general-helpers';
import { SubjectService } from '../subject/subject.service';

const subjectService = new SubjectService();

export class ThemeService implements ThemeRepository {
    async createTheme(theme: CreateThemeInput): Promise<void> {
        const subjectName = await subjectService
            .getSubjectById(theme.subjectId)
            .then((s) => s.name);
        if (!subjectName) throw new Error('Subject not found');

        const prefix = normalizedString(subjectName)
            .substring(0, 4)
            .toUpperCase();
        
        const result = await pool.query<{ count: number}>(
            'SELECT COUNT(*) AS count FROM themes WHERE subject_id = $1',
            [theme.subjectId]
        );
        const existingCount = result.rows[0].count;
        console.log(existingCount);

        const id = `${prefix}_${existingCount}`;

        const { name, subjectId } = theme;
        const path = normalizedString(name);
        const subjectExists = (await subjectService.getSubjects()).find(
            (subj) => subj.id === subjectId
        );

        if (!subjectExists) {
            throw new Error('Subject not found');
        }

        await pool.query(
            `INSERT INTO themes (id, name, subject_id, themePath) VALUES ($1, $2, $3, $4)`,
            [id, name, subjectId, path]
        );
    }

    async getThemes(): Promise<ThemeResponse[]> {
        const result = await pool.query(
            'SELECT * FROM themes'
        );

        const themes = result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            path: row.themePath,
            subjectId: row.subject_id,
        })) as ThemeResponse[];

        if(!themes) throw new Error('No themes found');

        return themes;
    }

    async getThemeById(id: ThemeResponse['id']): Promise<ThemeResponse> {
        const result = await pool.query(
            'SELECT * FROM themes WHERE id = $1',
            [id]
        );

        const theme = result.rows[0] as ThemeResponse;

        if (!theme) throw new Error('Theme not found');

        return theme;
    }

    async getThemeByNameAndReturnId(
        name: ThemeResponse['name']
    ): Promise<ThemeResponse['id']> {
        const result = await pool.query(
            'SELECT id FROM themes WHERE name = $1',
            [name]
        );

        const theme = result.rows[0] as ThemeResponse;

        if (!theme) throw new Error('Theme not found');

        return theme.id;
    }

    async updateTheme(
        id: ThemeResponse['id'],
        name: ThemeResponse['name'],
        path: ThemeResponse['path']
    ): Promise<void> {
        const theme = await this.getThemeById(id);
        if (!theme) throw new Error('Theme not found');

        await pool.query(
            'UPDATE themes SET name = $1, themePath = $2 WHERE id = $3',
            [name, path, id]
        );
    }

    async deleteTheme(id: ThemeResponse['id']): Promise<void> {
        const theme = await this.getThemeById(id);
        if (!theme) throw new Error('Theme not found');

        await pool.query(
            'DELETE FROM themes WHERE id = $1',
            [id]
        );
    }

    async reset(): Promise<void> {
        await pool.query('DELETE FROM themes');
        await pool.query('ALTER SEQUENCE themes_id_seq RESTART WITH 1');
    }
}
