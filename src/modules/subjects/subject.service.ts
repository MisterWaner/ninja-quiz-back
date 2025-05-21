import { Subject } from '../../models/Subject';
import { SubjectRepository } from '../../application/subject.repository';
import { db } from '../../database/database';
import { normalizedString } from '../../lib/helpers/general-helpers';

type RawSubject = {
    subject_id: number;
    subject_name: string;
    subject_path: string;
    themes: string;
};

export class SubjectService implements SubjectRepository {
    async createSubject(subject: Subject): Promise<void> {
        const { name } = subject;
        const subjectPath = normalizedString(name);
        db.prepare(
            `INSERT INTO subjects (name, subjectPath) VALUES (?, ?)`
        ).run(name, subjectPath);
    }

    async getSubjects(): Promise<Subject[]> {
        const subjects = db
            .prepare('SELECT * FROM subjects')
            .all() as Subject[];

        if (!subjects) throw new Error('No subjects found');

        return subjects;
    }

    async getSubjectById(id: number): Promise<Subject> {
        const subject = db
            .prepare('SELECT * FROM subjects WHERE id = ?')
            .get(id) as Subject;

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

        db.prepare(
            'UPDATE subjects SET name = ?, subjectPath = ? WHERE id = ?'
        ).run(name, subjectPath, id);
    }

    async deleteSubject(id: number): Promise<void> {
        const subject = await this.getSubjectById(id);
        if (!subject) throw new Error('No subject found');

        db.prepare('DELETE FROM subjects WHERE id = ?').run(id);
    }

    async getSubjectPath(id: number): Promise<string> {
        const subject = await this.getSubjectById(id);
        if (!subject) throw new Error('No subject found');

        return subject.subjectPath;
    }

    async getSubjectsWithThemes(): Promise<Subject[]> {
        const subjects = db
            .prepare(
                `SELECT 
                    s.id AS subject_id,
                    s.name AS subject_name,
                    s.subjectPath AS subject_path,
                    COALESCE(json_group_array(
                        json_object('id', t.id, 'name', t.name, 'themePath', t.themePath)
                    ), '[]') AS themes
                FROM subjects s
                LEFT JOIN themes t ON s.id = t.subject_id
                GROUP BY s.id, s.name, s.subjectPath
                ORDER BY s.id;
                `
            )
            .all() as RawSubject[];

        if (subjects.length === 0) {
            throw new Error('Subjects not found');
        }

        const parsedSubjects = subjects.map((subject) => ({
            id: subject.subject_id,
            name: subject.subject_name,
            subjectPath: subject.subject_path,
            themes: JSON.parse(subject.themes),
        }));

        return parsedSubjects;
    }

    async reset(): Promise<void> {
        db.prepare('DELETE FROM subjects').run();
        db.prepare(`DELETE FROM sqlite_sequence WHERE name = 'subjects'`).run();
    }
}
