import { MiniGame } from './MiniGame';
import { JumpingGame } from '../pages/mini_games/jumping_game/JumpingGame';

/**
 * 小游戏工厂类，用于根据游戏ID创建对应的小游戏实例
 */
export class MiniGameFactory {
    /**
     * 根据游戏ID创建小游戏实例
     * @param gameId 游戏ID
     * @param onComplete 游戏完成回调函数
     * @param config 游戏配置
     * @returns 小游戏实例
     */
    static createGame(gameId: string, onComplete: (score: number) => void, config?: any): MiniGame | null {
        switch (gameId) {
            case 'jumping_game':
                return new JumpingGame(onComplete, config);
            default:
                console.warn(`未知的游戏ID: ${gameId}`);
                return null;
        }
    }
}