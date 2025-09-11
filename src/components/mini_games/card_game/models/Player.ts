import { Card } from "./Card";
import { Buff } from "./Buff";

// 玩家接口
export interface Player {
    id: string;
    name: string;
    hp: number;          // 当前血量
    maxHp: number;       // 最大血量
    actionPoints: number; // 行动值
    maxActionPoints: number; // 最大行动值
    deck: Card[];        // 卡组
    hand: Card[];        // 手牌
    discardPile: Card[]; // 弃牌堆
    buffs: Buff[];       // 玩家身上的buff效果
}