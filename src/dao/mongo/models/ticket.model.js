import mongoose from "mongoose";

const ticketColl = "tickets";

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: Number,
    purchaser: String
});

export const ticketModel = mongoose.model(ticketColl, ticketSchema);
