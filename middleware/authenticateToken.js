const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        if (!authorization) {
            return res.status(401).json({ error: 'Access denied, token missing' });
        }
        const token = authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log("middleware token >> ", error.message)
    }
};

module.exports = authenticateToken;
