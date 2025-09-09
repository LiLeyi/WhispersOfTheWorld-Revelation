import { Scene, SceneNode, SceneElement } from '../../types/SceneTypes';
import "./game_scenes.css"
import { ChoiceManager } from '../../components/ChoiceManager';
import { SceneRegistry } from '../../story/SceneRegistry';
import { ArchiveManager } from '../../components/ArchiveManager';
import { MiniGameFactory } from '../../components/MiniGameFactory';
import { SceneManager } from '../../components/SceneManager';
import { BagManager } from '../../components/BagManager';

// 导入场景相关CSS样式
import '../../components/dialog-box/scene-sprite.css';
import '../../components/dialog-box/scene-dialog.css';
import '../../components/dialog-box/scene-menu.css';

class GameScene {
    private currentScene: Scene | null = null;
    private currentNodeIndex: number = 0;
    private currentState: any = {};
    private clickCount: number = 0;
    private autoClickInterval: number | null = null;
    private sceneManager: SceneManager;
    private choiceManager: ChoiceManager;
    private bagManager: BagManager;
    private previousElements: SceneElement = {
        background: undefined,
        soundEffect: undefined,
        bgm: undefined,
        name: undefined,
        text: "",
    };

    // 在GameScene类中添加小游戏容器
    private miniGameContainer: HTMLDivElement = document.createElement('div');

    constructor() {
        this.sceneManager = new SceneManager();
        this.choiceManager = new ChoiceManager();
        this.bagManager = BagManager.getInstance();
        
        // 初始化场景元素
        this.sceneManager.initializeSceneElements();
        
        // 等待DOM加载完成后初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    private init(): void {
        console.log("[GameScene] 开始初始化游戏场景");

        // 创建小游戏容器
        this.miniGameContainer.id = 'mini-game-container';
        this.miniGameContainer.style.display = 'none';
        document.body.appendChild(this.miniGameContainer);
        console.log("[GameScene] 小游戏容器已创建");

        // 添加键盘事件监听器，包括 ESC 键来触发暂停菜单
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.togglePauseMenu();
            }
        });

        // 监听页面可见性变化，当页面失去焦点时自动暂停
        document.addEventListener('visibilitychange', () => {
            console.log("[GameScene] visibilitychange event, hidden:", document.hidden);
            if (document.hidden) {
                this.handleAutoPause();
            }
        });

        // 监听窗口失去焦点事件，当打开其他窗口时自动暂停
        window.addEventListener('blur', () => {
            console.log("[GameScene] window blur event");
            // 延迟执行，确保状态正确
            setTimeout(() => {
                this.handleAutoPause();
            }, 100);
        });

        // 监听窗口获得焦点事件
        window.addEventListener('focus', () => {
            console.log("[GameScene] window focus event");
        });
        // 从URL参数获取存档ID
        const urlParams = new URLSearchParams(window.location.search);
        // 手动构建参数对象以避免使用不兼容的API
        const paramsObj: Record<string, string> = {};
        urlParams.forEach((value, key) => {
            paramsObj[key] = value;
        });
        console.log("[GameScene] URL参数:", paramsObj);

        // 如果URL中没有存档ID，则尝试从localStorage获取，否则生成新的
        let archiveId = urlParams.get('archiveId');
        if (!archiveId) {
            archiveId = localStorage.getItem('currentArchiveId') || 'default_' + Date.now();
        }

        // 保存当前存档ID到localStorage
        localStorage.setItem('currentArchiveId', archiveId);

        // 设置当前存档ID并刷新ArchiveManager实例
        ArchiveManager.setCurrentArchiveId(archiveId);

        // 设置TextManager的存档ID
        this.sceneManager.getTextManager().setCurrentArchiveId(archiveId);

        console.log(`[GameScene] 使用存档ID: ${archiveId}`);

        console.log("[GameScene] 开始绑定事件");
        this.sceneManager.bindSceneEvents(
            () => this.nextMove(),
            {
                onReturn: () => {
                    const returnElement = document.getElementById("return");
                    if (returnElement) {
                        returnElement.classList.toggle("active");
                    }
                },
                onLog: () => this.redirectToNewPage("../log_page/log_page.html"),
                onLoad: () => this.redirectToNewPage("../archive_page/archive_page.html"),
                onAuto: () => this.startAutoClick(),
                onSkip: () => {
                    const skipElement = document.getElementById("skip");
                    console.log("[GameScene] 点击skip按钮，当前skip元素:", skipElement);
                    if (skipElement) {
                        const isActive = skipElement.classList.contains("active");
                        console.log("[GameScene] skip元素当前active状态:", isActive);
                        skipElement.classList.toggle("active");
                        console.log("[GameScene] 切换后skip元素active状态:", skipElement.classList.contains("active"));
                    }
                },
                onBag: () => this.bagManager.toggleBag(),
                onBack: () => this.goBackToPreviousNode()
            },
            {
                onReturnYes: () => {
                    window.location.href = "../main_menu/main_menu.html";
                },
                onReturnNo: () => {
                    const returnElement = document.getElementById("return");
                    if (returnElement) {
                        returnElement.classList.remove("active");
                    }
                },
            onSkipYes: () => {
                console.log("[GameScene] 收到skipYes点击事件");
                // 检查是否显示了选项，如果显示了选项则不执行跳过
                const selectionBox = document.getElementById("selection_box");
                if (selectionBox) {
                    const isVisible = selectionBox.style.display !== "none" &&
                        selectionBox.style.visibility !== "hidden" &&
                        selectionBox.children.length > 0;
                    console.log("[GameScene] 选项框状态 - display:", selectionBox.style.display,
                        "visibility:", selectionBox.style.visibility,
                        "子元素数量:", selectionBox.children.length,
                        "是否可见:", isVisible);
                        
                    if (isVisible) {
                        console.log("[GameScene] 选项框可见，不执行跳过");
                        const skipElement = document.getElementById("skip");
                        if (skipElement) {
                            skipElement.classList.remove("active");
                        }
                        return; // 如果选项可见，则不执行跳过
                    }
                }
                
                // 如果正在等待用户选择，则不允许继续跳过
                if ((this as any).waitingForChoice) {
                    console.log("[GameScene] 正在等待用户选择，不执行跳过");
                    const skipElement = document.getElementById("skip");
                    if (skipElement) {
                        skipElement.classList.remove("active");
                    }
                    return;
                }
                
                console.log("[GameScene] 当前场景:", this.currentScene);
                if (this.currentScene) {
                    // 查找下一个有选项的节点，同时考虑分支条件
                    let nextChoiceNodeIndex = -1;
                    console.log("[GameScene] 开始查找下一个选项节点，当前索引:", this.currentNodeIndex);
                    console.log("[GameScene] 场景节点总数:", this.currentScene.nodes.length);
                    for (let i = this.currentNodeIndex + 1; i < this.currentScene.nodes.length; i++) {
                        const node = this.currentScene.nodes[i];
                        console.log("[GameScene] 检查节点", i, ":", node);
                        // 检查节点是否有选项且满足条件
                        if (node.choices && node.choices.length > 0) {
                            console.log("[GameScene] 节点", i, "有选项");
                            // 检查节点条件（如果有的话）
                            if (!node.condition || node.condition()) {
                                console.log("[GameScene] 节点", i, "条件满足");
                                nextChoiceNodeIndex = i;
                                break;
                            } else {
                                console.log("[GameScene] 节点", i, "条件不满足");
                            }
                        } else {
                            console.log("[GameScene] 节点", i, "没有选项");
                        }
                    }
                    
                    // 如果找到了有选项的节点，则跳转到该节点；否则跳转到章节末尾
                    if (nextChoiceNodeIndex !== -1) {
                        console.log("[GameScene] 找到下一个选项节点，索引:", nextChoiceNodeIndex);
                        this.currentNodeIndex = nextChoiceNodeIndex;
                        // 添加标记，表示用户已跳转到选项节点
                        (this as any).waitingForChoice = true;
                        console.log("[GameScene] 设置waitingForChoice为true");
                    } else {
                        console.log("[GameScene] 未找到选项节点，跳转到章节末尾");
                        this.currentNodeIndex = this.currentScene.nodes.length - 1;
                    }
                    this.clickCount = this.currentNodeIndex;
                    localStorage.setItem("nowclick", this.clickCount.toString());
                    console.log("[GameScene] 更新clickCount:", this.clickCount);
                    this.renderCurrentNode();
                }
                const skipElement = document.getElementById("skip");
                if (skipElement) {
                    console.log("[GameScene] 关闭skip弹窗");
                    skipElement.classList.remove("active");
                }
            },
                onSkipNo: () => {
                    const skipElement = document.getElementById("skip");
                    if (skipElement) {
                        skipElement.classList.remove("active");
                    }
                }
            },
            {
                onShowBag: () => this.bagManager.toggleBag(),
                onCloseBag: () => {
                    const bagOverlay = document.getElementById("bag-overlay");
                    if (bagOverlay) {
                        bagOverlay.style.display = "none";
                    }
                },
                onShowItemModal: (item: any) => this.bagManager.showItemModal(item),
                onCloseItemModal: () => {
                    const modal = document.getElementById("item-modal");
                    if (modal) {
                        modal.style.display = "none";
                    }
                }
            }
        );

        // 添加页面卸载事件监听器，清理自动播放定时器
        window.addEventListener('beforeunload', () => {
            if (this.autoClickInterval) {
                clearInterval(this.autoClickInterval);
                this.autoClickInterval = null;
            }
        });

        // 从URL或localStorage中获取点击次数
        const sceneParam = urlParams.get('scene');
        const clickParam = urlParams.get('click');

        this.clickCount = clickParam ? parseInt(clickParam) :
            parseInt(localStorage.getItem("nowclick") || "0") || 0;

        console.log(`[GameScene] 场景参数: ${sceneParam}, 点击参数: ${clickParam}, 当前点击数: ${this.clickCount}`);

        // 检查是否是从存档页面进入（通过referrer参数判断）
        const referrer = urlParams.get("referrer");
        const isFromArchive = referrer && referrer.includes("archive_page");

        // 检查是否明确要开始新游戏（通过查询参数判断）
        const isNewGameParam = urlParams.get("newGame");
        const isNewGameRequested = isNewGameParam === "true";

        // 判断是否是新游戏：没有场景参数且点击次数为0，或者明确要求新游戏且不是从存档进入
        const isNewGame = (!sceneParam && this.clickCount === 0) || (isNewGameRequested && !isFromArchive);

        console.log("游戏初始化参数:", {
            sceneParam,
            clickParam,
            thisClickCount: this.clickCount,
            referrer,
            isFromArchive,
            isNewGameParam,
            isNewGameRequested,
            isNewGame,
            sessionStorageIsNewGame: sessionStorage.getItem("isNewGame")
        });

        if (isNewGame) {
            console.log("检测为新游戏，清除所有状态");
            // 开始新游戏时，清除所有之前保存的状态
            localStorage.removeItem("previousElements");
            localStorage.removeItem("MSYbackgroundIMG");
            // 清除存档数据
            const archiveManager = ArchiveManager.getInstance();
            archiveManager.clearAll();
            this.previousElements = {
                background: undefined,
                soundEffect: undefined,
                bgm: undefined,
                name: undefined,
                text: "",
            };

            // 清除当前存档的文本历史记录
            this.sceneManager.getTextManager().clearTextHistory();

            // 设置新游戏标记，防止后续被误判
            sessionStorage.setItem("isNewGame", "true");
        } else {
            // 如果不是新游戏，清除新游戏标记
            sessionStorage.removeItem("isNewGame");
            console.log("不是新游戏，保留现有状态");
        }

        // 标记是否为新游戏，供loadScene方法使用
        (this as any)._isNewGame = isNewGame;

        console.log("isNewGame标记:", (this as any)._isNewGame);

        // 立即清除所有立绘（在任何加载操作之前）
        this.sceneManager.clearAllSprites();

        // 根据URL参数加载场景
        if (sceneParam) {
            console.log(`[GameScene] 根据URL参数加载场景: ${sceneParam}`);
            this.loadSceneByName(sceneParam);
        } else {
            // 默认加载第0章起始场景
            console.log(`[GameScene] 加载默认场景: chapter_0_scene_0`);
            this.loadSceneByName('chapter_0_scene_0');
        }
    }


    private redirectToNewPage(nextpage: string): void {
        const nextPageURL = nextpage + "?referrer=" + encodeURIComponent(window.location.href);
        window.location.href = nextPageURL;
    }

    private async loadSceneByName(sceneName: string): Promise<void> {
        console.log(`[GameScene] 开始加载场景: ${sceneName}`);

        let sceneModule: any;

        // 每次加载新场景时清除所有立绘
        this.sceneManager.clearAllSprites();

        // 从URL参数获取存档ID并确保ArchiveManager使用正确的存档
        const urlParams = new URLSearchParams(window.location.search);
        let archiveId = urlParams.get('archiveId');
        if (!archiveId) {
            archiveId = localStorage.getItem('currentArchiveId') || 'default_' + Date.now();
        }
        ArchiveManager.setCurrentArchiveId(archiveId);
        // 同时更新TextManager的存档ID

        this.sceneManager.getTextManager().setCurrentArchiveId(archiveId);
        // 从场景注册表中加载场景
        if (SceneRegistry[sceneName]) {
            try {
                console.log(`[GameScene] 从注册表加载场景: ${sceneName}`);
                sceneModule = await SceneRegistry[sceneName]();
                console.log(`[GameScene] 场景模块加载完成:`, sceneModule);
                this.loadScene(sceneModule.default);
            } catch (error) {
                console.error(`[GameScene] 加载场景失败: ${sceneName}`, error);
                // 回退到默认场景
                sceneModule = await SceneRegistry['chapter_0_scene_0']();
                this.loadScene(sceneModule.default);
            }
        } else {
            // 如果场景未注册，回退到默认场景
            console.warn(`[GameScene] 场景未在注册表中找到: ${sceneName}，加载默认场景`);
            sceneModule = await SceneRegistry['chapter_0_scene_0']();
            this.loadScene(sceneModule.default);
        }
    }

    public loadScene(scene: Scene): void {
        console.log("[GameScene] loadScene开始，场景:", scene, "isNewGame标记:", (this as any)._isNewGame);
        this.currentScene = scene;
        // 移除initialState的使用，因为我们现在使用ArchiveManager管理状态
        this.currentState = {};

        // 如果是新游戏，确保清除所有立绘
        if ((this as any)._isNewGame) {
            console.log("新游戏，清除所有立绘");
            this.sceneManager.clearAllSprites();
        }

        // 设置choiceManager的回调函数
        this.choiceManager.setCurrentScene(scene);
        this.choiceManager.setRenderCurrentNodeCallback(() => this.renderCurrentNode());
        this.choiceManager.setNavigateToSceneCallback((sceneId) => this.navigateToScene(sceneId));
        this.choiceManager.setGetCurrentNodeIndexCallback(() => this.currentNodeIndex);
        this.choiceManager.setSetCurrentNodeIndexCallback((index) => { this.currentNodeIndex = index; });
        this.choiceManager.setGetCurrentNodeCallback(() => this.getCurrentNode());
        // 添加TextManager引用
        this.choiceManager.setTextManager(this.sceneManager.getTextManager());

        // 从localStorage恢复previousElements状态，确保读档时能正确继承所有元素
        const savedPreviousElements = localStorage.getItem("previousElements");
        console.log("检查savedPreviousElements:", savedPreviousElements, "isNewGame:", (this as any)._isNewGame);

        // 加强新游戏判断逻辑 - 即使有保存的数据，如果是新游戏也要忽略
        if (savedPreviousElements && !(this as any)._isNewGame) {
            console.log("从localStorage恢复previousElements");
            try {
                this.previousElements = JSON.parse(savedPreviousElements);
                console.log("恢复的previousElements:", this.previousElements);
                // 不再清除sprite信息，而是保留它以确保读档后立绘能正确显示
                // if (this.previousElements.sprite) {
                //     this.previousElements.sprite = undefined;
                // }
            } catch (e) {
                console.error("无法解析保存的previousElements", e);
                // 如果解析失败，使用默认值并尝试恢复背景
                const savedBackground = localStorage.getItem("MSYbackgroundIMG") || undefined;
                this.previousElements = {
                    background: savedBackground,
                    soundEffect: undefined,
                    bgm: undefined,
                    name: undefined,
                    text: "",
                };
            }
        } else {
            console.log("使用默认previousElements");
            // 如果没有保存的previousElements，或这是新游戏，使用默认值
            const savedBackground = localStorage.getItem("MSYbackgroundIMG") || undefined;
            this.previousElements = {
                background: savedBackground,
                soundEffect: undefined,
                bgm: undefined,
                name: undefined,
                text: "",
            };
        }

        console.log("恢复previousElements:", this.previousElements);

        // 保存当前页面路径供存档用（仅在非读档情况下更新）
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = urlParams.get("referrer");
        const isFromArchive = referrer && referrer.includes("archive_page");

        console.log("URL参数检查 - referrer:", referrer, "isFromArchive:", isFromArchive);

        if (!isFromArchive) {
            console.log("非读档情况，更新localStorage页面信息");
            localStorage.setItem("currentPage", window.location.pathname + '?scene=' + scene.id);
            localStorage.setItem("lastGamePage", window.location.pathname + '?scene=' + scene.id);
            // 重要：这里保存的是场景ID，而不是标题
            localStorage.setItem("MSYgamename", scene.id);
        } else {
            console.log("读档情况，保留原始localStorage页面信息");
            console.log("当前localStorage中的MSYgamename:", localStorage.getItem("MSYgamename"));
        }

        // 设置点击次数（从存档或URL参数）
        this.currentNodeIndex = this.clickCount;
        console.log("设置当前节点索引:", this.currentNodeIndex);

        // 确保索引不会超出范围
        if (this.currentNodeIndex >= scene.nodes.length) {
            console.log(`节点索引${this.currentNodeIndex}超出范围${scene.nodes.length}，重置为0`);
            this.currentNodeIndex = 0;
        }

        // 立即更新背景以确保读档后背景正确显示
        if (this.previousElements.background) {
            // 修改这里，确保背景被正确设置
            console.log("设置previousElements中的背景:", this.previousElements.background);
            this.sceneManager.getBackgroundManager().setBackground(this.previousElements.background, false);
        } else if (localStorage.getItem("MSYbackgroundIMG")) {
            // 即使previousElements中没有背景，但localStorage中有，也要设置
            const backgroundElement: SceneElement = {
                background: localStorage.getItem("MSYbackgroundIMG") || undefined,
                soundEffect: undefined,
                bgm: undefined,
                name: undefined,
                text: ""
            };
            console.log("设置localStorage中的背景:", backgroundElement.background);
            this.sceneManager.getBackgroundManager().setBackground(backgroundElement.background, false);
        }

        // 立即更新立绘以确保读档后立绘正确显示（但新游戏时不显示之前的立绘）
        if (this.previousElements.sprite && !(this as any)._isNewGame) {
            console.log("更新立绘:", this.previousElements.sprite);
            this.sceneManager.getSpriteManager().updateCharacterSprites(this.previousElements);
        } else if ((this as any)._isNewGame) {
            // 新游戏开始时，确保清除所有立绘
            console.log("新游戏，再次清除所有立绘");
            this.sceneManager.clearAllSprites();
        }

        this.renderCurrentNode();
    }

    private getCurrentNode(): SceneNode | null {
        if (!this.currentScene) return null;
        return this.currentScene.nodes[this.currentNodeIndex] || null;
    }

    private renderCurrentNode(): void {
        const node = this.getCurrentNode();
        console.log("渲染节点:", node);
        if (!node) return;

        // 检查节点条件（如果不满足则跳过该节点）
        if (node.condition && !node.condition()) {
            // 如果条件不满足，跳转到下一个节点
            this.nextMove();
            return;
        }

        // 检查是否有视频需要播放
        if (node.video) {
            this.handleVideo(node);
            return;
        }

        // 检查是否有小游戏需要执行
        if (node.game) {
            this.handleMiniGame(node);
            return;
        }

        // 执行节点动作（仅在动作条件满足时执行）
        if (node.action && (!node.actionCondition || node.actionCondition())) {
            node.action();
        }

        // 处理选项
        if (node.choices && node.choices.length > 0) {
            console.log("处理选项");

            // 在显示选项前，先更新对话框内容（使用不记录历史的方法）
            if (node.elements) {
                // 合并当前节点元素与前一个节点元素
                const mergedElements = this.mergeElements(this.previousElements, node.elements);
                console.log("合并后的元素:", mergedElements);
                this.previousElements = mergedElements;

                // 使用SceneManager更新场景元素（不记录到历史中）
                this.sceneManager.updateSceneElementsWithoutRecording(mergedElements);
            }

            this.choiceManager.handleChoices(node);
            // 添加等待标记，表示正在等待用户选择
            (this as any).waitingForChoice = true;
            return;
        }

        // 合并当前节点元素与前一个节点元素
        const mergedElements = this.mergeElements(this.previousElements, node.elements);
        console.log("合并后的元素:", mergedElements);
        this.previousElements = mergedElements;

        // 保存当前的previousElements状态到localStorage
        try {
            localStorage.setItem("previousElements", JSON.stringify(this.previousElements));
        } catch (e) {
            console.error("无法保存previousElements到localStorage", e);
        }

        // 使用SceneManager更新场景元素（会记录到历史中）
        this.sceneManager.updateSceneElements(mergedElements);
        this.sceneManager.updateBackground(mergedElements);
        this.sceneManager.updateAudio(mergedElements);

        // 更新立绘（如果是新游戏且是第一个节点，则不显示之前保存的立绘）
        if ((this as any)._isNewGame && this.currentNodeIndex === 0) {
            console.log("新游戏第一个节点，检查当前节点是否有立绘定义");
            // 对于新游戏的第一个节点，只更新当前节点指定的立绘（如果有）
            if (node.elements && node.elements.sprite !== undefined) {
                console.log("当前节点定义了立绘:", node.elements.sprite);
                this.sceneManager.getSpriteManager().updateCharacterSprites({ sprite: node.elements.sprite });
            } else {
                // 如果当前节点没有指定立绘，则清除所有立绘
                console.log("当前节点未定义立绘，清除所有立绘");
                this.sceneManager.clearAllSprites();
            }
        } else {
            // 正常更新立绘
            console.log("正常更新立绘:", mergedElements.sprite);
        }
    }

    private mergeElements(previous: SceneElement, current: SceneElement): SceneElement {
        console.log("合并元素 - previous:", previous, "current:", current);
        // 如果当前节点的某个属性为null，则表示要清除该属性
        // 如果当前节点的某个属性未定义，则继承前一个节点的属性
        const result = {
            background: current.background === null ? undefined :
                (current.background !== undefined ? current.background :
                    previous.background),
            soundEffect: current.soundEffect === null ? undefined :
                (current.soundEffect !== undefined ? current.soundEffect :
                    previous.soundEffect),
            bgm: current.bgm === null ? undefined :
                (current.bgm !== undefined ? current.bgm :
                    previous.bgm),
            name: current.name === null ? undefined :
                (current.name !== undefined ? current.name :
                    previous.name),
            text: current.text,
            sprite: current.sprite === null ? undefined :
                (current.sprite !== undefined ? current.sprite :
                    previous.sprite)
        } as SceneElement;
        console.log("合并结果:", result);
        return result;
    }
    private navigateToScene(sceneId: string): void {
        console.log(`[GameScene] 跳转到场景: ${sceneId}`);

        // 重置点击计数
        this.clickCount = 0;
        localStorage.setItem("nowclick", "0");

        // 清除背景状态，确保新场景从干净状态开始
        localStorage.removeItem("MSYbackgroundIMG");
        localStorage.removeItem("backgroundHistory");
        localStorage.removeItem("previousElements");
        // 清除音频状态
        localStorage.removeItem("nowbgm");

        // 获取当前存档ID
        const currentArchiveId = ArchiveManager.getCurrentArchiveId();
        console.log(`[GameScene] 当前存档ID: ${currentArchiveId}`);

        // 检查场景是否在注册表中
        import('../../story/SceneRegistry').then((registryModule) => {
            const SceneRegistry = registryModule.SceneRegistry;
            if (SceneRegistry[sceneId]) {
                console.log(`[GameScene] 通过SceneRegistry跳转到场景: ${sceneId}`);
                window.location.href = `game_scenes.html?scene=${sceneId}&archiveId=${currentArchiveId}`;
            } else {
                // 默认跳转到主菜单
                console.log(`[GameScene] 场景未在注册表中找到，跳转到主菜单`);
                window.location.href = '../main_menu/main_menu.html';
            }
        }).catch((error) => {
            console.error('[GameScene] 加载SceneRegistry失败:', error);
            // 出错时跳转到主菜单
            window.location.href = '../main_menu/main_menu.html';
        });
    }

    private handleVideo(node: SceneNode): void {
        // 检查是否是视频节点
        if (!node.video) {
            console.error('尝试处理视频，但节点没有video属性');
            return;
        }

        // 保存当前的点击处理函数
        const moveElement = document.getElementById("move");
        const dialogElement = document.getElementById("dialog");
        const textBoxElement = document.getElementById("text-box");

        const originalMoveHandler = moveElement ? moveElement.onclick : null;
        const originalDialogHandler = dialogElement ? dialogElement.onclick : null;
        const originalTextBoxHandler = textBoxElement ? textBoxElement.onclick : null;

        // 隐藏对话框和其他游戏场景元素
        const dialogElements = document.querySelectorAll('.dialog, #text-box, #name, #dialog');
        dialogElements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
        });

        // 禁用场景点击事件
        if (moveElement) moveElement.onclick = null;
        if (dialogElement) dialogElement.onclick = null;
        if (textBoxElement) textBoxElement.onclick = null;

        // 获取背景元素
        const bg1Element = document.getElementById('bg1');
        const bg2Element = document.getElementById('bg2');
        const backgroundManager = this.sceneManager.getBackgroundManager();
        let currentBgNum = (backgroundManager as any).backgroundNum;

        // 创建黑色背景覆盖层
        const blackOverlay = document.createElement('div');
        blackOverlay.id = 'video-black-overlay';
        blackOverlay.style.position = 'fixed';
        blackOverlay.style.top = '0';
        blackOverlay.style.left = '0';
        blackOverlay.style.width = '100%';
        blackOverlay.style.height = '100%';
        blackOverlay.style.backgroundColor = 'black';
        blackOverlay.style.zIndex = '998';
        blackOverlay.style.opacity = '0';
        blackOverlay.style.pointerEvents = 'none';
        document.body.appendChild(blackOverlay);

        // 淡出背景到黑色
        let backgroundOpacity = 1;
        let overlayOpacity = 0;
        const backgroundFadeOut = setInterval(() => {
            backgroundOpacity -= 0.05;
            overlayOpacity += 0.05;

            // 淡出当前显示的背景元素
            const currentBgElement = currentBgNum === 0 ? bg1Element : bg2Element;
            if (currentBgElement) {
                currentBgElement.style.opacity = backgroundOpacity.toString();
            }

            // 淡入黑色覆盖层
            blackOverlay.style.opacity = overlayOpacity.toString();

            if (backgroundOpacity <= 0) {
                clearInterval(backgroundFadeOut);
                // 隐藏背景元素
                if (currentBgElement) {
                    currentBgElement.style.display = 'none';
                }

                // 背景淡出完成后创建视频容器
                createVideoContainer();
            }
        }, 50);

        const createVideoContainer = () => {
            // 创建视频容器
            const videoContainer = document.createElement('div');
            videoContainer.id = 'video-container';
            videoContainer.style.position = 'fixed';
            videoContainer.style.top = '0';
            videoContainer.style.left = '0';
            videoContainer.style.width = '100%';
            videoContainer.style.height = '100%';
            videoContainer.style.zIndex = '999';
            videoContainer.style.display = 'flex';
            videoContainer.style.justifyContent = 'center';
            videoContainer.style.alignItems = 'center';

            // 创建视频元素
            const videoElement = document.createElement('video');
            videoElement.id = 'scene-video';
            videoElement.style.maxWidth = '100%';
            videoElement.style.maxHeight = '100%';
            videoElement.controls = false;
            videoElement.autoplay = false;
            videoElement.playsInline = true;
            videoElement.style.opacity = '0';
            videoElement.style.transition = 'opacity 1s ease-in-out';
            videoElement.preload = "auto";

            // 设置视频源
            const sourceElement = document.createElement('source');
            sourceElement.src = `../../assets/video/${node.video}`;
            sourceElement.type = 'video/mp4';

            videoElement.appendChild(sourceElement);
            videoContainer.appendChild(videoElement);
            document.body.appendChild(videoContainer);

            // 视频播放时淡入
            videoElement.addEventListener('play', () => {
                videoElement.style.opacity = '1';
            });

            // 监听视频播放结束事件
            videoElement.addEventListener('ended', () => {
                // 淡出视频
                videoElement.style.opacity = '0';

                // 在淡出完成后移除元素并恢复背景
                setTimeout(() => {
                    // 移除视频容器
                    if (videoContainer.parentNode) {
                        videoContainer.parentNode.removeChild(videoContainer);
                    }

                    // 恢复背景显示并淡入
                    const currentBgElement = currentBgNum === 0 ? bg1Element : bg2Element;
                    if (currentBgElement) {
                        currentBgElement.style.display = '';
                    }

                    // 淡出黑色覆盖层，同时淡入背景
                    let overlayOpacity = 1;
                    let backgroundOpacity = 0;
                    const fadeOutOverlay = setInterval(() => {
                        overlayOpacity -= 0.05;
                        backgroundOpacity += 0.05;

                        blackOverlay.style.opacity = overlayOpacity.toString();

                        if (currentBgElement) {
                            currentBgElement.style.opacity = backgroundOpacity.toString();
                        }

                        if (overlayOpacity <= 0) {
                            clearInterval(fadeOutOverlay);
                            blackOverlay.style.opacity = '0';

                            if (currentBgElement) {
                                currentBgElement.style.opacity = '1';
                            }

                            // 移除黑色覆盖层
                            if (blackOverlay.parentNode) {
                                blackOverlay.parentNode.removeChild(blackOverlay);
                            }
                        }
                    }, 50);

                    // 重新显示对话框元素
                    dialogElements.forEach(el => {
                        (el as HTMLElement).style.display = '';
                    });

                    // 恢复场景点击事件
                    if (moveElement) moveElement.onclick = originalMoveHandler;
                    if (dialogElement) dialogElement.onclick = originalDialogHandler;
                    if (textBoxElement) textBoxElement.onclick = originalTextBoxHandler;

                    // 跳转到下一个节点或场景
                    if (node.next) {
                        // 检查是否是当前场景内的节点ID
                        if (this.currentScene) {
                            const targetNodeIndex = this.currentScene.nodes.findIndex((n: any) => n.id === node.next);
                            if (targetNodeIndex !== -1) {
                                // 是当前场景内的节点，直接跳转到该节点
                                this.currentNodeIndex = targetNodeIndex;
                                this.clickCount = targetNodeIndex;
                                localStorage.setItem("nowclick", this.clickCount.toString());
                                this.renderCurrentNode();
                                return;
                            }
                        }
                        // 如果不是当前场景内的节点，则进行场景间跳转
                        this.navigateToScene(node.next);
                    } else {
                        // 没有指定next，则继续到下一个节点
                        this.nextMove();
                    }
                }, 1000);
            });

            // 开始播放视频
            const playVideo = () => {
                videoElement.play()
                    .then(() => {
                        console.log('视频开始播放');
                    })
                    .catch(e => {
                        console.error('视频播放失败:', e);
                        videoElement.style.opacity = '1';
                        setTimeout(() => {
                            videoElement.dispatchEvent(new Event('ended'));
                        }, 1000);
                    });
            };

            // 检查视频是否已经可以播放
            if (videoElement.readyState >= 2) {
                playVideo();
            } else {
                videoElement.addEventListener('canplay', () => {
                    playVideo();
                }, { once: true });

                setTimeout(() => {
                    if (videoElement.readyState < 2) {
                        playVideo();
                    }
                }, 5000);
            }

            // 错误处理
            videoElement.addEventListener('error', (e) => {
                console.error('视频播放出错:', e);

                videoElement.style.opacity = '0';

                setTimeout(() => {
                    if (videoContainer.parentNode) {
                        videoContainer.parentNode.removeChild(videoContainer);
                    }

                    // 恢复背景显示并淡入
                    const currentBgElement = currentBgNum === 0 ? bg1Element : bg2Element;
                    if (currentBgElement) {
                        currentBgElement.style.display = '';
                    }

                    // 淡出黑色覆盖层，同时淡入背景
                    let overlayOpacity = 1;
                    let backgroundOpacity = 0;
                    const fadeOutOverlay = setInterval(() => {
                        overlayOpacity -= 0.05;
                        backgroundOpacity += 0.05;

                        blackOverlay.style.opacity = overlayOpacity.toString();

                        if (currentBgElement) {
                            currentBgElement.style.opacity = backgroundOpacity.toString();
                        }

                        if (overlayOpacity <= 0) {
                            clearInterval(fadeOutOverlay);
                            blackOverlay.style.opacity = '0';

                            if (currentBgElement) {
                                currentBgElement.style.opacity = '1';
                            }

                            // 移除黑色覆盖层
                            if (blackOverlay.parentNode) {
                                blackOverlay.parentNode.removeChild(blackOverlay);
                            }
                        }
                    }, 50);

                    // 重新显示对话框元素
                    dialogElements.forEach(el => {
                        (el as HTMLElement).style.display = '';
                    });

                    // 恢复场景点击事件
                    if (moveElement) moveElement.onclick = originalMoveHandler;
                    if (dialogElement) dialogElement.onclick = originalDialogHandler;
                    if (textBoxElement) textBoxElement.onclick = originalTextBoxHandler;

                    alert('视频播放出错，将跳过视频继续游戏');
                    this.nextMove();
                }, 1000);
            });
        };
    }

private handleMiniGame(node: SceneNode): void {
    // 检查是否是小游戏节点
    if (!node.game) {
        console.error('尝试处理小游戏，但节点没有game属性');
        return;
    }

    console.log("开始处理小游戏:", node.game);

    // 保存当前的点击处理函数
    const moveElement = document.getElementById("move");
    const dialogElement = document.getElementById("dialog");
    const textBoxElement = document.getElementById("text-box");

    const originalMoveHandler = moveElement ? moveElement.onclick : null;
    const originalDialogHandler = dialogElement ? dialogElement.onclick : null;
    const originalTextBoxHandler = textBoxElement ? textBoxElement.onclick : null;

    // 隐藏对话框和其他游戏场景元素
    const dialogElements = document.querySelectorAll('.dialog, #text-box, #name, #dialog');
    dialogElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
    });

    // 禁用场景点击事件
    if (moveElement) moveElement.onclick = null;
    if (dialogElement) dialogElement.onclick = null;
    if (textBoxElement) textBoxElement.onclick = null;

    // 获取背景元素
    const bg1Element = document.getElementById('bg1');
    const bg2Element = document.getElementById('bg2');
    const backgroundManager = this.sceneManager.getBackgroundManager();
    let currentBgNum = (backgroundManager as any).backgroundNum;

    // 创建黑色背景覆盖层
    const blackOverlay = document.createElement('div');
    blackOverlay.id = 'minigame-black-overlay';
    blackOverlay.style.position = 'fixed';
    blackOverlay.style.top = '0';
    blackOverlay.style.left = '0';
    blackOverlay.style.width = '100%';
    blackOverlay.style.height = '100%';
    blackOverlay.style.backgroundColor = 'black';
    blackOverlay.style.zIndex = '998';
    blackOverlay.style.opacity = '0';
    blackOverlay.style.pointerEvents = 'none';
    document.body.appendChild(blackOverlay);

    // 淡出背景到黑色
    let backgroundOpacity = 1;
    let overlayOpacity = 0;
    const backgroundFadeOut = setInterval(() => {
        backgroundOpacity -= 0.05;
        overlayOpacity += 0.05;

        // 淡出当前显示的背景元素
        const currentBgElement = currentBgNum === 0 ? bg1Element : bg2Element;
        if (currentBgElement) {
            currentBgElement.style.opacity = backgroundOpacity.toString();
        }

        // 淡入黑色覆盖层
        blackOverlay.style.opacity = overlayOpacity.toString();

        if (backgroundOpacity <= 0) {
            clearInterval(backgroundFadeOut);
            // 隐藏背景元素
            if (currentBgElement) {
                currentBgElement.style.display = 'none';
            }

            // 背景淡出完成后创建小游戏容器和对话框
            createMiniGameContainer();
        }
    }, 50);

    const createMiniGameContainer = () => {
        // 显示小游戏容器
        this.miniGameContainer.style.display = 'block';
        this.miniGameContainer.style.position = 'fixed';
        this.miniGameContainer.style.top = '0';
        this.miniGameContainer.style.left = '0';
        this.miniGameContainer.style.width = '100%';
        this.miniGameContainer.style.height = '100%';
        this.miniGameContainer.style.zIndex = '1000';
        this.miniGameContainer.style.opacity = '0';
        this.miniGameContainer.style.transition = 'opacity 1s ease-in-out';

        // 创建游戏容器，使用正确的CSS路径
        this.miniGameContainer.innerHTML = MiniGameFactory.getGameTemplate(node.game!.id);

        // 使用SceneManager创建场景元素
        const gameElementsContainer = document.createElement('div');
        gameElementsContainer.id = 'minigame-elements-container';
        gameElementsContainer.style.position = 'absolute';
        gameElementsContainer.style.top = '0';
        gameElementsContainer.style.left = '0';
        gameElementsContainer.style.width = '100%';
        gameElementsContainer.style.height = '100%';
        gameElementsContainer.style.zIndex = '1001';
        gameElementsContainer.style.pointerEvents = 'none';

        // 使用SceneManager创建场景元素
        if (node.elements) {
            this.sceneManager.createSceneElementsContainer(gameElementsContainer, node.elements);
        }

        // 淡入小游戏和对话框
        setTimeout(() => {
            this.miniGameContainer.style.opacity = '1';
            
            // 在对话框元素上添加点击事件来跳过对话
            setTimeout(() => {
                const dialogElement = gameElementsContainer.querySelector('#dialog');
                if (dialogElement) {
                    dialogElement.addEventListener('click', (e) => {
                        console.log('[GameScene] 对话框被点击，隐藏对话框');
                        // 检查点击的是否是按钮
                        const target = e.target as HTMLElement;
                        if (target.closest('button')) {
                            // 点击的是按钮，不处理跳过逻辑
                            console.log('[GameScene] 点击的是按钮，不处理跳过逻辑');
                            return;
                        }
                        
                        e.stopPropagation();
                        // 隐藏游戏元素容器
                        gameElementsContainer.style.display = 'none';
                    });
                }
            }, 100); // 稍微延迟以确保DOM已完全渲染
        }, 50);
        
        this.miniGameContainer.appendChild(gameElementsContainer);

        // 确保DOM已更新后再创建游戏实例
        setTimeout(() => {
            // 使用工厂模式创建游戏实例
            const gameInstance = MiniGameFactory.createGame(
                node.game!.id,
                (score: number) => {
                    // 淡出小游戏
                    this.miniGameContainer.style.opacity = '0';

                    // 等待淡出完成后处理跳转
                    setTimeout(() => {
                        // 游戏结束后处理跳转
                        this.miniGameContainer.style.display = 'none';

                        // 恢复背景显示并淡入
                        const currentBgElement = currentBgNum === 0 ? bg1Element : bg2Element;
                        if (currentBgElement) {
                            currentBgElement.style.display = 'block';
                            let fadeInOpacity = 0;
                            const fadeInInterval = setInterval(() => {
                                fadeInOpacity += 0.05;
                                currentBgElement.style.opacity = fadeInOpacity.toString();
                                blackOverlay.style.opacity = (1 - fadeInOpacity).toString();

                                    if (fadeInOpacity >= 1) {
                                        clearInterval(fadeInInterval);
                                        // 移除黑色覆盖层
                                        if (blackOverlay.parentNode) {
                                            blackOverlay.parentNode.removeChild(blackOverlay);
                                        }

                                        // 恢复原始点击事件
                                        if (moveElement) moveElement.onclick = originalMoveHandler;
                                        if (dialogElement) dialogElement.onclick = originalDialogHandler;
                                        if (textBoxElement) textBoxElement.onclick = originalTextBoxHandler;

                                        // 恢复对话框显示
                                        dialogElements.forEach(el => {
                                            (el as HTMLElement).style.display = '';
                                        });
                                        
                                        // 淡入立绘元素（如果存在）
                                        if (gameElementsContainer) {
                                            const sceneElementsContainer = gameElementsContainer.querySelector('.scene-elements-container');
                                            if (sceneElementsContainer && (sceneElementsContainer as any).fadeInSprites) {
                                                (sceneElementsContainer as any).fadeInSprites();
                                            }
                                        }

                                        // 继续游戏
                                        if (node.next) {
                                            // 如果有指定的下一个节点，则跳转到该节点
                                            const nextNodeId = node.next;
                                            console.log(`小游戏结束，跳转到节点: ${nextNodeId}`);

                                            // 查找当前场景中的目标节点
                                            if (this.currentScene) {
                                                const targetNodeIndex = this.currentScene.nodes.findIndex(
                                                    (n, index) => index > this.currentNodeIndex && n.id === nextNodeId
                                                );

                                                if (targetNodeIndex !== -1) {
                                                    // 如果找到了节点，跳转到该节点
                                                    this.currentNodeIndex = targetNodeIndex;
                                                    // 更新点击次数，确保存档正确
                                                    localStorage.setItem("nowclick", targetNodeIndex.toString());
                                                    // 渲染新节点
                                                    this.renderCurrentNode();
                                                } else {
                                                    // 如果没找到节点，尝试作为场景ID处理
                                                    this.navigateToScene(nextNodeId);
                                                }
                                            } else {
                                                // 如果没有当前场景，尝试作为场景ID处理
                                                this.navigateToScene(nextNodeId);
                                            }
                                        } else {
                                            // 如果没有指定下一个节点，则继续到下一个节点
                                            this.nextMove();
                                        }
                                    }
                            }, 50);
                        } else {
                            // 没有背景元素，直接移除覆盖层并恢复原始事件
                            if (blackOverlay.parentNode) {
                                blackOverlay.parentNode.removeChild(blackOverlay);
                            }

                            // 恢复原始点击事件
                            if (moveElement) moveElement.onclick = originalMoveHandler;
                            if (dialogElement) dialogElement.onclick = originalDialogHandler;
                            if (textBoxElement) textBoxElement.onclick = originalTextBoxHandler;

                            // 恢复对话框显示
                            dialogElements.forEach(el => {
                                (el as HTMLElement).style.display = '';
                            });

                            // 继续游戏
                            if (node.next) {
                                // 如果有指定的下一个节点，则跳转到该节点
                                const nextNodeId = node.next;
                                console.log(`小游戏结束，跳转到节点: ${nextNodeId}`);

                                // 查找当前场景中的目标节点
                                if (this.currentScene) {
                                    const targetNodeIndex = this.currentScene.nodes.findIndex(
                                        (n, index) => index > this.currentNodeIndex && n.id === nextNodeId
                                    );

                                    if (targetNodeIndex !== -1) {
                                        // 如果找到了节点，跳转到该节点
                                        this.currentNodeIndex = targetNodeIndex;
                                        // 更新点击次数，确保存档正确
                                        localStorage.setItem("nowclick", targetNodeIndex.toString());
                                        // 渲染新节点
                                        this.renderCurrentNode();
                                    } else {
                                        // 如果没找到节点，尝试作为场景ID处理
                                        this.navigateToScene(nextNodeId);
                                    }
                                } else {
                                    // 如果没有当前场景，尝试作为场景ID处理
                                    this.navigateToScene(nextNodeId);
                                }
                            } else {
                                // 如果没有指定下一个节点，则继续到下一个节点
                                this.nextMove();
                            }
                        }
                    }, 1000);
                },
                node.game!.config
            );

            if (gameInstance) {
                // 启动游戏
                gameInstance.start();
            } else {
                console.error(`无法创建游戏实例: ${node.game!.id}`);
            }
        }, 0);
    };
}

    private nextMove(): void {
        console.log("[GameScene] nextMove方法被调用");
        if (!this.currentScene) {
            console.log("[GameScene] 没有当前场景，返回");
            return;
        }

        // 检查是否显示了选项，如果显示了选项则不执行下一步
        const selectionBox = document.getElementById("selection_box");
        if (selectionBox) {
            const isVisible = selectionBox.style.display !== "none" &&
                selectionBox.style.visibility !== "hidden" &&
                selectionBox.children.length > 0;
            console.log("[GameScene] 选项框状态 - display:", selectionBox.style.display,
                "visibility:", selectionBox.style.visibility,
                "子元素数量:", selectionBox.children.length,
                "是否可见:", isVisible);

            if (isVisible) {
                console.log("[GameScene] 选项框可见，不执行下一步");
                return; // 如果选项可见，则不执行下一步
            }
        }

        // 如果正在等待用户选择，则不允许继续跳过
        if ((this as any).waitingForChoice) {
            console.log("[GameScene] 正在等待用户选择");
            // 检查当前节点是否有选项，如果有，则继续保持等待状态
            const currentNode = this.getCurrentNode();
            if (currentNode && currentNode.choices && currentNode.choices.length > 0) {
                // 仍然在选项节点，不执行任何操作
                console.log("[GameScene] 当前节点有选项，继续保持等待状态");
                return;
            } else {
                // 已经离开了选项节点，可以清除等待标记
                console.log("[GameScene] 已离开选项节点，清除等待标记");
                (this as any).waitingForChoice = false;
            }
        }

        // 播放点击音效
        console.log("[GameScene] 播放点击音效");
        this.sceneManager.getAudioManager().playClickSound();

        // 获取当前节点
        const currentNode = this.getCurrentNode();
        console.log("[GameScene] 当前节点:", currentNode);

        // 检查当前节点是否有next属性且没有选项
        if (currentNode && currentNode.next && (!currentNode.choices || currentNode.choices.length === 0)) {
            console.log("[GameScene] 当前节点有next属性且没有选项");
            // 跳转到next指定的节点或场景
            if (typeof currentNode.next === "string") {
                console.log("[GameScene] next是字符串类型");
                // 检查是否是当前场景内的节点ID
                if (this.currentScene) {
                    const targetNodeIndex = this.currentScene.nodes.findIndex((n: any) => n.id === currentNode.next);
                    console.log("[GameScene] 查找目标节点索引:", targetNodeIndex);
                    if (targetNodeIndex !== -1) {
                        // 是当前场景内的节点，直接跳转到该节点
                        console.log("[GameScene] 跳转到当前场景内节点，索引:", targetNodeIndex);
                        this.currentNodeIndex = targetNodeIndex;
                        this.clickCount++;
                        localStorage.setItem("nowclick", this.clickCount.toString());
                        this.renderCurrentNode();
                        return;
                    }
                }
                // 如果不是当前场景内的节点，则进行场景间跳转
                console.log("[GameScene] 跳转到其他场景:", currentNode.next);
                this.navigateToScene(currentNode.next);
            }
            return;
        }

        // 如果还有下一个节点
        if (this.currentNodeIndex < this.currentScene.nodes.length - 1) {
            console.log("[GameScene] 跳转到下一个节点");
            this.currentNodeIndex++;
            this.clickCount++;
            localStorage.setItem("nowclick", this.clickCount.toString());
            this.renderCurrentNode();
        } else {
            // 到达场景结尾
            console.log("[GameScene] 到达场景结尾");
            localStorage.setItem("nowclick", "0");
            const node = this.getCurrentNode();
            if (node && node.next) {
                if (typeof node.next === "string") {
                    console.log("[GameScene] 场景结尾跳转到:", node.next);
                    this.navigateToScene(node.next);
                }
            }
        }
    }
    private startAutoClick(): void {
        const autoButton = document.getElementById("op_auto");

        // 实现自动播放功能
        if (this.autoClickInterval) {
            // 如果已经存在自动播放，就停止它
            clearInterval(this.autoClickInterval);
            this.autoClickInterval = null;
            if (autoButton) {
                autoButton.textContent = "auto"; // 恢复按钮文本
            }
        } else {
            // 开始自动播放，每1.5秒执行一次nextMove
            this.autoClickInterval = setInterval(() => {
                // 检查是否显示了选项，如果显示了选项则不执行下一步
                const selectionBox = document.getElementById("selection_box");
                if (selectionBox) {
                    const isVisible = selectionBox.style.display !== "none" &&
                        selectionBox.style.visibility !== "hidden" &&
                        selectionBox.children.length > 0;
                    console.log("[GameScene-auto] 选项框状态 - display:", selectionBox.style.display,
                        "visibility:", selectionBox.style.visibility,
                        "子元素数量:", selectionBox.children.length,
                        "是否可见:", isVisible);

                    if (isVisible) {
                        // 如果选项可见，则停止自动播放
                        console.log("[GameScene-auto] 选项框可见，停止自动播放");
                        this.startAutoClick();
                        return;
                    }
                }

                // 如果正在等待用户选择，则停止自动播放
                if ((this as any).waitingForChoice) {
                    // 停止自动播放
                    console.log("[GameScene-auto] 正在等待用户选择，停止自动播放");
                    this.startAutoClick();
                    return;
                }

                this.nextMove();
            }, 1500);
            if (autoButton) {
                autoButton.textContent = "stop"; // 更改按钮文本表示正在自动播放
            }
        }
    }

    /**
    * 返回上一个节点的功能
    */
    private goBackToPreviousNode(): void {
        // 检查是否有上一个节点可以返回
        if (this.currentNodeIndex > 0 && this.currentScene) {
            // 寻找上一个满足条件的节点
            let previousNodeIndex = this.currentNodeIndex - 1;
            while (previousNodeIndex >= 0) {
                const node = this.currentScene.nodes[previousNodeIndex];
                // 检查节点条件（如果有的话）
                if (!node.condition || node.condition()) {
                    // 找到满足条件的节点，进行回退
                    this.currentNodeIndex = previousNodeIndex;
                    this.clickCount = this.currentNodeIndex;
                    localStorage.setItem("nowclick", this.clickCount.toString());
                    this.renderCurrentNode();
                    return;
                }
                // 如果当前节点不满足条件，继续向前查找
                previousNodeIndex--;
            }
            console.log("没有找到满足条件的前一个节点，无法回退");
        } else {
            console.log("已经到达第一个节点，无法再返回");
        }
    }

    /**
     * 处理自动暂停逻辑
     */
    private handleAutoPause(): void {
        // 检查是否已经有暂停菜单显示
        const pauseOverlay = document.getElementById("pause-overlay");
        if (pauseOverlay && pauseOverlay.style.display === 'flex') {
            return; // 已经暂停了，不需要再次暂停
        }
        
        // 检查是否在小游戏或视频播放中
        const miniGameContainer = document.getElementById("mini-game-container");
        const videoContainer = document.getElementById("video-container");
        
        const inMiniGame = miniGameContainer && miniGameContainer.style.display !== 'none';
        const inVideo = videoContainer && videoContainer.style.display !== 'none';
        
        console.log("[GameScene] handleAutoPause - inMiniGame:", inMiniGame, "inVideo:", inVideo);
        
        // 只有不在小游戏或视频播放中时才触发暂停
        if (!inMiniGame && !inVideo) {
            console.log("[GameScene] Triggering auto pause");
            this.togglePauseMenu();
        }
    }

  /**
     * 切换暂停菜单的显示状态
     */
    private togglePauseMenu(): void {
        console.log("[GameScene] togglePauseMenu called");
        
        // 创建暂停菜单元素（如果不存在）
        let pauseOverlay = document.getElementById("pause-overlay");
        if (!pauseOverlay) {
            console.log("[GameScene] Creating pause menu");
            // 创建暂停遮罩层
            pauseOverlay = document.createElement('div');
            pauseOverlay.id = 'pause-overlay';
            pauseOverlay.className = 'pause-overlay';
            
            // 创建暂停菜单
            const pauseMenu = document.createElement('div');
            pauseMenu.id = 'pause-menu';
            pauseMenu.className = 'pause-menu';
            pauseMenu.innerHTML = `
                <h2>游戏暂停</h2>
                <button id="resume-button" class="pause-button">继续游戏</button>
                <button id="settings-button" class="pause-button">设置</button>
                <button id="exit-button" class="pause-button">退出游戏</button>
            `;
            
            pauseOverlay.appendChild(pauseMenu);
            document.body.appendChild(pauseOverlay);
            
            // 添加样式
            this.addPauseStyles();
            
            // 绑定事件
            this.bindPauseEvents(pauseOverlay);
        }
        
        // 切换显示状态
        if (pauseOverlay.style.display === 'flex') {
            console.log("[GameScene] Closing pause menu");
            pauseOverlay.style.display = 'none';
            // 恢复自动播放（如果之前是开启状态）
            if ((this as any)._wasAutoPlaying) {
                this.startAutoClick();
                (this as any)._wasAutoPlaying = false;
            }
        } else {
            console.log("[GameScene] Opening pause menu");
            // 如果正在自动播放，暂时停止并记录状态
            if (this.autoClickInterval) {
                this.startAutoClick();
                (this as any)._wasAutoPlaying = true;
            }
            
            pauseOverlay.style.display = 'flex';
            // 触发重排以确保动画生效
            pauseOverlay.offsetHeight;
            const pauseMenu = document.getElementById('pause-menu');
            if (pauseMenu) {
                pauseMenu.classList.add('show');
            }
        }
    }
    /**
     * 添加暂停菜单样式
     */
    private addPauseStyles(): void {
        // 检查样式是否已添加
        if (document.getElementById('pause-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'pause-styles';
        style.textContent = `
            .pause-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                z-index: 10000;
                justify-content: center;
                align-items: center;
            }
            
            .pause-menu {
                background-color: rgba(30, 30, 30, 0.95);
                border-radius: 15px;
                padding: 30px;
                width: 300px;
                text-align: center;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transform: scale(0.9);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .pause-menu.show {
                transform: scale(1);
                opacity: 1;
            }
            
            .pause-menu h2 {
                color: #fff;
                margin-top: 0;
                margin-bottom: 25px;
                font-size: 24px;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            }
            
            .pause-button {
                display: block;
                width: 100%;
                padding: 12px;
                margin: 10px 0;
                background-color: rgba(50, 50, 50, 0.8);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .pause-button:hover {
                background-color: rgba(70, 70, 70, 0.9);
                transform: translateY(-2px);
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            }
            
            .pause-button:active {
                transform: translateY(0);
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * 绑定暂停菜单事件
     */
    private bindPauseEvents(pauseOverlay: HTMLElement): void {
        const pauseMenu = document.getElementById('pause-menu');
        const resumeButton = document.getElementById('resume-button');
        const settingsButton = document.getElementById('settings-button');
        const exitButton = document.getElementById('exit-button');
        
        // 点击遮罩层关闭暂停菜单
        pauseOverlay.addEventListener('click', (event) => {
            if (event.target === pauseOverlay) {
                this.closePauseMenu();
            }
        });
        
        // 继续游戏按钮
        if (resumeButton) {
            resumeButton.addEventListener('click', () => {
                this.closePauseMenu();
            });
        }
        
         // 设置按钮
        if (settingsButton) {
            settingsButton.addEventListener('click', () => {
                this.closePauseMenu();
                // 跳转到设置页面时传递当前页面作为referrer参数
                window.location.href = '../settings/settings.html?referrer=' + encodeURIComponent(window.location.href);
            });
        }
        
        // 退出游戏按钮
        if (exitButton) {
            exitButton.addEventListener('click', () => {
                this.closePauseMenu();
                window.location.href = '../main_menu/main_menu.html';
            });
        }
    }
    
    /**
     * 关闭暂停菜单
     */
    private closePauseMenu(): void {
        const pauseOverlay = document.getElementById('pause-overlay');
        const pauseMenu = document.getElementById('pause-menu');
        
        if (pauseMenu) {
            pauseMenu.classList.remove('show');
            // 等待动画结束后隐藏overlay
            setTimeout(() => {
                if (pauseOverlay) {
                    pauseOverlay.style.display = 'none';
                }
            }, 300);
        }
    }

}

// 导出游戏场景实例
export default new GameScene();