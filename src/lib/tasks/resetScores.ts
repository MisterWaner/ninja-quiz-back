import cron from 'node-cron';
import pool from '../../database/config';

async function resetScores() {
    const result = await pool.query(`UPDATE scores SET score = 0`);
    if (result.rowCount === 0) {
        console.log('⏰ Aucun score à réinitialiser.');
    }
    console.log(`✅ Scores reset : ${result.rowCount} lignes mises à jour.`);
}

cron.schedule('0 0 1 * *', async () => {
    try {
        console.log('⏰ Début de la remise à zéro des scores...');
        await resetScores();
    } catch (error) {
        console.error('Erreur lors de la remise à zéro des scores :', error);
    }
});
