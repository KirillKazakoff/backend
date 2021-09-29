import { DateTime } from 'luxon';

export function getTime() {
    return DateTime.now().setLocale('ru').toLocaleString({
        year: '2-digit',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}