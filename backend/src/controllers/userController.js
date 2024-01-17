import db from '../utils/pg.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';

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
    const { image, username } = req.body;

    try {
        const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
        const imageFileName = `photo-profile-${username}.png`;
        fs.writeFileSync(`./images/${imageFileName}`, imageBuffer);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'image de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const updateUserInfo = async (req, res) => {
    const userId = req.userId;
    const { username, mail, password, lastname, firstname } = req.body;
    try {
        const user = await db.query('SELECT username FROM public."users" WHERE user_id = $1', [userId]);
        if (user.rows[0].username !== username) {

            const oldImageFileName = `photo-profile-${user.rows[0].username}.png`;
            const oldImagePath = `./images/${oldImageFileName}`;
            const image = fs.readFileSync(`./images/${oldImageFileName}`, 'base64');

            const imageBuffer = Buffer.from(image, 'base64');
            const newImageFileName = `photo-profile-${username}.png`;
            const newImagePath = `./images/${newImageFileName}`;

            fs.writeFileSync(newImagePath, imageBuffer);
            fs.unlinkSync(oldImagePath);
        }

        if (password !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.query('UPDATE public."users" SET username = $1, mail = $2, password = $3, lastname = $4, firstname = $5 WHERE user_id = $6 RETURNING *', [username, mail, hashedPassword, lastname, firstname, userId]);

            return res.json(result.rows[0]);
        } else {
            const result = await db.query('UPDATE public."users" SET username = $1, mail = $2, lastname = $3, firstname = $4 WHERE user_id = $5 RETURNING *', [username, mail, lastname, firstname, userId]);

            return res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des informations de l\'utilisateur :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

export const getImageUser = async (req, res) => {
    const { username } = req.params;    

    try {
        const imageFileName = `photo-profile-${username}.png`;
        const image = fs.readFileSync(`./images/${imageFileName}`, 'base64');
        
        res.contentType('image/png');
        res.send(Buffer.from(image, 'base64'));
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'image de profil :', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

