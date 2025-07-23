import { FastifyRequest, FastifyReply } from 'fastify';
import { SubjectService } from './subject.service';
import { CreateSubjectInput, SubjectResponse } from './subject.schema';
import { normalizedString } from '../../../lib/helpers/general-helpers';

export class SubjectController {
    constructor(private subjectService: SubjectService) {
        this.createSubject = this.createSubject.bind(this);
        this.deleteSubject = this.deleteSubject.bind(this);
        this.updateSubject = this.updateSubject.bind(this);
        this.getSubjectById = this.getSubjectById.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.getSubjectsWithThemes = this.getSubjectsWithThemes.bind(this);
    }

    createSubject = async (
        request: FastifyRequest<{ Body: CreateSubjectInput }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const subject = request.body;

            if (!subject.name) {
                throw reply.status(400).send('Missing subject name');
            }

            const subjectExists = (
                await this.subjectService.getSubjects()
            ).find((subj) => subj.name === normalizedString(subject.name));

            if (subjectExists) {
                throw reply.status(409).send('Subject already exists');
            }

            await this.subjectService.createSubject(subject);
            reply.status(201).send('Subject created');
        } catch (error) {
            console.error('Error creating subject:', error);
            reply.status(500).send('Internal Server Error');
        }
    };

    getSubjects = async (
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const subjects = await this.subjectService.getSubjects();
            if (!subjects || subjects.length === 0) {
                return reply.status(404).send('No subjects found');
            }
            reply.status(200).send(subjects);
        } catch (error) {
            console.error('Error fetching subjects:', error);
            reply.status(500).send('Internal Server Error');
        }
    };

    getSubjectById = async (
        request: FastifyRequest<{ Params: { id: SubjectResponse['id'] } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { id } = request.params;
            const subject = await this.subjectService.getSubjectById(id);
            if (!subject) reply.status(404).send('Subject not found');

            reply.status(200).send(subject);
        } catch (error) {
            console.error('Error fetching subject:', error);
            reply.status(500).send('Internal Server Error');
        }
    };

    updateSubject = async (
        request: FastifyRequest<{ Params: { id: SubjectResponse['id'] } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { id } = request.params;
            const { name } = request.body as SubjectResponse;
            const path = normalizedString(name);
            const subject = await this.subjectService.getSubjectById(id);

            if (!subject) {
                return reply.status(404).send('Subject not found');
            }

            await this.subjectService.updateSubject(id, name, path);
            reply.status(200).send('Subject updated');
        } catch (error) {
            console.error('Error updating subject:', error);
            reply.status(500).send('Internal Server Error');
        }
    };

    deleteSubject = async (
        request: FastifyRequest<{ Params: { id: SubjectResponse['id'] } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { id } = request.params;
            const subject = await this.subjectService.getSubjectById(id);
            if (!subject) {
                return reply.status(404).send('Subject not found');
            }

            await this.subjectService.deleteSubject(id);
            reply.status(200).send('Subject deleted');
        } catch (error) {
            console.error('Error deleting subject:', error);
            reply.status(500).send('Internal Server Error');
        }
    };

    getSubjectsWithThemes = async (
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const subjects = await this.subjectService.getSubjectsWithThemes();
            if (!subjects)
                reply.status(404).send('No subjects found with themes');

            reply.status(200).send(subjects);
        } catch (error) {
            console.error('Error fetching subjects with themes:', error);
            reply.status(500).send('Internal Server Error');
        }
    };
}
