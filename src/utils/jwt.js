import jwt from 'jsonwebtoken';
import envsConfig from '../config/envs.config.js';

export const generateToken = (user) => {
    const { _id, email } = user;

    const token = jwt.sign({ _id, email }, envsConfig.JWT_SECRET_KEY, { expiresIn: "30m"});
    return token;
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, envsConfig.JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
}
