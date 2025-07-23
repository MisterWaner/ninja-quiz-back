import { SubjectRepository } from '../../../application/subject.repository';
import { SubjectResponse, CreateSubjectInput } from './subject.schema';
import { ThemeResponse } from '../theme/theme.schema';
import pool from '../../../database/config';
import { normalizedString } from '../../../lib/helpers/general-helpers';

export class SubjectService implements SubjectRepository {
    async createSubject(subject: CreateSubjectInput): Promise<void> {
        const { name } = subject;
        const path = normalizedString(name);
        await pool.query(
            `INSERT INTO subjects (name, subjectPath) VALUES ($1, $2)`,
            [name, path]
        );
    }

    async getSubjects(): Promise<SubjectResponse[]> {
        const results = await pool.query(`SELECT * FROM subjects`);
        const subjects = results.rows.map((row) => ({
            id: row.id,
            name: row.name,
            path: row.subjectPath,
            themes: [],
        })) as SubjectResponse[];

        if (!subjects) throw new Error('No subjects found');

        return subjects;
    }

    async getSubjectById(id: SubjectResponse['id']): Promise<SubjectResponse> {
        const result = await pool.query(
            `SELECT * FROM subjects WHERE id = $1`,
            [id]
        );
        const subject = result.rows[0] as SubjectResponse;

        if (!subject) throw new Error('No subject found');

        return subject;
    }

    async updateSubject(
        id: SubjectResponse['id'],
        name: SubjectResponse['name'],
        path: SubjectResponse['path']
    ): Promise<void> {
        const subject = await this.getSubjectById(id);

        if (!subject) throw new Error('No subject found');

        await pool.query(
            `UPDATE subjects SET name = $1, subjectPath = $2 WHERE id = $3`,
            [name, path, id]
        );
    }
    async deleteSubject(id: SubjectResponse['id']): Promise<void> {
        const subject = await this.getSubjectById(id);

        if (!subject) throw new Error('No subject found');

        await pool.query(`DELETE FROM subjects WHERE id = $1`, [id]);
    }

    async getSubjectPath(
        id: SubjectResponse['id']
    ): Promise<SubjectResponse['path']> {
        const subject = await this.getSubjectById(id);
        if (!subject) throw new Error('No subject found');

        return subject.path;
    }

    async getSubjectsWithThemes(): Promise<SubjectResponse[]> {
        const results = await pool.query<{
            subject_id: SubjectResponse['id'];
            subject_name: SubjectResponse['name'];
            subject_path: SubjectResponse['path'];
            themes: ThemeResponse[];
        }>(`
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
            `);

        const subjectsWithThemes = results.rows.map((row) => ({
            id: row.subject_id,
            name: row.subject_name,
            path: row.subject_path,
            themes: row.themes,
        }));

        if (!subjectsWithThemes) throw new Error('No subjects found');

        return subjectsWithThemes;
    }

    async reset(): Promise<void> {
        await pool.query('DELETE FROM subjects');
        await pool.query('ALTER SEQUENCE subjects_id_seq RESTART WITH 1');
    }
}
