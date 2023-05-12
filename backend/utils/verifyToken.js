const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    // token expired 
    if(!token) {
        res.status(401).send({ success: false, message: 'User not authorized'});
    }
    // verifying token
    else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            // invalid token
            if(err) {
                res.status(401).send({ success: false, message: 'Token is Invalid' });
            }
            // token verified
            req.user = user;
            next();
        })
    }
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.body.userId || req.user.role === 'admin') {
            next();
        } else {
            res.status(401).send('User not authenticated');
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(401).send('User not authorized');
        }
    });
}

module.exports = {
    verifyUser,
    verifyAdmin
}