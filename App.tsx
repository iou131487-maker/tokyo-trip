import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TabType, TodoItem, TabConfig } from './types';
import { INITIAL_CHECKLIST, ITINERARY_DATA } from './constants';
import Preparation from './components/Preparation';
import ItineraryDay from './components/ItineraryDay';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('prep');
  const [checklist, setChecklist] = useState<TodoItem[]>(INITIAL_CHECKLIST);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchAiAdvice = async (dayKey: string) => {
    if (dayKey === 'prep') return;
    setIsAiLoading(true);
    setAiTip(null);
    const apiKey = process.env.API_KEY;
    try {
      if (!apiKey) {
        setAiTip("尚未設定 API_KEY，無法獲取小建議 🍃");
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const dayData = ITINERARY_DATA[dayKey];
      const prompt = `你是一個專業的東京導遊。請針對以下行程提供 3 個實用的旅遊小建議（包含交通、美食或隱藏景點），字數精簡，語氣親切像手寫日記。行程內容：${JSON.stringify(dayData.spots)}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            systemInstruction: "你是一個可愛的日本旅遊助手，說話親切活潑。建議內容必須精煉，適合放在筆記本中。",
            temperature: 0.8
        }
      });
      setAiTip(response.text || "AI 目前沒有回應，稍後再試試看吧！");
    } catch (error) {
      setAiTip("小幫手連線出現一點問題 🍃");
    } finally {
      setIsAiLoading(false);
    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addItem = (text: string, category: string) => {
    setChecklist(prev => [...prev, { id: Date.now().toString(), text, category, completed: false }]);
  };

  const deleteItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  // 定義每頁專屬的少女馬卡龍純色 (不含透明度)
  const tabConfigs: Record<TabType, TabConfig> = useMemo(() => ({
    prep: { label: '行前準備', color: 'bg-[#FFD1DC]', tint: '薔薇粉', accent: '#FFB7B2' },
    day1: { label: '第一天', color: 'bg-[#C1E1C1]', tint: '薄荷綠', accent: '#93C572' },
    day2: { label: '第二天', color: 'bg-[#FFF4BD]', tint: '檸檬黃', accent: '#F0E68C' },
    day3: { label: '第三天', color: 'bg-[#DCD0FF]', tint: '薰衣草紫', accent: '#D8BFD8' },
    day4: { label: '第四天', color: 'bg-[#FFCCBB]', tint: '蜜桃橘', accent: '#FFA07A' },
    day5: { label: '第五天', color: 'bg-[#B0E0E6]', tint: '蘇打藍', accent: '#AFEEEE' },
    day6: { label: '第六天', color: 'bg-[#FAF3E0]', tint: '奶油白', accent: '#E6CCB2' },
    day7: { label: '第七天', color: 'bg-[#FBCCE7]', tint: '櫻花粉', accent: '#FFB6C1' },
  }), []);

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-pink-100">
      {/* 固定馬卡龍純色背景 (移除圖片) */}
      <div 
        className={`fixed inset-0 z-[-30] transition-colors duration-1000 no-print ${tabConfigs[activeTab].color}`}
      />
      
      {/* 極輕微的紙張質感 overlay，增加手帳質感，但維持純色視覺 */}
      <div className="fixed inset-0 z-[-10] opacity-[0.03] pointer-events-none paper-texture no-print" />

      <header className="sticky top-0 z-50 pt-8 pb-4 px-4 no-print">
        <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-[2.5rem] p-4 border border-white/30 shadow-lg relative">
          <h1 className="text-2xl md:text-3xl font-black text-[#5a4a42] text-center mb-6 drop-shadow-sm tracking-tight">
             東京自由行 - 每日行程 🗼
          </h1>
          <nav className="flex flex-wrap justify-center gap-2">
            {(Object.entries(tabConfigs) as [TabType, TabConfig][]).map(([id, cfg]) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setAiTip(null); }}
                className={`px-4 py-2 rounded-full text-sm font-bold bouncy transition-all border shadow-sm ${
                  activeTab === id 
                  ? 'bg-white text-[#5a4a42] scale-105 border-white shadow-md' 
                  : 'bg-white/30 text-[#5a4a42] border-white/10 hover:bg-white/50'
                }`}
              >
                {cfg.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10 flex-grow w-full">
        {/* 內容區域保持透明度，以透出背景的純色 */}
        <div className="relative bg-white/50 backdrop-blur-2xl border-2 border-white/40 rounded-[3rem] p-6 md:p-12 shadow-2xl animate-fadeIn paper-texture overflow-hidden min-h-[600px]">
          
          {/* AI 按鈕區域 */}
          {activeTab !== 'prep' && (
            <div className="flex justify-end mb-6 no-print">
              <button 
                onClick={() => fetchAiAdvice(activeTab)}
                disabled={isAiLoading}
                className="bg-[#78b159]/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-black shadow-lg hover:bg-[#689d4d] bouncy disabled:opacity-50 flex items-center gap-2"
              >
                {isAiLoading ? (
                  <>
                    <span className="animate-spin">🍃</span>
                    <span>思考中...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>AI 小建議</span>
                  </>
                )}
              </button>
            </div>
          )}

          {aiTip && (
            <div className="mb-10 bg-white/80 border-2 border-[#78b159] rounded-3xl p-6 relative animate-fadeIn no-print backdrop-blur-sm shadow-inner">
              <button onClick={() => setAiTip(null)} className="absolute top-3 right-4 text-[#78b159] font-black hover:scale-125 transition-transform p-2">✕</button>
              <h4 className="text-[#5a4a42] font-black mb-2 flex items-center gap-2">
                <span>🍃</span> 狸端機建議：
              </h4>
              <p className="text-[#5a4a42] whitespace-pre-line leading-relaxed italic text-sm md:text-base">{aiTip}</p>
            </div>
          )}
          
          {activeTab === 'prep' ? (
            <Preparation 
              items={checklist} 
              toggleItem={toggleChecklistItem}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          ) : (
            <ItineraryDay 
              day={activeTab} 
              plan={ITINERARY_DATA[activeTab]} 
              accentColor={tabConfigs[activeTab].accent}
            />
          )}

          <div className="mt-16 pt-8 border-t border-[#5a4a42]/10 flex justify-center no-print">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-3 bg-[#5a4a42]/80 backdrop-blur-sm text-white px-10 py-4 rounded-full font-black hover:bg-[#5a4a42] bouncy shadow-lg"
            >
              <span>🖨️</span> 列印這頁行程表
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 no-print text-[#5a4a42]/60 font-bold text-[10px] uppercase tracking-[0.3em] drop-shadow-sm">
         Tokyo Macaron Adventure 🍃
      </footer>
    </div>
  );
};

export default App;
