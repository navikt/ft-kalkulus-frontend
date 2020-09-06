import moment from 'moment/moment';
import 'moment/locale/nb';
import {
  DDMMYYYY_DATE_FORMAT,
} from './formats';
export const dateFormat = (date) => moment(date).format(DDMMYYYY_DATE_FORMAT);
