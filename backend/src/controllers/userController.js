import db from '../utils/pg.js';

export const getUserInfos = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.query('SELECT * FROM public."users" WHERE user_id = $1', [userId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

