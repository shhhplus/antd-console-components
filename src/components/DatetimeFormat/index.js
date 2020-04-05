import moment from 'moment';

const exe = (value, format) => {
  if (!value || value === '0001-01-01T08:00:00+08:00') {
    return '-';
  }
  return moment(value).format(format);
};

const Date = ({ value }) => {
  return exe(value, 'YYYY-MM-DD');
};

const Time = ({ value }) => {
  return exe(value, 'HH:mm:ss');
};

const DateTime = ({ value }) => {
  return exe(value, 'YYYY-MM-DD HH:mm:ss');
};

DateTime.Date = Date;
DateTime.Time = Time;

export default DateTime;
