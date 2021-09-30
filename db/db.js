/* eslint-disable object-curly-newline */
import fs from 'fs';
import Ticket from '../schemes/ticket';
import TicketFull from '../schemes/ticketFull';

import db from './db.json';

class DbHandler {
    constructor() {
        this.ticketsFull = db;
        this.tickets = db.map((ticket) => {
            const { status, descShort, created, id } = ticket;
            return {
                status, descShort, created, id,
            };
        });
    }

    updateTicket(queryTicket) {
        const dbTicket = this.getFullTicket(queryTicket.id);

        dbTicket.descLong = queryTicket.descLong;
        dbTicket.descShort = queryTicket.descShort;
        this.refreshDb();

        return dbTicket;
    }

    updateStatus(id, status) {
        const dbTicket = this.getFullTicket(id);

        dbTicket.status = status;
        this.refreshDb();

        return dbTicket;
    }

    createTicket(descShort, descLong) {
        const ticket = new Ticket(descShort);
        this.tickets.push(ticket);

        const ticketFull = new TicketFull(ticket, descLong);
        this.ticketsFull.push(ticketFull);

        this.refreshDb();
        return ticketFull;
    }

    removeTicket(id) {
        const index = this.ticketsFull.findIndex((ticket) => ticket.id === id);
        const delTicket = this.getFullTicket(id);
        this.ticketsFull.splice(index, 1);

        this.refreshDb();
        return delTicket;
    }

    getFullTicket(id) {
        return this.ticketsFull.find((ticket) => ticket.id === id);
    }

    refreshDb() {
        const json = JSON.stringify(this.ticketsFull);
        fs.writeFile('./db/db.json', json, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('successful refresh');
        });
    }
}

const dbHandler = new DbHandler();
export default dbHandler;
