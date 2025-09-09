// 卡牌游戏数据接口
export interface CardGameEventData {
    player: {
        hp: number;
        maxHp: number;
        lastPlayedCard?: string | null;
    };
    opponent: {
        hp: number;
        maxHp: number;
        lastPlayedCard?: string | null;
    };
    turn: number;
    totalTurns: number;
}