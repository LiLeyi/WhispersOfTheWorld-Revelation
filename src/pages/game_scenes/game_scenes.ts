import { Scene, SceneNode, SceneElement } from '../../types/SceneTypes';
import "./game_scenes.css"
import { BackgroundManager } from '../../components/BackgroundManager';
import { TextManager } from '../../components/TextManager';
import { AudioManager } from '../../components/AudioManager';
import { SpriteManager } from '../../components/SpriteManager';
import { ChoiceManager } from '../../components/ChoiceManager';
import { SceneRegistry } from '../../story/SceneRegistry';
import { ArchiveManager } from '../../components/ArchiveManager';

// 注意：不要在这里导入所有场景数据，而是在需要时动态导入

class GameScene {
    private currentScene: Scene | null = null;
    private currentNodeIndex: number = 0;
    private currentState: any = {};
    private clickCount: number = 0;
    private autoClickInterval: number | null = null;
    private backgroundManager: BackgroundManager;
    private textManager: TextManager;
    private audioManager: AudioManager;
    private spriteManager: SpriteManager;
    private choiceManager: ChoiceManager;
    private previousElements: SceneElement = {
        background: undefined,
        soundEffect: undefined,
        bgm: undefined,
        name: undefined,
        text: "",
    };

    constructor() {
        this.backgroundManager = new BackgroundManager();
        this.textManager = new TextManager();
        this.audioManager = new AudioManager();
        this.spriteManager = new SpriteManager();
        this.choiceManager = new ChoiceManager();
        this.init();
    }

    private init(): void {
        console.log("[GameScene] 开始初始化游戏场景");

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
        this.textManager.setCurrentArchiveId(archiveId);

        console.log(`[GameScene] 使用存档ID: ${archiveId}`);

        // 绑定事件
        this.bindEvents();

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
            this.textManager.clearTextHistory();

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
        this.spriteManager.clearAllSprites();

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



    private async loadSceneByName(sceneName: string): Promise<void> {
        console.log(`[GameScene] 开始加载场景: ${sceneName}`);

        let sceneModule: any;

        // 每次加载新场景时清除所有立绘
        this.spriteManager.clearAllSprites();

        // 从URL参数获取存档ID并确保ArchiveManager使用正确的存档
        const urlParams = new URLSearchParams(window.location.search);
        let archiveId = urlParams.get('archiveId');
        if (!archiveId) {
            archiveId = localStorage.getItem('currentArchiveId') || 'default_' + Date.now();
        }
        ArchiveManager.setCurrentArchiveId(archiveId);
        // 同时更新TextManager的存档ID

        this.textManager.setCurrentArchiveId(archiveId);
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
            this.spriteManager.clearAllSprites();
        }

        // 设置choiceManager的回调函数
        this.choiceManager.setCurrentScene(scene);
        this.choiceManager.setRenderCurrentNodeCallback(() => this.renderCurrentNode());
        this.choiceManager.setNavigateToSceneCallback((sceneId) => this.navigateToScene(sceneId));
        this.choiceManager.setGetCurrentNodeIndexCallback(() => this.currentNodeIndex);
        this.choiceManager.setSetCurrentNodeIndexCallback((index) => { this.currentNodeIndex = index; });
        this.choiceManager.setGetCurrentNodeCallback(() => this.getCurrentNode());
        // 添加TextManager引用
        this.choiceManager.setTextManager(this.textManager);

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
            this.backgroundManager.setBackground(this.previousElements.background, false);
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
            this.backgroundManager.setBackground(backgroundElement.background, false);
        }

        // 立即更新立绘以确保读档后立绘正确显示（但新游戏时不显示之前的立绘）
        if (this.previousElements.sprite && !(this as any)._isNewGame) {
            console.log("更新立绘:", this.previousElements.sprite);
            this.spriteManager.updateCharacterSprites(this.previousElements);
        } else if ((this as any)._isNewGame) {
            // 新游戏开始时，确保清除所有立绘
            console.log("新游戏，再次清除所有立绘");
            this.spriteManager.clearAllSprites();
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

        // 执行节点动作（仅在动作条件满足时执行）
        if (node.action && (!node.actionCondition || node.actionCondition())) {
            node.action();
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

        // 更新文本
        this.textManager.updateText(mergedElements);

        // 更新背景
        this.updateBackground(mergedElements);

        // 更新音乐
        this.updateMusic(mergedElements);

        // 更新立绘（如果是新游戏且是第一个节点，则不显示之前保存的立绘）
        if ((this as any)._isNewGame && this.currentNodeIndex === 0) {
            console.log("新游戏第一个节点，检查当前节点是否有立绘定义");
            // 对于新游戏的第一个节点，只更新当前节点指定的立绘（如果有）
            if (node.elements && node.elements.sprite !== undefined) {
                console.log("当前节点定义了立绘:", node.elements.sprite);
                this.spriteManager.updateCharacterSprites({ sprite: node.elements.sprite });
            } else {
                // 如果当前节点没有指定立绘，则清除所有立绘
                console.log("当前节点未定义立绘，清除所有立绘");
                this.spriteManager.clearAllSprites();
            }
        } else {
            // 正常更新立绘
            console.log("正常更新立绘:", mergedElements.sprite);
            this.spriteManager.updateCharacterSprites(mergedElements);
        }

        // 处理选项
        this.choiceManager.handleChoices(node);

        // 移除了自动跳转逻辑，现在所有跳转都需要用户点击
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

    private updateBackground(element: SceneElement): void {
        console.log("更新背景 - 接收到的元素:", element);
        // 确保即使element.background为undefined，也要使用localStorage中的背景
        const backgroundToUse = element.background !== undefined && element.background !== null ?
            element.background :
            (localStorage.getItem("MSYbackgroundIMG") || "");
        console.log("使用的背景:", backgroundToUse);

        // 如果没有背景要设置，则直接返回
        if (backgroundToUse === undefined || backgroundToUse === "") {
            console.log("没有背景需要设置");
            return;
        }

        // 使用BackgroundManager设置背景
        this.backgroundManager.setBackground(backgroundToUse);

        // 保存背景到localStorage
        localStorage.setItem("MSYbackgroundIMG", backgroundToUse);
        console.log("已保存背景到localStorage:", backgroundToUse);
    }

    private updateMusic(element: SceneElement): void {
        // 更新音效
        if (element.soundEffect) {
            this.audioManager.playSoundEffect(element.soundEffect);
        }

        // 更新背景音乐
        if (element.bgm) {
            this.audioManager.updateBackgroundMusic(element.bgm);
        }
    }

    private navigateToScene(sceneId: string): void {
        console.log(`[GameScene] 跳转到场景: ${sceneId}`);

        // 重置点击计数
        this.clickCount = 0;
        localStorage.setItem("nowclick", "0");

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

    private bindEvents(): void {
        // 绑定点击事件
        const moveElement = document.getElementById("move");
        const dialogElement = document.getElementById("dialog");
        const textBoxElement = document.getElementById("text-box");

        const nextMoveHandler = () => {
            // 检查是否显示了选项，如果显示了选项则不执行下一步
            const selectionBox = document.getElementById("selection_box");
            if (selectionBox && selectionBox.style.display !== "none") {
                return; // 如果选项可见，则不执行下一步
            }
            this.nextMove();
        };

        if (moveElement) moveElement.onclick = nextMoveHandler;
        if (dialogElement) dialogElement.onclick = nextMoveHandler;
        if (textBoxElement) textBoxElement.onclick = nextMoveHandler;

        // 绑定菜单事件
        const returnButton = document.getElementById("op_return");
        const logButton = document.getElementById("op_log");
        const loadButton = document.getElementById("op_load");
        const autoButton = document.getElementById("op_auto");
        const skipButton = document.getElementById("op_skip");

        if (returnButton) {
            returnButton.onclick = () => {
                const returnElement = document.getElementById("return");
                if (returnElement) {
                    returnElement.classList.toggle("active");
                }
            };
        }

        if (logButton) {
            logButton.onclick = () => {
                this.redirectToNewPage("../log_page/log_page.html");
            };
        }

        if (loadButton) {
            loadButton.onclick = () => {
                this.redirectToNewPage("../archive_page/archive_page.html");
            };
        }

        if (autoButton) {
            autoButton.onclick = () => this.startAutoClick();
        }

        if (skipButton) {
            skipButton.onclick = () => {
                const skipElement = document.getElementById("skip");
                if (skipElement) {
                    skipElement.classList.toggle("active");
                }
            };
        }

        // 绑定弹窗事件
        const skipYes = document.getElementById("skip_yes");
        const skipNo = document.getElementById("skip_no");
        const returnYes = document.getElementById("return_yes");
        const returnNo = document.getElementById("return_no");

        if (skipYes) {
            skipYes.onclick = () => {
                if (this.currentScene) {
                    this.currentNodeIndex = this.currentScene.nodes.length - 1;
                    this.renderCurrentNode();
                }
                const skipElement = document.getElementById("skip");
                if (skipElement) {
                    skipElement.classList.remove("active");
                }
            };
        }

        if (skipNo) {
            skipNo.onclick = () => {
                const skipElement = document.getElementById("skip");
                if (skipElement) {
                    skipElement.classList.remove("active");
                }
            };
        }

        if (returnYes) {
            returnYes.onclick = () => {
                window.location.href = "../main_menu/main_menu.html";
            };
        }

        if (returnNo) {
            returnNo.onclick = () => {
                const returnElement = document.getElementById("return");
                if (returnElement) {
                    returnElement.classList.remove("active");
                }
            };
        }
    }

    private nextMove(): void {
        if (!this.currentScene) return;

        // 播放点击音效
        this.audioManager.playClickSound();

        // 获取当前节点
        const currentNode = this.getCurrentNode();

        // 检查当前节点是否有next属性且没有选项
        if (currentNode && currentNode.next && (!currentNode.choices || currentNode.choices.length === 0)) {
            // 跳转到next指定的节点或场景
            if (typeof currentNode.next === "string") {
                // 检查是否是当前场景内的节点ID
                if (this.currentScene) {
                    const targetNodeIndex = this.currentScene.nodes.findIndex((n: any) => n.id === currentNode.next);
                    if (targetNodeIndex !== -1) {
                        // 是当前场景内的节点，直接跳转到该节点
                        this.currentNodeIndex = targetNodeIndex;
                        this.clickCount++;
                        localStorage.setItem("nowclick", this.clickCount.toString());
                        this.renderCurrentNode();
                        return;
                    }
                }
                // 如果不是当前场景内的节点，则进行场景间跳转
                this.navigateToScene(currentNode.next);
            }
            return;
        }

        // 如果还有下一个节点
        if (this.currentNodeIndex < this.currentScene.nodes.length - 1) {
            this.currentNodeIndex++;
            this.clickCount++;
            localStorage.setItem("nowclick", this.clickCount.toString());
            this.renderCurrentNode();
        } else {
            // 到达场景结尾
            localStorage.setItem("nowclick", "0");
            const node = this.getCurrentNode();
            if (node && node.next) {
                if (typeof node.next === "string") {
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
                this.nextMove();
            }, 1500);
            if (autoButton) {
                autoButton.textContent = "stop"; // 更改按钮文本表示正在自动播放
            }
        }
    }

    private redirectToNewPage(nextpage: string): void {
        const nextPageURL = nextpage + "?referrer=" + encodeURIComponent(window.location.href);
        window.location.href = nextPageURL;
    }
}

// 导出游戏场景实例
export default new GameScene();