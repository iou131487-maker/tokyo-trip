
import React, { useState } from 'react';
import { TodoItem } from '../types.ts';

interface PreparationProps {
  items: TodoItem[];
  toggleItem: (id: string) => void;
  addItem: (text: string, category: string) => void;
  deleteItem: (id: string) => void;
}

const Preparation: React.FC<PreparationProps> = ({ items, toggleItem, addItem, deleteItem }) => {
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('其他');
  
  const categories = Array.from(new Set(items.map(i => i.category)));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    addItem(newItemText.trim(), newItemCategory);
    setNewItemText('');
  };

  return (
    <div className="space-y-10">
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-black text-[#5a4a42] mb-2 flex items-center justify-center md:justify-start gap-3">
          <span className="text-4xl">🎒</span> 行前準備清單
        </h2>
        <p className="text-[#8d7d74] font-medium text-lg">"小島民，出發前別忘了這些東西喔！"</p>
      </div>

      <form onSubmit={handleAdd} className="bg-[#fdf9f1] p-6 rounded-[2.5rem] border-2 border-[#e6dec9] flex flex-wrap gap-4 items-center shadow-inner">
        <input 
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="想要新增什麼？"
          className="flex-1 min-w-[180px] bg-white border-2 border-[#e6dec9] rounded-full px-6 py-3 text-gray-700 placeholder:text-gray-300 focus:border-orange-300 outline-none transition-all"
        />
        <select 
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
          className="bg-white border-2 border-[#e6dec9] rounded-full px-5 py-3 text-gray-700 outline-none font-bold"
        >
          {['必備證件', '網路通訊', '3C用品', '個人藥品', '衣物', '其他'].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button 
          type="submit"
          className="bg-[#78b159] text-white px-8 py-3 rounded-full font-black hover:bg-[#689d4d] bouncy shadow-md"
        >
          + 新增
        </button>
      </form>

      <div className="space-y-12">
        {categories.map(category => (
          <section key={category} className="space-y-5">
            <h3 className="text-xl font-black text-[#5a4a42] flex items-center bg-[#fdf9f1] w-fit px-6 py-2 rounded-full border border-[#e6dec9]">
              <span className="w-3 h-3 bg-green-400 mr-3 rounded-full animate-pulse"></span>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.filter(i => i.category === category).map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center group p-5 rounded-[2rem] cursor-pointer transition-all border-2 ${
                    item.completed 
                      ? 'bg-gray-100/50 border-gray-100 opacity-60 scale-95' 
                      : 'bg-white border-[#f1e9d2] hover:border-orange-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center mr-4 transition-all ${
                    item.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-[#f1e9d2] bg-gray-50'
                  }`}>
                    {item.completed && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`flex-1 text-lg font-bold ${item.completed ? 'line-through text-gray-400' : 'text-[#5a4a42]'}`}>
                    {item.text}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-300 hover:text-red-500 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Preparation;
