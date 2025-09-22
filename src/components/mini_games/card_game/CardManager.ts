import { ArchiveManager } from "../../ArchiveManager";
import { CARD_TEMPLATES } from ".";

// 玩家卡组数据结构
export interface PlayerDeck {
    cards: Record<string, number>; // 卡牌ID到数量的映射
}

// 默认卡组配置
export const DEFAULT_PLAYER_DECK: Record<string, number> = {
    "punch": 1,      // 拳击：1攻0行动
    "parry": 1,      // 招架：1攻 1行动 对方减少1行动
    "hook": 1,       // 勾拳：3攻2行动
    "dodge": 1,      // 闪避：2防1行动
    "combo": 1,      // 连击：下张牌伤害*2 2行动
    "see_through": 1 // 识破：5防 3行动
};

// 玩家属性配置
export interface PlayerStats {
    maxHp: number;          // 最大生命值
    drawCount: number;      // 每回合抽牌数
    initialHandSize: number; // 初始手牌数
    actions: number;        // 行动值
}

export class CardManager {
    private static instance: CardManager;
    private archiveManager: ArchiveManager;
    private readonly DECK_OBJECT_KEY = "card_game_player_deck";
    private readonly STATS_OBJECT_KEY = "card_game_player_stats";

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

    /**
     * 初始化玩家属性（在创建新存档时调用）
     * @param stats 玩家属性
     */
    public initializePlayerStats(stats: PlayerStats): void {
        console.log("[CardManager] 初始化玩家属性", stats);
        this.savePlayerStats(stats);
    }

    /**
     * 获取玩家属性
     * @returns 玩家属性
     */
    public getPlayerStats(): PlayerStats | null {
        const statsData = this.archiveManager.loadObject(this.STATS_OBJECT_KEY, null);
        if (statsData) {
            console.log("[CardManager] 从存档加载玩家属性:", statsData);
            return statsData as PlayerStats;
        }
        
        console.log("[CardManager] 无玩家属性数据");
        return null;
    }

    /**
     * 保存玩家属性到存档
     * @param stats 玩家属性
     */
    public savePlayerStats(stats: PlayerStats): void {
        console.log("[CardManager] 保存玩家属性到存档:", stats);
        this.archiveManager.saveObject(this.STATS_OBJECT_KEY, stats);
    }

    /**
     * 更新玩家最大生命值
     * @param maxHp 最大生命值
     */
    public updatePlayerMaxHp(maxHp: number): void {
        const stats = this.getPlayerStats() || {
            maxHp: 20,        // 默认最大生命值
            drawCount: 5,     // 默认抽牌数
            initialHandSize: 5, // 默认初始手牌数
            actions: 3        // 默认行动值
        };
        stats.maxHp = maxHp;
        this.savePlayerStats(stats);
        console.log(`[CardManager] 更新玩家最大生命值为: ${maxHp}`);
    }

    /**
     * 更新玩家每回合抽牌数
     * @param drawCount 抽牌数
     */
    public updatePlayerDrawCount(drawCount: number): void {
        const stats = this.getPlayerStats() || {
            maxHp: 20,
            drawCount: 5,
            initialHandSize: 5,
            actions: 3
        };
        stats.drawCount = drawCount;
        this.savePlayerStats(stats);
        console.log(`[CardManager] 更新玩家抽牌数为: ${drawCount}`);
    }

    /**
     * 更新玩家初始手牌数
     * @param initialHandSize 初始手牌数
     */
    public updatePlayerInitialHandSize(initialHandSize: number): void {
        const stats = this.getPlayerStats() || {
            maxHp: 20,
            drawCount: 5,
            initialHandSize: 5,
            actions: 3
        };
        stats.initialHandSize = initialHandSize;
        this.savePlayerStats(stats);
        console.log(`[CardManager] 更新玩家初始手牌数为: ${initialHandSize}`);
    }

    /**
     * 更新玩家行动值
     * @param actions 行动值
     */
    public updatePlayerActions(actions: number): void {
        const stats = this.getPlayerStats() || {
            maxHp: 20,
            drawCount: 5,
            initialHandSize: 5,
            actions: 3
        };
        stats.actions = actions;
        this.savePlayerStats(stats);
        console.log(`[CardManager] 更新玩家行动值为: ${actions}`);
    }

    /**
     * 获取玩家最大生命值的函数形式
     * @returns 玩家最大生命值
     */
    public getPlayerMaxHp(): number {
        const stats = this.getPlayerStats();
        return stats ? stats.maxHp : 20; // 默认值为20
    }

    /**
     * 获取玩家抽牌数的函数形式
     * @returns 玩家每回合抽牌数
     */
    public getPlayerDrawCount(): number {
        const stats = this.getPlayerStats();
        return stats ? stats.drawCount : 5; // 默认值为5
    }

    /**
     * 获取玩家初始手牌数的函数形式
     * @returns 玩家初始手牌数
     */
    public getPlayerInitialHandSize(): number {
        const stats = this.getPlayerStats();
        return stats ? stats.initialHandSize : 5; // 默认值为5
    }

    /**
     * 获取玩家行动值的函数形式
     * @returns 玩家行动值
     */
    public getPlayerActions(): number {
        const stats = this.getPlayerStats();
        return stats ? stats.actions : 3; // 默认值为3
    }
}