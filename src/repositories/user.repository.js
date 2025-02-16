import { userDao } from "../dao/mongo/user.dao.js";

export default class UserRepository {
    constructor() {
        this.dao = userDao;
    }

    async getAll(query, options) {
        return await this.dao.getAll(query, options);
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async getByEmail(email) {
        return await this.dao.getByEmail(email);
    }

    async create(data) {
        return await this.dao.create(data);
    }

    async update(id, data) {
        return await this.dao.update(id, data);
    }

    async deleteOne(id) {
        return await this.dao.deleteOne(id);
    }
}
