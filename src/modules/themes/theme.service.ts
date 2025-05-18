import { Theme } from '../../models/Theme';
import { ThemeRepository } from '../../application/theme.repository';
import { db } from '../../database/database';
import { normalizedString } from '../../lib/helpers/general-helpers';
import { SubjectService } from '../subjects/subject.service';

const subjectService = new SubjectService();

export class ThemeService implements ThemeRepository {
    async createTheme(theme: Theme): Promise<void> {
        const { name, subjectId } = theme;
        const themePath = normalizedString(name);
        const subjectExists = (await subjectService.getSubjects()).find(
            (subj) => subj.id === subjectId
        );

        if (!subjectExists) {
            throw new Error('Subject not found');
        }

        db.prepare(
            'INSERT INTO themes (name, subject_id, themePath) VALUES (?, ?, ?)'
        ).run(name, subjectId, themePath);
    }

    async getThemes(): Promise<Theme[]> {
        const themes = db.prepare('SELECT * FROM themes').all() as Theme[];

        if (!themes) throw new Error('No themes found');

        return themes;
    }

    async getThemeById(id: number): Promise<Theme> {
        const theme = db
            .prepare('SELECT * FROM themes WHERE id = ?')
            .get(id) as Theme;

        if (!theme) throw new Error('No theme found');

        return theme;
    }

    async updateTheme(
        id: number,
        name: Theme['name'],
        themePath: Theme['themePath']
    ): Promise<void> {
        const theme = await this.getThemeById(id);

        if (!theme) throw new Error('No theme found');

        db.prepare(
            'UPDATE themes SET name = ?, themePath = ? WHERE id = ?'
        ).run(name, themePath, id);
    }

    async deleteTheme(id: number): Promise<void> {
        const theme = await this.getThemeById(id);
        if (!theme) throw new Error('No theme found');

        db.prepare('DELETE FROM themes WHERE id = ?').run(id);
    }

    async reset(): Promise<void> {
        db.prepare('DELETE FROM themes').run();
        db.prepare(`DELETE FROM sqlite_sequence WHERE name = 'themes'`).run();
    }
}