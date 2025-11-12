const jwt = require("jsonwebtoken");

const secret = "vsjdjkb";

module.exports.signup = (credentials) => {
    return jwt.sign(credentials, secret, {expiresIn: "1h"});
}

module.exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, user) => {
            if(err) {
                return res.status(403).json({
                    message: "Error while authenticating the user / User is not logged in yet."
                })
            }
            req.user = user;
            next();
        })
    }
    else {
        res.status(401).json({ message: "auth is not appropriate/ localStorage token is empty." })
    }
}