import { DateTime } from 'luxon';

export function getTime() {
    return DateTime.local().toLocaleString()
    // return DateTime.utc({
    //     year: number,
    //     day: number,  
    //     month: number,
    //     hour: number,
    //     minute: number,
    // })

    // return DateTime.local().setLocale('ru').toLocaleString({
    //     year: '2-digit',
    //     day: '2-digit',  
    //     month: '2-digit',
    //     hour: '2-digit',
    //     minute: '2-digit',
    // }, { locale: 'ru' });
    // DateTime.now().toLocaleString({ year: '2-digit' }, { locale: 'ru' })
}