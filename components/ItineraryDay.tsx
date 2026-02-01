import React from 'react';
import { DayPlan } from '../types';

interface ItineraryDayProps {
  day: string;
  plan: DayPlan;
  accentColor?: string;
}

const getSmartIcon = (location: string, category: string) => {
  const text = (location + category).toLowerCase();
  
  // 優先判斷具體地點與交通工具
  if (text.includes('花火') || text.includes('煙火')) return '🎆';
  if (text.includes('還車') || text.includes('返却')) return '🏁';
  if (text.includes('自駕') || text.includes('用車') || text.includes('租車') || text.includes('開車') || text.includes('toyota')) return '🚗';
  if (text.includes('nex') || text.includes('成田快線') || text.includes('新宿') || text.includes('澀谷') || text.includes('東京站') || text.includes('車站') || text.includes('地鐵') || text.includes('鐵路') || text.includes('jr')) return '🚉';
  if (text.includes('機場') || text.includes('空港') || text.includes('成田') || text.includes('羽田') || (text.includes('抵達') && !text.includes('站'))) return '✈️';
  if (text.includes('公車') || text.includes('巴士') || text.includes('接駁') || text.includes('乘車')) return '🚌';
  
  // 生活與活動
  if (text.includes('飯店') || text.includes('酒店') || text.includes('check-in') || text.includes('入住') || text.includes('住宿') || text.includes('checkout')) return '🏨';
  if (text.includes('flipper') || text.includes('pancake') || text.includes('鬆餅')) return '🥞';
  if (text.includes('cafe') || text.includes('咖啡')) return '☕';
  if (text.includes('鳥貴族') || text.includes('居酒屋')) return '🍢';
  if (text.includes('壽司') || text.includes('拉麵') || text.includes('燒肉') || text.includes('晚餐') || text.includes('早餐') || text.includes('午餐') || text.includes('下午茶') || text.includes('美食') || text.includes('餺飪')) return '🍣';
  if (text.includes('富士山') || text.includes('河口湖') || text.includes('風景') || text.includes('展望') || text.includes('相機') || text.includes('大石公園') || text.includes('回廊')) return '🗻';
  if (text.includes('冰雕') || text.includes('雪')) return '❄️';
  if (text.includes('outlet') || text.includes('採買') || text.includes('購物') || text.includes('supermarket') || text.includes('超市') || text.includes('藥妝') || text.includes('手信') || text.includes('伴手禮')) return '🛍️';
  if (text.includes('美術館') || text.includes('吉卜力') || text.includes('藝術') || text.includes('展覽')) return '🎨';
  if (text.includes('寺') || text.includes('宮') || text.includes('雷門') || text.includes('神社') || text.includes('鳥居') || text.includes('遙拝所')) return '⛩️';
  if (text.includes('溫泉')) return '♨️';
  
  // 根據分類回退
  switch (category) {
    case 'food': return '🥞';
    case 'view': return '🎐';
    case 'shopping': return '🛍️';
    case 'transport': return '🚌';
    default: return '📍';
  }
};

const ItineraryDay: React.FC<ItineraryDayProps> = ({ day, plan, accentColor }) => {
  return (
    <div className="space-y-12">
      <div className="text-center md:text-left border-b-4 border-white/20 pb-8 relative">
        <h2 className="text-3xl md:text-4xl font-black text-[#5a4a42] mb-3 drop-shadow-sm">{plan.title}</h2>
        <div className="flex items-center gap-2 text-[#8d7d74] font-medium justify-center md:justify-start">
          <span className="w-2 h-2 rounded-full bg-orange-300"></span>
          <span>今日美好行程</span>
          <span className="w-2 h-2 rounded-full bg-orange-300"></span>
        </div>
        <div className="absolute top-0 right-0 text-6xl opacity-10 -rotate-12 select-none hidden md:block">📮</div>
      </div>

      <div className="relative">
        <div className="absolute left-12 top-10 bottom-10 w-1 border-l-4 border-dashed border-[#e6dec9] hidden md:block opacity-50"></div>

        <div className="space-y-12 md:space-y-20">
          {plan.spots.map((spot, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row items-start group animate-fadeIn" style={{ animationDelay: `${idx * 0.1}s` }}>
              {/* 時間氣泡 */}
              <div className="mb-6 md:mb-0 md:w-52 md:pl-2 relative z-10 flex justify-center md:block">
                <div 
                  className="bg-white/90 backdrop-blur-sm px-6 md:px-8 py-3 md:py-4 rounded-[1.8rem] md:rounded-[2.2rem] border-4 border-[#f1e9d2] shadow-md font-black text-[#5a4a42] text-xl md:text-2xl group-hover:bg-white transition-all duration-300 group-hover:scale-110 flex items-center justify-center min-w-[120px] md:min-w-[160px]"
                  style={{ 
                    transform: `rotate(${idx % 2 === 0 ? '-2' : '2'}deg)`,
                    borderColor: accentColor || '#f1e9d2'
                  }}
                >
                  {spot.time || '📍'}
                </div>
              </div>

              {/* 行程卡片 */}
              <div className="flex-1 w-full md:ml-6">
                <div className="bg-white/40 border-2 border-white/60 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="flex items-center mb-5 relative z-10">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/80 rounded-2xl border-2 border-[#e6dec9] flex items-center justify-center text-3xl md:text-4xl shadow-inner mr-4 md:mr-6 group-hover:rotate-12 transition-transform">
                      {getSmartIcon(spot.location, spot.category)}
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-[#5a4a42] leading-tight flex-1">
                      {spot.location}
                    </h4>
                  </div>
                  <div className="bg-white/70 p-5 md:p-7 rounded-[1.5rem] md:rounded-[2rem] border border-white/50 relative z-10 shadow-inner">
                    <p className="text-[#8d7d74] text-lg md:text-xl font-medium leading-relaxed">
                      {spot.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDay;
