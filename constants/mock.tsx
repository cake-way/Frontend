export const mockData = {
  curationId: 0,
  title: 'Delicious Cake Shops in Town',
  thumbnailImage: '/home/cake-2.svg',
  description:
    "A curated list of the best cake shops in the city. Don't miss out on these delicious treats!",
  curationCakelog: [
    {
      cakelogId: 1,
      userId: 0,
      username: 'john_doe',
      shopDto: [
        {
          shopId: '001',
          shopName: 'zz',
          operatingHour: {
            dayOfWeek: '월~금',
            openTime: {
              hour: 9,
              minute: 30,
              second: 0,
              nano: 0,
            },
            closeTime: {
              hour: 20,
              minute: 0,
              second: 0,
              nano: 0,
            },
            active: true,
          },
        },
      ],
      body: '친구 졸업식 파티를 위해 티아라 케이크와 꽃다발을 준비했어요 케이크 사진도 너무 이쁘게 나와서 친구가 엄청 좋아했어요 티아라가 정말 고급스러우면서도 귀여워요!',

      imageUrls: ['/home/cake-2.svg', '/home/cake-3.svg'],
    },
    {
      cakelogId: 1,
      userId: 0,
      username: 'john_doe',
      shopDto: [
        {
          shopId: '002',
          shopName: 'zz',
          operatingHour: {
            dayOfWeek: '월~금',
            openTime: {
              hour: 9,
              minute: 30,
              second: 0,
              nano: 0,
            },
            closeTime: {
              hour: 20,
              minute: 0,
              second: 0,
              nano: 0,
            },
            active: true,
          },
        },
      ],
      body: '친구 졸업식 파티를 위해 티아라 케이크와 꽃다발을 준비했어요 케이크 사진도 너무 이쁘게 나와서 친구가 엄청 좋아했어요 티아라가 정말 고급스러우면서도 귀여워요!',

      imageUrls: ['/home/cake-1.svg', '/home/cake-4.svg'],
    },
  ],
};
