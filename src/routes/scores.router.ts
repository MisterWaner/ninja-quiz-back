import { FastifyInstance } from 'fastify';
import { ScoreController } from '../domain/score/score.controller';
import { ScoreService } from '../domain/score/score.service';
import {
    CreateScoreInput,
    ScoreResponse,
    UserGlobalScore,
    UserDailyScore,
    UserAverageScoreSortedBySubject,
    UserAverageScoreSortedByTheme,
} from '../domain/score/score.schema';
import { UserResponse } from '../domain/user/user.schema';
import { SubjectResponse } from '../domain/quiz/subject/subject.schema';

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

    fastify.get<{
        Params: { userId: UserResponse['id'] };
        Reply: ScoreResponse[];
    }>('/:userId/global', scoreController.getUserGlobalScore);

    fastify.get<{
        Params: { userId: UserResponse['id'] };
        Reply: ScoreResponse[];
    }>('/:userId/daily', scoreController.getUserDailyScore);

    fastify.get<{
        Params: { userId: UserResponse['id'] };
        Reply: ScoreResponse[];
    }>(
        '/:userId/daily/by-theme',
        scoreController.getUserDailyScoresSortedByTheme
    );

    fastify.get<{
        Params: { userId: UserResponse['id'] };
        Querystring: { subjectId: SubjectResponse['id'] };
        Reply: ScoreResponse[];
    }>(
        '/:userId/daily/by-subject/:subjectId',
        scoreController.getUserDailyScoresBySubject
    );

    fastify.get<{
        Params: { userId: UserResponse['id'] };
        Reply: ScoreResponse[];
    }>(
        '/:userId/global/by-theme',
        scoreController.getUserGlobalScoresSortedByTheme
    );

    fastify.get<{
        Params: { userId: UserResponse['id'] };
        Reply: ScoreResponse[];
    }>(
        '/:userId/global/by-subject',
        scoreController.getUserGlobalScoresSortedBySubject
    );

    fastify.get<{
        Params: { userId: UserResponse['id'] };
        Reply: UserAverageScoreSortedByTheme[];
    }>('/:userId/average/by-theme', scoreController.getUserAverageScoreByTheme);

    fastify.get<{
        Params: { userId: UserResponse['id'] };
        Reply: UserAverageScoreSortedBySubject[];
    }>(
        '/:userId/average/by-subject',
        scoreController.getUserAverageScoreBySubject
    );

    fastify.post<{
        Body: CreateScoreInput;
    }>('/', { preHandler: [fastify.authenticate] }, scoreController.addScore);
}
