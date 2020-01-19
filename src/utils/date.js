import {dateObj} from '@/config/config'
import moment from 'moment'
export const dateFormat = function (date,format){
    if(date){
        format = format||dateObj.defaulDateFormat;
        return moment(date).format(format);
    }
    return ''

};