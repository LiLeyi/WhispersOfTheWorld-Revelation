import { MiniGame } from './MiniGame';
import { JumpingGame } from './mini_games/jumping_game/JumpingGame';
import { CardGame } from './mini_games/card_game/CardGame';

// 定义游戏信息接口
interface GameInfo {
    clas: new (onComplete: (gameData: any) => void, config?: any, gameEvents?: Array<any>) => MiniGame;
    template: string;
}

/**
 * 小游戏工厂类，用于根据游戏ID创建对应的小游戏实例
 */
export class MiniGameFactory {
    // 游戏信息映射
    private static readonly gameMap: Record<string, GameInfo> = {
        'jumping_game': {
            clas: JumpingGame,
            template: JumpingGame.HTML_TEMPLATE
        },
        'card_game': {
            clas: CardGame,
            template: CardGame.HTML_TEMPLATE
        }
    };

    /**
     * 根据游戏ID创建小游戏实例
     * @param gameId 游戏ID
     * @param onComplete 游戏完成回调函数
     * @param config 游戏配置
     * @returns 小游戏实例
     */
    static createGame(gameId: string, onComplete: (gameData: any) => void, config?: any, events?: any): MiniGame | null {
        const gameInfo = this.gameMap[gameId];
        if (gameInfo) {
            return new gameInfo.clas(onComplete, config, events);
        }
        
        console.warn(`未知的游戏ID: ${gameId}`);
        return null;
    }

    /**
     * 根据游戏ID获取游戏的HTML模板
     * @param gameId 游戏ID
     * @returns 游戏的HTML模板字符串
     */
    static getGameTemplate(gameId: string): string {
        const gameInfo = this.gameMap[gameId];
        if (gameInfo) {
            return gameInfo.template;
        }
        
        console.warn(`未知的游戏ID: ${gameId}`);
        return '<div>未知游戏</div>';
    }
}