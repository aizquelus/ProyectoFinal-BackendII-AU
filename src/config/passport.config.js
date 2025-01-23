import passport from 'passport';
import local from 'passport-local'
import jwt from 'passport-jwt';
import { userDao } from '../dao/mongo/user.dao.js';
import { createHash, isValidPassword } from '../utils/hashPassword.js';
import { cartDao } from '../dao/mongo/cart.dao.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import { JWT_SECRET_KEY } from './consts.config.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export const initializedPassport = () => {
    passport.use("register",
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: "email"
            },
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, age, role } = req.body;

                    const user = await userDao.getByEmail(username);
                    if (user) return done(null, false, { message: `El usuario con el email '${username}' ya existe.` })

                    const newCart = await cartDao.create();

                    const newUser = {
                        first_name,
                        last_name,
                        email: username,
                        age,
                        password: createHash(password),
                        role,
                        cart: newCart._id
                    }

                    const finalUser = userDao.create(newUser);

                    done(null, finalUser);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use("login",
        new LocalStrategy(
            { usernameField: "email" },
            async (username, password, done) => {
                try {
                    const user = await userDao.getByEmail(username);
                    const isUserPassword = isValidPassword(password, user);

                    if (!user || !isUserPassword) return done(null, false, { message: "E-mail o contraseña incorrectos." })

                    done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use("jwt",
        new JWTStrategy(
            { 
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), 
                secretOrKey: JWT_SECRET_KEY 
            },
            async (jwt_payload, done) => {
                try {
                    const { email } = jwt_payload;
                    const user = await userDao.getByEmail(email);

                    done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userDao.getById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
