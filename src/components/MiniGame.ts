import { SceneManager } from './SceneManager';

/**
 * MiniGame基类，所有小游戏都应该继承此类
 */
abstract class MiniGame {
    public static readonly HTML_TEMPLATE: string; // 小游戏页面的HTML模板
    protected canvas: HTMLCanvasElement | null = null;
    protected ctx: CanvasRenderingContext2D | null = null;
    protected scoreElement: HTMLElement | null = null;
    protected gameOverElement: HTMLElement | null = null;
    protected isRunning: boolean = false;
    protected score: number = 0;
    protected events: Array<any> = []; // 存储游戏事件
    protected triggeredEvents: Set<string> = new Set(); // 记录已触发的事件ID
    protected audioManager: any; // 添加audioManager属性定义
    protected sceneManager: any; // 添加sceneManager属性定义
    
    constructor(protected onComplete: (gameData: any) => void) {}

    /**
     * 初始化游戏
     * 子类需要实现此方法以初始化游戏特定的设置
     */
    protected abstract init(): void;

    /**
     * 游戏主循环
     * 子类需要实现此方法以定义游戏逻辑
     */
    protected abstract gameLoop(): void;

    /**
     * 更新游戏状态
     * 子类需要实现此方法以更新游戏状态
     */
    protected abstract update(): void;

    /**
     * 绘制游戏画面
     * 子类需要实现此方法以绘制游戏画面
     */
    protected abstract draw(): void;

    /**
     * 重启游戏
     * 子类需要实现此方法以重启游戏
     */
    public abstract restart(): void;

    /**
     * 设置Canvas元素
     * @param canvasId Canvas元素的ID
     */
    protected setCanvas(canvasId: string): void {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
        }
    }

    /**
     * 设置UI元素
     * @param scoreElementId 分数显示元素ID
     * @param gameOverElementId 游戏结束显示元素ID
     */
    protected setUIElements(scoreElementId: string, gameOverElementId: string): void {
        this.scoreElement = document.getElementById(scoreElementId);
        this.gameOverElement = document.getElementById(gameOverElementId);
    }

    /**
     * 设置游戏事件
     * @param events 游戏事件数组
     */
    public setEvents(events: Array<any>): void {
        this.events = events || [];
    }

    /**
     * 触发游戏事件
     * @param eventType 事件类型（通用类型）
     * @param gameData 游戏数据
     */
    protected triggerEvents(eventType: string, gameData: any): void {
        console.log(`[MiniGame] 检查触发事件类型: ${eventType}`, gameData);
        
        // 用于跟踪本次触发过程中实际触发的事件数量
        let triggeredCount = 0;
        
        // 按顺序遍历所有事件
        this.events.forEach((event, index) => {
            console.log(`[MiniGame] 检查第 ${index + 1} 个事件:`, event);
            
            // 检查onlyOnce限制
            if (event.triggerConfig?.onlyOnce && this.triggeredEvents.has(event.id)) {
                console.log(`[MiniGame] 事件 ${event.id} 已触发过且onlyOnce=true，跳过`);
                return;
            }
            
            // 检查条件
            if (event.condition) {
                try {
                    const conditionResult = event.condition(gameData);
                    console.log(`[MiniGame] 事件 ${event.id} 条件检查结果: ${conditionResult}`);
                    if (!conditionResult) {
                        console.log(`[MiniGame] 事件 ${event.id} 条件不满足，跳过`);
                        return;
                    }
                } catch (error) {
                    console.error('[MiniGame] 事件条件检查出错:', error);
                    return;
                }
            } else {
                console.log(`[MiniGame] 事件 ${event.id} 没有条件函数`);
            }
            
            // 检查冲突限制
            if (event.triggerConfig?.conflict && triggeredCount > 0) {
                console.log(`[MiniGame] 事件 ${event.id} 由于冲突设置且已有 ${triggeredCount} 个事件触发，跳过`);
                return;
            }
            
            console.log(`[MiniGame] 触发事件: ${event.id}`);
            // 标记事件已触发（只有真正触发了事件才标记）
            if (event.triggerConfig?.onlyOnce) {
                this.triggeredEvents.add(event.id);
                console.log(`[MiniGame] 标记事件 ${event.id} 为已触发`);
            }
            
            // 增加已触发事件计数
            triggeredCount++;
            
            // 触发事件
            this.handleEvent(event);
        });
        
        console.log(`[MiniGame] 本次共触发 ${triggeredCount} 个事件`);
    }

    /**
     * 处理事件
     * @param event 事件对象
     */
    protected handleEvent(event: any): void {
        console.log('[CardGame] 处理事件:', event);

        // 创建场景管理器实例（如果还没有的话）
        if (!this.sceneManager) {
            // 尝试从全局获取场景管理器
            this.sceneManager = (window as any).sceneManagerInstance;
            console.log('[CardGame] 场景管理器实例:', this.sceneManager);
        }

        // 如果仍然无法获取场景管理器，尝试直接创建一个新的实例
        if (!this.sceneManager) {
            try {
                this.sceneManager = new SceneManager();
                console.log('[CardGame] 创建新的场景管理器实例:', this.sceneManager);
            } catch (e) {
                console.log('[CardGame] 无法创建场景管理器实例:', e);
            }
        }

        if (this.sceneManager) {
            // 使用场景管理器显示事件对话
            const elementsContainer = document.getElementById('card-game-container');
            if (elementsContainer) {
                console.log('[CardGame] 创建事件对话框');

                // 创建覆盖层以显示事件对话
                const overlay = document.createElement('div');
                overlay.id = 'minigame-event-overlay';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.zIndex = '2000';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                overlay.style.cursor = 'pointer';

                // 保存当前背景音乐
                const currentBgm = this.audioManager ? this.audioManager.getCurrentBgm() : "";

                // 创建场景元素容器
                const sceneElementsContainer = this.sceneManager.createSceneElementsContainer(
                    overlay,
                    event.elements
                );

                // 确保事件对话框不改变背景音乐
                if (this.audioManager && currentBgm) {
                    this.audioManager.updateBackgroundMusic(currentBgm);
                }

                console.log('[CardGame] 创建场景元素容器:', sceneElementsContainer);

                // 添加点击事件以关闭对话框
                const closeHandler = () => {
                    console.log('[CardGame] 关闭事件对话框');
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                    // 恢复背景音乐（如果需要）
                    if (this.audioManager && currentBgm) {
                        this.audioManager.updateBackgroundMusic(currentBgm);
                    }
                    // 移除事件监听器
                    overlay.removeEventListener('click', closeHandler);
                };

                overlay.addEventListener('click', closeHandler);
                elementsContainer.appendChild(overlay);
            } else {
                console.warn('[CardGame] 未找到card-game-container元素');
            }
        } else {
            console.warn('[CardGame] 场景管理器未找到，无法显示事件对话');
        }
    }

    /**
     * 开始游戏
     */
    public start(): void {
        this.isRunning = true;
        this.init();
        this.gameLoop();
    }

    /**
     * 结束游戏
     */
    protected endGame(): void {
        this.isRunning = false;
        if (this.gameOverElement) {
            this.gameOverElement.classList.remove('hidden');
        }
        this.onComplete(this.score);
    }

    /**
     * 更新分数显示
     */
    protected updateScoreDisplay(): void {
        if (this.scoreElement) {
            this.scoreElement.textContent = `分数: ${this.score}`;
        }
    }

    /**
     * 调整Canvas尺寸
     */
    protected resizeCanvas(): void {
        if (this.canvas) {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
        }
    }

    /**
     * 添加事件监听器
     * 子类需要实现此方法以添加游戏特定的事件监听器
     */
    protected abstract setupEventListeners(): void;
}

export { MiniGame };