import { JumpingGame } from "../pages/mini_games/jumping_game/JumpingGame";

// 小游戏管理器
class MiniGameManager {
    private static instance: MiniGameManager;
    
    private gameContainer: HTMLElement;
    private gameInstance: JumpingGame | null = null;
    
    private constructor() {
        this.gameContainer = document.createElement('div');
        this.gameContainer.id = 'mini-game-container';
        document.body.appendChild(this.gameContainer);
    }
    
    public static getInstance(): MiniGameManager {
        if (!MiniGameManager.instance) {
            MiniGameManager.instance = new MiniGameManager();
        }
        return MiniGameManager.instance;
    }
    
    // 启动小游戏
    public startGame(gameId: string, config: Record<string, any>, onComplete: (score: number) => void) {
        // 隐藏其他内容
        document.body.style.overflow = 'hidden';
        
        // 加载游戏资源
        switch (gameId) {
            case 'jumping_game':
                this.loadJumpingGame(config, onComplete);
                break;
            default:
                console.error(`未知的小游戏ID: ${gameId}`);
                onComplete(0); // 如果游戏不存在，立即调用回调
                break;
        }
    }
    
    // 加载跳一跳游戏
    private loadJumpingGame(config: Record<string, any>, onComplete: (score: number) => void) {
        // 清除之前的元素
        this.gameContainer.innerHTML = '';
        
        // 创建游戏元素
        const gameHtml = `
            <link rel="stylesheet" href="/src/pages/mini_games/jumping/JumpingGame.css">
            <div id="jumping-game-container">
                <canvas id="game-canvas"></canvas>
                <div id="game-ui">
                    <div id="score">分数: 0</div>
                    <div id="game-over" class="hidden">
                        <h2>游戏结束</h2>
                        <div id="final-score">最终得分: 0</div>
                        <button id="restart-button">重新开始</button>
                    </div>
                </div>
            </div>
        `;
        
        this.gameContainer.innerHTML = gameHtml;
        
        // 创建游戏实例
        const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;
        
        // 调整canvas大小
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // 创建游戏实例
        this.gameInstance = new JumpingGame((score) => {
            // 游戏结束后清理
            window.removeEventListener('resize', resizeCanvas);
            
            // 调用完成回调
            onComplete(score);
        });
    }
    
    // 重新开始当前游戏
    public restartCurrentGame() {
        if (this.gameInstance) {
            this.gameInstance.restart();
        }
    }
    
    // 返回到游戏前的界面
    public returnToPrevious() {
        // 隐藏游戏容器
        this.gameContainer.style.display = 'none';
        
        // 恢复页面滚动
        document.body.style.overflow = '';
    }
}

export { MiniGameManager };