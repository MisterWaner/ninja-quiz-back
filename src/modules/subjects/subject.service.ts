import { Subject } from '../../models/Subject';
import { Theme } from '../../models/Theme';
import { SubjectRepository } from '../../application/subject.repository';
import pool from '../../database/config';
import { normalizedString } from '../../lib/helpers/general-helpers';

export class SubjectService implements SubjectRepository {
    async createSubject(subject: Subject): Promise<void> {
        const { name } = subject;
        const subjectPath = normalizedString(name);
        await pool.query(`INSERT INTO subjects (name, subjectPath) VALUES ($1, $2)`, [
            name,
            subjectPath,
        ]);
    }

    async getSubjects(): Promise<Subject[]> {
        const results = await pool.query('SELECT * FROM subjects');
        const subjects = results.rows.map((row) => ({
            id: row.id,
            name: row.name,
            subjectPath: row.subjectPath,
            themes: [],
        })) as Subject[];

        if (!subjects) throw new Error('No subjects found');

        return subjects;
    }

    async getSubjectById(id: number): Promise<Subject> {
        const result = await pool.query<Subject>(
            `
            SELECT * FROM subjects WHERE id = $1`,
            [id]
        );

        const subject = result.rows[0];
        if (!subject) throw new Error('No subject found');

        return subject;
    }

    async updateSubject(
        id: number,
        name: Subject['name'],
        subjectPath: Subject['subjectPath']
    ): Promise<void> {
        const subject = await this.getSubjectById(id);

        if (!subject) throw new Error('No subject found');

        await pool.query(
            'UPDATE subjects SET name = $1, subjectPath = $2 WHERE id = $3',
            [name, subjectPath, id]
        );
    }

    async deleteSubject(id: number): Promise<void> {
        const subject = await this.getSubjectById(id);
        if (!subject) throw new Error('No subject found');

        await pool.query('DELETE FROM subjects WHERE id = $1', [id]);
    }

    async getSubjectPath(id: number): Promise<string> {
        const subject = await this.getSubjectById(id);
        if (!subject) throw new Error('No subject found');

        return subject.subjectPath;
    }

    async getSubjectsWithThemes(): Promise<Subject[]> {
        const results = await pool.query<{
            subject_id: number;
            subject_name: string;
            subject_path: string;
            themes: Theme[];
        }>(
            `
                SELECT 
                    s.id AS subject_id,
                    s.name AS subject_name,
                    s.subjectPath AS subject_path,
                    COALESCE(
                        json_agg(
                            DISTINCT jsonb_build_object(
                                'id', t.id,
                                'name', t.name,
                                'themePath', t.themePath
                            )
                        ) FILTER (WHERE t.id IS NOT NULL), '[]'
                    ) AS themes
                FROM subjects s
                LEFT JOIN themes t ON s.id = t.subject_id
                GROUP BY s.id, s.name, s.subjectPath
                ORDER BY s.id
            `
        );

        const subjectsWithThemes = results.rows.map((row) => ({
            id: row.subject_id,
            name: row.subject_name,
            subjectPath: row.subject_path,
            themes: row.themes,
        }))

        if (!subjectsWithThemes) {
            throw new Error('Subjects not found');
        }

        return subjectsWithThemes;
    }

    async reset(): Promise<void> {
        await pool.query('DELETE FROM subjects');
        await pool.query('ALTER SEQUENCE subjects_id_seq RESTART WITH 1');
    }
}
