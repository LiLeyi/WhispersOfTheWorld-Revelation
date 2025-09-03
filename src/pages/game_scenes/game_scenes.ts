import { Scene, SceneNode, SceneElement } from '../../types/SceneTypes';
import "./game_scenes.css"
import { BackgroundManager } from '../../components/BackgroundManager';
import { TextManager } from '../../components/TextManager';
import { AudioManager } from '../../components/AudioManager';
import { SpriteManager } from '../../components/SpriteManager';
import { ChoiceManager } from '../../components/ChoiceManager';
import { SceneRegistry } from '../../story/SceneRegistry';
import { ArchiveManager } from '../../components/ArchiveManager';
import { JumpingGame } from '../../components/mini_games/jumping_game/JumpingGame';
import { MiniGameFactory } from '../../components/MiniGameFactory';
import { CardGame } from '../../components/mini_games/card_game/CardGame';

// 注意：不要在这里导入所有场景数据，而是在需要时动态导入

// 定义道具接口
interface Item {
    id: string;
    name: string;
    description: string;
    icon: string;
}

// 道具数据库
const ITEMS_DATABASE: Record<string, Item> = {
    "ancient_coin": {
        id: "ancient_coin",
        name: "古币",
        description: "一枚古老的硬币，上面刻着未知的符文。似乎有某种神秘的力量。",
        icon: "🪙"
    },
    "mystic_gem": {
        id: "mystic_gem",
        name: "神秘宝石",
        description: "散发着微弱蓝光的宝石，让人感到平静和安宁。",
        icon: "💎"
    },
    "old_key": {
        id: "old_key",
        name: "古老的钥匙",
        description: "一把生锈的钥匙，不知道能打开什么。",
        icon: "🗝️"
    },
    "healing_potion": {
        id: "healing_potion",
        name: "治疗药水",
        description: "可以恢复生命值的红色药水。",
        icon: "🧪"
    },
    "magic_scroll": {
        id: "magic_scroll",
        name: "魔法卷轴",
        description: "记载着古老咒语的卷轴，似乎蕴含着强大的力量。",
        icon: "📜"
    },
    "silver_ring": {
        id: "silver_ring",
        name: "银戒指",
        description: "一枚精美的银戒指，镶嵌着小小的红宝石。",
        icon: "💍"
    }
};

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

    // 在GameScene类中添加小游戏容器
    private miniGameContainer: HTMLDivElement = document.createElement('div');

    constructor() {
        this.backgroundManager = new BackgroundManager();
        this.textManager = new TextManager();
        this.audioManager = new AudioManager();
        this.spriteManager = new SpriteManager();
        this.choiceManager = new ChoiceManager();
        this.init();
    }

    private init(): void {
        // 创建小游戏容器
        this.miniGameContainer.id = 'mini-game-container';
        this.miniGameContainer.style.display = 'none';
        document.body.appendChild(this.miniGameContainer);
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
        
        // 记录背景历史（用于back功能）
        const backgroundHistory = JSON.parse(localStorage.getItem("backgroundHistory") || "[]");
        
        // 如果当前背景与历史记录中的最后一个不同，则添加到历史记录中
        if (backgroundHistory[backgroundHistory.length - 1] !== backgroundToUse) {
            backgroundHistory.push(backgroundToUse);
            
            // 限制历史记录长度为10个，避免占用过多存储空间
            if (backgroundHistory.length > 10) {
                backgroundHistory.shift();
            }
        }
        
        // 保存更新后的历史记录
        localStorage.setItem("backgroundHistory", JSON.stringify(backgroundHistory));
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
        const backgroundManager = this.backgroundManager;
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
        const backgroundManager = this.backgroundManager;
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

                // 背景淡出完成后创建小游戏容器
                createMiniGameContainer();
            }
        }, 50);

        const createMiniGameContainer = () => {
            // 显示小游戏容器并隐藏其他元素
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

            // 淡入小游戏
            setTimeout(() => {
                this.miniGameContainer.style.opacity = '1';
            }, 50);

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

                            // 根据分数跳转到相应的节点
                            let nextNodeId: string = "default";
                            if (node.game) {
                                // 检查是否有新的end配置
                                if (node.game.end && Array.isArray(node.game.end)) {
                                    for (const endConfig of node.game.end) {
                                        if (endConfig.condition(score)) {
                                            nextNodeId = endConfig.next;
                                            break;
                                        }
                                    }
                                }
                            }

                            // 查找目标节点在当前场景中的索引
                            if (this.currentScene) {
                                const targetNodeIndex = this.currentScene.nodes.findIndex(n => n.id === nextNodeId);
                                if (targetNodeIndex !== -1) {
                                    // 如果找到了节点，跳转到该节点
                                    this.currentNodeIndex = targetNodeIndex;
                                    this.clickCount = targetNodeIndex;
                                    localStorage.setItem("nowclick", this.clickCount.toString());
                                    this.renderCurrentNode();
                                } else {
                                    // 如果没找到节点，使用navigateToScene方法（可能是跳转到其他场景）
                                    this.navigateToScene(nextNodeId);
                                }
                            }
                        }, 1000);
                    },
                    node.game?.config
                );

                if (gameInstance) {
                    // 启动游戏
                    gameInstance.start();
                } else {
                    console.error(`无法创建游戏实例: ${node.game?.id}`);
                }
            }, 0);
        };
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

    // 绑定键盘事件 - 空格键跳过剧情
    document.addEventListener('keydown', (event) => {
        // 检查是否按下了空格键
        if (event.code === 'Space') {
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
                // 检查是否显示了选项，如果显示了选项则不执行下一步
                const selectionBox = document.getElementById("selection_box");
                if (selectionBox && selectionBox.style.display !== "none") {
                    return; // 如果选项可见，则不执行下一步
                }
                this.nextMove();
            }
        }
    });

    // 绑定菜单事件
    const returnButton = document.getElementById("op_return");
    const logButton = document.getElementById("op_log");
    const loadButton = document.getElementById("op_load");
    const autoButton = document.getElementById("op_auto");
    const skipButton = document.getElementById("op_skip");
    const bagButton = document.getElementById("op_bag");
    const backButton = document.getElementById("op_back"); // 添加back按钮引用

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

    // 绑定背包按钮事件
    if (bagButton) {
        bagButton.onclick = () => {
            this.toggleBag();
        };
    }

    // 绑定back按钮事件 - 返回上一个节点
    if (backButton) {
        backButton.onclick = () => {
            this.goBackToPreviousNode();
        };
    } else {
        console.warn("未找到back按钮元素(op_back)");
    }

    // 绑定弹窗事件
    const skipYes = document.getElementById("skip_yes");
    const skipNo = document.getElementById("skip_no");
    const returnYes = document.getElementById("return_yes");
    const returnNo = document.getElementById("return_no");

            if (skipYes) {
        skipYes.onclick = () => {
            if (this.currentScene) {
                // 查找下一个有选项的节点
                let nextChoiceNodeIndex = -1;
                for (let i = this.currentNodeIndex + 1; i < this.currentScene.nodes.length; i++) {
                    const node = this.currentScene.nodes[i];
                    if (node.choices && node.choices.length > 0) {
                        nextChoiceNodeIndex = i;
                        break;
                    }
                }
                
                // 如果找到了有选项的节点，则跳转到该节点；否则跳转到章节末尾
                if (nextChoiceNodeIndex !== -1) {
                    this.currentNodeIndex = nextChoiceNodeIndex;
                } else {
                    this.currentNodeIndex = this.currentScene.nodes.length - 1;
                }
                this.clickCount = this.currentNodeIndex;
                localStorage.setItem("nowclick", this.clickCount.toString());
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

    // 绑定背包界面事件
    const closeBagButton = document.getElementById("close-bag");
    const bagOverlay = document.getElementById("bag-overlay");
    const itemModal = document.getElementById("item-modal");
    const closeModal = document.querySelector(".close-modal");

    if (closeBagButton) {
        closeBagButton.onclick = () => {
            if (bagOverlay) {
                bagOverlay.style.display = "none";
            }
        };
    }

    if (bagOverlay) {
        bagOverlay.onclick = (event) => {
            if (event.target === bagOverlay) {
                bagOverlay.style.display = "none";
            }
        };
    }

    if (closeModal) {
        (closeModal as HTMLElement).onclick = () => {
            if (itemModal) {
                itemModal.style.display = "none";
            }
        };
    }

    if (itemModal) {
        itemModal.onclick = (event) => {
            if (event.target === itemModal) {
                itemModal.style.display = "none";
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

        /**
     * 返回上一个节点的功能
     */
    private goBackToPreviousNode(): void {
        // 检查是否有上一个节点可以返回
        if (this.currentNodeIndex > 0 && this.currentScene) {
            // 返回到上一个节点
            this.currentNodeIndex--;
            this.clickCount = this.currentNodeIndex;
            localStorage.setItem("nowclick", this.clickCount.toString());
            this.renderCurrentNode();
        } else {
            console.log("已经到达第一个节点，无法再返回");
        }
    }
    /**
     * 切换背包界面显示/隐藏
     */
    private toggleBag(): void {
        const bagOverlay = document.getElementById("bag-overlay");
        if (bagOverlay) {
            const isVisible = bagOverlay.style.display === "flex";
            if (isVisible) {
                bagOverlay.style.display = "none";
            } else {
                this.renderBag();
                bagOverlay.style.display = "flex";
            }
        }
    }

    /**
     * 渲染背包内容
     */
    private renderBag(): void {
        const bagGrid = document.getElementById("bag-grid");
        if (!bagGrid) return;

        // 清空现有内容
        bagGrid.innerHTML = "";

        // 获取ArchiveManager实例
        const archiveManager = ArchiveManager.getInstance();

        // 获取玩家拥有的物品
        const playerItems: string[] = [];
        for (const itemId in ITEMS_DATABASE) {
            if (archiveManager.hasItem(itemId)) {
                playerItems.push(itemId);
            }
        }

        // 如果没有物品，显示提示
        if (playerItems.length === 0) {
            bagGrid.innerHTML = '<p class="empty-bag" style="grid-column: 1/-1; text-align: center; color: #eeeeee;">背包是空的</p>';
            return;
        }

        // 渲染每个物品
        playerItems.forEach(itemId => {
            const item = ITEMS_DATABASE[itemId];
            if (item) {
                const itemElement = this.createItemElement(item);
                bagGrid.appendChild(itemElement);
            }
        });
    }

    /**
     * 创建物品元素
     * @param item 物品数据
     * @returns HTML元素
     */
    private createItemElement(item: Item): HTMLElement {
        const itemElement = document.createElement("div");
        itemElement.className = "bag-item";
        itemElement.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <p class="item-name">${item.name}</p>
        `;

        itemElement.addEventListener("click", () => {
            this.showItemModal(item);
        });

        return itemElement;
    }

    /**
     * 显示物品详情弹窗
     * @param item 物品数据
     */
    private showItemModal(item: Item): void {
        const modal = document.getElementById("item-modal");
        const itemName = document.getElementById("modal-item-name");
        const itemDescription = document.getElementById("modal-item-description");

        if (itemName) itemName.textContent = item.name;
        if (itemDescription) itemDescription.textContent = item.description;

        if (modal) {
            modal.style.display = "flex";
        }
    }

    /**
     * 添加物品到背包
     * @param itemId 物品ID
     */
    public addItemToBag(itemId: string): void {
        const archiveManager = ArchiveManager.getInstance();
        archiveManager.addItem(itemId);
    }

    /**
     * 从背包移除物品
     * @param itemId 物品ID
     */
    public removeItemFromBag(itemId: string): void {
        const archiveManager = ArchiveManager.getInstance();
        archiveManager.removeItem(itemId);
    }

    /**
     * 检查背包中是否有指定物品
     * @param itemId 物品ID
     * @returns 是否拥有该物品
     */
    public hasItemInBag(itemId: string): boolean {
        const archiveManager = ArchiveManager.getInstance();
        return archiveManager.hasItem(itemId);
    }
}

// 导出游戏场景实例
export default new GameScene();
