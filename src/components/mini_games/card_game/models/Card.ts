// 卡牌类型枚举
export enum CardType {
    ATTACK = "attack",
    DEFENSE = "defense",
    SPECIAL = "special"
}

// 卡牌效果类型定义
export interface CardEffect {
    type: 'damage' | 'heal' | 'buff' | 'debuff' | 'draw' | 'discard';
    target: 'self' | 'opponent' | 'both';
    value?: number;
    // 对于buff/debuff效果的额外参数
    buffType?: 'action_point_boost' | 'action_point_reduce' | 'defense_boost';
    duration?: number;
    description?: string;
}

// 卡牌数据接口
export interface CardData {
    id: string;
    name: string;
    description: string;
    type: 'attack' | 'defense' | 'special';
    cost: number;
    power: number;
    priority: number;
    effects: CardEffect[];
}

// 卡牌接口
export interface Card {
    id: string;
    name: string;
    description: string;
    type: CardType;
    cost: number;        // 行动值消耗
    power: number;       // 卡牌效果值（攻击/防御值）
    priority: number;    // 优先级，越高越优先使用
    effects: CardEffect[]; // 卡牌效果
}