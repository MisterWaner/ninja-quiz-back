import { Theme } from '../../models/Theme';
import { ThemeRepository } from '../../application/theme.repository';
import { db } from '../../database/database';
import { normalizedString } from '../../lib/helpers/general-helpers';
import { SubjectService } from '../subjects/subject.service';

const subjectService = new SubjectService();

export class ThemeService implements ThemeRepository {
    static getThemeByName(theme: string) {
        throw new Error('Method not implemented.');
    }
    async createTheme(theme: Theme): Promise<void> {
        const subjectName = await subjectService.getSubjectById(
            theme.subjectId
        ).then((s) => s.name);
        if (!subjectName) throw new Error('Subject not found');

        const prefix = normalizedString(subjectName).substring(0, 4).toUpperCase();
        const result = db.prepare('SELECT COUNT(*) AS count FROM themes WHERE subject_id = ?').get(theme.subjectId) as { count: number };
        const existingCount = result.count;

        const id = `${prefix}_${existingCount + 1}`;
        
        const { name, subjectId } = theme;
        const themePath = normalizedString(name);
        const subjectExists = (await subjectService.getSubjects()).find(
            (subj) => subj.id === subjectId
        );

        if (!subjectExists) {
            throw new Error('Subject not found');
        }

        db.prepare(
            'INSERT INTO themes (id, name, subject_id, themePath) VALUES (?,?, ?, ?)'
        ).run(id, name, subjectId, themePath);
    }

    async getThemes(): Promise<Theme[]> {
        const themes = db.prepare('SELECT * FROM themes').all() as Theme[];

        if (!themes) throw new Error('No themes found');

        return themes;
    }

    async getThemeById(id: string): Promise<Theme> {
        const theme = db
            .prepare('SELECT * FROM themes WHERE id = ?')
            .get(id) as Theme;

        if (!theme) throw new Error('No theme found');

        return theme;
    }

    async getThemeByNameAndReturnId(name: Theme['name']): Promise<Theme['id']> {
        const theme = db
            .prepare('SELECT * FROM themes WHERE name = ?')
            .get(name) as Theme;

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

        db.prepare(
            'UPDATE themes SET name = ?, themePath = ? WHERE id = ?'
        ).run(name, themePath, id);
    }

    async deleteTheme(id: string): Promise<void> {
        const theme = await this.getThemeById(id);
        if (!theme) throw new Error('No theme found');

        db.prepare('DELETE FROM themes WHERE id = ?').run(id);
    }

    async reset(): Promise<void> {
        db.prepare('DELETE FROM themes').run();
        db.prepare(`DELETE FROM sqlite_sequence WHERE name = 'themes'`).run();
    }
}