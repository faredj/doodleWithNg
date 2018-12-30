import * as moment from 'moment';
import {Moment} from 'moment';

export const Utils = {
  dateToString(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }
};
