const {verifyJwtToken} = require('../services/generateJwtToken');

const checkForAuthentication = (req, res, next)=>
{
    const authorization = req.headers['authorization'];
    req.user = null;
    if (!authorization || !authorization.startsWith("Bearer")) {
        return next();
    }
    const token = authorization.split("Bearer ")[1];
    if (!token) {
        return res.status(500).json({ msg: "UnAuthorized" });
    }
    const isTokenValid = verifyJwtToken(token);
    req.user = isTokenValid;
    return next();
}