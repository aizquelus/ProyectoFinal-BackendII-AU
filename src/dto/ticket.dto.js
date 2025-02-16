export default class TicketDTO {
    constructor(ticket) {
        this.amount = ticket.amount,
        this.purchaser = ticket.purchaser,
        this.purchase_datetime = ticket.purchase_datetime,
        this.code = ticket.code
    }
};
