
import { DayPlan, TodoItem } from './types';

export const INITIAL_CHECKLIST: TodoItem[] = [
  { id: '1', text: '護照 (效期6個月以上)', completed: false, category: '必備證件' },
  { id: '2', text: '機票/住宿訂單影本或電子檔', completed: false, category: '必備證件' },
  { id: '11', text: '購買旅遊保險', completed: false, category: '必備證件' },
  { id: '12', text: '確認飯店入住資訊', completed: false, category: '必備證件' },
  { id: '3', text: 'Visit Japan Web QR Code', completed: false, category: '必備證件' },
  { id: '4', text: '日幣現金與信用卡', completed: false, category: '必備證件' },
  { id: '5', text: '網卡 (eSIM/實體卡/WiFi機)', completed: false, category: '網路通訊' },
  { id: '6', text: '行動電源與充電線', completed: false, category: '3C用品' },
  { id: '7', text: '萬用轉接頭 (日本通常不需，但備用)', completed: false, category: '3C用品' },
  { id: '8-1', text: '咳藥', completed: false, category: '個人藥品' },
  { id: '8-2', text: '胃藥', completed: false, category: '個人藥品' },
  { id: '8-3', text: '頭痛藥', completed: false, category: '個人藥品' },
  { id: '8-4', text: '肚痛藥', completed: false, category: '個人藥品' },
  { id: '8-5', text: '傷風藥', completed: false, category: '個人藥品' },
  { id: '8-6', text: '哮喘藥', completed: false, category: '個人藥品' },
  { id: '8-7', text: '膠布', completed: false, category: '個人藥品' },
  { id: '8-8', text: '消毒紙', completed: false, category: '個人藥品' },
  { id: '8-9', text: '眼藥水', completed: false, category: '個人藥品' },
  { id: '9', text: '保暖衣物 (富士山區較涼)', completed: false, category: '衣物' },
  { id: '10', text: '舒適的走路鞋', completed: false, category: '衣物' },
  { id: '13', text: '安排機場接送', completed: false, category: '其他' },
];

export const ITINERARY_DATA: Record<string, DayPlan> = {
  day1: {
    title: 'Day 1 (6 FEB) - 日本東京新宿',
    spots: [
      { time: '14:10', location: '抵達成田國際機場', description: '抵達成田國際機場，準備辦理入境。', category: 'transport' },
      { time: '15:30', location: '到車站買車票', description: '前往車站購買前往新宿的車票。', category: 'transport' },
      { time: '18:00', location: '抵達新宿', description: '到達新宿站，準備前往下榻處。', category: 'transport' },
      { time: '18:00-20:00', location: '晚餐：Ginza Happo / 壽司', description: 'Ginza Happo - Shinjuku / Uncle and Auntie: 回転寿司トリトン', category: 'food' },
    ]
  },
  day2: { title: '第二天：淺草與秋葉原', spots: [{ time: '09:00', location: '淺草寺', description: '雷門拍照。', category: 'view' }] },
  day3: { title: '第三天：明治神宮與澀谷', spots: [{ time: '10:00', location: '明治神宮', description: '漫步森林。', category: 'view' }] },
  day4: {
    title: '第四天：富士山河口湖自駕遊',
    spots: [
      { time: '08:00', location: '酒店 Checkout', description: '步行前往租車點。', category: 'transport' },
      { time: '08:55', location: 'TOYOTA 租車', description: '領取車輛，開始自駕行程。', category: 'transport' },
      { time: '11:45', location: '河口湖酒店 Check-in', description: '辦理入住。', category: 'transport' },
      { time: '12:15', location: '餺飥藏 (Houtou Fudou)', description: '享用河口湖名產味噌麵。', category: 'food' },
      { time: '14:30', location: '西湖冰雕藝術節', description: '欣賞震撼的冬日冰雕。', category: 'view' },
      { time: '15:30', location: '療癒之里', description: '合掌造建築與和服體驗。', category: 'view' },
      { time: '16:30', location: 'Supermarket 採買', description: '準備晚餐食材或零食。', category: 'shopping' },
      { time: '17:30', location: '自助晚餐', description: '於酒店享用豐盛晚餐。', category: 'food' },
      { time: '20:00', location: '花火大會', description: '20分鐘的湖畔冬季煙火。', category: 'view' },
    ]
  },
  day5: { title: '第五天：三鷹吉卜力', spots: [{ time: '10:00', location: '吉卜力美術館', description: '童話世界。', category: 'view' }] },
  day6: { title: '第六天：築地與銀座', spots: [{ time: '10:00', location: '築地市場', description: '海鮮盛宴。', category: 'food' }] },
  day7: { title: '第七天：東京車站歸途', spots: [{ time: '10:00', location: '東京車站', description: '最後採買。', category: 'shopping' }] }
};
