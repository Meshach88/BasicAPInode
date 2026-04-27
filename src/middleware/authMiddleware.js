import { verifyToken } from "../utils/verifyToken.js";


export const authMMiddleware = (req, res, next) => {

    // check if token is present in request - if present extract it
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token) {
        return res.status(401).json({ status: "error", message: "no token or malformed token"})
    }

    //verify token
    const decoded = verifyToken(token);

    // extract user and set req.user to user
    req.user = decoded;

    // move on
    next()
}