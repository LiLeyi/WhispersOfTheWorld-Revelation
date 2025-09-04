import { ArchiveManager } from "../../ArchiveManager";
import { CARD_TEMPLATES } from ".";

// 玩家卡组数据结构
export interface PlayerDeck {
    cards: Record<string, number>; // 卡牌ID到数量的映射
}

// 默认卡组配置
export const DEFAULT_PLAYER_DECK: Record<string, number> = {
    // 根据用户提供的默认牌组配置
    'straight_punch_1': 2,  // 直拳I x2
    'straight_punch_2': 1,  // 直拳II x1
    'kick_1': 2,            // 踢击I x2
    'block_1': 2,           // 格挡I x2
    'excite_1': 2           // 兴奋I x2
};

export class CardManager {
    private static instance: CardManager;
    private archiveManager: ArchiveManager;
    private readonly DECK_OBJECT_KEY = "card_game_player_deck";

    private constructor() {
        this.archiveManager = ArchiveManager.getInstance();
    }

    /**
     * 获取 CardManager 的单例实例
     */
    public static getInstance(): CardManager {
        if (!CardManager.instance) {
            CardManager.instance = new CardManager();
        }
        return CardManager.instance;
    }

    /**
     * 初始化玩家卡组（在创建新存档时调用）
     */
    public initializePlayerDeck(): void {
        console.log("[CardManager] 初始化玩家卡组");
        this.savePlayerDeck(DEFAULT_PLAYER_DECK);
    }

    /**
     * 获取玩家当前卡组
     * @returns 玩家卡组
     */
    public getPlayerDeck(): Record<string, number> {
        const deckData = this.archiveManager.loadObject(this.DECK_OBJECT_KEY, null);
        if (deckData) {
            console.log("[CardManager] 从存档加载玩家卡组:", deckData);
            return deckData;
        }
        
        // 如果存档中没有卡组数据，则使用默认卡组
        console.log("[CardManager] 使用默认玩家卡组");
        return { ...DEFAULT_PLAYER_DECK };
    }

    /**
     * 保存玩家卡组到存档
     * @param deck 玩家卡组
     */
    public savePlayerDeck(deck: Record<string, number>): void {
        console.log("[CardManager] 保存玩家卡组到存档:", deck);
        this.archiveManager.saveObject(this.DECK_OBJECT_KEY, deck);
    }

    /**
     * 向玩家卡组添加卡牌
     * @param cardId 卡牌ID
     * @param count 数量
     */
    public addCardToDeck(cardId: string, count: number = 1): void {
        if (!CARD_TEMPLATES[cardId]) {
            console.warn(`[CardManager] 尝试添加不存在的卡牌: ${cardId}`);
            return;
        }

        const currentDeck = this.getPlayerDeck();
        currentDeck[cardId] = (currentDeck[cardId] || 0) + count;
        this.savePlayerDeck(currentDeck);
        console.log(`[CardManager] 向卡组添加卡牌 ${cardId} x${count}`);
    }

    /**
     * 从玩家卡组移除卡牌
     * @param cardId 卡牌ID
     * @param count 数量
     */
    public removeCardFromDeck(cardId: string, count: number = 1): boolean {
        const currentDeck = this.getPlayerDeck();
        if (!currentDeck[cardId] || currentDeck[cardId] < count) {
            console.warn(`[CardManager] 尝试移除不存在或数量不足的卡牌: ${cardId}`);
            return false;
        }

        currentDeck[cardId] -= count;
        if (currentDeck[cardId] <= 0) {
            delete currentDeck[cardId];
        }
        
        this.savePlayerDeck(currentDeck);
        console.log(`[CardManager] 从卡组移除卡牌 ${cardId} x${count}`);
        return true;
    }

    /**
     * 检查卡组是否包含指定卡牌
     * @param cardId 卡牌ID
     * @param count 需要的数量
     * @returns 是否包含足够数量的指定卡牌
     */
    public hasCardInDeck(cardId: string, count: number = 1): boolean {
        const currentDeck = this.getPlayerDeck();
        return (currentDeck[cardId] || 0) >= count;
    }

    /**
     * 获取卡组中卡牌的总数量
     * @returns 卡牌总数量
     */
    public getTotalCardCount(): number {
        const currentDeck = this.getPlayerDeck();
        return Object.values(currentDeck).reduce((total, count) => total + count, 0);
    }

    /**
     * 获取卡组中特定卡牌的数量
     * @param cardId 卡牌ID
     * @returns 卡牌数量
     */
    public getCardCount(cardId: string): number {
        const currentDeck = this.getPlayerDeck();
        return currentDeck[cardId] || 0;
    }

    /**
     * 清空卡组
     */
    public clearDeck(): void {
        this.savePlayerDeck({});
        console.log("[CardManager] 清空玩家卡组");
    }
}