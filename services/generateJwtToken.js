const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const generateJwtToken = (id, user)=>
{
    const payload = {
        id,
        ...user,
    }
    return jwt.sign(payload,secretKey);
}

// verify user sended token
const verifyJwtToken = (token)=>
{
    if(!token)
    {
        return false;
    }
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return false;
    }
}


module.exports = {
    generateJwtToken,
    verifyJwtToken,
}