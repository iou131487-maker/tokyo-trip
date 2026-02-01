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
    
    // 透過 Vite 注入的 process.env 獲取 API_KEY
    const apiKey = process.env.API_KEY;

    try {
      if (!apiKey) {
        console.warn("API Key is missing.");
        setAiTip("尚未在 Vercel 設定中偵測到 API_KEY 🍃");
        return;
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const dayData = ITINERARY_DATA[dayKey];
      const prompt = `你是一個專業的東京導遊。請針對以下行程提供 3 個實用的旅遊小建議（包含交通、美食或隱藏景點），字數精簡，語氣親切像手寫日記。行程內容：${JSON.stringify(dayData.spots)}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            systemInstruction: "你是一個可愛的日本旅遊助手，說話親切活潑，會使用表情符號。建議內容必須精煉，適合放在筆記本中。",
            temperature: 0.8
        }
      });
      setAiTip(response.text || "AI 目前沒有回應，稍後再試試看吧！");
    } catch (error) {
      console.error("AI Error:", error);
      setAiTip("小幫手連線出現一點問題，請檢查 API Key 設定 🍃");
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

  const tabConfigs: Record<TabType, TabConfig> = useMemo(() => ({
    prep: { label: '行前準備', color: 'bg-[#FFD1DC]/60', tint: '薔薇粉', accent: '#FFB7B2' },
    day1: { label: '第一天', color: 'bg-[#BDE0FE]/60', tint: '冰河藍', accent: '#A2D2FF' },
    day2: { label: '第二天', color: 'bg-[#CCFFCC]/60', tint: '薄荷綠', accent: '#99FF99' },
    day3: { label: '第三天', color: 'bg-[#FFF9C4]/60', tint: '檸檬黃', accent: '#FFF176' },
    day4: { label: '第四天', color: 'bg-[#E1CCFF]/60', tint: '薰衣草紫', accent: '#D1B3FF' },
    day5: { label: '第五天', color: 'bg-[#FFD8B1]/60', tint: '蜜桃橘', accent: '#FFC48C' },
    day6: { label: '第六天', color: 'bg-[#F4F1DE]/60', tint: '香草白', accent: '#E07A5F' },
    day7: { label: '第七天', color: 'bg-[#D4F1F4]/60', tint: '湖水綠', accent: '#A2E1E7' },
  }), []);

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-pink-100">
      <div 
        className="fixed inset-0 z-[-30] bg-cover bg-center bg-no-repeat no-print"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop")',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className={`fixed inset-0 z-[-20] transition-colors duration-1000 no-print ${tabConfigs[activeTab].color}`} />
      <div className="fixed inset-0 z-[-10] opacity-10 pointer-events-none paper-texture no-print" />

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
                  : 'bg-white/20 text-[#5a4a42] border-white/10 hover:bg-white/40'
                }`}
              >
                {cfg.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10 flex-grow w-full">
        <div className="relative bg-white/70 backdrop-blur-lg border-2 border-white/50 rounded-[3rem] p-6 md:p-12 shadow-2xl animate-fadeIn paper-texture overflow-hidden min-h-[600px]">
          {activeTab !== 'prep' && (
            <button 
              onClick={() => fetchAiAdvice(activeTab)}
              disabled={isAiLoading}
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-[#78b159]/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-black shadow-lg hover:bg-[#689d4d] bouncy disabled:opacity-50 no-print flex items-center gap-2"
            >
              {isAiLoading ? '🍃 思考中...' : '✨ AI 小建議'}
            </button>
          )}

          {aiTip && (
            <div className="mb-8 bg-white/80 border-2 border-[#78b159] rounded-3xl p-6 relative animate-fadeIn no-print backdrop-blur-sm shadow-inner">
              <button onClick={() => setAiTip(null)} className="absolute top-3 right-4 text-[#78b159] font-black hover:scale-125 transition-transform">✕</button>
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