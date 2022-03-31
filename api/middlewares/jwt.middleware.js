require('dotenv').config();
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SERCET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(token) {
        try {
            // Verify then token from client with secret key, 
            // then get the username from the payload and compare with
            // username sent with post method
            const decoded = jwt.verify(token, ACCESS_TOKEN);
            req.username = decoded.username;
        } catch(error) {
            return res.status(401).send('Token is invalid!');
        }
        return next();
    } else {
        return res.status(400).send('Please login!')
    }
}

module.exports = verifyToken;