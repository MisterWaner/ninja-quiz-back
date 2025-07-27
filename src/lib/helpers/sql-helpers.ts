import { ScoreResponse } from "../../domain/score/score.schema"

export function mapScoreRow(row: any): ScoreResponse{
    return {
        id: row.id,
        userId: row.user_id,
        themeId: row.theme_id,
        subjectId: row.subject_id,
        value: row.value,
        date: row.date,
    }
}