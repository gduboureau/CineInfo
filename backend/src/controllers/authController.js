import jwt from 'jsonwebtoken';
import db from '../utils/pg.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
dotenv.config();

const secretKey = 'key';

let config = {
    service: 'gmail', 
    auth: {
        user: process.env.NODEJS_GMAIL_APP_USER, 
        pass: process.env.GMAIL_APP_PASSWORD
     }
}

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
    const { mail, password, username, firstname, lastname, defaultImage } = req.body;

    try {
        const emailExists = await db.query('SELECT * FROM public."users" WHERE mail = $1', [mail]);
        if (emailExists.rows.length > 0) {
            return res.json({ error: 'Cette adresse mail est déjà utilisée' });
        }

        const usernameExists = await db.query('SELECT * FROM public."users" WHERE username = $1', [username]);
        if (usernameExists.rows.length > 0) {
            return res.json({ error: 'Ce nom d\'utilisateur est déjà utilisé' });
        }

        await db.query('INSERT INTO public."users" (mail, password, username, firstname, lastname, image) VALUES ($1, $2, $3, $4, $5, $6)', [mail, password, username, firstname, lastname, defaultImage]);

        const result = await db.query('SELECT * FROM public."users" WHERE username = $1', [username]);
        const token = jwt.sign({ userId: result.rows[0].user_id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const resetPassword = async (req, res) => {
    const { mail } = req.body;

    try {
        const result = await db.query('SELECT * FROM public."users" WHERE mail = $1', [mail]);

        if (result.rows.length === 0) {
            return res.json({ error: 'Cette adresse mail ne correspond à aucun compte' });
        }

        const randomPassword = crypto.randomBytes(8).toString('hex');

        await db.query('UPDATE public."users" SET password = $1 WHERE mail = $2', [randomPassword, mail]);

        const transporter = nodemailer.createTransport(config);
        const mailOptions = {
            from: process.env.NODEJS_GMAIL_APP_USER,
            to: mail,
            subject: 'Nouveau mot de passe',
            text: `Votre nouveau mot de passe est : ${randomPassword}. Nous vous recommandons de le changer dès votre prochaine connexion.
            A bientôt sur Cineinfo !`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi du mail :', error.message);
                res.status(500).json({ message: 'Erreur interne du serveur' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'Email envoyé' });
            }
        });
    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}


