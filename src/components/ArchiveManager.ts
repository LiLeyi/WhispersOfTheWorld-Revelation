/**
 * 存档管理器
 * 用于管理游戏中的物品、角色好感度等数据
 */
export class ArchiveManager {
    private static instance: ArchiveManager;
    private gameData: {
        items: Record<string, boolean>;
        characterAffection: Record<string, number>;
        flags: Record<string, any>;
    };

    private constructor() {
        this.gameData = {
            items: {},
            characterAffection: {},
            flags: {}
        };
        this.loadFromLocalStorage();
    }

    /**
     * 获取 ArchiveManager 的单例实例
     */
    public static getInstance(): ArchiveManager {
        if (!ArchiveManager.instance) {
            ArchiveManager.instance = new ArchiveManager();
        }
        return ArchiveManager.instance;
    }

    /**
     * 从 localStorage 加载数据
     */
    private loadFromLocalStorage(): void {
        try {
            const savedData = localStorage.getItem("gameArchiveData");
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.gameData = {
                    items: parsedData.items || {},
                    characterAffection: parsedData.characterAffection || {},
                    flags: parsedData.flags || {}
                };
            }
        } catch (e) {
            console.error("无法从 localStorage 加载存档数据:", e);
        }
    }

    /**
     * 保存数据到 localStorage
     */
    private saveToLocalStorage(): void {
        try {
            localStorage.setItem("gameArchiveData", JSON.stringify(this.gameData));
        } catch (e) {
            console.error("无法保存存档数据到 localStorage:", e);
        }
    }

    /**
     * 获取物品状态
     * @param itemName 物品名称
     * @returns 是否拥有该物品
     */
    public hasItem(itemName: string): boolean {
        return this.gameData.items[itemName] || false;
    }

    /**
     * 添加物品
     * @param itemName 物品名称
     */
    public addItem(itemName: string): void {
        this.gameData.items[itemName] = true;
        this.saveToLocalStorage();
    }

    /**
     * 移除物品
     * @param itemName 物品名称
     */
    public removeItem(itemName: string): void {
        delete this.gameData.items[itemName];
        this.saveToLocalStorage();
    }

    /**
     * 获取角色好感度
     * @param characterName 角色名称
     * @returns 好感度值
     */
    public getAffection(characterName: string): number {
        return this.gameData.characterAffection[characterName] || 0;
    }

    /**
     * 设置角色好感度
     * @param characterName 角色名称
     * @param value 好感度值
     */
    public setAffection(characterName: string, value: number): void {
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
        this.setAffection(characterName, current + value);
    }

    /**
     * 减少角色好感度
     * @param characterName 角色名称
     * @param value 减少的好感度值
     */
    public decreaseAffection(characterName: string, value: number): void {
        const current = this.getAffection(characterName);
        this.setAffection(characterName, current - value);
    }

    /**
     * 设置标志位
     * @param flagName 标志位名称
     * @param value 标志位值
     */
    public setFlag(flagName: string, value: any): void {
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
        return this.gameData.flags[flagName] !== undefined ? 
            this.gameData.flags[flagName] : defaultValue;
    }

    /**
     * 获取所有存档数据
     * @returns 存档数据
     */
    public getAllData(): any {
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
        this.gameData = {
            items: {},
            characterAffection: {},
            flags: {}
        };
        this.saveToLocalStorage();
    }
}