import UserRepository from "./user.repository.js";
import TicketRepository from "./ticket.repository.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";

export const userRepository = new UserRepository();
export const ticketRepository = new TicketRepository();
export const cartRepository = new CartRepository();
export const productRepository = new ProductRepository();
