/**
 * 选项管理器组件
 * 负责处理游戏中玩家选项的显示和交互
 */
export class ChoiceManager {
    private currentScene: any = null;
    private renderCurrentNodeCallback: (() => void) | null = null;
    private navigateToSceneCallback: ((sceneId: string) => void) | null = null;
    private getCurrentNodeIndexCallback: (() => number) | null = null;
    private setCurrentNodeIndexCallback: ((index: number) => void) | null = null;
    private getCurrentNodeCallback: (() => any) | null = null;

    /**
     * 设置当前场景引用
     * @param scene 当前场景对象
     */
    public setCurrentScene(scene: any): void {
        this.currentScene = scene;
    }

    /**
     * 设置获取当前节点索引的回调函数
     * @param callback 回调函数
     */
    public setGetCurrentNodeIndexCallback(callback: () => number): void {
        this.getCurrentNodeIndexCallback = callback;
    }

    /**
     * 设置设置当前节点索引的回调函数
     * @param callback 回调函数
     */
    public setSetCurrentNodeIndexCallback(callback: (index: number) => void): void {
        this.setCurrentNodeIndexCallback = callback;
    }

    /**
     * 设置渲染当前节点的回调函数
     * @param callback 回调函数
     */
    public setRenderCurrentNodeCallback(callback: () => void): void {
        this.renderCurrentNodeCallback = callback;
    }

    /**
     * 设置场景跳转的回调函数
     * @param callback 回调函数
     */
    public setNavigateToSceneCallback(callback: (sceneId: string) => void): void {
        this.navigateToSceneCallback = callback;
    }

    /**
     * 设置获取当前节点的回调函数
     * @param callback 回调函数
     */
    public setGetCurrentNodeCallback(callback: () => any): void {
        this.getCurrentNodeCallback = callback;
    }

    /**
     * 处理选项显示和交互
     * @param node 包含选项信息的场景节点
     */
    public handleChoices(node: any): void {
        const selectionBox = document.getElementById("selection_box");
        if (!selectionBox) return;
        
        // 清空选项容器
        selectionBox.innerHTML = "";
        
        if (node.choices && node.choices.length > 0) {
            // 显示选项
            selectionBox.style.display = "block";
            
            node.choices.forEach((choice: any) => {
                // 检查条件
                if (choice.condition && !choice.condition()) return;
                
                const button = document.createElement("button");
                button.className = "selection";
                button.textContent = choice.text;
                
                button.onclick = () => {
                    console.log("选项被点击:", choice);
                    
                    // 执行动作
                    if (choice.action) {
                        console.log("执行选项动作");
                        choice.action();
                    }
                    
                    // 跳转到下一个节点
                    if (typeof choice.next === "string") {
                        console.log("处理字符串类型的跳转:", choice.next);
                        // 处理字符串类型的跳转
                        // 检查是否是当前场景内的节点ID
                        if (this.currentScene) {
                            const targetNodeIndex = this.currentScene.nodes.findIndex((node: any) => node.id === choice.next);
                            if (targetNodeIndex !== -1) {
                                // 是当前场景内的节点，直接跳转到该节点
                                console.log("跳转到当前场景内的节点，索引:", targetNodeIndex);
                                if (this.setCurrentNodeIndexCallback) {
                                    this.setCurrentNodeIndexCallback(targetNodeIndex);
                                }
                                if (this.renderCurrentNodeCallback) {
                                    this.renderCurrentNodeCallback();
                                }
                                return;
                            }
                        }
                        // 如果不是当前场景内的节点，则进行场景间跳转
                        console.log("进行场景间跳转:", choice.next);
                        if (this.navigateToSceneCallback) {
                            this.navigateToSceneCallback(choice.next);
                        }
                    } else {
                        // 处理SceneNode对象类型的跳转
                        console.log("处理SceneNode对象类型的跳转");
                        // 查找这个节点是否在当前场景中
                        if (this.currentScene) {
                            const targetNodeIndex = this.currentScene.nodes.indexOf(choice.next);
                            if (targetNodeIndex !== -1) {
                                // 节点在当前场景中
                                console.log("SceneNode在当前场景中，索引:", targetNodeIndex);
                                if (this.setCurrentNodeIndexCallback) {
                                    this.setCurrentNodeIndexCallback(targetNodeIndex);
                                }
                                if (this.renderCurrentNodeCallback) {
                                    this.renderCurrentNodeCallback();
                                }
                            } else {
                                // 节点不在当前场景中，可能是直接引用的节点对象
                                console.log("SceneNode不在当前场景中，直接渲染");
                                // 这种情况下，我们需要特殊处理，可能需要修改当前节点
                                if (this.renderCurrentNodeCallback) {
                                    this.renderCurrentNodeCallback();
                                }
                            }
                        }
                    }
                };
                
                const p = document.createElement("p");
                p.appendChild(button);
                selectionBox.appendChild(p);
            });
        } else {
            // 隐藏选项
            selectionBox.style.display = "none";
        }
    }
}