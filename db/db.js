import Ticket from '../schemes/ticket';
import TicketFull from '../schemes/ticketFull';

import db from './db.json';
import fs from 'fs';

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
        fs.writeFile("./db/db.json", json, (err) => {
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




























// /* eslint-disable no-param-reassign */
// import './table.css';
// import { tableT, tableRowT } from './table.template';
// import { noteTransform, getTime } from '../../lib/utils';
// import engine from '../../lib/engine/engine';

// import Form from '../form/form';

// export default class Table {
//     constructor() {
//         this.container = document.querySelector('tbody');

//         this.form = new Form(this.container);
//         this.form.node.addEventListener('submit', (e) => this.onFormSubmit(e));

//         this.addButton = document.querySelector('.plus-sign');
//         this.addButton.addEventListener('click', () => this.form.show());

//         this.container.addEventListener('click', (e) => this.onClick(e));
//     }

//     render(notes) {
//         const html = engine(tableT(notes));
//         this.container.innerHTML = html;
//         this.notes = [...this.container.children];
//     }

//     onFormSubmit(e) {
//         this.form.clearErrors();
//         if (this.form.checkSubmit(e)) {
//             const note = this.form.getFormData();

//             if (this.edited) {
//                 [...this.edited.children].forEach((td) => {
//                     const keyTd = td.className.substring(4);

//                     Object.entries(note).forEach(([key, value]) => {
//                         if (key === keyTd) td.textContent = value;
//                     });
//                 });

//                 this.sendRequest('updateTicket', this.edited.id);
//                 this.edited = null;
//                 return;
//             }

//             this.sendRequest('createTicket', note).then((note) => {
//                 console.log(note);
//                 const noteTmp = noteTransform(note);
//                 const newNote = engine(tableRowT(noteTmp));
//                 this.container.insertAdjacentHTML('beforeend', newNote);

//                 this.form.clearFields();
//             })
//         }
//     }

//     onClick(e) {
//         const row = e.target.closest('.table__row');
//         if (row) {
//             if (e.target.classList.contains('button__edit')) {
//                 const noteEl = e.target.closest('.table__row');
//                 this.edited = noteEl;

//                 const data = Table.getNoteData(noteEl);
//                 this.form.show(data);
//                 return;
//             }

//             if (e.target.classList.contains('button__delete')) {
//                 const noteEl = e.target.closest('.table__row');
//                 noteEl.remove();
//                 return;
//             }

//             if (e.target.classList.contains('status')) {
//                 e.target.classList.toggle('status__checked');
//                 return;
//             }

//             row.querySelector('.td__descLong').classList.toggle('desc-active');
//         }
//     }

//     static getNoteData(noteEl) {
//         return [...noteEl.children].reduce((total, td) => {
//             const key = td.className.match(/td__([\w-]+)/).pop();
//             const value = td.textContent;

//             if (key.includes('desc')) total[key] = value;
//             return total;
//         }, {});
//     }

//     sendRequest(method, params) {
//         return new Promise((resolve) => {
//             const xhr = new XMLHttpRequest();

//             const params = new URLSearchParams();
//             params.append('method', method);
//             const url = `http://localhost:9091/?${params}`;

//             let body = null;

//             if (method === 'createTicket') {
//                 xhr.open('POST', url);
//                 body = new FormData(this.form.node);
//             }

//             if (method === 'updateTicket') {
//                 params.append()
//                 xhr.open('GET', url);
//             }

//             if (method === 'allTickets' || method === 'initTable') {
//                 xhr.open('GET', url);
//             }

//             xhr.addEventListener('load', () => {
//                 resolve(JSON.parse(xhr.response));
//             });
//             xhr.send(body);
//         })

//     }
// }
