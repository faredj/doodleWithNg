import * as moment from 'moment';
import {Moment} from 'moment';

export const Utils = {
  dateToString(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  },

  dateToString2(date: Date): string {
    return moment(date).format('DD MMM');
  }
};
