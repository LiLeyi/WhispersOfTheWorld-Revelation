/**
 * 音频管理器组件
 * 负责处理游戏中的音效和背景音乐
 */
export class AudioManager {
    private musicElement: HTMLAudioElement | null;
    private userInteracted: boolean = false;

    constructor() {
        this.musicElement = document.getElementById("music") as HTMLAudioElement | null;
        
        // 添加用户交互监听器来解锁音频播放
        if (this.musicElement) {
            const unlockAudio = () => {
                this.userInteracted = true;
                // 尝试播放当前存储的背景音乐
                const currentBgm = localStorage.getItem("nowbgm");
                if (currentBgm && currentBgm !== "none") {
                    this.playBackgroundMusic(currentBgm);
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
    }

    /**
     * 播放音效
     * @param music 音效文件名
     */
    public playSoundEffect(music: string): void {
        if (music && music !== "none" && this.musicElement && this.userInteracted) {
            this.musicElement.src = "/assets/bgm/" + music + ".mp3";
            this.musicElement.play().catch(e => console.log("播放音效失败:", e));
        }
    }

    /**
     * 更新背景音乐
     * @param bgm 背景音乐文件名
     */
    public updateBackgroundMusic(bgm: string): void {
        if (bgm && bgm !== "none" && bgm !== localStorage.getItem("nowbgm")) {
            localStorage.setItem("nowbgm", bgm);
            // 只有在用户已交互的情况下才播放
            if (this.userInteracted) {
                this.playBackgroundMusic(bgm);
            }
        }
    }
    
    /**
     * 播放背景音乐
     * @param bgm 背景音乐文件名
     */
    private playBackgroundMusic(bgm: string): void {
        if (this.musicElement) {
            this.musicElement.src = "/assets/bgm/" + bgm + ".mp3";
            this.musicElement.play().catch(e => console.log("播放背景音乐失败:", e));
        }
    }

    /**
     * 播放点击音效
     */
    public playClickSound(): void {
        if (this.musicElement && this.userInteracted) {
            this.musicElement.play().catch(e => console.log("播放点击音效失败:", e));
        }
    }
}