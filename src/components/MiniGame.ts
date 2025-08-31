/**
 * MiniGame基类，所有小游戏都应该继承此类
 */
abstract class MiniGame {
    protected canvas: HTMLCanvasElement | null = null;
    protected ctx: CanvasRenderingContext2D | null = null;
    protected scoreElement: HTMLElement | null = null;
    protected gameOverElement: HTMLElement | null = null;
    protected isRunning: boolean = false;
    protected score: number = 0;
    
    constructor(protected onComplete: (score: number) => void) {}

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