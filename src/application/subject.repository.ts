import {
    CreateSubjectInput,
    SubjectResponse,
} from '../domain/quiz/subject/subject.schema';

export interface SubjectRepository {
    createSubject(subject: CreateSubjectInput): Promise<void>;
    getSubjects(): Promise<SubjectResponse[]>;
    getSubjectById(id: SubjectResponse['id']): Promise<SubjectResponse>;
    updateSubject(
        id: SubjectResponse['id'],
        name: SubjectResponse['name'],
        subjectPath: SubjectResponse['path']
    ): Promise<void>;
    deleteSubject(id: SubjectResponse['id']): Promise<void>;
}
