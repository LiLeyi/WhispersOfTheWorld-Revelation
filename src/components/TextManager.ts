/**
 * 文本管理器组件
 * 负责处理游戏中文本和名称的显示
 */
export class TextManager {
    private nameElement: HTMLElement | null;
    private textElement: HTMLElement | null;

    constructor() {
        this.nameElement = document.getElementById("name");
        this.textElement = document.getElementById("texts");
    }

    /**
     * 更新显示的文本和名称
     * @param element 包含文本和名称信息的场景元素
     */
    public updateText(element: { name?: string | null, text: string }): void {
        if (this.nameElement && this.textElement) {
            if (element.name && element.name !== "旁白") {
                this.nameElement.innerHTML = element.name;
            } else {
                this.nameElement.innerHTML = "";
            }
            this.textElement.innerHTML = element.text;
        }
    }
}