import { ticketDao } from '../dao/mongo/ticket.dao.js';
import TicketDTO from "../dto/ticket.dto.js";

export default class TicketRepository {
    constructor() {
        this.dao = ticketDao;
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
        return await this.dao.create(new TicketDTO(data));
    }

    async update(id, data) {
        return await this.dao.update(id, data);
    }

    async deleteOne(id) {
        return await this.dao.deleteOne(id);
    }
}
