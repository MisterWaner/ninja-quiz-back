import { FastifyInstance } from 'fastify';
import { SubjectController } from '../domain/quiz/subject/subject.controller';
import { SubjectService } from '../domain/quiz/subject/subject.service';
import {
    CreateSubjectInput,
    SubjectResponse,
} from '../domain/quiz/subject/subject.schema';

const subjectService = new SubjectService();
const subjectController = new SubjectController(subjectService);

export async function subjectsRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: CreateSubjectInput }>(
        '/',
        {},
        subjectController.createSubject
    );
    fastify.get<{ Reply: SubjectResponse[] }>(
        '/',
        {},
        subjectController.getSubjects
    );
    fastify.get<{
        Params: { id: SubjectResponse['id'] };
        Reply: SubjectResponse;
    }>('/:id', {}, subjectController.getSubjectById);
    fastify.put<{
        Params: { id: SubjectResponse['id'] };
        Body: { name: SubjectResponse['name'] };
    }>('/:id', {}, subjectController.updateSubject);
    fastify.delete<{ Params: { id: SubjectResponse['id'] } }>(
        '/:id',
        {},
        subjectController.deleteSubject
    );
    fastify.get<{ Reply: SubjectResponse[] }>(
        '/with-themes',
        {},
        subjectController.getSubjectsWithThemes
    );
}
