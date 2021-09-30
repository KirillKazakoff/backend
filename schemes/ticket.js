import { nanoid } from 'nanoid';
import { getTime } from '../lib/utils';

export default class Ticket {
    constructor(descShort) {
        this.id = nanoid(7);
        this.descShort = descShort;
        this.status = 'empty';
        this.created = getTime();
    }
}
