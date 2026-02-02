import { DayPlan, TodoItem } from './types';

export const INITIAL_CHECKLIST: TodoItem[] = [
  { id: '1', text: '護照 (效期6個月以上)', completed: false, category: '必備證件' },
  { id: '2', text: '機票/住宿訂單影本或電子檔', completed: false, category: '必備證件' },
  { id: '3', text: '旅遊保險證明', completed: false, category: '必備證件' },
  { id: '4', text: '日幣現金與信用卡', completed: false, category: '必備證件' },
  { id: '10', text: '國際車牌', completed: false, category: '必備證件' },
  { id: '5', text: 'Suica / Pasmo 卡 (實體或手機)', completed: false, category: '交通工具' },
  { id: '6', text: '日本網卡 / WiFi 機', completed: false, category: '網路通訊' },
  { id: '7', text: '行動電源與充電線', completed: false, category: '3C用品' },
  { id: '8', text: '感冒藥/止痛藥/腸胃藥', completed: false, category: '個人藥品' },
  { id: '9', text: '雨具 (摺疊傘)', completed: false, category: '其他' },
];

export const ITINERARY_DATA: Record<string, DayPlan> = {
  day1: {
    title: "Day 1 - 新宿",
    spots: [
      { time: "14:10", location: "抵達成田國際機場", description: "順利抵達日本！辦理入境手續並提取行李。", category: "transport" },
      { time: "15:30", location: "NEX 買車票到新宿", description: "購買 Narita Express (NEX) 車票，準備前往熱鬧的新宿市區。", category: "transport" },
      { time: "18:00", location: "抵達新宿", description: "抵達新宿車站，前往酒店 Check-in 或寄放行李。", category: "transport" },
      { time: "18:00-20:00", location: "晚餐", description: "在新宿周邊尋找美味的日本料理作為第一頓晚餐。", category: "food" },
      { time: "20:00", location: "AALIYA COFFEE ROASTERS", description: "品嚐極具名氣的法式吐司與香醇咖啡，享受悠閒時光。", category: "food" },
      { time: "20:30", location: "GU / Uniqlo", description: "巡禮日本國民服飾品牌，採購簡約質感的服飾。", category: "shopping" },
    ]
  },
  day2: {
    title: "Day2 - 築地及啤酒廠",
    spots: [
      { time: "08:00-12:00", location: "築地市場、豐洲 千客萬來", description: "探索東京廚房，品嚐新鮮海鮮與漫步千客萬來江戶造景。", category: "food" },
      { time: "14:30-16:30", location: "三得利啤酒廠", description: "預約參觀啤酒工廠，了解釀造細節並品嚐現泡新鮮生啤。", category: "view" },
      { time: "18:00", location: "新宿水果放題", description: "在新宿享受日本當季水果吃到飽，補充維他命！", category: "food" },
      { time: "20:00-21:30", location: "天下壽司(池袋店)", description: "池袋在地人氣名店，高 CP 值的美味迴轉壽司。", category: "food" },
    ]
  },
  day3: {
    title: "Day 3 - 富士山花火大會",
    spots: [
      { time: "08:00", location: "酒店 Checkout", description: "整理行李，辦理退房手續，準備出發。", category: "transport" },
      { time: "08:55-10:40", location: "巴士去河口湖站", description: "搭乘高速巴士前往河口湖，沿途欣賞富士山美景。", category: "transport" },
      { time: "11:00-11:30", location: "TOYOTA 租車 (河口湖店)", description: "抵達河口湖車站後辦理租車手續，開啟自駕之旅。", category: "transport" },
      { time: "11:45", location: "自駕抵達：Check-in 酒店", description: "抵達河口湖住宿點辦理入住或寄存行李。", category: "transport" },
      { time: "12:15-14:00", location: "餺飥藏", description: "享用山梨縣在地名產「餺飥」味噌蔬菜燉麵。", category: "food" },
      { time: "14:30", location: "西湖冰雕藝術節", description: "欣賞壯觀的巨大冰雕，與富士山相互輝映。", category: "view" },
      { time: "15:30", location: "療癒之里", description: "走進傳統合掌造村落，體驗江戶時代的田園生活。", category: "view" },
      { time: "16:30", location: "Supermarket 採買", description: "逛逛在地超市，買點水果與晚上的零食。", category: "shopping" },
      { time: "17:30", location: "溫泉旅館自助晚餐", description: "在入住的溫泉旅館享用豪華自助百匯料理，品嚐地產美食。", category: "food" },
      { time: "20:00-20:20", location: "花火大會", description: "在冬日澄澈的星空下，欣賞富士山前的燦爛煙火。", category: "view" },
    ]
  },
  day4: {
    title: "Day 4 - 富士五湖",
    spots: [
      { time: "07:30-08:00", location: "溫泉旅館自助早餐", description: "在旅館享用豐富早餐，補足一天能量。", category: "food" },
      { time: "09:00", location: "新屋山神社", description: "參拜日本知名的財運神社，感受山林間的靈氣。", category: "view" },
      { time: "09:30", location: "新倉山浅間公園", description: "拍攝著名的五重塔、富士山與櫻花（或冬景）經典合影。", category: "view" },
      { time: "10:00", location: "河口浅間神社", description: "參拜擁有千年巨杉的神社，體驗古老的神聖氣息。", category: "view" },
      { time: "10:30", location: "富士山遙拝所 (天空鳥居)", description: "登上天空鳥居，俯瞰河口湖與對面的壯麗富士山。", category: "view" },
      { time: "11:00", location: "河口湖楓葉回廊", description: "漫步於河口湖畔著名的紅葉林道，享受四季變換之美。", category: "view" },
      { time: "11:30", location: "大石公園", description: "湖畔步道散策，欣賞隨季節更迭的花卉與富士山。", category: "view" },
      { time: "12:00", location: "金山Cafe", description: "在湖邊充滿設計感的咖啡廳享用午餐與午茶時光。", category: "food" },
      { time: "18:00", location: "Supermarket 補貨", description: "晚餐前的採買，挑選在地特色飲品與伴手禮。", category: "shopping" },
      { time: "19:30", location: "溫泉旅館自助晚餐", description: "結束一天的自然之旅，回旅館享用精緻的自助大餐並放鬆泡湯。", category: "food" },
    ]
  },
  day5: {
    title: "Day 5 - 御殿場Outlet",
    spots: [
      { time: "07:00", location: "溫泉旅館自助早餐", description: "享用最後一餐旅館特製早餐，準備出發購物去！", category: "food" },
      { time: "10:00", location: "溫泉旅館Check-out", description: "辦理退房手續，帶齊行李告別河口湖。", category: "transport" },
      { time: "11:30", location: "TOYOTA 還車", description: "將陪伴多日的車輛交還租車點，完成自駕行程。", category: "transport" },
      { time: "12:10-13:20", location: "河口湖乘車到Outlet", description: "搭乘直達巴士前往購物天堂御殿場 Outlet。", category: "transport" },
      { time: "13:30", location: "御殿場Outlet", description: "盡情探索各大名牌折扣，邊逛邊欣賞遠方的富士山。", category: "shopping" },
      { time: "18:30-20:10", location: "Outlet乘車到東京站", description: "提著滿滿的戰利品，搭乘大巴返回熱鬧的東京車站。", category: "transport" },
      { time: "20:10", location: "晚餐提案：東京站美食", description: "推薦：根室花園壽司、俺式純拉麵、電光火石廣島燒或日本橋海鮮丼。", category: "food" },
      { time: "21:00", location: "鳥貴族", description: "在平價連鎖串燒店享受熱鬧氛圍與美味串燒雞肉。", category: "food" },
    ]
  },
  day6: {
    title: "Day 6 - 淺草及阿美橫丁",
    spots: [
      { time: "07:00", location: "酒店早餐", description: "在飯店享用早餐，補足元氣準備一整天的行程。", category: "food" },
      { time: "09:00", location: "上野淺草雷門寺", description: "漫步淺草寺雷門，感受傳統江戶風情，並前往上野地區探訪古蹟。", category: "view" },
      { time: "10:15", location: "人形町今半", description: "預約品嚐極致美味的壽喜燒，感受傳承百年的和牛饗宴。", category: "food" },
      { time: "12:00", location: "阿美橫丁", description: "在充滿活力的商店街穿梭，品嚐街邊小吃與挖掘超值好物。", category: "shopping" },
      { time: "18:00", location: "牛たんの檸檬 浅草店", description: "淺草超人氣厚切牛舌，鮮嫩多汁的極致口感。", category: "food" },
      { time: "19:00", location: "購買藥妝", description: "在大國藥妝或松本清大肆採購日本必買生活雜貨。", category: "shopping" },
      { time: "21:00", location: "鳥貴族", description: "在平價連鎖串燒店享受熱鬧氛圍與美味串燒雞肉。", category: "food" },
    ]
  },
  day7: {
    title: "Day 7 - 東京站及回程日",
    spots: [
      { time: "07:00", location: "酒店早餐", description: "享用最後一餐飯店早餐，準備整理行李歸賦。", category: "food" },
      { time: "09:00", location: "FLIPPER’S (Pancake breakfast)", description: "品嚐如雲朵般鬆軟的奇蹟舒芙蕾鬆餅，為旅程畫下甜美句點。", category: "food" },
      { time: "11:30-12:30", location: "東京站午餐", description: "在東京車站一番街尋找美味午餐，推薦拉麵街或壽司排隊名店。", category: "food" },
      { time: "12:30", location: "東京站購買手信", description: "採購 Tokyo Banana、Press Butter Sand 等知名伴手禮。", category: "shopping" },
      { time: "14:00", location: "乘坐NEX", description: "搭乘成田特快 Narita Express 前往成田機場。", category: "transport" },
      { time: "15:00", location: "抵達成田國際機場", description: "抵達機場辦理登機手續，進行最後的免稅店巡禮。", category: "transport" },
    ]
  },
};
