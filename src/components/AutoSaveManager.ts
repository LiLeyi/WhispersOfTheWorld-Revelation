/**
 * 自动存档管理器
 * 用于在关键节点自动保存游戏进度
 */
export class AutoSaveManager {
    private static instance: AutoSaveManager;
    private static readonly MAX_AUTO_SLOTS = 6;
    private static readonly AUTO_SAVE_KEY = 'autoSaveSlots';

    private constructor() {}

    /**
     * 获取 AutoSaveManager 的单例实例
     */
    public static getInstance(): AutoSaveManager {
        if (!AutoSaveManager.instance) {
            AutoSaveManager.instance = new AutoSaveManager();
        }
        return AutoSaveManager.instance;
    }

  /**
 * 创建自动存档
 * @param sceneId 当前场景ID
 * @param nodeIndex 当前节点索引
 * @param description 存档描述
 */
public createAutoSave(sceneId: string, nodeIndex: number, description: string): void {
    try {
        // 获取现有的自动存档槽位
        let autoSaveSlots = this.getAutoSaveSlots();
        
        // 创建新的存档数据
        const newSave = {
            id: Date.now().toString(),
            timestamp: new Date().getTime(),
            sceneId: sceneId,
            nodeIndex: nodeIndex,
            description: description,
            gameData: this.captureGameData()
        };

        console.log(`[AutoSaveManager] 准备创建自动存档:`, newSave);

        // 检查是否已存在相同场景和节点的存档
        const existingIndex = autoSaveSlots.findIndex((slot: any) => 
            slot.sceneId === sceneId && slot.nodeIndex === nodeIndex
        );

        if (existingIndex !== -1) {
            // 如果已存在相同节点的存档，替换它
            autoSaveSlots[existingIndex] = newSave;
            console.log(`[AutoSaveManager] 替换已存在的自动存档: ${description}`);
        } else {
            // 如果不存在，添加到开头
            autoSaveSlots.unshift(newSave);
            console.log(`[AutoSaveManager] 添加新的自动存档: ${description}`);
        }

        // 如果超过最大槽位数，移除最旧的存档（但保留最新的）
        if (autoSaveSlots.length > AutoSaveManager.MAX_AUTO_SLOTS) {
            autoSaveSlots = autoSaveSlots.slice(0, AutoSaveManager.MAX_AUTO_SLOTS);
        }

        // 保存更新后的存档槽位
        localStorage.setItem(AutoSaveManager.AUTO_SAVE_KEY, JSON.stringify(autoSaveSlots));
        
        console.log(`[AutoSaveManager] 自动存档已创建: ${description}`);
    } catch (e) {
        console.error("[AutoSaveManager] 创建自动存档时出错:", e);
    }
}
   /**
     * 恢复自动存档
     * @param saveId 要恢复的存档ID
     * @returns 是否成功恢复
     */
    public restoreAutoSave(saveId: string): boolean {
        try {
            // 获取所有自动存档槽位
            const autoSaveSlots = this.getAutoSaveSlots();
            
            // 查找指定ID的存档
            const targetSave = autoSaveSlots.find((slot: any) => slot.id === saveId);
            
            if (!targetSave) {
                console.error(`[AutoSaveManager] 未找到ID为 ${saveId} 的自动存档`);
                return false;
            }
            
            // 恢复游戏数据
            if (targetSave.gameData) {
                // 恢复ArchiveManager数据
                if (targetSave.gameData.archiveData) {
                    const archiveManager = (window as any).archiveManagerInstance;
                    if (archiveManager && typeof archiveManager.restoreFromData === 'function') {
                        archiveManager.restoreFromData(targetSave.gameData.archiveData);
                    }
                }
                
                // 恢复场景和节点信息到localStorage，供游戏场景页面读取
                localStorage.setItem('restoreSceneId', targetSave.sceneId || '');
                localStorage.setItem('restoreNodeIndex', String(targetSave.nodeIndex || 0));
                
                // 恢复背景信息
                if (targetSave.gameData.background) {
                    localStorage.setItem('MSYbackgroundIMG', targetSave.gameData.background);
                }
                
                // 恢复文本历史记录
                if (targetSave.gameData.textHistory) {
                    const textHistoryKey = `gameTextHistory_${localStorage.getItem('currentArchiveId') || 'default'}`;
                    localStorage.setItem(textHistoryKey, targetSave.gameData.textHistory);
                }
            }
            
            console.log(`[AutoSaveManager] 成功恢复自动存档: ${targetSave.description}`);
            return true;
        } catch (e) {
            console.error("[AutoSaveManager] 恢复自动存档时出错:", e);
            return false;
        }
    }

    /**
     * 获取所有自动存档槽位
     */
    public getAutoSaveSlots(): any[] {
        try {
            const savedData = localStorage.getItem(AutoSaveManager.AUTO_SAVE_KEY);
            if (savedData) {
                return JSON.parse(savedData);
            }
        } catch (e) {
            console.error("[AutoSaveManager] 读取自动存档时出错:", e);
        }
        return [];
    }

  /**
 * 捕获当前游戏数据用于存档
 */
private captureGameData(): any {
    try {
        // 从 ArchiveManager 获取当前游戏数据
        const archiveManagerData = this.getArchiveManagerData();
        
        // 获取当前场景和节点信息
        const currentSceneId = localStorage.getItem('currentSceneId') || '';
        const currentClickCount = parseInt(localStorage.getItem('nowclick') || '0');
        
        // 获取背景信息 - 优先从previousElements获取当前节点背景
        let background = localStorage.getItem('MSYbackgroundIMG') || '';
        
        // 获取文本历史记录
        const textHistoryKey = `gameTextHistory_${localStorage.getItem('currentArchiveId') || 'default'}`;
        const textHistory = localStorage.getItem(textHistoryKey) || '[]';
        
        return {
            archiveData: archiveManagerData,
            sceneId: currentSceneId,
            clickCount: currentClickCount,
            background: background,
            textHistory: textHistory
        };
    } catch (e) {
        console.error("[AutoSaveManager] 捕获游戏数据时出错:", e);
        return {};
    }
}

    /**
     * 从 ArchiveManager 获取数据
     */
    private getArchiveManagerData(): any {
        try {
            // 动态导入 ArchiveManager
            const archiveManager = (window as any).archiveManagerInstance;
            if (archiveManager && typeof archiveManager.getAllData === 'function') {
                return archiveManager.getAllData();
            }
        } catch (e) {
            console.error("[AutoSaveManager] 获取 ArchiveManager 数据时出错:", e);
        }
        return {};
    }

    /**
     * 清空所有自动存档
     */
    public clearAllAutoSaves(): void {
        try {
            localStorage.removeItem(AutoSaveManager.AUTO_SAVE_KEY);
            console.log("[AutoSaveManager] 所有自动存档已清空");
        } catch (e) {
            console.error("[AutoSaveManager] 清空自动存档时出错:", e);
        }
    }
}