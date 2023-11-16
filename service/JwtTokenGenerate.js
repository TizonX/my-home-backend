const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_KEY || "Vishal$0019";

const JwtTokenGenerator = (obj) => {
    const payload = obj;
    return jwt.sign(payload, secretkey);
}

module.exports = {
    JwtTokenGenerator,
}