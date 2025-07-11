import { FastifyInstance } from 'fastify';
import { ScoreController } from '../modules/scores/score.controller';
import { ScoreService } from '../modules/scores/score.service';
import { Score } from '../models/Score';
import { User } from '../models/User';
import { Theme } from '../models/Theme';
import { Subject } from '../models/Subject';
import type {
    UserGlobalScore,
    UserDailyScore,
    UserAverageScoreSortedByTheme,
    UserAverageScoreSortedBySubject,
} from '../types/entities';

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
        Reply: Score[];
    }>(
        '/:userId/daily/by-theme',
        scoreController.getUserDailyScoresSortedByTheme
    );

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
        Reply: Score[];
    }>(
        '/:userId/global/by-theme',
        scoreController.getUserGlobalScoresSortedByTheme
    );

    fastify.get<{
        Params: { userId: User['id'] };
        Reply: Score[];
    }>(
        '/:userId/global/by-subject',
        scoreController.getUserGlobalScoresSortedBySubject
    );

    fastify.get<{
        Params: { userId: User['id'] };
        Reply: UserAverageScoreSortedByTheme[];
    }>('/:userId/average/by-theme', scoreController.getUserAverageScoreByTheme);

    fastify.get<{
        Params: { userId: User['id'] };
        Reply: UserAverageScoreSortedBySubject[];
    }>('/:userId/average/by-subject', scoreController.getUserAverageScoreBySubject);

    fastify.post('/', scoreController.addScore);
}
