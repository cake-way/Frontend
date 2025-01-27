import LogImg from '../public/my-log-images/log.jpg';

export enum getCategoryParam {
  '생일' = 'birthday',
  '졸업' = 'graduation',
  '데이트' = 'dating',
  '파티' = 'party',
  '연말' = 'yearend',
  '기념일' = 'anniversary',
  '감사' = 'thanks',
  '결혼' = 'wedding',
  '직장' = 'work',
  '당일' = 'today',
}

//오후 시간대
export const pmTimes = [
  '12:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
];

//오전 시간대
export const amTimes = ['11:00'];

export const savedLog = [
  {
    src: LogImg,
    title: '집들이 파티에 빠질 수 없는 케이크 가게 8곳',
    cakeLogid: 1,
  },
  {
    src: LogImg,
    title: '저렴하면서 특별한 케이크 여기로!',
    cakeLogid: 2,
  },
  {
    src: LogImg,
    title: '연말 모임에 주문 제작하기 좋은 가게 10곳',
    cakeLogid: 1,
  },
  {
    src: LogImg,
    title: '재치 넘치는 멘트의 케이크 디자인 모음',
    cakeLogid: 3,
  },
];

export const days = ['일', '월', '화', '수', '목', '금', '토'];
