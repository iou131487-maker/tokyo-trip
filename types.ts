
export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export interface ItinerarySpot {
  time?: string;
  location: string;
  description: string;
  category: 'food' | 'view' | 'shopping' | 'transport';
}

export interface DayPlan {
  title: string;
  spots: ItinerarySpot[];
}

export interface TabConfig {
  label: string;
  color: string;
  tint: string;
  accent: string;
}

export type TabType = 'prep' | 'day1' | 'day2' | 'day3' | 'day4' | 'day5' | 'day6' | 'day7';
