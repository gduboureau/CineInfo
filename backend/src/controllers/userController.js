import db from '../utils/pg.js';
import bcrypt from 'bcryptjs';

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

export const updateUserInfo = async (req, res) => {
    const userId = req.userId;
    const { username, mail, password, lastname, firstname, image } = req.body;

    try {
        if (password !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.query('UPDATE public."users" SET username = $1, mail = $2, password = $3, lastname = $4, firstname = $5, image = $6 WHERE user_id = $7 RETURNING *', [username, mail, hashedPassword, lastname, firstname, image, userId]);
            return res.json(result.rows[0]);
        }else{
            const result = await db.query('UPDATE public."users" SET username = $1, mail = $2, lastname = $3, firstname = $4, image = $5 WHERE user_id = $6 RETURNING *', [username, mail, lastname, firstname, image, userId]);
            return res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des informations de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

