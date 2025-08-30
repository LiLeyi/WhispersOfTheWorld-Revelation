/**
 * 存档管理器
 * 用于管理游戏中的物品、角色好感度等数据
 */
export class ArchiveManager {
    private static instance: ArchiveManager;
    private static currentArchiveId: string = "default";
    private gameData: {
        items: Record<string, boolean>;
        characterAffection: Record<string, number>;
        flags: Record<string, any>;
    };
    private archiveId: string;

    private constructor() {
        this.archiveId = ArchiveManager.currentArchiveId;
        this.gameData = {
            items: {},
            characterAffection: {},
            flags: {}
        };
        console.log(`[ArchiveManager] 创建新实例，存档ID: ${this.archiveId}`);
        this.loadFromLocalStorage();
    }

    /**
     * 获取 ArchiveManager 的单例实例
     */
    public static getInstance(): ArchiveManager {
        // 检查当前实例是否与当前存档ID匹配
        if (!ArchiveManager.instance || ArchiveManager.instance.archiveId !== ArchiveManager.currentArchiveId) {
            ArchiveManager.instance = new ArchiveManager();
        }
        console.log(`[ArchiveManager] 获取实例，存档ID: ${ArchiveManager.instance.archiveId}`);
        return ArchiveManager.instance;
    }

    /**
     * 设置当前存档ID并刷新实例
     * @param archiveId 存档ID
     */
    public static setCurrentArchiveId(archiveId: string): void {
        console.log(`[ArchiveManager] 设置存档ID从 ${ArchiveManager.currentArchiveId} 到 ${archiveId}`);
        ArchiveManager.currentArchiveId = archiveId;
        // 不再立即刷新实例，而是在下次获取实例时按需刷新
    }

    /**
     * 获取当前存档ID
     */
    public static getCurrentArchiveId(): string {
        console.log(`[ArchiveManager] 获取当前存档ID: ${ArchiveManager.currentArchiveId}`);
        return ArchiveManager.currentArchiveId;
    }

    /**
     * 从 localStorage 加载数据
     */
    private loadFromLocalStorage(): void {
        try {
            const storageKey = `gameArchiveData_${this.archiveId}`;
            console.log(`[ArchiveManager] 尝试从localStorage加载数据，键: ${storageKey}`);
            const savedData = localStorage.getItem(storageKey);
            if (savedData) {
                console.log(`[ArchiveManager] 找到存档数据: ${savedData}`);
                const parsedData = JSON.parse(savedData);
                this.gameData = {
                    items: parsedData.items || {},
                    characterAffection: parsedData.characterAffection || {},
                    flags: parsedData.flags || {}
                };
                console.log(`[ArchiveManager] 加载的物品:`, this.gameData.items);
            } else {
                console.log(`[ArchiveManager] 未找到存档数据`);
            }
        } catch (e) {
            console.error("[ArchiveManager] 无法从 localStorage 加载存档数据:", e);
        }
    }

    /**
     * 保存数据到 localStorage
     */
    private saveToLocalStorage(): void {
        try {
            const storageKey = `gameArchiveData_${this.archiveId}`;
            console.log(`[ArchiveManager] 保存数据到localStorage，键: ${storageKey}`);
            localStorage.setItem(storageKey, JSON.stringify(this.gameData));
            console.log(`[ArchiveManager] 保存的物品:`, this.gameData.items);
        } catch (e) {
            console.error("[ArchiveManager] 无法保存存档数据到 localStorage:", e);
        }
    }

    /**
     * 获取物品状态
     * @param itemName 物品名称
     * @returns 是否拥有该物品
     */
    public hasItem(itemName: string): boolean {
        const hasItem = this.gameData.items[itemName] || false;
        console.log(`[ArchiveManager] 检查物品 ${itemName}: ${hasItem}`);
        return hasItem;
    }

    /**
     * 添加物品
     * @param itemName 物品名称
     */
    public addItem(itemName: string): void {
        console.log(`[ArchiveManager] 添加物品: ${itemName}`);
        this.gameData.items[itemName] = true;
        this.saveToLocalStorage();
    }

    /**
     * 移除物品
     * @param itemName 物品名称
     */
    public removeItem(itemName: string): void {
        console.log(`[ArchiveManager] 移除物品: ${itemName}`);
        delete this.gameData.items[itemName];
        this.saveToLocalStorage();
    }

    /**
     * 获取角色好感度
     * @param characterName 角色名称
     * @param defaultValue 默认值
     * @returns 好感度值
     */
    public getAffection(characterName: string, defaultValue: number = 0): number {
        const affection = this.gameData.characterAffection[characterName] !== undefined ? 
            this.gameData.characterAffection[characterName] : defaultValue;
        console.log(`[ArchiveManager] 获取 ${characterName} 好感度: ${affection}`);
        return affection;
    }

    /**
     * 设置角色好感度
     * @param characterName 角色名称
     * @param value 好感度值
     */
    public setAffection(characterName: string, value: number): void {
        console.log(`[ArchiveManager] 设置 ${characterName} 好感度: ${value}`);
        this.gameData.characterAffection[characterName] = value;
        this.saveToLocalStorage();
    }

    /**
     * 增加角色好感度
     * @param characterName 角色名称
     * @param value 增加的好感度值
     */
    public increaseAffection(characterName: string, value: number): void {
        const current = this.getAffection(characterName);
        console.log(`[ArchiveManager] 增加 ${characterName} 好感度: ${current} + ${value}`);
        this.setAffection(characterName, current + value);
    }

    /**
     * 减少角色好感度
     * @param characterName 角色名称
     * @param value 减少的好感度值
     */
    public decreaseAffection(characterName: string, value: number): void {
        const current = this.getAffection(characterName);
        console.log(`[ArchiveManager] 减少 ${characterName} 好感度: ${current} - ${value}`);
        this.setAffection(characterName, current - value);
    }

    /**
     * 设置标志位
     * @param flagName 标志位名称
     * @param value 标志位值
     */
    public setFlag(flagName: string, value: any): void {
        console.log(`[ArchiveManager] 设置标志位 ${flagName}: ${value}`);
        this.gameData.flags[flagName] = value;
        this.saveToLocalStorage();
    }

    /**
     * 获取标志位
     * @param flagName 标志位名称
     * @param defaultValue 默认值
     * @returns 标志位值
     */
    public getFlag(flagName: string, defaultValue: any = null): any {
        const value = this.gameData.flags[flagName] !== undefined ? 
            this.gameData.flags[flagName] : defaultValue;
        console.log(`[ArchiveManager] 获取标志位 ${flagName}: ${value}`);
        return value;
    }

    /**
     * 获取所有存档数据
     * @returns 存档数据
     */
    public getAllData(): any {
        console.log(`[ArchiveManager] 获取所有存档数据`);
        return {
            items: { ...this.gameData.items },
            characterAffection: { ...this.gameData.characterAffection },
            flags: { ...this.gameData.flags }
        };
    }

    /**
     * 从外部数据恢复存档
     * @param data 存档数据
     */
    public restoreFromData(data: any): void {
        console.log(`[ArchiveManager] 从外部数据恢复存档:`, data);
        this.gameData = {
            items: data.items || {},
            characterAffection: data.characterAffection || {},
            flags: data.flags || {}
        };
        this.saveToLocalStorage();
    }

    /**
     * 清空所有数据
     */
    public clearAll(): void {
        console.log(`[ArchiveManager] 清空所有数据`);
        this.gameData = {
            items: {},
            characterAffection: {},
            flags: {}
        };
        this.saveToLocalStorage();
        
        // 同时清除当前存档的文本历史记录
        this.clearTextHistory();
    }
    
    /**
     * 清除当前存档的文本历史记录
     */
    private clearTextHistory(): void {
        try {
            const textHistoryKey = `gameTextHistory_${this.archiveId}`;
            console.log(`[ArchiveManager] 清除文本历史记录，键: ${textHistoryKey}`);
            localStorage.removeItem(textHistoryKey);
        } catch (e) {
            console.error("[ArchiveManager] 无法清除文本历史记录:", e);
        }
    }
    
    /**
     * 获取当前存档ID
     */
    public getArchiveId(): string {
        console.log(`[ArchiveManager] 获取实例存档ID: ${this.archiveId}`);
        return this.archiveId;
    }
}