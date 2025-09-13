// 卡牌收集页面相关的类型定义

// 定义卡牌稀有度类型
export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

// 定义卡牌类型
export type CardType = 'attack' | 'defense' | 'heal' | 'special';

// 定义筛选器接口
export interface CardFilter {
    search: string;
    rarity: string;
    type: string;
}

// 定义卡牌统计接口
export interface CardStats {
    totalCards: number;
    collectedCards: number;
    collectionRate: number;
}

// 定义稀有度映射接口
export interface RarityMap {
    [key: string]: CardRarity;
}

// 定义类型映射接口
export interface TypeMap {
    [key: string]: CardType;
}

// 定义卡牌显示选项接口
export interface CardDisplayOptions {
    showCount: boolean;
    showRarity: boolean;
    showType: boolean;
    showDescription: boolean;
}

// 定义搜索选项接口
export interface SearchOptions {
    caseSensitive: boolean;
    exactMatch: boolean;
    searchInDescription: boolean;
}

// 定义排序选项接口
export interface SortOptions {
    field: 'name' | 'rarity' | 'type' | 'priority';
    direction: 'asc' | 'desc';
}
