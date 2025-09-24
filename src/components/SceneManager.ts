import { TextManager } from './TextManager';
import { SpriteManager } from './SpriteManager';
import { AudioManager } from './AudioManager';
import { BackgroundManager } from './BackgroundManager';

// 导入场景相关CSS样式
import './dialog-box/scene-sprite.css';
import './dialog-box/scene-dialog.css';
import './dialog-box/scene-menu.css';

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
        
        // 确保对话框结构正确
        this.ensureDialogStructure();

        this.textManager = new TextManager();
        this.spriteManager = new SpriteManager();
        this.audioManager = new AudioManager();
        this.backgroundManager = new BackgroundManager();
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
        elementsContainer.style.zIndex = '1001'; // 确保高于小游戏容器但低于覆盖层

        // 添加立绘元素到当前容器中
        if (element.sprite) {
            // 创建左侧立绘
            if (element.sprite.left !== undefined) {
                const leftSprite = document.createElement('img');
                leftSprite.id = 'left-sprite';
                leftSprite.className = 'sprite left';
                leftSprite.src = element.sprite.left ?
                    `../../assets/images/sprite/${element.sprite.left}` :
                    '../../assets/images/none.png';
                leftSprite.alt = 'Left Sprite';
                leftSprite.style.display = element.sprite.left ? 'block' : 'none'; // 统一显示方式
                if (element.sprite.left) {
                    setTimeout(() => leftSprite.classList.add('show'), 10);
                }
                elementsContainer.appendChild(leftSprite);
            }

            // 创建中间立绘
            if (element.sprite.center !== undefined) {
                const centerSprite = document.createElement('img');
                centerSprite.id = 'center-sprite';
                centerSprite.className = 'sprite center';
                centerSprite.src = element.sprite.center ?
                    `../../assets/images/sprite/${element.sprite.center}` :
                    '../../assets/images/none.png';
                centerSprite.alt = 'Center Sprite';
                centerSprite.style.display = element.sprite.center ? 'block' : 'none'; // 统一显示方式
                if (element.sprite.center) {
                    setTimeout(() => centerSprite.classList.add('show'), 10);
                }
                elementsContainer.appendChild(centerSprite);
            }

            // 创建右侧立绘
            if (element.sprite.right !== undefined) {
                const rightSprite = document.createElement('img');
                rightSprite.id = 'right-sprite';
                rightSprite.className = 'sprite right';
                rightSprite.src = element.sprite.right ?
                    `../../assets/images/sprite/${element.sprite.right}` :
                    '../../assets/images/none.png';
                rightSprite.alt = 'Right Sprite';
                rightSprite.style.display = element.sprite.right ? 'block' : 'none'; // 统一显示方式
                if (element.sprite.right) {
                    setTimeout(() => rightSprite.classList.add('show'), 10);
                }
                elementsContainer.appendChild(rightSprite);
            }
        }

        // 添加对话框和文本框（使用统一的创建逻辑）
        const dialog = this.createDialogElement(element);
        elementsContainer.appendChild(dialog);

        // 添加菜单按钮
        const menu = document.createElement('div');
        menu.id = 'menu';
        // 确保菜单可以接收鼠标事件
        menu.style.pointerEvents = 'auto';

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

            // 确保按钮可以接收鼠标事件
            button.style.pointerEvents = 'auto';

            // 添加事件处理，阻止事件冒泡到覆盖层
            button.addEventListener('click', (e) => {
                console.log('[SceneManager] 按钮被点击:', buttonConfig.id);

                // 检查是否在小游戏中
                const isInMiniGame = container.closest && container.closest('#minigame-elements-container');
                if (isInMiniGame) {
                    // 在小游戏中，处理特定按钮功能
                    if (buttonConfig.id === 'op_return') {
                        console.log('[SceneManager] 处理小游戏中的return按钮');
                        // 显示确认返回弹窗
                        const returnPopup = document.getElementById("return");
                        if (returnPopup) {
                            console.log('[SceneManager] 显示return弹窗');
                            returnPopup.classList.add("active");
                            returnPopup.style.display = "flex";
                            // 确保弹窗在最上层显示
                            returnPopup.style.zIndex = "1005";
                        } else {
                            console.log('[SceneManager] 未找到return弹窗元素');
                        }
                        // 只有在这种情况下才阻止事件冒泡
                        e.stopPropagation();
                    } else if (buttonConfig.id === 'op_bag') {
                        console.log('[SceneManager] 处理小游戏中的bag按钮');
                        // 显示背包界面
                        const bagOverlay = document.getElementById("bag-overlay");
                        if (bagOverlay) {
                            console.log('[SceneManager] 显示背包界面');
                            bagOverlay.style.display = "flex";
                            // 确保背包界面在最上层显示
                            bagOverlay.style.zIndex = "1004";
                        } else {
                            console.log('[SceneManager] 未找到背包界面元素');
                        }
                        // 只有在这种情况下才阻止事件冒泡
                        e.stopPropagation();
                    } else if (buttonConfig.id !== 'op_bag' && buttonConfig.id !== 'op_return') {
                        // 禁用的按钮
                        console.log('[SceneManager] 点击了禁用按钮，已阻止:', buttonConfig.id);
                        e.stopPropagation(); // 只在这种情况下阻止冒泡
                        return false;
                    }
                }
            });

            // 检查是否在小游戏中，通过检查容器是否在#minigame-elements-container内
            const isInMiniGame = container.closest && container.closest('#minigame-elements-container');
            console.log('[SceneManager] 创建按钮:', buttonConfig.id, '是否在小游戏中:', isInMiniGame);

            if (isInMiniGame) {
                // 在小游戏中，只有bag和return按钮可用，其他按钮设为禁用状态
                if (buttonConfig.id !== 'op_bag' && buttonConfig.id !== 'op_return') {
                    console.log('[SceneManager] 禁用按钮:', buttonConfig.id);
                    // 设置禁用状态样式
                    button.style.opacity = '0.5';
                    button.style.cursor = 'not-allowed';
                    button.disabled = true;
                }
            }

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

        // 创建左侧立绘
        if (!document.getElementById("left-sprite")) {
            const leftSprite = document.createElement("img");
            leftSprite.id = "left-sprite";
            leftSprite.className = "sprite left";
            leftSprite.src = "../../assets/images/none.png";
            leftSprite.alt = "Left Sprite";
            leftSprite.style.display = "block";
            document.body.appendChild(leftSprite);
            console.log("[SceneManager] 创建left-sprite元素");
        }

        // 创建中间立绘
        if (!document.getElementById("center-sprite")) {
            const centerSprite = document.createElement("img");
            centerSprite.id = "center-sprite";
            centerSprite.className = "sprite center";
            centerSprite.src = "../../assets/images/none.png";
            centerSprite.alt = "Center Sprite";
            centerSprite.style.display = "block";
            document.body.appendChild(centerSprite);
            console.log("[SceneManager] 创建center-sprite元素");
        }

        // 创建右侧立绘
        if (!document.getElementById("right-sprite")) {
            const rightSprite = document.createElement("img");
            rightSprite.id = "right-sprite";
            rightSprite.className = "sprite right";
            rightSprite.src = "../../assets/images/none.png";
            rightSprite.alt = "Right Sprite";
            rightSprite.style.display = "block";
            document.body.appendChild(rightSprite);
            console.log("[SceneManager] 创建right-sprite元素");
        }

        // 创建对话框区域
        let dialogElement = document.getElementById("dialog");
        if (!dialogElement) {
            dialogElement = document.createElement("div");
            dialogElement.id = "dialog";
            // 添加scene-elements-container类以应用CSS样式
            dialogElement.className = 'scene-elements-container';
            document.body.appendChild(dialogElement);
            console.log("[SceneManager] 创建dialog元素");
        }

        // 确保对话框结构正确
        this.ensureDialogStructure();

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
            // 添加scene-elements-container类以应用CSS样式
            menu.className = 'scene-elements-container';

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
            // 确保弹窗的z-index高于小游戏容器
            returnPopup.style.zIndex = "1005";

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

            const nextMoveHandler = (event: Event) => {
                console.log("[SceneManager] 点击事件触发", event.target);
                // 阻止事件冒泡
                event.stopPropagation();

                // 检查是否在小游戏或视频播放中
                const miniGameContainer = document.getElementById("mini-game-container");
                const videoContainer = document.getElementById("video-container");
                const isInMiniGame = miniGameContainer && miniGameContainer.style.display !== 'none';
                const isPlayingVideo = videoContainer && videoContainer.style.display !== 'none';

                // 如果在小游戏或视频播放中，则不处理点击事件
                if (isInMiniGame || isPlayingVideo) {
                    console.log("[SceneManager] 在小游戏或视频播放中，忽略点击事件");
                    return;
                }
                
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
            // 保存之前事件处理函数的引用，以便后续移除
            const previousMoveHandler = (moveElement as any)._nextMoveHandler;
            const previousDialogHandler = (dialogElement as any)._nextMoveHandler;
            const previousTextBoxHandler = (textBoxElement as any)._nextMoveHandler;

            // 移除之前的事件监听器（如果有的话）
            if (moveElement && previousMoveHandler) {
                moveElement.removeEventListener('click', previousMoveHandler);
            }
            if (dialogElement && previousDialogHandler) {
                dialogElement.removeEventListener('click', previousDialogHandler);
            }
            if (textBoxElement && previousTextBoxHandler) {
                textBoxElement.removeEventListener('click', previousTextBoxHandler);
            }

            // 绑定点击事件到游戏区域
            if (moveElement) {
                moveElement.addEventListener('click', nextMoveHandler);
                (moveElement as any)._nextMoveHandler = nextMoveHandler;
                console.log("[SceneManager] 已绑定moveElement点击事件");
            }
            if (dialogElement) {
                dialogElement.addEventListener('click', nextMoveHandler);
                (dialogElement as any)._nextMoveHandler = nextMoveHandler;
                console.log("[SceneManager] 已绑定dialogElement点击事件");
            }
            if (textBoxElement) {
                textBoxElement.addEventListener('click', nextMoveHandler);
                (textBoxElement as any)._nextMoveHandler = nextMoveHandler;
                console.log("[SceneManager] 已绑定textBoxElement点击事件");
            }

            // 绑定键盘事件 - 空格键跳过剧情
            const handleKeyDown = (event: KeyboardEvent) => {
                // 检查是否按下了空格键
                if (event.code === 'Space') {
                    console.log("[SceneManager] 按下空格键");
                    // 阻止默认的空格键行为（页面滚动）
                    event.preventDefault();

                    // 检查是否在小游戏或视频播放中
                    const miniGameContainer = document.getElementById("mini-game-container");
                    const videoContainer = document.getElementById("video-container");
                    const isInMiniGame = miniGameContainer && miniGameContainer.style.display !== 'none';
                    const isPlayingVideo = videoContainer && videoContainer.style.display !== 'none';

                    // 如果在小游戏或视频播放中，则不处理空格键
                    if (isInMiniGame || isPlayingVideo) {
                        console.log("[SceneManager] 在小游戏或视频播放中，忽略空格键");
                        return;
                    }

                    // 检查是否正在淡入小游戏或视频
                    // 通过全局属性获取GameScene实例
                    const gameScene = (window as any).gameSceneInstance;
                    if (gameScene) {
                        if (gameScene.isMiniGameFadingIn || gameScene.isVideoFadingIn) {
                            console.log("[SceneManager] 正在淡入小游戏或视频，忽略空格键");
                            return;
                        }
                    }

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

                        console.log("[SceneManager] 调用nextMoveCallback（空格键）");
                        nextMoveCallback();
                    } else {
                        console.log("[SceneManager] 有打开的弹窗，忽略空格键");
                    }
                }
            };
            // 移除可能存在的旧事件监听器，避免重复绑定
            document.removeEventListener('keydown', handleKeyDown as EventListener);
            document.addEventListener('keydown', handleKeyDown as EventListener);
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
        } else if (!dialogElement) {
            // 如果连dialog元素都不存在，则创建完整结构
            console.log("[SceneManager] 创建完整对话框结构");
            const dialog = document.createElement("div");
            dialog.id = "dialog";
            
            const textBox = document.createElement("div");
            textBox.id = "text-box";
            
            const name = document.createElement("p");
            name.id = "name";
            
            const texts = document.createElement("p");
            texts.id = "texts";
            
            textBox.appendChild(name);
            textBox.appendChild(texts);
            dialog.appendChild(textBox);
            document.body.appendChild(dialog);
        } else if (textBoxElement) {
            // 确保所有子元素存在
            if (!nameElement) {
                console.log("[SceneManager] 为已存在的text-box创建name元素");
                const name = document.createElement("p");
                name.id = "name";
                textBoxElement.appendChild(name);
            }
            
            if (!textsElement) {
                console.log("[SceneManager] 为已存在的text-box创建texts元素");
                const texts = document.createElement("p");
                texts.id = "texts";
                textBoxElement.appendChild(texts);
            }
        }

        console.log("[SceneManager] 对话框结构检查完成");
    }

    /**
     * 创建对话框元素
     * @param element 包含对话框信息的场景元素
     * @returns 对话框容器元素
     */
    private createDialogElement(element: any): HTMLElement {
        // 创建对话框和文本框（与主场景结构保持一致）
        const dialog = document.createElement('div');
        dialog.id = 'dialog';

        const textBox = document.createElement('div');
        textBox.id = 'text-box';

        if (element.name && element.name !== "旁白") {
            const nameElement = document.createElement('p');
            nameElement.id = 'name';
            nameElement.textContent = element.name;
            textBox.appendChild(nameElement);
        }

        const textElement = document.createElement('p');
        textElement.id = 'texts';
        textElement.textContent = element.text;
        textBox.appendChild(textElement);
        
        dialog.appendChild(textBox);
        return dialog;
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