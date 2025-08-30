import $ from 'jquery';

export class BackgroundManager {
    private bg1: HTMLElement | null;
    private bg2: HTMLElement | null;
    private currentBackground: string = "";
    private backgroundNum: number = 0;

    constructor() {
        this.bg1 = document.getElementById("bg1");
        this.bg2 = document.getElementById("bg2");
        
        // 初始化背景元素
        if (this.bg1) {
            this.bg1.style.opacity = "1";
        }
        if (this.bg2) {
            this.bg2.style.opacity = "0";
        }
        
        // 如果localStorage中有背景，则初始化时设置
        const savedBackground = localStorage.getItem("MSYbackgroundIMG");
        if (savedBackground && this.bg1) {
            this.currentBackground = savedBackground;
            // 使用相对于当前页面的路径
            this.bg1.style.backgroundImage = `url('${this.getBackgroundImagePath(savedBackground)}')`;
        }
    }

    /**
     * 获取背景图片的正确路径
     * @param backgroundPath 背景图片路径
     * @returns 完整的背景图片URL
     */
    private getBackgroundImagePath(backgroundPath: string): string {
    // 如果是绝对路径（以/开头），则直接返回
    if (backgroundPath.startsWith('/')) {
        return backgroundPath;
    }
    
    // 构造相对于当前页面的路径
    // 在game_scenes目录中，需要向上三级目录然后进入assets/images/background
    return `../../../assets/images/background/${backgroundPath}`;
}

    /**
     * 设置背景图片
     * @param backgroundPath 背景图片路径
     * @param useTransition 是否使用过渡动画
     */
    public setBackground(backgroundPath: string | null | undefined, useTransition: boolean = true): void {
        // 如果没有提供背景路径或路径为空，则使用默认背景
        const path = backgroundPath && backgroundPath !== "" ? backgroundPath : "none.png";
        
        // 如果背景没有变化，则直接返回
        if (path === this.currentBackground) {
            console.log("背景没有变化，无需更新");
            return;
        }

        // 保存当前背景路径
        this.currentBackground = path;
        
        // 构造完整背景图片URL，使用相对于当前页面的路径
        const imageUrl = this.getBackgroundImagePath(path);
        
        if (useTransition) {
            this.transitionToBackground(imageUrl);
        } else {
            this.immediatelySetBackground(imageUrl);
        }
    }

    /**
     * 立即设置背景（无过渡动画）
     * @param imageUrl 完整背景图片URL
     */
    private immediatelySetBackground(imageUrl: string): void {
        if (this.bg1) {
            this.bg1.style.backgroundImage = `url('${imageUrl}')`;
            this.bg1.style.opacity = "1";
        }
        if (this.bg2) {
            this.bg2.style.opacity = "0";
        }
        this.backgroundNum = 0;
    }

    /**
     * 使用过渡动画切换背景
     * @param imageUrl 完整背景图片URL
     */
    private transitionToBackground(imageUrl: string): void {
        if (!this.bg1 || !this.bg2) return;

        if (this.backgroundNum === 0) {
            // 当前显示bg1，淡出bg1，淡入bg2
            this.bg2.style.backgroundImage = `url('${imageUrl}')`;
            
            const bg1Element = this.bg1;
            const bg2Element = this.bg2;
            
            $(this.bg1).animate({ opacity: 0 }, {
                duration: 2000,
                step: function (now: number) {
                    if (bg1Element && bg2Element) {
                        bg1Element.style.opacity = String(now);
                        bg2Element.style.opacity = String(1 - now);
                    }
                },
                complete: () => {
                    if (bg1Element && bg2Element) {
                        bg1Element.style.opacity = "0";
                        bg2Element.style.opacity = "1";
                    }
                    this.backgroundNum = 1;
                }
            });
        } else {
            // 当前显示bg2，淡出bg2，淡入bg1
            this.bg1.style.backgroundImage = `url('${imageUrl}')`;
            
            const bg1Element = this.bg1;
            const bg2Element = this.bg2;
            
            $(this.bg2).animate({ opacity: 0 }, {
                duration: 2000,
                step: function (now: number) {
                    if (bg1Element && bg2Element) {
                        bg1Element.style.opacity = String(1 - now);
                        bg2Element.style.opacity = String(now);
                    }
                },
                complete: () => {
                    if (bg1Element && bg2Element) {
                        bg1Element.style.opacity = "1";
                        bg2Element.style.opacity = "0";
                    }
                    this.backgroundNum = 0;
                }
            });
        }
    }

    /**
     * 获取当前背景路径
     */
    public getCurrentBackground(): string {
        return this.currentBackground;
    }

    /**
     * 预加载背景图片
     * @param backgroundPath 背景图片路径
     */
    public preloadBackground(backgroundPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = reject;
            img.src = `/assets/images/background/${backgroundPath}`;
        });
    }
}