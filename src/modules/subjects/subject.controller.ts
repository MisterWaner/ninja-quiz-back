import { FastifyRequest, FastifyReply } from 'fastify';
import { SubjectService } from './subject.service';
import { Subject } from '../../models/Subject';
import { normalizedString } from '../../lib/helpers/general-helpers';

export class SubjectController {
    constructor(private subjectService: SubjectService) {}

    createSubject = async(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const subject = request.body as Subject;

            if (!subject.name) {
                throw reply.status(400).send('Missing subject name');
            }

            const subjectExists = (
                await this.subjectService.getSubjects()
            ).find((subj) => subj.name === subject.name);

            if (subjectExists) {
                throw reply.status(409).send('Subject already exists');
            }

            await this.subjectService.createSubject(subject);
            reply.status(201).send('Subject created');
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    getSubjects = async(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const subjects = await this.subjectService.getSubjects();
            if (!subjects) reply.status(404).send('No subjects found');

            reply.status(200).send(subjects);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    getSubjectById = async(
        request: FastifyRequest<{ Params: { id: number } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { id } = request.params;
            const subject = await this.subjectService.getSubjectById(id);

            if (!subject) {
                reply.status(404).send('No subject found');
                return;
            }
            reply.status(200).send(subject);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    updateSubject = async (
        request: FastifyRequest<{ Params: { id: number } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { id } = request.params;
            const { name } = request.body as Subject;
            const subjectPath = normalizedString(name);
            const subject = await this.subjectService.getSubjectById(id);

            if (!subject) {
                reply.status(404).send('No subject found');
                return;
            }

            await this.subjectService.updateSubject(id, name, subjectPath);
            reply.status(200).send('Subject updated');
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    deleteSubject = async (
        request: FastifyRequest<{ Params: { id: number } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { id } = request.params;
            const subject = await this.subjectService.getSubjectById(id);
            if (!subject) {
                reply.status(404).send('No subject found');
                return;
            }

            await this.subjectService.deleteSubject(id);
            reply.status(200).send('Subject deleted');
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    getSubjectsWithThemes = async(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const subjects = await this.subjectService.getSubjectsWithThemes();
            if (!subjects) reply.status(404).send('No subjects found');

            reply.status(200).send(subjects);
        } catch (error) {
            reply.status(500).send(error);
        }
    }
}
