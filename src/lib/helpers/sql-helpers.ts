import { Score } from "../../models/Score";

export function mapScoreRow(row: any): Score{
    return {
        id: row.id,
        userId: row.user_id,
        themeId: row.theme_id,
        subjectId: row.subject_id,
        value: row.value,
        date: row.date,
    }
}