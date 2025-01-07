const CategoryCake = () => {
  return (
    <div className="grid grid-cols-5 gap-4 mt-8">
      {[
        { label: '생일', icon: 'images/icons/birthday.svg' },
        { label: '졸업', icon: 'images/icons/graduate.svg' },
        { label: '데이트', icon: 'images/icons/date.svg' },
        { label: '파티', icon: 'images/icons/party.svg' },
        { label: '연말', icon: 'images/icons/yearend.svg' },
        { label: '기념일', icon: 'images/icons/anniversary.svg' },
        { label: '감사', icon: 'images/icons/thanks.svg' },
        { label: '결혼', icon: 'images/icons/marry.svg' },
        { label: '직장', icon: 'images/icons/work.svg' },
        { label: '당일', icon: 'images/icons/now.svg' },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <img src={item.icon} alt={item.label} className="w-10 h-10" />
          <span className="text-sm text-gray-600 mt-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryCake;
