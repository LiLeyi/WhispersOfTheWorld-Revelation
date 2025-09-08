import { TextManager } from './TextManager';
import { SpriteManager } from './SpriteManager';
import { AudioManager } from './AudioManager';
import { BackgroundManager } from './BackgroundManager';

/**
 * 场景管理器组件
 * 负责统一管理游戏中所有场景相关元素（如对话框、立绘、音频、背景等）
 */
export class SceneManager {
    private textManager: TextManager;
    private spriteManager: SpriteManager;
    private audioManager: AudioManager;
    private backgroundManager: BackgroundManager;

    constructor() {
        console.log("[SceneManager] 初始化");
        this.textManager = new TextManager();
        this.spriteManager = new SpriteManager();
        this.audioManager = new AudioManager();
        this.backgroundManager = new BackgroundManager();
        
        // 确保对话框结构正确
        this.ensureDialogStructure();
    }

    /**
     * 获取各个管理器实例
     */
    public getTextManager(): TextManager {
        return this.textManager;
    }

    public getSpriteManager(): SpriteManager {
        return this.spriteManager;
    }

    public getAudioManager(): AudioManager {
        return this.audioManager;
    }

    public getBackgroundManager(): BackgroundManager {
        return this.backgroundManager;
    }

    /**
     * 更新场景元素（用于主游戏场景）
     * @param element 场景元素数据
     */
    public updateSceneElements(element: any): void {
        // 更新文本（会记录到历史中）
        this.textManager.updateText({
            name: element.name,
            text: element.text
        });
        
        // 更新立绘
        this.spriteManager.updateCharacterSprites({
            sprite: element.sprite
        });
    }
    
    /**
     * 更新场景元素但不记录到文本历史中
     * @param element 场景元素数据
     */
    public updateSceneElementsWithoutRecording(element: any): void {
        // 更新文本（不会记录到历史中）
        this.textManager.updateTextWithoutRecording({
            name: element.name,
            text: element.text
        });
        
        // 更新立绘
        this.spriteManager.updateCharacterSprites({
            sprite: element.sprite
        });
    }

    /**
     * 更新背景
     * @param element 场景元素数据
     */
    public updateBackground(element: any): void {
        if (element.background !== undefined) {
            this.backgroundManager.setBackground(element.background);
        }
    }

    /**
     * 更新音频
     * @param element 场景元素数据
     */
    public updateAudio(element: any): void {
        // 更新音效
        if (element.soundEffect) {
            this.audioManager.playSoundEffect(element.soundEffect);
        }

        // 更新背景音乐
        if (element.bgm !== undefined) {
            if (element.bgm === null) {
                this.audioManager.stopBackgroundMusic();
            } else {
                this.audioManager.updateBackgroundMusic(element.bgm);
            }
        }
    }

    /**
     * 创建场景元素容器（用于小游戏等场景）
     * @param container 父容器元素
     * @param element 场景元素数据
     * @returns 包含所有场景元素的容器
     */
    public createSceneElementsContainer(container: HTMLElement, element: any): HTMLElement {
        // 创建场景元素容器
        const elementsContainer = document.createElement('div');
        elementsContainer.className = 'scene-elements-container';
        elementsContainer.style.position = 'absolute';
        elementsContainer.style.top = '0';
        elementsContainer.style.left = '0';
        elementsContainer.style.width = '100%';
        elementsContainer.style.height = '100%';
        elementsContainer.style.pointerEvents = 'none';
        elementsContainer.style.zIndex = '1000';

        // 添加样式，与主场景保持一致
        const style = document.createElement('style');
        style.innerHTML = `
            .scene-elements-container #dialog {
                position: absolute;
                bottom: 2%;
                left: 3%;
                right: 3%;
                height: 22%;
                padding: 20px;
                
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%);
                border: 1px solid rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(25px);
                box-shadow: 
                    0 20px 40px rgba(0, 0, 0, 0.3),
                    0 8px 20px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
                color: #fff;
                border-radius: 20px;
                z-index: 15;
                transition: all 0.3s ease;
                pointer-events: auto;
            }

            .scene-elements-container #dialog:hover {
                box-shadow: 
                    0 25px 50px rgba(0, 0, 0, 0.4),
                    0 10px 25px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15);
                transform: translateY(-2px);
            }

            .scene-elements-container #text-box {
                position: absolute;
                bottom: 3%;
                left: 9%;
                right: 10%;
                width: 75%;
                height: 20%;
                z-index: 20;
            }

            .scene-elements-container #name {
                color: #f0e68c;
                font-family: 'Cinzel', 'Playfair Display', serif;
                font-size: 32px;
                text-align: left;
                text-shadow: 
                    0 2px 4px rgba(0, 0, 0, 0.8),
                    0 1px 2px rgba(0, 0, 0, 0.6);
                margin-top: 5px;
                margin-left: 5%;
                position: relative;
                z-index: 25;
                font-weight: 700;
                letter-spacing: 2px;
                transition: all 0.3s ease;
                text-transform: capitalize;
            }

            .scene-elements-container #name:hover {
                color: #ffd700;
                text-shadow: 
                    0 3px 6px rgba(0, 0, 0, 0.9),
                    0 2px 4px rgba(0, 0, 0, 0.7);
            }

            .scene-elements-container #texts {
                color: #ffffff;
                font-family: 'Libre Baskerville', 'Crimson Text', serif;
                font-size: 24px;
                text-align: left;
                text-shadow: 
                    0 2px 4px rgba(0, 0, 0, 0.8),
                    0 1px 2px rgba(0, 0, 0, 0.6);
                margin-left: 12%;
                margin-bottom: 20%;
                position: relative;
                z-index: 25;
                line-height: 1.6;
                font-weight: 400;
                transition: all 0.3s ease;
                letter-spacing: 0.5px;
            }

            .scene-elements-container #texts:hover {
                text-shadow: 
                    0 3px 6px rgba(0, 0, 0, 0.9),
                    0 2px 4px rgba(0, 0, 0, 0.7);
            }

            .scene-elements-container .character-sprite {
                position: absolute;
                bottom: -500px;
                height: 130%;
                transform: translateY(0);
                z-index: 5;
                opacity: 0;
                transition: all 0.3s ease-in-out;
                filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
                font-family: 'Libre Baskerville', 'Crimson Text', serif;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: bottom center;
            }
            
            .scene-elements-container .character-left {
                left: 5%;
                transform: translateX(-50px) translateY(0);
                transition: all 0.3s ease-in-out;
            }
            
            .scene-elements-container .character-center {
                left: 50%;
                transform: translateX(-50%) translateY(0);
                transition: all 0.3s ease-in-out;
            }
            
            .scene-elements-container .character-right {
                right: 5%;
                transform: translateX(50px) translateY(0);
                transition: all 0.3s ease-in-out;
            }
            
            .scene-elements-container .character-sprite.show {
                opacity: 1;
                transform: translateX(0) translateY(0);
                filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
            }
            
            .scene-elements-container .character-center.show {
                transform: translateX(-50%) translateY(0);
                filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
            }
            
            /* 菜单按钮样式 */
            .scene-elements-container #menu {
                position: absolute;
                bottom: 3%;
                right: 5%;
                width: auto;
                height: 3%;
                z-index: 20;
                display: flex;
                gap: 15px;
                align-items: center;
                pointer-events: auto;
            }
            
            .scene-elements-container .op {
                width: auto;
                height: 40px;
                padding: 0 20px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
                border: 1px solid rgba(255, 255, 255, 0.3);
                outline: none;
                border-radius: 20px;
                box-shadow: 
                    0 8px 20px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
                cursor: pointer;
                font-size: 16px;
                color: #fff;
                font-weight: 600;
                font-family: 'Crimson Text', 'Libre Baskerville', serif;
                transition: all 0.3s ease;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                position: relative;
                overflow: hidden;
                letter-spacing: 1px;
                text-transform: uppercase;
            }
            
            .scene-elements-container .op::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s ease;
            }
            
            .scene-elements-container .op:hover {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%);
                transform: translateY(-2px);
                box-shadow: 
                    0 12px 25px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3);
                border-color: rgba(255, 255, 255, 0.5);
            }
            
            .scene-elements-container .op:hover::before {
                left: 100%;
            }
            
            .scene-elements-container .op:active {
                transform: translateY(0);
                box-shadow: 
                    0 4px 10px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
        `;
        elementsContainer.appendChild(style);

        // 添加立绘
        if (element.sprite) {
            // 左侧立绘
            if (element.sprite.left) {
                const leftSprite = document.createElement('div');
                leftSprite.className = 'character-sprite character-left show';
                leftSprite.style.backgroundImage = `url('../../assets/images/sprite/${element.sprite.left}')`;
                elementsContainer.appendChild(leftSprite);
            }
            
            // 中间立绘
            if (element.sprite.center) {
                const centerSprite = document.createElement('div');
                centerSprite.className = 'character-sprite character-center show';
                centerSprite.style.backgroundImage = `url('../../assets/images/sprite/${element.sprite.center}')`;
                elementsContainer.appendChild(centerSprite);
            }
            
            // 右侧立绘
            if (element.sprite.right) {
                const rightSprite = document.createElement('div');
                rightSprite.className = 'character-sprite character-right show';
                rightSprite.style.backgroundImage = `url('../../assets/images/sprite/${element.sprite.right}')`;
                elementsContainer.appendChild(rightSprite);
            }
        }

        // 添加对话框
        const dialog = document.createElement('div');
        dialog.id = 'dialog';
        
        if (element.name && element.name !== "旁白") {
            const nameElement = document.createElement('div');
            nameElement.id = 'name';
            nameElement.textContent = element.name;
            dialog.appendChild(nameElement);
        }
        
        const textBox = document.createElement('div');
        textBox.id = 'text-box';
        
        const textElement = document.createElement('p');
        textElement.id = 'texts';
        textElement.textContent = element.text;
        textBox.appendChild(textElement);
        dialog.appendChild(textBox);
        
        elementsContainer.appendChild(dialog);

        // 添加菜单按钮
        const menu = document.createElement('div');
        menu.id = 'menu';
        
        // 创建按钮配置
        const buttons = [
            { id: 'op_return', text: 'return' },
            { id: 'op_log', text: 'log' },
            { id: 'op_load', text: 'load' },
            { id: 'op_auto', text: 'auto' },
            { id: 'op_skip', text: 'skip' },
            { id: 'op_bag', text: 'bag' },
            { id: 'op_back', text: 'back' }
        ];
        
        // 创建按钮
        buttons.forEach(buttonConfig => {
            const button = document.createElement('button');
            button.className = 'op';
            button.id = buttonConfig.id;
            button.innerHTML = `<strong>${buttonConfig.text}</strong>`;
            menu.appendChild(button);
        });
        
        elementsContainer.appendChild(menu);

        container.appendChild(elementsContainer);
        return elementsContainer;
    }


    /**
     * 初始化场景元素（在游戏开始时调用一次）
     */
    public initializeSceneElements(): void {
        console.log("[SceneManager] 初始化场景元素");
        
        // 创建移动区域
        if (!document.getElementById("move")) {
            const moveElement = document.createElement("div");
            moveElement.id = "move";
            document.body.appendChild(moveElement);
            console.log("[SceneManager] 创建move元素");
        }
        
        // 创建对话框区域
        if (!document.getElementById("dialog")) {
            const dialogElement = document.createElement("div");
            dialogElement.id = "dialog";
            document.body.appendChild(dialogElement);
            console.log("[SceneManager] 创建dialog元素");
        }
        
        // 创建选项容器
        if (!document.getElementById("selection_box")) {
            const selectionBox = document.createElement("div");
            selectionBox.id = "selection_box";
            selectionBox.style.display = "none";
            document.body.appendChild(selectionBox);
            console.log("[SceneManager] 创建selection_box元素");
        }
        
        // 创建菜单
        if (!document.getElementById("menu")) {
            const menu = document.createElement("div");
            menu.id = "menu";
            
            // 创建按钮配置
            const buttons = [
                { id: 'op_return', text: 'return' },
                { id: 'op_log', text: 'log' },
                { id: 'op_load', text: 'load' },
                { id: 'op_auto', text: 'auto' },
                { id: 'op_skip', text: 'skip' },
                { id: 'op_bag', text: 'bag' },
                { id: 'op_back', text: 'back' }
            ];
            
            // 创建按钮
            buttons.forEach(buttonConfig => {
                const button = document.createElement('button');
                button.className = 'op';
                button.id = buttonConfig.id;
                button.innerHTML = `<strong>${buttonConfig.text}</strong>`;
                menu.appendChild(button);
            });
            
            document.body.appendChild(menu);
            console.log("[SceneManager] 创建menu元素");
        }
        
        // 创建return弹窗
        if (!document.getElementById("return")) {
            const returnPopup = document.createElement("div");
            returnPopup.className = "menuwindow";
            returnPopup.id = "return";
            
            const title = document.createElement("h1");
            title.className = "menutitle";
            title.textContent = "是否返回标题";
            returnPopup.appendChild(title);
            
            const leftItem = document.createElement("div");
            leftItem.className = "menuitemleft";
            
            const yesButton = document.createElement("button");
            yesButton.type = "submit";
            yesButton.className = "btn";
            yesButton.id = "return_yes";
            yesButton.textContent = "YES";
            leftItem.appendChild(yesButton);
            returnPopup.appendChild(leftItem);
            
            const rightItem = document.createElement("div");
            rightItem.className = "menuitemright";
            
            const noButton = document.createElement("button");
            noButton.type = "submit";
            noButton.className = "btn";
            noButton.id = "return_no";
            noButton.textContent = "NO";
            rightItem.appendChild(noButton);
            returnPopup.appendChild(rightItem);
            
            document.body.appendChild(returnPopup);
            console.log("[SceneManager] 创建return弹窗");
        }
        
        // 创建skip弹窗
        if (!document.getElementById("skip")) {
            const skipPopup = document.createElement("div");
            skipPopup.className = "menuwindow";
            skipPopup.id = "skip";
            
            const title = document.createElement("h1");
            title.className = "menutitle";
            title.textContent = "是否跳过至下一选项/章节？";
            skipPopup.appendChild(title);
            
            const leftItem = document.createElement("div");
            leftItem.className = "menuitemleft";
            
            const yesButton = document.createElement("button");
            yesButton.type = "submit";
            yesButton.className = "btn";
            yesButton.id = "skip_yes";
            yesButton.textContent = "YES";
            leftItem.appendChild(yesButton);
            skipPopup.appendChild(leftItem);
            
            const rightItem = document.createElement("div");
            rightItem.className = "menuitemright";
            
            const noButton = document.createElement("button");
            noButton.type = "submit";
            noButton.className = "btn";
            noButton.id = "skip_no";
            noButton.textContent = "NO";
            rightItem.appendChild(noButton);
            skipPopup.appendChild(rightItem);
            
            document.body.appendChild(skipPopup);
            console.log("[SceneManager] 创建skip弹窗");
        } else {
            console.log("[SceneManager] skip弹窗已存在，跳过创建");
        }
        
        // 创建背包界面
        if (!document.getElementById("bag-overlay")) {
            const bagOverlay = document.createElement("div");
            bagOverlay.id = "bag-overlay";
            bagOverlay.className = "bag-overlay";
            bagOverlay.style.display = "none";
            
            const bagContainer = document.createElement("div");
            bagContainer.className = "bag-container";
            
            const bagHeader = document.createElement("div");
            bagHeader.className = "bag-header";
            
            const bagTitle = document.createElement("h2");
            bagTitle.textContent = "背包";
            bagHeader.appendChild(bagTitle);
            
            const closeButton = document.createElement("button");
            closeButton.id = "close-bag";
            closeButton.className = "close-button";
            closeButton.textContent = "X";
            bagHeader.appendChild(closeButton);
            
            bagContainer.appendChild(bagHeader);
            
            const bagContent = document.createElement("div");
            bagContent.className = "bag-content";
            
            const bagGrid = document.createElement("div");
            bagGrid.className = "bag-grid";
            bagGrid.id = "bag-grid";
            bagContent.appendChild(bagGrid);
            
            bagContainer.appendChild(bagContent);
            bagOverlay.appendChild(bagContainer);
            document.body.appendChild(bagOverlay);
            console.log("[SceneManager] 创建背包界面");
        }
        
        // 创建道具详情弹窗
        if (!document.getElementById("item-modal")) {
            const itemModal = document.createElement("div");
            itemModal.id = "item-modal";
            itemModal.className = "item-modal";
            itemModal.style.display = "none";
            
            const modalContent = document.createElement("div");
            modalContent.className = "modal-content";
            
            const closeModal = document.createElement("span");
            closeModal.className = "close-modal";
            closeModal.textContent = "×";
            modalContent.appendChild(closeModal);
            
            const itemName = document.createElement("h3");
            itemName.id = "modal-item-name";
            modalContent.appendChild(itemName);
            
            const itemDescription = document.createElement("p");
            itemDescription.id = "modal-item-description";
            modalContent.appendChild(itemDescription);
            
            itemModal.appendChild(modalContent);
            document.body.appendChild(itemModal);
            console.log("[SceneManager] 创建道具详情弹窗");
        }
        
        // 确保对话框结构正确
        this.ensureDialogStructure();
        console.log("[SceneManager] 场景元素初始化完成");
    }


    /**
     * 绑定场景事件
     * @param nextMoveCallback 点击下一步的回调函数
     * @param menuCallbacks 菜单按钮的回调函数对象
     * @param popupCallbacks 弹窗按钮的回调函数对象
     * @param bagCallbacks 背包相关回调函数对象
     */
    public bindSceneEvents(
        nextMoveCallback: () => void, 
        menuCallbacks?: {
            onReturn?: () => void,
            onLog?: () => void,
            onLoad?: () => void,
            onAuto?: () => void,
            onSkip?: () => void,
            onBag?: () => void,
            onBack?: () => void
        },
        popupCallbacks?: {
            onReturnYes?: () => void,
            onReturnNo?: () => void,
            onSkipYes?: () => void,
            onSkipNo?: () => void
        },
        bagCallbacks?: {
            onShowBag?: () => void,
            onCloseBag?: () => void,
            onShowItemModal?: (item: any) => void,
            onCloseItemModal?: () => void
        }
    ): void {
        console.log("[SceneManager] 开始绑定场景事件");
        
        // 确保DOM元素存在后再绑定事件
        const checkAndBind = () => {
            console.log("[SceneManager] 检查DOM元素是否存在...");
            const moveElement = document.getElementById("move");
            const dialogElement = document.getElementById("dialog");
            const textBoxElement = document.getElementById("text-box");

            // 如果关键元素不存在，等待一段时间后重试
            if (!moveElement || !dialogElement || !textBoxElement) {
                console.log("[SceneManager] DOM元素尚未加载完成，等待100ms后重试...");
                console.log("[SceneManager] moveElement:", moveElement, "dialogElement:", dialogElement, "textBoxElement:", textBoxElement);
                setTimeout(checkAndBind, 100);
                return;
            }

            console.log("[SceneManager] 所有DOM元素已找到，开始绑定事件");
            console.log("[SceneManager] moveElement:", moveElement, "dialogElement:", dialogElement, "textBoxElement:", textBoxElement);

            // 绑定点击事件
            const nextMoveHandler = () => {
                console.log("[SceneManager] 点击事件触发");
                // 检查是否显示了选项，如果显示了选项则不执行下一步
                const selectionBox = document.getElementById("selection_box");
                if (selectionBox) {
                    const isVisible = selectionBox.style.display !== "none" && 
                                     selectionBox.style.visibility !== "hidden" &&
                                     selectionBox.children.length > 0;
                    console.log("[SceneManager] 选项框状态 - display:", selectionBox.style.display, 
                                "visibility:", selectionBox.style.visibility, 
                                "子元素数量:", selectionBox.children.length,
                                "是否可见:", isVisible);
                    
                    if (isVisible) {
                        console.log("[SceneManager] 选项框可见，不执行下一步");
                        return; // 如果选项可见，则不执行下一步
                    }
                }
                
                console.log("[SceneManager] 调用nextMoveCallback");
                nextMoveCallback();
            };

            // 绑定点击事件到游戏区域
            if (moveElement) {
                moveElement.onclick = nextMoveHandler;
                console.log("[SceneManager] 已绑定moveElement点击事件");
            }
            if (dialogElement) {
                dialogElement.onclick = nextMoveHandler;
                console.log("[SceneManager] 已绑定dialogElement点击事件");
            }
            if (textBoxElement) {
                textBoxElement.onclick = nextMoveHandler;
                console.log("[SceneManager] 已绑定textBoxElement点击事件");
            }
            
            // 绑定键盘事件 - 空格键跳过剧情
            document.addEventListener('keydown', (event) => {
                // 检查是否按下了空格键
                if (event.code === 'Space') {
                    console.log("[SceneManager] 按下空格键");
                    // 阻止默认的空格键行为（页面滚动）
                    event.preventDefault();
                    
                    // 检查是否有弹窗或菜单打开，如果有则不执行跳过
                    const skipElement = document.getElementById("skip");
                    const returnElement = document.getElementById("return");
                    const bagOverlay = document.getElementById("bag-overlay");
                    const itemModal = document.getElementById("item-modal");
                    
                    const hasOpenModal = (skipElement && skipElement.classList.contains("active")) ||
                                       (returnElement && returnElement.classList.contains("active")) ||
                                       (bagOverlay && bagOverlay.style.display === "flex") ||
                                       (itemModal && itemModal.style.display === "flex");
                    
                    if (!hasOpenModal) {
                        console.log("[SceneManager] 没有打开的弹窗，继续处理空格键");
                        // 检查是否显示了选项，如果显示了选项则不执行下一步
                        const selectionBox = document.getElementById("selection_box");
                        if (selectionBox && selectionBox.style.display !== "none") {
                            console.log("[SceneManager] 选项框可见，不执行下一步");
                            return; // 如果选项可见，则不执行下一步
                        }
                        
                        console.log("[SceneManager] 调用nextMoveCallback（空格键）");
                        nextMoveCallback();
                    } else {
                        console.log("[SceneManager] 有打开的弹窗，忽略空格键");
                    }
                }
            });
            console.log("[SceneManager] 已绑定键盘事件");
            
            // 绑定菜单按钮事件
            if (menuCallbacks) {
                const returnButton = document.getElementById("op_return");
                const logButton = document.getElementById("op_log");
                const loadButton = document.getElementById("op_load");
                const autoButton = document.getElementById("op_auto");
                const skipButton = document.getElementById("op_skip");
                const bagButton = document.getElementById("op_bag");
                const backButton = document.getElementById("op_back");
                
                if (returnButton && menuCallbacks.onReturn) {
                    returnButton.onclick = menuCallbacks.onReturn;
                    console.log("[SceneManager] 已绑定returnButton点击事件");
                }
                
                if (logButton && menuCallbacks.onLog) {
                    logButton.onclick = menuCallbacks.onLog;
                    console.log("[SceneManager] 已绑定logButton点击事件");
                }
                
                if (loadButton && menuCallbacks.onLoad) {
                    loadButton.onclick = menuCallbacks.onLoad;
                    console.log("[SceneManager] 已绑定loadButton点击事件");
                }
                
                if (autoButton && menuCallbacks.onAuto) {
                    autoButton.onclick = menuCallbacks.onAuto;
                    console.log("[SceneManager] 已绑定autoButton点击事件");
                }
                
                if (skipButton && menuCallbacks.onSkip) {
                    skipButton.onclick = menuCallbacks.onSkip;
                    console.log("[SceneManager] 已绑定skipButton点击事件");
                }
                
                if (bagButton && menuCallbacks.onBag) {
                    bagButton.onclick = menuCallbacks.onBag;
                    console.log("[SceneManager] 已绑定bagButton点击事件");
                }
                
                if (backButton && menuCallbacks.onBack) {
                    backButton.onclick = menuCallbacks.onBack;
                    console.log("[SceneManager] 已绑定backButton点击事件");
                }
            }
            
            // 绑定弹窗按钮事件
            if (popupCallbacks) {
                // Return弹窗按钮
                const returnYes = document.getElementById("return_yes");
                const returnNo = document.getElementById("return_no");
                
                if (returnYes && popupCallbacks.onReturnYes) {
                    returnYes.onclick = popupCallbacks.onReturnYes;
                    console.log("[SceneManager] 已绑定return_yes点击事件");
                }
                
                if (returnNo && popupCallbacks.onReturnNo) {
                    returnNo.onclick = popupCallbacks.onReturnNo;
                    console.log("[SceneManager] 已绑定return_no点击事件");
                }
                
                // Skip弹窗按钮
                const skipYes = document.getElementById("skip_yes");
                const skipNo = document.getElementById("skip_no");
                
                console.log("[SceneManager] 查找skip按钮元素:", skipYes, skipNo);
                
                if (skipYes && popupCallbacks.onSkipYes) {
                    skipYes.onclick = popupCallbacks.onSkipYes;
                    console.log("[SceneManager] 已绑定skip_yes点击事件");
                } else {
                    console.log("[SceneManager] skip_yes按钮或回调函数不存在");
                }
                
                if (skipNo && popupCallbacks.onSkipNo) {
                    skipNo.onclick = popupCallbacks.onSkipNo;
                    console.log("[SceneManager] 已绑定skip_no点击事件");
                } else {
                    console.log("[SceneManager] skip_no按钮或回调函数不存在");
                }
            }
            
            // 绑定背包相关事件
            if (bagCallbacks) {
                // 背包关闭按钮
                const closeBagButton = document.getElementById("close-bag");
                if (closeBagButton && bagCallbacks.onCloseBag) {
                    closeBagButton.onclick = bagCallbacks.onCloseBag;
                    console.log("[SceneManager] 已绑定closeBagButton点击事件");
                }
                
                // 背包覆盖层点击事件
                const bagOverlay = document.getElementById("bag-overlay");
                if (bagOverlay && bagCallbacks.onCloseBag) {
                    bagOverlay.onclick = (event) => {
                        if (event.target === bagOverlay && bagCallbacks.onCloseBag) {
                            bagCallbacks.onCloseBag();
                        }
                    };
                    console.log("[SceneManager] 已绑定bagOverlay点击事件");
                }
                
                // 道具详情弹窗关闭按钮
                const closeModal = document.querySelector(".close-modal");
                if (closeModal && bagCallbacks.onCloseItemModal) {
                    closeModal.addEventListener("click", bagCallbacks.onCloseItemModal);
                    console.log("[SceneManager] 已绑定closeModal点击事件");
                }
                
                // 道具详情弹窗覆盖层点击事件
                const itemModal = document.getElementById("item-modal");
                if (itemModal && bagCallbacks.onCloseItemModal) {
                    itemModal.onclick = (event) => {
                        if (event.target === itemModal && bagCallbacks.onCloseItemModal) {
                            bagCallbacks.onCloseItemModal();
                        }
                    };
                    console.log("[SceneManager] 已绑定itemModal点击事件");
                }
            }
            
            console.log("[SceneManager] 事件绑定完成");
        };

        // 开始检查和绑定过程
        checkAndBind();
    }

    /**
     * 确保对话框结构正确
     */
    public ensureDialogStructure(): void {
        console.log("[SceneManager] 确保对话框结构正确");
        
        // 检查并创建对话框结构
        const dialogElement = document.getElementById("dialog");
        const textBoxElement = document.getElementById("text-box");
        const nameElement = document.getElementById("name");
        const textsElement = document.getElementById("texts");
        
        if (dialogElement && !textBoxElement) {
            console.log("[SceneManager] 创建text-box元素");
            const textBox = document.createElement("div");
            textBox.id = "text-box";
            
            // 创建name元素（如果不存在）
            if (!nameElement) {
                console.log("[SceneManager] 创建name元素");
                const name = document.createElement("p");
                name.id = "name";
                textBox.appendChild(name);
            }
            
            // 创建texts元素（如果不存在）
            if (!textsElement) {
                console.log("[SceneManager] 创建texts元素");
                const texts = document.createElement("p");
                texts.id = "texts";
                textBox.appendChild(texts);
            }
            
            dialogElement.appendChild(textBox);
        }
        
        console.log("[SceneManager] 对话框结构检查完成");
    }

    /**
     * 清除所有立绘
     */
    public clearAllSprites(): void {
        this.spriteManager.clearAllSprites();
    }

    /**
     * 重置所有管理器
     */
    public reset(): void {
        this.clearAllSprites();
        // 其他重置逻辑可根据需要添加
    }
}