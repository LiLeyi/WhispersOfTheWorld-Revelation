/**
 * 音频管理器组件
 * 负责处理游戏中的音效和背景音乐
 */
export class AudioManager {
    private musicElement: HTMLAudioElement | null;

    constructor() {
        this.musicElement = document.getElementById("music") as HTMLAudioElement | null;
    }

    /**
     * 播放音效
     * @param music 音效文件名
     */
    public playSoundEffect(music: string): void {
        if (music && music !== "none" && this.musicElement) {
            this.musicElement.src = "/assets/bgm/" + music + ".mp3";
            this.musicElement.play();
        }
    }

    /**
     * 更新背景音乐
     * @param bgm 背景音乐文件名
     */
    public updateBackgroundMusic(bgm: string): void {
        if (bgm && bgm !== "none" && bgm !== localStorage.getItem("nowbgm")) {
            localStorage.setItem("nowbgm", bgm);
        }
    }

    /**
     * 播放点击音效
     */
    public playClickSound(): void {
        if (this.musicElement) {
            this.musicElement.play();
        }
    }
}