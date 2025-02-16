import { cartService } from "../services/cart.service.js";
import { ticketService } from "../services/ticket.service.js";
import UserDTO from "../dto/user.dto.js";
import { sendTicket } from "../utils/sendMail.js";
import { productService } from "../services/product.service.js";

class CartsController {
    async createCart(req, res) {
        try {
            const cart = await cartService.create();

            res.status(201).json({ status: "success", cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async getCart(req, res) {
        try {
            const { cid } = req.params;

            const cart = await cartService.getById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

            res.status(200).json({ status: "success", cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async addProductToCart(req, res) {
        const { cid, pid } = req.params;

        try {
            const product = await productService.getById(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });

            const cart = await cartService.getById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

            const cartUpdate = await cartService.addProductToCart(cid, pid);

            res.status(200).json({ status: "success", payload: cartUpdate });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async deleteProductFromCart(req, res) {
        const { cid, pid } = req.params;

        try {
            const product = await productService.getById(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            const cart = await cartService.getById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

            const cartUpdate = await cartService.deleteProductFromCart(cid, pid);

            res.status(200).json({ status: "success", payload: cartUpdate });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async updateQtyProductInCart(req, res) {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!quantity) return res.status(400).json({ status: "Error", msg: "Ingrese la cantidad de productos que desea agregar." });

        try {
            const product = await productService.getById(pid);
            if (!product) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            }
            const cart = await cartService.getById(cid);
            if (!cart) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            }

            const isProductInCart = await cartService.isProductInCart(cid, pid);
            if (!isProductInCart) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(404).json({ status: "Error", msg: `El producto con el id ${pid} no se encuentra en el carrito` });
            }

            const cartUpdate = await cartService.updateQuantityProductInCart(cid, pid, Number(quantity));

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ status: "success", payload: cartUpdate });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async clearProductsToCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartService.clearProductsToCart(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

            res.status(200).json({ status: "success", cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async purchaseCart(req, res) {
        try {
            if (!req.user) return res.status(404).json({ status: "error", msg: "Usuario no logueado" });
            const user = new UserDTO(req.user);

            const { cid } = req.params;
            const cart = await cartService.getById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
            if (cart.products.length === 0) return res.status(404).json({ status: "Error", msg: "Carrito vacío" });

            const amount = await cartService.purchaseCart(cid);
            if (amount === 0) return res.status(404).json({ status: "Error", msg: "No hay productos en stock" });

            const ticket = await ticketService.create(amount, user.email);
            if (!ticket) return res.status(404).json({ status: "Error", msg: "No se pudo generar el ticket de compra, por favor intente de nuevo." });

            await sendTicket("aizquelus@gmail.com", user.first_name, ticket);

            res.status(200).json({ status: "success", msg: "Compra realizada", ticket });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }
}

export default new CartsController();
