/* eslint-disable no-case-declarations */
import http from 'http';
import Koa from 'koa';
import koaBody from 'koa-body';
import dbHandler from './db/db';

const app = new Koa();

app.use(koaBody({
    urlencoded: true,
    multipart: true,
}));

app.use(async (ctx) => {
    const { method } = ctx.request.query;

    ctx.response.set({
        'Access-Control-Allow-Origin': '*',
    });

    switch (method) {
    case 'initTable':
        ctx.response.body = dbHandler.ticketsFull;
        break;
    case 'allTickets':
        ctx.response.body = dbHandler.tickets;
        break;
    case 'createTicket':
        const { descShort, descLong } = ctx.request.body;
        ctx.response.body = dbHandler.createTicket(descShort, descLong);
        break;
    case 'updateTicket':
        ctx.response.body = dbHandler.updateTicket(ctx.request.body);
        break;
    case 'updateStatus':
        const { id, status } = ctx.request.body;
        ctx.response.body = dbHandler.updateStatus(id, status);
        break;
    case 'removeTicket':
        const { id: delId } = ctx.request.body;
        ctx.response.body = dbHandler.removeTicket(delId);
        break;
    default:
        ctx.response.status = 404;
        break;
    }
});

const port = process.env.PORT || 9091;
http.createServer(app.callback()).listen(port);
