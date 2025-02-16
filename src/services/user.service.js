import { userRepository } from "../repositories/index.js";

class UserService {
    async getAll(query, options) {
        return await userRepository.getAll(query, options);
    }

    async getById(id) {
        return await userRepository.getById(id);
    }

    async getByEmail(email) {
        return await userRepository.getByEmail(email);
    }

    async create(data) {
        return await userRepository.create(data);
    }

    async update(id, data) {
        return await userRepository.update(id, data);
    }

    async deleteOne(id) {
        return await userRepository.deleteOne(id);
    }
}

export const userService = new UserService();
