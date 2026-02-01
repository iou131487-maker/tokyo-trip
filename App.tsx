
import React, { useState, useMemo } from 'react';
import { TabType, TodoItem, TabConfig } from './types.ts';
import { INITIAL_CHECKLIST, ITINERARY_DATA } from './constants.tsx';
import Preparation from './components/Preparation.tsx';
import ItineraryDay from './components/ItineraryDay.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('prep');
  const [checklist, setChecklist] = useState<TodoItem[]>(INITIAL_CHECKLIST);

  const MAP_IMAGE_URL = "https://r2.erweima.ai/i/p01P-M5gR0W9J-t3M_1w2A.jpg";

  const tabConfigs: Record<TabType, TabConfig> = useMemo(() => ({
    prep: { label: '行前準備', color: 'bg-[#FFB7B2]/20', tint: '粉桃', accent: '#FFB7B2' },
    day1: { label: '第一天', color: 'bg-[#B2CEFE]/20', tint: '粉藍', accent: '#B2CEFE' },
    day2: { label: '第二天', color: 'bg-[#BAFFC9]/20', tint: '薄荷', accent: '#BAFFC9' },
    day3: { label: '第三天', color: 'bg-[#FFFFBA]/20', tint: '檸檬', accent: '#FFFFBA' },
    day4: { label: '第四天', color: 'bg-[#E2F0CB]/20', tint: '粉綠', accent: '#E2F0CB' },
    day5: { label: '第五天', color: 'bg-[#D6B2FE]/20', tint: '粉紫', accent: '#D6B2FE' },
    day6: { label: '第六天', color: 'bg-[#FFDAC1]/20', tint: '杏橘', accent: '#FFDAC1' },
    day7: { label: '第七天', color: 'bg-[#B2F7EF]/20', tint: '湖綠', accent: '#B2F7EF' },
  }), []);

  const handlePrint = () => {
    window.print();
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addChecklistItem = (text: string, category: string) => {
    setChecklist(prev => [...prev, { id: Date.now().toString(), text, category, completed: false }]);
  };

  const deleteChecklistItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-orange-200">
      {/* 背景圖層 */}
      <div 
        className="fixed inset-0 z-[-2] w-full h-full no-print"
        style={{ 
          backgroundImage: `url(${MAP_IMAGE_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />
      
      {/* 馬卡龍色調層 */}
      <div className={`fixed inset-0 z-[-1] transition-colors duration-1000 no-print ${tabConfigs[activeTab].color}`} />

      {/* 導覽列 */}
      <header className="sticky top-0 z-50 pt-6 pb-2 px-4 no-print">
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-4 border border-white/60 soft-shadow relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-40 h-10 bg-orange-200/40 -rotate-1 mix-blend-multiply rounded-sm shadow-sm z-10 hidden md:block" style={{ clipPath: 'polygon(0% 15%, 100% 0%, 98% 85%, 2% 100%)' }}></div>
          
          <h1 className="text-2xl md:text-3xl font-black text-[#5a4a42] text-center mb-6 tracking-tight">
             東京自由行 - 每日行程 🗼
          </h1>
          <nav className="flex flex-wrap justify-center gap-2">
            {(Object.entries(tabConfigs) as [TabType, TabConfig][]).map(([id, cfg]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-2 rounded-full text-sm font-bold bouncy transition-all border shadow-sm ${
                  activeTab === id 
                  ? 'bg-white text-[#5a4a42] scale-110 border-white shadow-md' 
                  : 'bg-white/40 text-gray-600 border-white/30 hover:bg-white/80'
                }`}
              >
                {cfg.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 內容容器 */}
      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10 flex-grow w-full">
        <div className="relative bg-white/95 border-4 border-white rounded-[3.5rem] p-8 md:p-14 soft-shadow animate-fadeIn paper-texture">
          {/* 右上角紙膠帶裝飾 */}
          <div className="absolute -top-4 -right-4 w-32 h-12 bg-blue-200/40 rotate-12 rounded-sm shadow-sm hidden md:block no-print" style={{ clipPath: 'polygon(5% 0%, 95% 5%, 100% 90%, 0% 100%)' }}></div>
          
          {activeTab === 'prep' ? (
            <Preparation 
              items={checklist} 
              toggleItem={toggleChecklistItem}
              addItem={addChecklistItem}
              deleteItem={deleteChecklistItem}
            />
          ) : (
            <ItineraryDay 
              day={activeTab} 
              plan={ITINERARY_DATA[activeTab]} 
              accentColor={tabConfigs[activeTab].accent}
            />
          )}

          {/* 列印按鈕 */}
          <div className="mt-16 pt-8 border-t-4 border-[#fdf9f1] flex justify-center no-print">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-3 bg-[#5a4a42] text-white px-8 py-4 rounded-full font-black hover:bg-[#4a3a32] bouncy shadow-lg"
            >
              <span>🖨️</span> 列印這頁行程表
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center py-10 text-[#8d7d74] text-xs font-bold tracking-[0.2em] opacity-80 uppercase no-print">
         Hand-drawn Style Trip Planner 🍃
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
