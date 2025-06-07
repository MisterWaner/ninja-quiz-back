import { FastifyInstance } from 'fastify';
import { ScoreController } from '../modules/scores/score.controller';
import { ScoreService } from '../modules/scores/score.service';
import { Score } from '../models/Score';
import { User } from '../models/User';
import { Theme } from '../models/Theme';
import { Subject } from '../models/Subject';
import type { UserGlobalScore, UserDailyScore } from '../types/entities';

const scoreService = new ScoreService();
const scoreController = new ScoreController(scoreService);

export async function scoresRouter(fastify: FastifyInstance) {
    fastify.get<{ Reply: UserGlobalScore[] }>(
        '/global',
        scoreController.getUsersGlobalScore
    );

    fastify.get<{ Reply: UserDailyScore[] }>(
        '/daily',
        scoreController.getUsersDailyScore
    );

    fastify.get<{ Params: { userId: User['id'] }; Reply: Score[] }>(
        '/:userId/global',
        scoreController.getUserGlobalScore
    );

    fastify.get<{ Params: { userId: User['id'] }; Reply: Score[] }>(
        '/:userId/daily',
        scoreController.getUserDailyScore
    );

    fastify.get<{
        Params: { userId: User['id'] };
        Querystring: { themeId: Theme['id'] };
        Reply: Score[];
    }>('/:userId/daily/by-theme/:themeId', scoreController.getUserDailyScoresByTheme);

    fastify.get<{
        Params: { userId: User['id'] };
        Querystring: { subjectId: Subject['id'] };
        Reply: Score[];
    }>(
        '/:userId/daily/by-subject/:subjectId',
        scoreController.getUserDailyScoresBySubject
    );

    fastify.get<{
        Params: { userId: User['id'] };
        Querystring: { themeId: Theme['id'] };
        Reply: Score[];
    }>('/:userId/global/by-theme/:themeId', scoreController.getUserGlobalScoresByTheme);

    fastify.get<{
        Params: { userId: User['id'] };
        Querystring: { subjectId: Subject['id'] };
        Reply: Score[];
    }>(
        '/:userId/global/by-subject/:subjectId',
        scoreController.getUserGlobalScoresBySubject
    );

    fastify.post('/', scoreController.addScore);
}
