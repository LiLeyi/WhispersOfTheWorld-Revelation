import { AchievementRegistry, Achievement } from './AchievementRegistry';

export class AchievementManager {
    private static instance: AchievementManager;
    private static currentUser: string = "";
    private achievements: Record<string, boolean>;
    private userId: string;

    private constructor() {
        this.userId = AchievementManager.currentUser;
        this.achievements = {};
        console.log(`[AchievementManager] 创建新实例，用户: ${this.userId}`);
        this.loadFromLocalStorage();
    }

    /**
     * 获取 AchievementManager 的单例实例
     */
    public static getInstance(): AchievementManager {
        // 如果当前用户为空，尝试从localStorage获取
        if (!AchievementManager.currentUser) {
            AchievementManager.currentUser = localStorage.getItem("currentUser") || "";
            console.log(`[AchievementManager] 自动初始化当前用户: ${AchievementManager.currentUser}`);
        }
        
        // 检查当前实例是否与当前用户匹配
        if (!AchievementManager.instance || AchievementManager.instance.userId !== AchievementManager.currentUser) {
            AchievementManager.instance = new AchievementManager();
        }
        console.log(`[AchievementManager] 获取实例，用户: ${AchievementManager.instance.userId}`);
        return AchievementManager.instance;
    }

    /**
     * 设置当前用户并刷新实例
     * @param userId 用户ID
     */
    public static setCurrentUser(userId: string): void {
        console.log(`[AchievementManager] 设置用户从 ${AchievementManager.currentUser} 到 ${userId}`);
        AchievementManager.currentUser = userId;
        // 不再立即刷新实例，而是在下次获取实例时按需刷新
    }

    /**
     * 获取当前用户
     */
    public static getCurrentUser(): string {
        console.log(`[AchievementManager] 获取当前用户: ${AchievementManager.currentUser}`);
        return AchievementManager.currentUser;
    }

    /**
     * 从 localStorage 加载数据
     */
    private loadFromLocalStorage(): void {
        try {
            if (!this.userId) {
                console.log("[AchievementManager] 未登录用户，使用默认成就数据");
                return;
            }
            
            const storageKey = `userAchievements_${this.userId}`;
            console.log(`[AchievementManager] 尝试从localStorage加载数据，键: ${storageKey}`);
            const savedData = localStorage.getItem(storageKey);
            if (savedData) {
                console.log(`[AchievementManager] 找到成就数据: ${savedData}`);
                const parsedData = JSON.parse(savedData);
                this.achievements = parsedData.achievements || {};
                console.log(`[AchievementManager] 加载的成就:`, this.achievements);
            } else {
                console.log(`[AchievementManager] 未找到成就数据`);
            }
        } catch (e) {
            console.error("[AchievementManager] 无法从 localStorage 加载成就数据:", e);
        }
    }

    /**
     * 保存数据到 localStorage
     */
    private saveToLocalStorage(): void {
        try {
            if (!this.userId) {
                console.log("[AchievementManager] 未登录用户，不保存成就数据");
                return;
            }
            
            const storageKey = `userAchievements_${this.userId}`;
            console.log(`[AchievementManager] 保存数据到localStorage，键: ${storageKey}`);
            localStorage.setItem(storageKey, JSON.stringify({
                achievements: this.achievements
            }));
            console.log(`[AchievementManager] 保存的成就:`, this.achievements);
        } catch (e) {
            console.error("[AchievementManager] 无法保存成就数据到 localStorage:", e);
        }
    }

    /**
     * 解锁成就
     * @param achievementId 成就ID
     */
    public unlockAchievement(achievementId: string): void {
        console.log(`[AchievementManager] 解锁成就: ${achievementId}`);
        this.achievements[achievementId] = true;
        this.saveToLocalStorage();
    }

    /**
     * 检查成就是否已解锁
     * @param achievementId 成就ID
     * @returns 是否已解锁该成就
     */
    public isUnlocked(achievementId: string): boolean {
        const unlocked = this.achievements[achievementId] || false;
        console.log(`[AchievementManager] 检查成就 ${achievementId} 是否解锁: ${unlocked}`);
        return unlocked;
    }

    /**
     * 获取所有成就状态
     * @returns 成就数据
     */
    public getAllAchievements(): Record<string, boolean> {
        console.log(`[AchievementManager] 获取所有成就数据`);
        return { ...this.achievements };
    }

    /**
     * 从外部数据恢复成就
     * @param data 成就数据
     */
    public restoreFromData(data: Record<string, boolean>): void {
        console.log(`[AchievementManager] 从外部数据恢复成就:`, data);
        this.achievements = { ...data };
        this.saveToLocalStorage();
    }

    /**
     * 清空所有成就数据
     */
    public clearAll(): void {
        console.log(`[AchievementManager] 清空所有成就数据`);
        this.achievements = {};
        this.saveToLocalStorage();
    }
    
    /**
     * 获取当前用户ID
     */
    public getUserId(): string {
        console.log(`[AchievementManager] 获取实例用户ID: ${this.userId}`);
        return this.userId;
    }

    /**
     * 获取成就的中英文名称
     * @param achievementId 成就ID
     * @returns 包含中英文名称和描述的对象
     */
    public getAchievementInfo(achievementId: string): { cn: string, en: string, description: string } | null {
        const achievement = AchievementRegistry.getAchievement(achievementId);
        return achievement ? { 
            cn: achievement.cnName, 
            en: achievement.enName,
            description: achievement.description
        } : null;
    }

    /**
     * 解锁成就并显示动画效果
     * @param achievementId 成就ID
     */
    public unlockAchievementWithAnimation(achievementId: string): void {
        // 如果成就已经解锁，则不重复解锁
        if (this.isUnlocked(achievementId)) {
            return;
        }

        // 解锁成就
        this.unlockAchievement(achievementId);

        // 获取成就信息
        const info = this.getAchievementInfo(achievementId);
        if (!info) {
            console.warn(`[AchievementManager] 未找到成就 ${achievementId} 的信息`);
            return;
        }

        // 显示解锁动画和弹窗
        this.showAchievementUnlockPopup(info);
    }

    /**
     * 显示成就解锁弹窗
     * @param info 成就的中英文名称和描述
     */
    private showAchievementUnlockPopup(info: { cn: string, en: string, description: string }): void {
        // 创建弹窗元素
        const popup = document.createElement('div');
        popup.className = 'achievement-unlock-popup menuwindow active';
        popup.innerHTML = `
            <h2 class="menutitle">成就解锁!</h2>
            <h3>${info.cn}</h3>
            <p class="achievement-en-name">${info.en}</p>
            <p class="achievement-description">${info.description}</p>
            <div class="menuitemright">
                <button class="continue-button" id="close-popup">继续</button>
            </div>
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .achievement-unlock-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2000;
                text-align: center;
            }
            
            .achievement-unlock-popup h3 {
                font-size: 24px;
                color: #FFD700;
                margin: 10px 0;
            }
            
            .achievement-unlock-popup .achievement-en-name {
                font-size: 18px;
                color: #FFF;
                margin: 5px 0;
                font-style: italic;
            }
            
            .achievement-unlock-popup .achievement-description {
                font-size: 16px;
                color: #CCC;
                margin: 10px 0;
                font-style: italic;
            }
            
            .continue-button {
                background: rgba(255, 215, 0, 0.2);
                color: #FFD700;
                border: 1px solid #FFD700;
                padding: 8px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            }
            
            .continue-button:hover {
                background: rgba(255, 215, 0, 0.4);
                transform: scale(1.05);
            }
        `;
        
        // 添加到页面
        document.head.appendChild(style);
        document.body.appendChild(popup);
        
        // 添加关闭事件
        const closeBtn = popup.querySelector('#close-popup');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(popup);
                document.head.removeChild(style);
            });
        }
        
        // 5秒后自动关闭
        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
                document.head.removeChild(style);
            }
        }, 5000);
    }
}