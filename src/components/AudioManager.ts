/**
 * 音频管理器组件
 * 负责处理游戏中的音效和背景音乐
 */
export class AudioManager {
    private musicElement: HTMLAudioElement | null;
    private userInteracted: boolean = false;
    private currentBgm: string = "";
    private gameVolume: number = 1.0;
    private bgmVolume: number = 1.0;
    private menuVolume: number = 1.0;
    private fadeDuration: number = 1000; // 淡入淡出持续时间(毫秒)

    constructor() {
        this.musicElement = document.getElementById("music") as HTMLAudioElement | null;
        
        // 添加用户交互监听器来解锁音频播放
        if (this.musicElement) {
            const unlockAudio = () => {
                this.userInteracted = true;
                // 尝试播放当前存储的背景音乐
                const currentBgm = localStorage.getItem("nowbgm");
                console.log("AudioManager: 用户已交互，尝试播放背景音乐:", currentBgm);
                if (currentBgm && currentBgm !== "none" && currentBgm !== "#" && currentBgm !== "null") {
                    this.playBackgroundMusic(currentBgm);
                } else if (!currentBgm) {
                    // 如果没有保存的背景音乐，确保音乐元素处于静音状态
                    console.log("AudioManager: 没有保存的背景音乐，保持静音状态");
                    if (this.musicElement) {
                        this.musicElement.pause();
                        this.musicElement.src = "";
                        this.currentBgm = "";
                    }
                }
                // 移除事件监听器
                document.removeEventListener('click', unlockAudio);
                document.removeEventListener('touchstart', unlockAudio);
                document.removeEventListener('keydown', unlockAudio);
            };
            
            document.addEventListener('click', unlockAudio, { once: true });
            document.addEventListener('touchstart', unlockAudio, { once: true });
            document.addEventListener('keydown', unlockAudio, { once: true });
        }
        
        // 从localStorage加载音量设置
        this.loadVolumeSettings();
    }
    
    /**
     * 从localStorage加载音量设置
     */
    private loadVolumeSettings(): void {
        const gameVolume = localStorage.getItem("gameVolume");
        const bgmVolume = localStorage.getItem("bgmVolume");
        const menuVolume = localStorage.getItem("menuVolume");
        
        if (gameVolume) this.gameVolume = parseFloat(gameVolume) / 100;
        if (bgmVolume) this.bgmVolume = parseFloat(bgmVolume) / 100;
        if (menuVolume) this.menuVolume = parseFloat(menuVolume) / 100;
    }

    /**
     * 获取音频文件的正确路径
     * @param audioPath 音频文件路径
     * @returns 完整的音频文件URL
     */
    private getAudioPath(audioPath: string): string {
        // 如果是无效的音频路径，则返回空字符串
        if (!audioPath || audioPath === "none" || audioPath === "#") {
            console.log("AudioManager: 无效的音频路径:", audioPath);
            return "";
        }
        
        // 如果是绝对路径（以/开头），则直接返回
        if (audioPath.startsWith('/')) {
            console.log("AudioManager: 使用绝对路径:", audioPath);
            return audioPath;
        }
        
        // 构造相对于当前页面的路径
        // 在game_scenes目录中，需要向上两级目录然后进入assets/bgm
        const fullPath = `../../assets/bgm/${audioPath}.mp3`;
        console.log("AudioManager: 构造音频路径:", fullPath);
        return fullPath;
    }

    /**
     * 设置游戏音量
     * @param volume 音量值 (0.0 - 1.0)
     */
    public setGameVolume(volume: number): void {
        this.gameVolume = volume;
        // 注意：游戏音效是通过独立的Audio元素播放的，所以不需要设置主音乐元素的音量
        // 只需要更新gameVolume属性，后续的音效播放会使用这个值
        console.log("AudioManager: 游戏音效音量已设置为", volume);
    }

    /**
     * 设置背景音乐音量
     * @param volume 音量值 (0.0 - 1.0)
     */
    public setBGMVolume(volume: number): void {
        this.bgmVolume = volume;
        if (this.musicElement) {
            this.musicElement.volume = volume;
        }
    }
    
    /**
     * 设置菜单音量
     * @param volume 音量值 (0.0 - 1.0)
     */
    public setMenuVolume(volume: number): void {
        this.menuVolume = volume;
        console.log("AudioManager: 菜单音量已设置为", volume);
    }

    /**
     * 播放音效
     * @param music 音效文件名
     */
    public playSoundEffect(music: string): void {
        console.log("AudioManager: 尝试播放音效:", music);
        if (!music || music === "none" || music === "#") {
            console.log("AudioManager: 无效的音效名称，跳过播放");
            return;
        }
        
        // 为音效创建独立的audio元素，避免与背景音乐冲突
        const soundEffectElement = new Audio();
        const audioUrl = this.getAudioPath(music);
        if (!audioUrl) {
            console.log("AudioManager: 无法生成有效的音效路径");
            return;
        }
        
        console.log("AudioManager: 设置音效源:", audioUrl);
        soundEffectElement.src = audioUrl;
        soundEffectElement.volume = this.gameVolume; // 应用游戏音量
        
        // 播放音效
        soundEffectElement.play()
            .then(() => {
                console.log("AudioManager: 音效播放成功:", music);
                // 播放完成后清理资源
                setTimeout(() => {
                    soundEffectElement.remove();
                }, 5000); // 5秒后移除元素，确保播放完成
            })
            .catch(e => {
                console.error("AudioManager: 播放音效失败:", e);
                console.error("AudioManager: 尝试播放的音效路径:", audioUrl);
                // 清理资源
                soundEffectElement.remove();
            });
    }
    
    /**
     * 更新背景音乐
     * @param bgm 背景音乐文件名
     */
    public updateBackgroundMusic(bgm: string): void {
        console.log("AudioManager: 更新背景音乐:", bgm);
        // 如果bgm为null或无效值，立即停止音乐播放
        if (!bgm || bgm === "none" || bgm === "#" || bgm === "null") {
            console.log("AudioManager: 无效的背景音乐名称，立即停止播放");
            this.stopBackgroundMusic();
            return;
        }
        
        if (bgm !== localStorage.getItem("nowbgm")) {
            localStorage.setItem("nowbgm", bgm);
            console.log("AudioManager: 已保存背景音乐到localStorage:", bgm);
            // 只有在用户已交互的情况下才播放
            if (this.userInteracted) {
                this.playBackgroundMusic(bgm);
            } else {
                console.log("AudioManager: 用户尚未交互，暂不播放背景音乐");
            }
        } else {
            console.log("AudioManager: 背景音乐未更新，与当前相同:", {
                bgm: bgm,
                currentBgm: localStorage.getItem("nowbgm")
            });
        }
    }
    
    /**
     * 淡出当前音频
     * @param duration 淡出持续时间(毫秒)
     * @returns Promise，在淡出完成后resolve
     */
    private fadeOutAudio(duration: number = this.fadeDuration): Promise<void> {
        return new Promise((resolve) => {
            if (!this.musicElement) {
                resolve();
                return;
            }
            
            const initialVolume = this.musicElement.volume;
            const startTime = performance.now();
            
            const fadeOutStep = (timestamp: number) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                if (this.musicElement) {
                    // 确保音量在有效范围内 [0, 1]
                    const newVolume = Math.max(0, Math.min(initialVolume * (1 - progress), 1));
                    this.musicElement.volume = newVolume;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(fadeOutStep);
                } else {
                    if (this.musicElement) {
                        this.musicElement.volume = 0;
                        this.musicElement.pause();
                    }
                    resolve();
                }
            };
            
            requestAnimationFrame(fadeOutStep);
        });
    }
    
    /**
     * 淡入音频
     * @param targetVolume 目标音量
     * @param duration 淡入持续时间(毫秒)
     * @returns Promise，在淡入完成后resolve
     */
    private fadeInAudio(targetVolume: number, duration: number = this.fadeDuration): Promise<void> {
        return new Promise((resolve) => {
            if (!this.musicElement) {
                resolve();
                return;
            }
            
            // 确保目标音量在有效范围内 [0, 1]
            const clampedTargetVolume = Math.max(0, Math.min(targetVolume, 1));
            
            // 确保音频是播放状态
            if (this.musicElement.paused) {
                this.musicElement.play().catch(e => {
                    console.error("AudioManager: 播放音频失败:", e);
                });
            }
            
            const startTime = performance.now();
            this.musicElement.volume = 0;
            
            const fadeInStep = (timestamp: number) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                if (this.musicElement) {
                    // 确保音量在有效范围内 [0, 1]
                    const newVolume = Math.max(0, Math.min(clampedTargetVolume * progress, 1));
                    this.musicElement.volume = newVolume;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(fadeInStep);
                } else {
                    if (this.musicElement) {
                        this.musicElement.volume = clampedTargetVolume;
                    }
                    resolve();
                }
            };
            
            requestAnimationFrame(fadeInStep);
        });
    }
    
    /**
     * 播放背景音乐（带淡入淡出效果）
     * @param bgm 背景音乐文件名
     */
    private async playBackgroundMusic(bgm: string): Promise<void> {
        console.log("AudioManager: 尝试播放背景音乐:", bgm);
        if (!bgm || bgm === "none" || bgm === "#") {
            console.log("AudioManager: 无效的背景音乐名称，跳过播放");
            return;
        }
        
        if (this.musicElement) {
            // 如果背景音乐没有变化，则直接返回
            if (bgm === this.currentBgm) {
                console.log("AudioManager: 背景音乐没有变化，无需更新");
                return;
            }
            
            // 如果有当前正在播放的音乐，先淡出
            if (this.currentBgm && this.musicElement.src && !this.musicElement.paused) {
                console.log("AudioManager: 淡出当前背景音乐");
                await this.fadeOutAudio();
            }
            
            // 更新当前背景音乐
            this.currentBgm = bgm;
            const audioUrl = this.getAudioPath(bgm);
            if (!audioUrl) {
                console.log("AudioManager: 无法生成有效的背景音乐路径");
                return;
            }
            
            console.log("AudioManager: 设置背景音乐源:", audioUrl);
            this.musicElement.src = audioUrl;
            this.musicElement.loop = true; // 确保背景音乐循环播放
            this.musicElement.volume = 0; // 初始音量设为0，准备淡入
            
            // 加载音频并开始播放
            this.musicElement.load();
            
            // 等待音频可以播放
            const canPlayPromise = new Promise<void>((resolve) => {
                const onCanPlay = () => {
                    this.musicElement?.removeEventListener('canplay', onCanPlay);
                    resolve();
                };
                this.musicElement?.addEventListener('canplay', onCanPlay);
            });
            
            try {
                await canPlayPromise;
                console.log("AudioManager: 开始淡入背景音乐:", bgm);
                await this.fadeInAudio(this.bgmVolume);
                console.log("AudioManager: 背景音乐淡入完成:", bgm);
            } catch (e) {
                console.error("AudioManager: 播放背景音乐失败:", e);
                console.error("AudioManager: 尝试播放的背景音乐路径:", audioUrl);
            }
        } else {
            console.log("AudioManager: 背景音乐未播放，缺少musicElement");
        }
    }

    /**
     * 播放点击音效
     */
    public playClickSound(): void {
        console.log("AudioManager: 尝试播放点击音效");
        if (this.musicElement && this.userInteracted) {
            // 检查是否有有效的音频源
            if (this.musicElement.src && this.musicElement.src !== window.location.href) {
                this.musicElement.volume = this.menuVolume; // 应用菜单音量
                this.musicElement.play()
                    .then(() => {
                        console.log("AudioManager: 点击音效播放成功");
                    })
                    .catch(e => {
                        console.error("AudioManager: 播放点击音效失败:", e);
                        console.error("AudioManager: 当前音频源:", this.musicElement?.src);
                    });
            } else {
                console.log("AudioManager: 没有有效的音频源可供播放点击音效");
            }
        } else {
            console.log("AudioManager: 点击音效未播放，条件不满足:", {
                hasMusicElement: !!this.musicElement,
                userInteracted: this.userInteracted,
                hasValidSrc: !!(this.musicElement && this.musicElement.src && this.musicElement.src !== window.location.href)
            });
        }
    }
    
    /**
     * 停止背景音乐（立即停止，不淡出）
     */
    public stopBackgroundMusic(): void {
        console.log("AudioManager: 立即停止背景音乐");
        if (this.musicElement) {
            this.musicElement.pause();
            this.musicElement.src = "";
            this.currentBgm = "";
            // 在localStorage中设置特殊值，表示音乐应该停止
            localStorage.setItem("nowbgm", "null");
        }
    }
    
    /**
     * 获取当前背景音乐
     */
    public getCurrentBgm(): string {
        return this.currentBgm;
    }
    
    /**
     * 获取单例实例
     */
    public static getInstance(): AudioManager {
        if (!(window as any).audioManagerInstance) {
            (window as any).audioManagerInstance = new AudioManager();
        }
        return (window as any).audioManagerInstance;
    }
}