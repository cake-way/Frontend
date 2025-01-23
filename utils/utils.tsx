import { getCategoryParam } from '../constants/constants';

export const getCategoryParameter = (name: string) => {
  switch (name) {
    case '생일':
      return 'birthday';
    case '졸업':
      return 'graduation';
    case '데이트':
      return 'dating';
    case '파티':
      return 'party';
    case '연말':
      return 'yearend';
    case '기념일':
      return 'anniversary';
    case '감사':
      return 'thanks';
    case '결혼':
      return 'wedding';
    case '직장':
      return 'work';
    case '당일':
      return 'today';
  }
};

export const getCategoryName = (english: string) => {
  const found = Object.entries(getCategoryParam).find(
    ([, value]) => value === english
  ) as [string, string];

  return found[0];
};

export const getHoursMinutes = (
  selectedTime: string,
  selectedPeriod?: string
) => {
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = selectedTime.split(':').map(Number);
  if (selectedPeriod === '오후' && hours !== 12) {
    hours = hours + 12;
  }
  return [hours, minutes];
};
