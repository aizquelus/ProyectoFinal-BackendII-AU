import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/consts.config.js';

export const generateToken = (user) => {
    const { _id, email } = user;

    const token = jwt.sign({ _id, email }, JWT_SECRET_KEY, { expiresIn: "30m"});
    return token;
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
}
