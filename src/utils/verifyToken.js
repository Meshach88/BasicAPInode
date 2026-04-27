import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user);
    
    return user;
}