import { Player } from "./Player";
import { Card } from "./Card";

// 游戏状态
export interface CardGameState {
    player: Player;
    opponent: Player;
    currentPlayer: 'player' | 'opponent'; // 当前行动玩家
    gamePhase: 'draw' | 'main' | 'battle' | 'end' | 'gameover'; // 游戏阶段
    turn: number;        // 回合数
    selectedCard: Card | null; // 选中的卡牌
    message: string;     // 游戏消息
    playerWon: boolean | null; // 玩家是否获胜
    // 添加记录上一张使用卡牌的字段
    lastPlayedCard: Card | null; // 上一张使用的卡牌
}