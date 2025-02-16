import nodemailer from 'nodemailer';
import envsConfig from '../config/envs.config.js';

export const sendTicket = async (email, clientName, ticket) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 567,
        auth: {
            user: envsConfig.GMAIL_ACCOUNT,
            pass: envsConfig.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: envsConfig.GMAIL_ACCOUNT,
        to: email,
        subject: "¡Compra en E-commerce Coderhouse realizada con éxito!",
        html: 
        `
        <h1>Ticket de compra</h1>
        <h3>¡Hola, ${clientName}! Gracias por tu compra en E-commerce Coderhouse.</h3>
        <p>Te dejamos los detalles de tu compra:</p>
        <div>
            <p><b>Total de compra:</b> ${ticket.amount}</p>
            <p><b>Código:</b> ${ticket.code}</p>
            <p><b>Fecha de compra:</b> ${ticket.purchase_datetime}</p>
        </div>
        <p>¡Gracias por elegirnos!</p>
        `,
    };

    await transporter.sendMail(mailOptions);
}
