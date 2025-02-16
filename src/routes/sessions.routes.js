import { Router } from 'express';
import { passportCall } from '../middlewares/passportCall.middleware.js';
import { authorization } from '../middlewares/authorization.middleware.js';
import passport from 'passport';
import SessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.post("/register", passportCall("register"), SessionsController.register);

router.post("/login", passportCall("login"), SessionsController.login);

router.get("/profile", SessionsController.profile);

router.get("/logout", SessionsController.logout);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
        session: false,
    }), SessionsController.google
);

router.get("/current", passportCall("jwt"), authorization("user"), SessionsController.current);

export default router;
