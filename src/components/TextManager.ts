/**
 * 文本管理器组件
 * 负责处理游戏中文本和名称的显示
 */
export class TextManager {
    private nameElement: HTMLElement | null;
    private textElement: HTMLElement | null;
    private lastRecordedEntries: Array<{ name: string; text: string }> = [];
    private currentArchiveId: string = 'default';

    constructor() {
        this.nameElement = document.getElementById("name");
        this.textElement = document.getElementById("texts");
        // 初始化时获取当前存档ID
        this.currentArchiveId = this.getCurrentArchiveId();
    }

    /**
     * 设置当前存档ID
     * @param archiveId 存档ID
     */
    public setCurrentArchiveId(archiveId: string): void {
        this.currentArchiveId = archiveId;
    }

    /**
     * 获取当前存档ID
     */
    private getCurrentArchiveId(): string {
        // 从URL参数获取存档ID
        const urlParams = new URLSearchParams(window.location.search);
        let archiveId = urlParams.get('archiveId');
        
        // 如果URL中没有存档ID，则尝试从localStorage获取
        if (!archiveId) {
            archiveId = localStorage.getItem('currentArchiveId') || 'default_' + Date.now();
        }
        
        return archiveId;
    }

    /**
     * 获取当前存档的文本历史记录键名
     */
    private getTextHistoryKey(): string {
        return `gameTextHistory_${this.currentArchiveId}`;
    }

    /**
     * 更新显示的文本和名称
     * @param element 包含文本和名称信息的场景元素
     */
    public updateText(element: { name?: string | null, text: string }): void {
        if (this.nameElement && this.textElement) {
            if (element.name && element.name !== "旁白") {
                this.nameElement.innerHTML = element.name;
            } else {
                this.nameElement.innerHTML = "";
            }
            this.textElement.innerHTML = element.text;
            
            // 记录文本历史
            this.recordTextHistory({
                name: element.name || "旁白",
                text: element.text
            });
        }
    }
    
    /**
     * 更新显示的文本和名称，但不记录到历史中
     * @param element 包含文本和名称信息的场景元素
     */
    public updateTextWithoutRecording(element: { name?: string | null, text: string }): void {
        if (this.nameElement && this.textElement) {
            if (element.name && element.name !== "旁白") {
                this.nameElement.innerHTML = element.name;
            } else {
                this.nameElement.innerHTML = "";
            }
            this.textElement.innerHTML = element.text;
        }
    }
    
    /**
     * 记录文本历史到localStorage
     * @param entry 文本条目
     */
    private recordTextHistory(entry: { name: string, text: string }): void {
        try {
            // 检查最近的几条记录中是否已存在相同条目
            const isDuplicate = this.lastRecordedEntries.some(
                recorded => recorded.name === entry.name && recorded.text === entry.text
            );
            
            if (isDuplicate) {
                return; // 如果最近记录中已存在相同条目，则不重复记录
            }
            
            // 添加到最近记录列表
            this.lastRecordedEntries.push(entry);
            
            // 保持最近记录列表不超过5条
            if (this.lastRecordedEntries.length > 5) {
                this.lastRecordedEntries.shift();
            }
            
            // 从localStorage获取当前存档的文本历史记录
            let history: Array<{name: string, text: string}> = [];
            const historyStr = localStorage.getItem(this.getTextHistoryKey());
            if (historyStr) {
                history = JSON.parse(historyStr);
            }
            
            // 添加新条目
            history.push(entry);
            
            // 限制历史记录数量，只保留最近的500条
            if (history.length > 500) {
                history = history.slice(-500);
            }
            
            // 保存到localStorage，使用特定存档的键名
            localStorage.setItem(this.getTextHistoryKey(), JSON.stringify(history));
        } catch (e) {
            console.error('记录文本历史失败:', e);
        }
    }
    
    /**
     * 清除最后记录的条目，用于选项场景
     */
    public clearLastRecordedEntries(): void {
        this.lastRecordedEntries = [];
    }
    
    /**
     * 获取当前存档的文本历史记录
     */
    public getTextHistory(): Array<{name: string, text: string}> {
        try {
            const historyStr = localStorage.getItem(this.getTextHistoryKey());
            if (historyStr) {
                return JSON.parse(historyStr);
            }
        } catch (e) {
            console.error('获取文本历史记录失败:', e);
        }
        return [];
    }
    
    /**
     * 清除当前存档的文本历史记录
     */
    public clearTextHistory(): void {
        try {
            localStorage.removeItem(this.getTextHistoryKey());
            this.lastRecordedEntries = [];
        } catch (e) {
            console.error('清除文本历史记录失败:', e);
        }
    }
}