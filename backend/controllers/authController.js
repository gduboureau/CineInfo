import jwt from 'jsonwebtoken';
import db from '../utils/pg.js';

const secretKey = 'key';

export const login = async (req, res) => {
    const { mail, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM public."users" WHERE mail = $1', [mail]);

        if (result.rows.length === 0 || password !== result.rows[0].password) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign({ userId: result.rows[0].id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const register = async (req, res) => {
    const { mail, password, username, firstname, lastname } = req.body;

    try {
        await db.query('INSERT INTO public."users" (mail, password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5)', [mail, password, username, firstname, lastname]);
        const result =  await db.query('SELECT * FROM public."users" WHERE username = $1', [username]);
        const token = jwt.sign({ userId: result.rows[0].id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de l\' enregistrement de l\' utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

