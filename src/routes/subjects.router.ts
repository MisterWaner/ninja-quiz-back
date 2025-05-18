import { FastifyInstance } from 'fastify';
import { SubjectController } from '../modules/subjects/subject.controller';
import { SubjectService } from '../modules/subjects/subject.service';
import { Subject } from '../models/Subject';

const subjectService = new SubjectService();
const subjectController = new SubjectController(subjectService);

export async function subjectsRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: Subject }>('/', {}, subjectController.createSubject);
    fastify.get<{ Reply: Subject[] }>('/', {}, subjectController.getSubjects);
    fastify.get<{ Params: { id: number }; Reply: Subject }>(
        '/:id',
        {},
        subjectController.getSubjectById
    );
    fastify.put<{ Params: { id: number }; Body: { name: Subject['name'] } }>(
        '/:id',
        {},
        subjectController.updateSubject
    );
    fastify.delete<{ Params: { id: number } }>(
        '/:id',
        {},
        subjectController.deleteSubject
    );
    fastify.get<{ Reply: Subject[] }>(
        '/with-themes',
        {},
        subjectController.getSubjectsWithThemes
    );
}
