
import React from 'react';
import { DayPlan } from '../types.ts';

interface ItineraryDayProps {
  day: string;
  plan: DayPlan;
  accentColor?: string;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'food': return '🥞';
    case 'view': return '🎐';
    case 'shopping': return '🎀';
    case 'transport': return '🚲';
    default: return '📍';
  }
};

const ItineraryDay: React.FC<ItineraryDayProps> = ({ day, plan, accentColor }) => {
  return (
    <div className="space-y-12">
      <div className="text-center md:text-left border-b-4 border-[#fdf9f1] pb-8 relative">
        <h2 className="text-3xl md:text-4xl font-black text-[#5a4a42] mb-3">{plan.title}</h2>
        <div className="flex items-center gap-2 text-[#8d7d74] font-medium justify-center md:justify-start">
          <span className="w-2 h-2 rounded-full bg-orange-300"></span>
          <span>今日行程規劃</span>
          <span className="w-2 h-2 rounded-full bg-orange-300"></span>
        </div>
        {/* 小裝飾：地圖貼紙 */}
        <div className="absolute top-0 right-0 text-5xl opacity-10 -rotate-12 select-none hidden md:block">🗺️</div>
      </div>

      <div className="relative">
        {/* 手繪風虛線時間軸 */}
        <div className="absolute left-12 top-10 bottom-10 w-1 border-l-4 border-dashed border-[#e6dec9] hidden md:block"></div>

        <div className="space-y-12 md:space-y-20">
          {plan.spots.map((spot, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row items-start group">
              {/* 時間氣泡 - 優化響應式尺寸 */}
              <div className="mb-6 md:mb-0 md:w-52 md:pl-2 relative z-10 flex justify-center md:block">
                <div 
                  className="bg-white px-6 md:px-8 py-3 md:py-4 rounded-[1.8rem] md:rounded-[2.2rem] border-4 border-[#e6dec9] shadow-md font-black text-[#5a4a42] text-xl md:text-2xl group-hover:bg-[#fdf9f1] transition-all duration-300 group-hover:scale-110 flex items-center justify-center min-w-[120px] md:min-w-[160px]"
                  style={{ 
                    transform: `rotate(${idx % 2 === 0 ? '-3' : '3'}deg)`,
                    boxShadow: '4px 4px 0px rgba(230, 222, 201, 0.4)'
                  }}
                >
                  {spot.time || '預定'}
                </div>
              </div>

              {/* 行程卡片 */}
              <div className="flex-1 w-full md:ml-6">
                <div className="bg-[#fdf9f1]/60 border-2 border-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] relative overflow-hidden group">
                  {/* 背景裝飾 */}
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="flex items-center mb-5 relative z-10">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl border-2 border-[#e6dec9] flex items-center justify-center text-3xl md:text-4xl shadow-inner mr-4 md:mr-6 group-hover:rotate-12 transition-transform">
                      <CategoryIcon category={spot.category} />
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-[#5a4a42] leading-tight flex-1">
                      {spot.location}
                    </h4>
                  </div>
                  <div className="bg-white/80 p-5 md:p-7 rounded-[1.5rem] md:rounded-[2rem] border border-white/50 relative z-10 shadow-inner">
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
