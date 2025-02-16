import { ticketModel } from "./models/ticket.model.js";

class TicketDao {
    async getAll(query, options) {
        const users = await ticketModel.paginate(query, options);
        return users;
    }

    async getById(id) {
        const user = await ticketModel.findById(id);
        return user;
    }

    async getByEmail(email) {
        const user = await ticketModel.findOne({ email });
        return user;
    }

    async create(data) {
        const user = await ticketModel.create(data);
        return user;
    }

    async update(id, data) {
        const userUpdate = await ticketModel.findByIdAndUpdate(id, data, { new: true });
        return userUpdate;
    }

    async deleteOne(id) {
        const user = await ticketModel.findByIdAndUpdate(id, { status: false }, { new: true });
        return user;
    }
}

export const ticketDao = new TicketDao();
