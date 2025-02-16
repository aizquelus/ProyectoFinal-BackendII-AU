import { cartRepository, productRepository } from "../repositories/index.js";

class CartService {
    async getAll() {
        return cartRepository.getAll();
    }

    async getById(id) {
        return cartRepository.getById(id);
    }

    async create() {
        return await cartRepository.create();
    }

    async update(id, data) {
        return await cartRepository.update(id, data);
    }

    async deleteOne(id) {
        return await cartRepository.deleteOne(id);
    }

    async addProductToCart(cid, pid) {
        const cart = await cartRepository.getById(cid);

        const productInCart = cart.products.find((element) => element.product._id == pid);
        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        return cartRepository.update(cid, { products: cart.products });
    }

    async deleteProductFromCart(cid, pid) {
        const cart = await cartRepository.getById(cid);
        cart.products = cart.products.filter((element) => element.product._id != pid);

        return await cartRepository.update(cid, { products: cart.products });
    }

    async updateQuantityProductInCart(cid, pid, quantity) {
        const cart = await cartRepository.getById(cid);
        const product = cart.products.find((element) => element.product._id == pid);
        product.quantity = quantity;

        return await cartRepository.update(cid, { products: cart.products });
    }

    async clearProductsToCart(cid) {
        return await cartRepository.update(cid, { products: [] });
    }

    async purchaseCart(cid) {
        const cart = await cartRepository.getById(cid);

        let total = 0;
        let productWithoutStock = [];

        for (const cartProduct of cart.products) {
            const product = await productRepository.getById(cartProduct.product);

            if (product.stock >= cartProduct.quantity) {
                total += product.price * cartProduct.quantity;

                await productRepository.update(product._id, { stock: product.stock - cartProduct.quantity });
            } else {
                productWithoutStock.push(cartProduct);
            }

            await cartRepository.update(cid, { products: productWithoutStock });
        }

        return total;
    }

    async isProductInCart(cid, pid) {
        const cart = await cartRepository.getById(cid);
        return cart.products.find((element) => element.product._id == pid);
    }

}

export const cartService = new CartService();
