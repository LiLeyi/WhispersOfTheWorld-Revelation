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

    constructor() {
        this.musicElement = document.getElementById("music") as HTMLAudioElement | null;
        
        // 添加用户交互监听器来解锁音频播放
        if (this.musicElement) {
            const unlockAudio = () => {
                this.userInteracted = true;
                // 尝试播放当前存储的背景音乐
                const currentBgm = localStorage.getItem("nowbgm");
                console.log("AudioManager: 用户已交互，尝试播放背景音乐:", currentBgm);
                if (currentBgm && currentBgm !== "none" && currentBgm !== "#") {
                    this.playBackgroundMusic(currentBgm);
                } else {
                    // 如果没有有效的背景音乐，尝试播放默认的bgm1.mp3
                    console.log("AudioManager: 没有有效的背景音乐，尝试播放默认音乐");
                    this.playBackgroundMusic("bgm1");
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
        if (this.musicElement) {
            this.musicElement.volume = volume;
        }
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
        if (this.musicElement) {
            this.musicElement.volume = volume;
        }
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
        
        if (this.musicElement && this.userInteracted) {
            const audioUrl = this.getAudioPath(music);
            if (!audioUrl) {
                console.log("AudioManager: 无法生成有效的音效路径");
                return;
            }
            
            console.log("AudioManager: 设置音效源:", audioUrl);
            this.musicElement.src = audioUrl;
            this.musicElement.volume = this.gameVolume; // 应用游戏音量
            this.musicElement.play()
                .then(() => {
                    console.log("AudioManager: 音效播放成功:", music);
                })
                .catch(e => {
                    console.error("AudioManager: 播放音效失败:", e);
                    console.error("AudioManager: 尝试播放的音效路径:", audioUrl);
                });
        } else {
            console.log("AudioManager: 音效未播放，条件不满足:", {
                music: music,
                hasMusicElement: !!this.musicElement,
                userInteracted: this.userInteracted
            });
        }
    }

    /**
     * 更新背景音乐
     * @param bgm 背景音乐文件名
     */
    public updateBackgroundMusic(bgm: string): void {
        console.log("AudioManager: 更新背景音乐:", bgm);
        if (!bgm || bgm === "none" || bgm === "#") {
            console.log("AudioManager: 无效的背景音乐名称，跳过更新");
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
     * 播放背景音乐
     * @param bgm 背景音乐文件名
     */
    private playBackgroundMusic(bgm: string): void {
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
            
            this.currentBgm = bgm;
            const audioUrl = this.getAudioPath(bgm);
            if (!audioUrl) {
                console.log("AudioManager: 无法生成有效的背景音乐路径");
                return;
            }
            
            console.log("AudioManager: 设置背景音乐源:", audioUrl);
            this.musicElement.src = audioUrl;
            this.musicElement.loop = true; // 确保背景音乐循环播放
            this.musicElement.volume = this.bgmVolume; // 应用背景音乐音量
            
            this.musicElement.play()
                .then(() => {
                    console.log("AudioManager: 背景音乐播放成功:", bgm);
                })
                .catch(e => {
                    console.error("AudioManager: 播放背景音乐失败:", e);
                    console.error("AudioManager: 尝试播放的背景音乐路径:", audioUrl);
                });
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