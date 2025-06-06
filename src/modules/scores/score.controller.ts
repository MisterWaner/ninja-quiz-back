import { FastifyRequest, FastifyReply } from 'fastify';
import { ScoreService } from './score.service';
import { Score } from '../../models/Score';
import { User } from '../../models/User';
import { Subject } from '../../models/Subject';
import { Theme } from '../../models/Theme';

export class ScoreController {
    constructor(private scoreService: ScoreService) {}

    addScore = async (
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { userId, themeId, subjectId, value } = request.body as Score;
            const date = new Date();

            await this.scoreService.addUserScore({
                userId,
                themeId,
                subjectId,
                value,
                date,
            });
            reply.status(201).send('Score added');
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUsersGlobalScore = async (
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const scores = await this.scoreService.getUsersGlobalScore();
            if (!scores.length) reply.status(404).send('No scores found');

            reply.status(200).send(scores);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUsersDailyScore = async (
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const scores = await this.scoreService.getUsersDailyScore();
            if (!scores.length) reply.status(404).send('No scores found');

            reply.status(200).send(scores);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUserGlobalScore = async (
        request: FastifyRequest<{ Params: { userId: User['id'] } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { userId } = request.params;
            const scores = await this.scoreService.getUserGlobalScore(userId);
            if (!scores) reply.status(404).send('No scores found');

            reply.status(200).send(scores);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUserDailyScore = async (
        request: FastifyRequest<{ Params: { userId: User['id'] } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { userId } = request.params;
            const scores = await this.scoreService.getUserDailyScore(userId);
            if (!scores) reply.status(404).send('No scores found');

            reply.status(200).send(scores);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUserDailyScoresByTheme = async (
        request: FastifyRequest<{
            Params: { userId: User['id'] };
            Querystring: { themeId: Theme['id'] };
        }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { userId } = request.params;
            const { themeId } = request.query;
            const scores = await this.scoreService.getUserDailyScoresByTheme(
                userId,
                themeId
            );
            if (!scores) reply.status(404).send('No scores found');

            reply.status(200).send(scores);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUserDailyScoresBySubject = async (
        request: FastifyRequest<{
            Params: { userId: User['id'] };
            Querystring: { subjectId: Subject['id'] };
        }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { userId } = request.params;
            const { subjectId } = request.query;
            const scores = await this.scoreService.getUserDailyScoresBySubject(
                userId,
                subjectId
            );
            if (!scores) reply.status(404).send('No scores found');

            reply.status(200).send(scores);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUserGlobalScoresByTheme = async (
        request: FastifyRequest<{
            Params: { userId: User['id'] };
            Querystring: { themeId: Theme['id'] };
        }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { userId } = request.params;
            const { themeId } = request.query;
            const scores = await this.scoreService.getUserGlobalScoresByTheme(
                userId,
                themeId
            );
            if (!scores) reply.status(404).send('No scores found');

            reply.status(200).send(scores);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUserGlobalScoresBySubject = async (
        request: FastifyRequest<{
            Params: { userId: User['id'] };
            Querystring: { subjectId: Subject['id'] };
        }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const { userId } = request.params;
            const { subjectId } = request.query;
            const scores = await this.scoreService.getUserGlobalScoresBySubject(
                userId,
                subjectId
            );
            if (!scores) reply.status(404).send('No scores found');

            reply.status(200).send(scores);
        } catch (error) {
            reply.status(500).send(error);
        }
    };
}
