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

export const updateImage = async (req, res) => {
    const userId = req.userId;
    const { image } = req.body;

    try {
        const result = await db.query('UPDATE public."users" SET image = $1 WHERE user_id = $2 RETURNING *', [image, userId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'image de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

