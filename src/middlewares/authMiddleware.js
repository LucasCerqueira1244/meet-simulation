const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const bearerToken = token.split(' ')[1];
    if (!bearerToken) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;
