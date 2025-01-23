import { Router } from 'express';
import { passportCall } from '../middlewares/passportCall.middleware.js';
import { generateToken } from '../utils/jwt.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
    try {
        res.status(201).json({ status: "success", payload: "Usuario registrado exitosamente!" })
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

router.post("/login", passportCall("login"), async (req, res) => {
    try {
        const { first_name, last_name, email, age, role } = req.user;

        req.session.user = {
            first_name,
            last_name,
            email,
            age,
            role
        }

        const token = generateToken(req.user);
        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({ status: "success", payload: req.session.user, token })
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

router.get("/profile", async (req, res) => {
    try {
        if (!req.session.user) return res.status(404).json({ status: "error", msg: "Usuario no logueado" });

        res.status(200).json({ status: "success", payload: req.session.user });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

router.get("/logout", async (req, res) => {
    try {
        if (!req.session.user) return res.status(404).json({ status: "error", message: "Usuario no logueado" });

        req.session.destroy();
        res.clearCookie("token");

        res.status(200).json({ status: "success", payload: "Session cerrada exitosamente." });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

router.get("/current", passportCall("jwt"), authorization("user"), async (req, res) => {
    try {
        res.status(200).json({ status: "success", user: req.user });
    } catch (error) {
        res.status(500).json( { status: "Error", msg: "Error interno del servidor"})
    }
});

export default router;
