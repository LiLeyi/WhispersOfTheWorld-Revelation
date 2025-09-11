// 卡牌类型枚举
export enum CardType {
    ATTACK = "attack",
    DEFENSE = "defense",
    SPECIAL = "special"
}

// 卡牌效果接口
export interface CardEffect {
    id: string;              // 效果的id
    duration?: number;       // 持续触发回合数
    target?: 'self' | 'other' | 'both';
}

// 卡牌接口（统一了Card和CardData）
export interface Card {
    id: string;
    name: string;            // 名字，显示在卡面的标题位置
    description: string;     // 描述，显示在卡面上
    priority: number;        // 电脑出牌的优先级，越高电脑越优先出
    effect: CardEffect[];
    cost?: {
        action?: number;
        health?: number;
    }
    // 保留type和power以保持与现有代码的兼容性
    type?: CardType;
    power?: number;
}