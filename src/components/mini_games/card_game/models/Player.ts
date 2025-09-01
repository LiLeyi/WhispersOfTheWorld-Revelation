import { Card } from "./Card";
import { Buff } from "./Buff";

// 玩家接口
export interface Player {
    id: string;
    name: string;
    hp: number;          // 行动值
    maxHp: number;       // 最大血量
    actionPoints: number; // 行动值
    maxActionPoints: number; // 最大行动值
    deck: Card[];        // 卡组
    hand: Card[];        // 手牌
    defense: number;     // 防御点数（buff）
    buffs: Buff[];       // 玩家身上的buff效果
}