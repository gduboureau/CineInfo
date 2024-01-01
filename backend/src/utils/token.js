import jwt from 'jsonwebtoken';

const secretKey = 'key';

export const extractUserInfo = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error('Erreur lors de l\'extraction des informations de l\'utilisateur :', error.message);
        res.status(401).json({ message: 'Token invalide' });
    }
};
