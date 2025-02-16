import { ticketRepository } from "../repositories/index.js";

class TicketService {
    async getAll(query, options) {
        return await ticketRepository.getAll(query, options);
    }

    async getById(id) {
        return await ticketRepository.getById(id);
    }

    async create(amount, purchaser) {
        const code = Math.random().toString(36).substring(7);
        const ticketData = {
            amount,
            purchaser,
            code
        };

        return await ticketRepository.create(ticketData);
    }

    async update(id, data) {
        return await ticketRepository.update(id, data);
    }

    async deleteOne(id) {
        return await ticketRepository.deleteOne(id);
    }
}

export const ticketService = new TicketService();
