import passport from 'passport';
import local from 'passport-local'
import jwt from 'passport-jwt';
import google from 'passport-google-oauth20';
import { userService } from '../services/user.service.js';
import { cartService } from '../services/cart.service.js';
import { createHash, isValidPassword } from '../utils/hashPassword.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import envsConfig from './envs.config.js';


const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
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

                    const user = await userService.getByEmail(username);
                    if (user) return done(null, false, { message: `El usuario con el email '${username}' ya existe.` })

                    const newCart = await cartService.create();

                    const newUser = {
                        first_name,
                        last_name,
                        email: username,
                        age,
                        password: createHash(password),
                        role,
                        cart: newCart._id
                    }

                    const finalUser = await userService.create(newUser);

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
                    const user = await userService.getByEmail(username);
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
                secretOrKey: envsConfig.JWT_SECRET_KEY
            },
            async (jwt_payload, done) => {
                try {
                    const { email } = jwt_payload;
                    const user = await userService.getByEmail(email);

                    done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use("google", new GoogleStrategy({
        clientID: envsConfig.GOOGLE_CLIENT_ID,
        clientSecret: envsConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/google"
    },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const { name, emails } = profile;
                const user = await userService.getByEmail(emails[0].value);

                if (user) return cb(null, user);

                const newCart = await cartService.create();

                const newUser = {
                    first_name: name.givenName,
                    last_name: name.familyName,
                    email: emails[0].value,
                    cart: newCart._id
                }

                const finalUser = await userService.create(newUser);

                cb(null, finalUser);
            } catch (error) {
                cb(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userService.getById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
