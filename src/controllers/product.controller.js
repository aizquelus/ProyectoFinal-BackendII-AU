import { productService } from "../services/product.service.js";

class ProductsController {
    async getProducts(req, res) {
        try {
            const products = await productService.getAll(req.query);
            res.status(200).json({ status: "success", products });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async getProduct(req, res) {
        const { pid } = req.params;

        try {
            const product = await productService.getById(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

            res.status(200).json({ status: "success", product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async createProduct(req, res) {
        try {
            const productData = req.body;
            const product = await productService.create(productData);

            res.status(201).json({ status: "success", product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async updateProduct(req, res) {
        const { pid } = req.params;

        try {
            const productData = req.body;
            const product = await productService.update(pid, productData);
            if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

            res.status(200).json({ status: "success", product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async deleteProduct(req, res) {
        const { pid } = req.params;

        try {
            const product = await productService.deleteOne(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

            res.status(200).json({ status: "success", msg: `El producto con el id ${pid} fue eliminado` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

}

export default new ProductsController();
