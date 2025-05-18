import { Subject } from '../models/Subject';

export interface SubjectRepository {
    createSubject(subject: Subject): Promise<void>;
    getSubjects(): Promise<Subject[]>;
    getSubjectById(id: number): Promise<Subject>;
    updateSubject(
        id: number,
        name: Subject['name'],
        subjectPath: Subject['subjectPath']
    ): Promise<void>;
    deleteSubject(id: number): Promise<void>;
}
