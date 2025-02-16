import { productRepository } from "../repositories/index.js";

class ProductService {
    async getAll(query) {
        const { limit, page, sort, category, status } = query;

        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            learn: true,
        };

        if (category) {
            return await productRepository.getAll({ category }, options);
        }

        if (status) {
            return await productRepository.getAll({ status }, options);
        }

        return await productRepository.getAll({}, options);
    }

    async getById(id) {
        return await productRepository.getById(id);
    }

    async create(data) {
        return await productRepository.create(data);
    }

    async update(id, data) {
        return await productRepository.update(id, data);
    }

    async deleteOne(id) {
        return await productRepository.deleteOne(id);
    }

    async productExists (productCode) {
        const products = await productRepository.getAll();
        return products.docs.find((p) => p.code == productCode);
    }

}

export const productService = new ProductService();
