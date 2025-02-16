import UserDTO from '../dto/user.dto.js';
import { generateToken } from '../utils/jwt.js';

class SessionsController {
    async register(req, res) {
        try {
            res.status(201).json({ status: "success", payload: "Usuario registrado exitosamente!" })
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async login(req, res) {
        try {
            req.session.user = req.user;

            const token = generateToken(req.user);
            res.cookie("token", token, { httpOnly: true });

            res.status(200).json({ status: "success", payload: req.user, token })
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async profile(req, res) {
        try {
            if (!req.session.user) return res.status(404).json({ status: "error", msg: "Usuario no logueado" });

            res.status(200).json({ status: "success", payload: req.session.user });
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async logout(req, res) {
        try {
            if (!req.session.user) return res.status(404).json({ status: "error", message: "Usuario no logueado" });

            req.session.destroy();
            res.clearCookie("token");

            res.status(200).json({ status: "success", payload: "Session cerrada exitosamente." });
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async google(req, res) {
        try {
            return res.status(200).json({ status: "success", session: req.user });
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async current(req, res) {
        try {
            const user = new UserDTO(req.user);
            res.status(200).json({ status: "success", user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" })
        }
    }
}

export default new SessionsController();
