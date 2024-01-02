import jwt from 'jsonwebtoken';
import db from '../utils/pg.js';

const secretKey = 'key';

export const login = async (req, res) => {
    const { mail, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM public."users" WHERE mail = $1 OR username = $1', [mail]);

        if (result.rows.length === 0) {
            return res.json({ error: 'Cette adresse mail ou ce nom d\'utilisateur ne correspond à aucun compte' });
        }

        if (password !== result.rows[0].password) {
            return res.json({ error: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ userId: result.rows[0].user_id }, secretKey);
        res.json({ token, username : result.rows[0].username });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const register = async (req, res) => {
    const { mail, password, username, firstname, lastname } = req.body;

    try {
        const emailExists = await db.query('SELECT * FROM public."users" WHERE mail = $1', [mail]);
        if (emailExists.rows.length > 0) {
            return res.json({ error: 'Cette adresse mail est déjà utilisée' });
        }

        const usernameExists = await db.query('SELECT * FROM public."users" WHERE username = $1', [username]);
        if (usernameExists.rows.length > 0) {
            return res.json({ error: 'Ce nom d\'utilisateur est déjà utilisé' });
        }

        await db.query('INSERT INTO public."users" (mail, password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5)', [mail, password, username, firstname, lastname]);

        const result = await db.query('SELECT * FROM public."users" WHERE username = $1', [username]);
        const token = jwt.sign({ userId: result.rows[0].id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};


