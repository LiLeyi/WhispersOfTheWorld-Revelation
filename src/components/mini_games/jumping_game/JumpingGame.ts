import { JumpingGameConfig } from "../../../types/MiniGameConfig";
import { MiniGame } from "../../MiniGame";

// 玩家类
class Player {
    public velocityY: number = 0;
    public velocityX: number = 0;
    public isOnPlatform: boolean = false;
    public width: number = 30;
    public height: number = 40;

    constructor(
        public x: number,
        public y: number,
        private color: string = '#FF0000'
    ) { }

    public update(gravity: number) {
        // 应用重力
        if (!this.isOnPlatform) {
            this.velocityY += gravity;
        }

        // 更新位置
        this.x += this.velocityX;
        this.y += this.velocityY;

        // 如果在平台上，停止水平移动
        if (this.isOnPlatform) {
            this.velocityX = 0;
            this.velocityY = 0;
        } else {
            // 在空中时添加少量空气阻力
            this.velocityX *= 0.99;
            // 不要对垂直速度应用阻力，否则会影响重力效果
        }
    }

    public jump(velocity: number, angle: number) {
        // 计算跳跃速度（基于角度和初速度）
        this.velocityX = Math.cos(angle) * velocity;
        this.velocityY = Math.sin(angle) * velocity;
        this.isOnPlatform = false;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // 绘制简单的眼睛
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(this.x + 20, this.y + 10, 5, 5);
    }
}

// 平台类
class Platform {
    private color: string = '#8B4513'; // 棕色
    public visited: boolean = false; // 是否已访问过

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number = 20
    ) { }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.visited ? '#A0522D' : this.color; // 访问过的平台颜色更深
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // 绘制平台顶部装饰
        ctx.fillStyle = '#654321';
        ctx.fillRect(this.x, this.y, this.width, 5);
    }
}

// 游戏状态接口
interface JumpingGameState {
    score: number;
    gameOver: boolean;
    platforms: Platform[];
    player: Player;
    isCharging: boolean;          // 是否正在蓄力
    chargePower: number;          // 蓄力值
    chargeTime: number;          // 蓄力时间
    cameraOffset: number;         // 摄像机偏移
    jumpCount: number;            // 跳跃次数
    aimAngle: number;             // 视线角度
    aimAngleDirection: number;    // 视线移动方向 (1向下, -1向上)
}

// 微信跳一跳小游戏核心逻辑
class JumpingGame extends MiniGame {
    static readonly HTML_TEMPLATE = `
                    <div id="jumping-game-container" style="width:100%;height:100%;position:relative;">
                    <canvas id="game-canvas" style="width:100%;height:100%;display:block;"></canvas>
                    <div id="game-ui" style="position:absolute;top:10px;left:10px;color:white;font-family:Arial,sans-serif;z-index:10;">
                        <div id="score" style="font-size:24px;margin-bottom:10px;background:rgba(0,0,0,0.5);padding:5px 10px;border-radius:5px;">分数: 0</div>
                        <div id="game-over" class="hidden" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);padding:20px;border-radius:10px;text-align:center;display:none;z-index:20;">
                            <h2>游戏结束</h2>
                            <div id="final-score" style="margin-bottom:10px;">最终得分: 0</div>
                            <button id="restart-button" style="padding:10px 20px;font-size:16px;border:none;border-radius:5px;background:#4CAF50;color:white;cursor:pointer;margin-top:10px;">重新开始</button>
                        </div>
                    </div>
                </div>
    `
    private finalScoreElement: HTMLElement | null = null;
    private restartButton: HTMLButtonElement | null = null;

    // 游戏配置
    private config: JumpingGameConfig;

    // 游戏状态
    private state: JumpingGameState;

    constructor(onComplete: (score: number) => void, private gameConfig?: JumpingGameConfig) {
        super(onComplete);
        console.log('初始化跳一跳小游戏，配置:', gameConfig);

        this.setCanvas('game-canvas');
        console.log('Canvas元素:', this.canvas);

        this.scoreElement = document.getElementById('score');
        this.gameOverElement = document.getElementById('game-over');

        console.log('UI元素:', {
            scoreElement: this.scoreElement,
            gameOverElement: this.gameOverElement
        });

        // 初始化配置 - 使用传入的配置或默认配置
        this.config = {
            gravity: gameConfig?.gravity !== undefined ? gameConfig.gravity : 0.4,
            maxJumpVelocity: gameConfig?.maxJumpVelocity !== undefined ? gameConfig.maxJumpVelocity : 15,
            platformHeight: gameConfig?.platformHeight !== undefined ? gameConfig.platformHeight : 20,
            initialPlatformWidth: gameConfig?.initialPlatformWidth !== undefined ? gameConfig.initialPlatformWidth : 80,
            minDistance: gameConfig?.minDistance !== undefined ? gameConfig.minDistance : 100,
            minPlatformWidth: gameConfig?.minPlatformWidth !== undefined ? gameConfig.minPlatformWidth : 200,
            maxPlatformWidth: gameConfig?.maxPlatformWidth !== undefined ? gameConfig.maxPlatformWidth : 400,
            platformCount: gameConfig?.platformCount !== undefined ? gameConfig.platformCount : 20,
            aimMinAngle: gameConfig?.aimMinAngle !== undefined ? gameConfig.aimMinAngle : -Math.PI / 2,
            aimMaxAngle: gameConfig?.aimMaxAngle !== undefined ? gameConfig.aimMaxAngle : Math.PI / 4,
            aimSpeed: gameConfig?.aimSpeed !== undefined ? Math.abs(gameConfig.aimSpeed) : 0.05,
            maxChargeTime: gameConfig?.maxChargeTime || 1800
        };

        // 确保aimMinAngle <= aimMaxAngle
        if (this.config.aimMinAngle! > this.config.aimMaxAngle!) {
            [this.config.aimMinAngle, this.config.aimMaxAngle] = [this.config.aimMaxAngle, this.config.aimMinAngle];
        }

        console.log('JumpingGame配置:', this.config);

        // 初始化游戏状态
        this.state = {
            score: 0,
            gameOver: false,
            platforms: [],
            player: new Player(100, 300),
            isCharging: false,
            chargePower: 0,
            chargeTime: 0,
            cameraOffset: 0,
            jumpCount: 0,
            aimAngle: gameConfig?.aimMinAngle !== undefined ? gameConfig.aimMinAngle : -Math.PI / 3,  // 使用配置的初始角度
            aimAngleDirection: 1
        };

        // 注意：不要在这里调用this.init()，应该由start()方法调用
    }

    protected init() {
        if (!this.canvas) {
            console.error('无法找到游戏canvas元素');
            return;
        }

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // 初始化平台
        this.initPlatforms();

        // 事件监听
        this.setupEventListeners();

        // 注意：不要在这里启动游戏循环，应该由start()方法处理
    }

    public start(): void {
        // 调用父类的start方法
        super.start();
        // 开始游戏循环
        requestAnimationFrame(() => this.gameLoop());
    }

    protected resizeCanvas() {
        if (this.canvas) {
            const oldWidth = this.canvas.width;
            const oldHeight = this.canvas.height;

            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;

            console.log(`Canvas尺寸调整: ${oldWidth}x${oldHeight} -> ${this.canvas.width}x${this.canvas.height}`);

            // 当窗口大小改变时，需要重新调整平台和玩家位置
            this.adjustPlatformsAndPlayerOnResize(oldHeight);
        } else {
            console.warn('Canvas元素不存在，无法调整尺寸');
        }
    }

    // 窗口大小调整时调整平台和玩家位置
    private adjustPlatformsAndPlayerOnResize(oldHeight: number) {
        if (!this.canvas) return;

        const newHeight = this.canvas.height;
        const heightDiff = newHeight - oldHeight;

        if (heightDiff !== 0) {
            // 调整所有平台的Y坐标
            for (const platform of this.state.platforms) {
                platform.y += heightDiff;
            }

            // 调整玩家Y坐标以匹配平台位置
            if (this.state.player.isOnPlatform && this.state.platforms.length > 0) {
                // 找到玩家当前所在的平台并相应调整玩家位置
                for (const platform of this.state.platforms) {
                    // 简化处理：假设玩家在第一个平台上
                    if (platform.y + heightDiff >= 0) {  // 确保平台在可见区域内
                        this.state.player.y += heightDiff;
                        break;
                    }
                }
            }
        }
    }

    private initPlatforms() {
        console.log('初始化平台，Canvas高度:', this.canvas?.height);

        if (!this.canvas) {
            console.error('Canvas元素不存在，无法初始化平台');
            return;
        }

        // 清空现有平台
        this.state.platforms = [];

        // 计算最大距离，基于最大跳跃速度和重力
        const maxDistance = this.calculateMaxJumpDistance();

        // 创建初始平台 - 固定距离底部100像素
        const platformY = this.canvas.height - 100;
        const firstPlatform = new Platform(50, platformY, this.config.initialPlatformWidth!, this.config.platformHeight);
        this.state.platforms.push(firstPlatform);
        console.log('创建初始平台:', firstPlatform);

        // 设置玩家初始位置在第一个平台上
        this.state.player.x = 50 + this.config.initialPlatformWidth! / 2 - this.state.player.width / 2;
        this.state.player.y = firstPlatform.y - this.state.player.height;
        this.state.player.isOnPlatform = true; // 关键：设置玩家初始在平台上
        console.log('设置玩家初始位置:', this.state.player);

        // 创建后续平台
        let lastPlatformEnd = firstPlatform.x + firstPlatform.width;

        for (let i = 0; i < this.config.platformCount!; i++) {
            // 随机生成平台间距 - 使用配置的最小距离和计算出的最大距离
            const distance = Math.random() * (maxDistance - this.config.minDistance!) + this.config.minDistance!;
            const platformWidth = Math.random() * (this.config.maxPlatformWidth! - this.config.minPlatformWidth!) + this.config.minPlatformWidth!;

            // 创建新平台
            const newPlatform = new Platform(
                lastPlatformEnd + distance,
                this.canvas.height - 100,
                platformWidth,
                this.config.platformHeight
            );

            this.state.platforms.push(newPlatform);
            lastPlatformEnd = newPlatform.x + newPlatform.width;
            console.log(`创建第${i + 1}个平台:`, newPlatform);
        }

        console.log('平台初始化完成，共创建', this.state.platforms.length, '个平台');
    }

    // 根据物理参数计算最大跳跃距离
    private calculateMaxJumpDistance(): number {
        // 获取游戏参数
        const maxVelocity = this.config.maxJumpVelocity!;
        const gravity = this.config.gravity!;
        const minAngle = this.config.aimMinAngle!;
        const maxAngle = this.config.aimMaxAngle!;

        // 玩家尺寸
        const playerWidth = 30; // Player.width

        let maxSafeDistance = 0;

        // 在有效角度范围内计算最大跳跃距离
        for (let angle = minAngle; angle <= maxAngle; angle += 0.01) {
            // 计算初始速度的水平和垂直分量
            const vx = Math.cos(angle) * maxVelocity;
            const vy = Math.sin(angle) * maxVelocity;

            // 计算飞行时间（回到相同高度）
            const flightTime = vy >= 0 ? (2 * vy) / gravity : 0;

            // 计算水平飞行距离
            const distance = vx * flightTime;

            // 更新最大安全距离
            if (distance > maxSafeDistance) {
                maxSafeDistance = distance;
            }
        }

        // 为了确保玩家能够安全落在平台上，我们需要考虑：
        // 1. 玩家的宽度 (30px)
        // 2. 玩家需要完全落在平台上，而不是边缘
        // 3. 留一些安全边距
        const safetyMargin = playerWidth + 20; // 玩家宽度 + 安全边距

        // 返回安全的最大距离
        return Math.max(maxSafeDistance - safetyMargin, this.config.minDistance!);
    }

    protected setupEventListeners() {
        console.log('设置事件监听器');

        if (!this.canvas) {
            console.error('Canvas元素不存在，无法设置事件监听器');
            return;
        }

        // 触摸开始 - 蓄力
        const touchStartHandler = () => this.handleTouchStart();
        this.canvas.addEventListener('pointerdown', touchStartHandler);
        console.log('已添加pointerdown事件监听器');

        // 触摸结束 - 跳跃
        const touchEndHandler = () => this.handleTouchEnd();
        this.canvas.addEventListener('pointerup', touchEndHandler);
        console.log('已添加pointerup事件监听器');

        // 重新开始按钮
        if (this.restartButton) {
            this.restartButton.addEventListener('click', () => {
                console.log('点击重新开始按钮');
                this.restart();
            });
            console.log('已添加重新开始按钮事件监听器');
        } else {
            console.warn('未找到重新开始按钮');
        }
    }

    private handleTouchStart() {
        console.log('Touch start - GameOver:', this.state.gameOver,
            'IsCharging:', this.state.isCharging,
            'IsOnPlatform:', this.state.player.isOnPlatform);

        if (!this.state.gameOver && !this.state.isCharging && this.state.player.isOnPlatform) {
            this.state.isCharging = true;
            this.state.chargePower = 0;
            this.state.chargeTime = 0;
            console.log('Started charging');
        }
    }

    private handleTouchEnd() {
        console.log('Touch end - GameOver:', this.state.gameOver,
            'IsCharging:', this.state.isCharging);

        if (!this.state.gameOver && this.state.isCharging) {
            // 根据蓄力时间计算跳跃力度
            const chargeRatio = Math.min(this.state.chargePower / this.config.maxChargeTime!, 1);
            const jumpVelocity = chargeRatio * this.config.maxJumpVelocity!;

            console.log('Jumping with velocity:', jumpVelocity);

            // 让玩家跳跃（根据当前视线角度）
            this.state.player.jump(jumpVelocity, this.state.aimAngle);
            this.state.isCharging = false;
            this.state.chargePower = 0;
            this.state.chargeTime = 0;

            // 增加跳跃次数
            this.state.jumpCount++;
        }
    }

    protected gameLoop() {
        if (!this.state.gameOver) {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    protected update() {
        // 更新蓄力
        if (this.state.isCharging) {
            // 如果蓄力值未达到最大值，继续增加
            this.state.chargeTime += 16;
            if (this.state.chargeTime < this.config.maxChargeTime!) {
                this.state.chargePower += 16; // 大约每帧16毫秒
            }
            // 如果蓄力值已经达到或超过最大值，开始减少
            else {
                this.state.chargePower -= 2; // 每帧减少2点蓄力值

                // 确保蓄力值不会小于0
                if (this.state.chargePower < 0) {
                    this.state.chargePower = 0;
                }
            }
        }

        // 更新视线角度（持续上下移动）
        // 确保速度不会因为过小而产生精度问题
        const effectiveSpeed = Math.max(this.config.aimSpeed!, 0.0001);
        this.state.aimAngle += effectiveSpeed * this.state.aimAngleDirection;

        // 当角度达到极限时反转移动方向
        if (this.state.aimAngle >= this.config.aimMaxAngle! || this.state.aimAngle <= this.config.aimMinAngle!) {
            this.state.aimAngleDirection *= -1;
            // 确保角度在有效范围内
            this.state.aimAngle = Math.max(this.config.aimMinAngle!, Math.min(this.config.aimMaxAngle!, this.state.aimAngle));
        }

        // 更新玩家
        this.state.player.update(this.config.gravity!);

        // 检测碰撞
        this.checkCollision();

        // 检查游戏结束
        this.checkGameOver();

        // 更新摄像机
        this.updateCamera();
    }

    private checkCollision() {
        const { player } = this.state;

        // 重置平台状态
        let onPlatform = false;

        // 检查玩家是否落在某个平台上
        for (const platform of this.state.platforms) {
            // 检查玩家是否在平台上方且正在下落
            if (player.y + player.height >= platform.y &&
                player.y + player.height <= platform.y + 15 &&
                player.velocityY >= 0 &&  // 确保是下落状态
                player.x + player.width > platform.x &&
                player.x < platform.x + platform.width) {

                // 玩家落在平台上
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isOnPlatform = true;
                onPlatform = true;

                // 如果是新平台，增加分数
                if (!platform.visited) {
                    this.state.score++;
                    this.updateScoreDisplay(); // 调用基类的方法更新分数显示
                    platform.visited = true;
                }
                break;
            }
        }

        // 只有在没有碰撞到任何平台时才设置为不在平台上
        if (!onPlatform && player.y < (this.canvas ? this.canvas.height - 120 : 500)) {
            player.isOnPlatform = false;
        }
    }

    private checkGameOver() {
        const { player } = this.state;

        // 如果玩家掉出屏幕底部或左侧
        if (this.canvas && (player.y > this.canvas.height || player.x + player.width < 0)) {
            this.state.gameOver = true;
            this.showGameOver();
        }
    }

    private updateCamera() {
        // 跟随玩家水平移动
        if (this.canvas) {
            const targetOffset = this.canvas.width / 3;
            if (this.state.player.x > this.state.cameraOffset + targetOffset) {
                this.state.cameraOffset = this.state.player.x - targetOffset;
            }
        }
    }

    private showGameOver() {
        if (this.finalScoreElement) {
            this.finalScoreElement.textContent = `最终得分: ${this.state.score}`;
        }
        if (this.gameOverElement) {
            this.gameOverElement.classList.remove('hidden');
        }

        // 调用完成回调
        this.onComplete(this.state.score);
    }

    protected draw() {
        if (!this.ctx || !this.canvas) {
            console.warn('Canvas上下文或元素不存在，无法绘制');
            return;
        }

        // 清除画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 保存当前绘图状态
        this.ctx.save();

        // 应用摄像机偏移
        this.ctx.translate(-this.state.cameraOffset, 0);

        // 绘制背景
        this.ctx.fillStyle = '#87CEEB'; // 天空蓝
        this.ctx.fillRect(this.state.cameraOffset, 0, this.canvas.width, this.canvas.height);

        // 绘制平台
        for (let i = 0; i < this.state.platforms.length; i++) {
            const platform = this.state.platforms[i];
            platform.draw(this.ctx);
        }

        // 绘制玩家视线提示（蓄力时显示，仅前两次跳跃）
        if (this.state.isCharging && this.state.jumpCount < 2) {
            this.drawAimIndicator();
        }

        // 绘制玩家视角线（始终显示，即使未蓄力）
        this.drawPlayerAimLine();

        // 绘制玩家
        this.state.player.draw(this.ctx);
        // 添加玩家位置调试信息
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`Player: (${Math.round(this.state.player.x)}, ${Math.round(this.state.player.y)})`,
            this.state.player.x, this.state.player.y - 50);

        // 绘制蓄力指示器
        if (this.state.isCharging) {
            // 当蓄力值超过最大值时，我们希望蓄力条开始减少
            // 所以我们不使用Math.min，而是让超过的部分也显示出来
            const chargeRatio = this.state.chargePower / this.config.maxChargeTime!;
            const displayRatio = Math.min(chargeRatio, 1); // 但绘制时仍然限制在1以内
            this.ctx.fillStyle = `rgba(255, 0, 0, ${0.5 * displayRatio})`;
            this.ctx.fillRect(
                this.state.player.x + (this.state.player.width - 40) / 2,  // 居中对齐玩家
                this.state.player.y - 40,
                40 * displayRatio,
                10
            );
        }

        // 恢复绘图状态
        this.ctx.restore();

        // // 绘制调试信息
        // this.ctx.fillStyle = '#000000';
        // this.ctx.font = '14px Arial';
        // this.ctx.fillText(`Score: ${this.state.score}`, 10, 20);
        // this.ctx.fillText(`Charging: ${this.state.isCharging}`, 10, 40);
        // this.ctx.fillText(`Charge Power: ${Math.round(this.state.chargePower)}`, 10, 60);
        // this.ctx.fillText(`Platforms: ${this.state.platforms.length}`, 10, 80);
        // this.ctx.fillText(`Jump Count: ${this.state.jumpCount}`, 10, 100);
        // this.ctx.fillText(`Aim Angle: ${this.state.aimAngle.toFixed(2)}`, 10, 120);
    }

    // 绘制玩家视线提示
    private drawAimIndicator() {
        if (!this.ctx) return;

        const { player } = this.state;
        const chargeRatio = Math.min(this.state.chargePower / this.config.maxChargeTime!, 1);
        const jumpVelocity = chargeRatio * this.config.maxJumpVelocity!;

        // 使用当前视角角度计算跳跃速度
        const jumpVelocityX = Math.cos(this.state.aimAngle) * jumpVelocity;
        const jumpVelocityY = Math.sin(this.state.aimAngle) * jumpVelocity;

        // 计算预测轨迹点
        let posX = player.x + player.width / 2;
        let posY = player.y + player.height / 2;
        let velX = jumpVelocityX;
        let velY = jumpVelocityY;

        // 保存当前绘图状态
        this.ctx.save();

        // 绘制虚线轨迹
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]); // 设置虚线样式
        this.ctx.beginPath();
        this.ctx.moveTo(posX, posY);

        // 绘制预测轨迹（最多20个点）
        for (let i = 0; i < 20; i++) {
            // 应用重力
            velY += this.config.gravity!;

            // 更新位置
            posX += velX;
            posY += velY;

            // 绘制轨迹点
            this.ctx.lineTo(posX, posY);
        }

        this.ctx.stroke();

        // 绘制终点标记
        this.ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(posX, posY, 5, 0, Math.PI * 2);
        this.ctx.fill();

        // 恢复绘图状态
        this.ctx.restore();
    }

    // 绘制玩家视角线
    private drawPlayerAimLine() {
        if (!this.ctx) return;

        const { player } = this.state;
        const chargeRatio = this.state.isCharging ? Math.min(this.state.chargePower / this.config.maxChargeTime!, 1) : 0;

        // 玩家中心位置
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;

        // 基础线长（即使未蓄力也显示短线）
        const baseLength = 20;
        // 最大额外长度
        const maxLength = 100;
        // 计算实际线长
        const lineLength = baseLength + chargeRatio * maxLength;

        // 计算视线终点（基于当前角度）
        const endX = playerCenterX + Math.cos(this.state.aimAngle) * lineLength;
        const endY = playerCenterY + Math.sin(this.state.aimAngle) * lineLength;

        // 绘制视线
        this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(playerCenterX, playerCenterY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();

        // 绘制箭头
        const arrowSize = 10;
        const angle = Math.atan2(endY - playerCenterY, endX - playerCenterX);

        this.ctx.beginPath();
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - arrowSize * Math.cos(angle - Math.PI / 6),
            endY - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - arrowSize * Math.cos(angle + Math.PI / 6),
            endY - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.stroke();
    }

    public restart() {
        // 重置游戏状态
        this.state = {
            score: 0,
            gameOver: false,
            platforms: [],
            player: new Player(100, 300),
            isCharging: false,
            chargePower: 0,
            chargeTime: 0,
            cameraOffset: 0,
            jumpCount: 0,
            aimAngle: this.gameConfig?.aimMinAngle !== undefined ? this.gameConfig.aimMinAngle : -Math.PI / 3,  // 使用配置的初始角度
            aimAngleDirection: 1
        };

        // 重新初始化平台
        this.initPlatforms();

        // 隐藏游戏结束界面
        if (this.gameOverElement) {
            this.gameOverElement.classList.add('hidden');
        }

        // 重新开始游戏循环
        this.updateScoreDisplay();
        requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * 更新分数显示
     * 覆盖基类方法以使用本地状态
     */
    protected updateScoreDisplay(): void {
        if (this.scoreElement) {
            this.scoreElement.textContent = `分数: ${this.state.score}`;
        }
    }
}

// 导出游戏类
export { JumpingGame, Player, Platform };