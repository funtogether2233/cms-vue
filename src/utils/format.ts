import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatUTC(
  time: string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  const utcString = dayjs.utc(time).utcOffset(8).format(format);
  return utcString;
}
