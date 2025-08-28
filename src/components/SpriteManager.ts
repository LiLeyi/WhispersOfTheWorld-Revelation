/**
 * 立绘管理器组件
 * 负责处理游戏中角色立绘的显示和隐藏
 */
export class SpriteManager {
    private leftSprite: HTMLImageElement | null;
    private rightSprite: HTMLImageElement | null;
    private centerSprite: HTMLImageElement | null;

    constructor() {
        this.leftSprite = document.getElementById("left-sprite") as HTMLImageElement | null;
        this.rightSprite = document.getElementById("right-sprite") as HTMLImageElement | null;
        this.centerSprite = document.getElementById("center-sprite") as HTMLImageElement | null;
        
        // 确保在初始化时清除所有立绘
        this.clearAllSprites();
    }

    /**
     * 重置所有立绘为默认状态
     */
    public reset(): void {
        this.clearAllSprites();
    }

    /**
     * 清除所有立绘
     */
    public clearAllSprites(): void {
        if (this.leftSprite) {
            this.leftSprite.src = "../../assets/images/none.png";
            this.leftSprite.classList.remove("show");
            // 确保元素可见性正确设置
            this.leftSprite.style.display = "block";
        }
        if (this.rightSprite) {
            this.rightSprite.src = "../../assets/images/none.png";
            this.rightSprite.classList.remove("show");
            // 确保元素可见性正确设置
            this.rightSprite.style.display = "block";
        }
        if (this.centerSprite) {
            this.centerSprite.src = "../../assets/images/none.png";
            this.centerSprite.classList.remove("show");
            // 确保元素可见性正确设置
            this.centerSprite.style.display = "block";
        }
        
        // 强制重绘
        if (this.leftSprite) this.leftSprite.offsetHeight;
        if (this.rightSprite) this.rightSprite.offsetHeight;
        if (this.centerSprite) this.centerSprite.offsetHeight;
    }

    /**
     * 更新角色立绘
     * @param element 包含立绘信息的场景元素
     */
    public updateCharacterSprites(element: {
        sprite?: {
            left?: string | null;
            right?: string | null;
            center?: string | null;
        } | null
    }): void {
        // 更新sprite立绘
        if (element.sprite !== undefined) {
            this.updateSprites(element.sprite);
        }
    }

    /**
     * 更新sprite立绘
     * @param sprite sprite立绘配置
     */
    private updateSprites(sprite: {
        left?: string | null;
        right?: string | null;
        center?: string | null;
    } | null | undefined): void {
        if (!sprite) return;

        // 更新左侧立绘
        if (sprite.left !== undefined) {
            if (this.leftSprite) {
                if (sprite.left) {
                    this.leftSprite.src = "../../assets/images/sprite/" + sprite.left;
                    // 确保元素可见
                    this.leftSprite.style.display = "block";
                    setTimeout(() => this.leftSprite!.classList.add("show"), 10);
                } else {
                    this.leftSprite.classList.remove("show");
                    // 等待动画完成后清除图片
                    setTimeout(() => {
                        if (this.leftSprite && !this.leftSprite.classList.contains("show")) {
                            this.leftSprite.src = "../../assets/images/none.png";
                            // 隐藏元素
                            this.leftSprite.style.display = "none";
                        }
                    }, 500);
                }
            }
        }

        // 更新右侧立绘
        if (sprite.right !== undefined) {
            if (this.rightSprite) {
                if (sprite.right) {
                    this.rightSprite.src = "../../assets/images/sprite/" + sprite.right;
                    // 确保元素可见
                    this.rightSprite.style.display = "block";
                    setTimeout(() => this.rightSprite!.classList.add("show"), 10);
                } else {
                    this.rightSprite.classList.remove("show");
                    // 等待动画完成后清除图片
                    setTimeout(() => {
                        if (this.rightSprite && !this.rightSprite.classList.contains("show")) {
                            this.rightSprite.src = "../../assets/images/none.png";
                            // 隐藏元素
                            this.rightSprite.style.display = "none";
                        }
                    }, 500);
                }
            }
        }

        // 更新中间立绘
        if (sprite.center !== undefined) {
            if (this.centerSprite) {
                if (sprite.center) {
                    this.centerSprite.src = "../../assets/images/sprite/" + sprite.center;
                    // 确保元素可见
                    this.centerSprite.style.display = "block";
                    setTimeout(() => this.centerSprite!.classList.add("show"), 10);
                } else {
                    this.centerSprite.classList.remove("show");
                    // 等待动画完成后清除图片
                    setTimeout(() => {
                        if (this.centerSprite && !this.centerSprite.classList.contains("show")) {
                            this.centerSprite.src = "../../assets/images/none.png";
                            // 隐藏元素
                            this.centerSprite.style.display = "none";
                        }
                    }, 500);
                }
            }
        }
    }
}