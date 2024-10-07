const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Authorization Header:', token);

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const bearerToken = token.split(' ')[1];
    console.log('Bearer Token:', bearerToken);

    if (!bearerToken) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token Verification Error:', err);
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id;
        console.log('Decoded Token:', decoded);
        next();
    });
};

module.exports = authMiddleware;
