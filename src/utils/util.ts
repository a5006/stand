import dayjs from 'dayjs';

export const preventClick = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};

export const formatDate = (date: Date | string) => {
  if (!date) {
    return '--';
  }
  try {
    const now = dayjs();
    const updatedTime = dayjs(date);
    if (updatedTime.valueOf() > now.valueOf()) {
      return updatedTime.format('YYYY年M月D日');
    }
    if (now.diff(updatedTime, 'minute') < 1) {
      return '刚刚';
    } else if (updatedTime.isSame(now, 'day')) {
      return `今天 ${updatedTime.format('HH:mm:ss')}`;
    } else if (updatedTime.isSame(now.subtract(1, 'day'), 'day')) {
      return `昨天 ${updatedTime.format('HH:mm:ss')}`;
    } else if (now.diff(updatedTime, 'day') <= 30) {
      return `${now.diff(updatedTime, 'day')}天前 ${updatedTime.format(
        'HH:mm:ss'
      )}`;
    } else {
      return updatedTime.format('YYYY年M月D日');
    }
  } catch {
    return '--';
  }
};
