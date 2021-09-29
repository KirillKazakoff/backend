import Ticket from './ticket';

export default class TicketFull extends Ticket {
    constructor(ticket, descLong) {
        super(ticket.descShort, ticket.status);
        this.descLong = descLong;
    }
}