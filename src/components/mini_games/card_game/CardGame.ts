import { MiniGame } from "../../../components/MiniGame";
import { CardGameConfig } from "../../../types/MiniGameConfig";
import { CARD_TEMPLATES } from "./data/CardData";
import { Card, CardType } from "./models/Card";
import { Player } from "./models/Player";
import { CardGameState } from "./models/GameState";
import { CardService } from "./services/CardService";
import { PlayerService } from "./services/PlayerService";
import { GameService } from "./services/GameService";
import { UIManager } from "./components/UIManager";
import { DEFAULT_PLAYER_DECK } from "./CardManager";
import { AudioManager } from "../../../components/AudioManager";

// 卡牌游戏类
class CardGame extends MiniGame {
    // 卡牌游戏的HTML模板
    static readonly HTML_TEMPLATE = `
        <div id="card-game-container" style="width:100%;height:100%;position:relative;background:linear-gradient(135deg, #1a1a1a 0%, #2c1e1e 50%, #1a1a1a 100%);color:#d4af37;font-family:'Courier New', monospace;overflow:hidden;">
            <!-- 末日风格背景纹理 -->
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(circle at 10% 20%, rgba(139, 0, 0, 0.1) 0%, transparent 20%),radial-gradient(circle at 90% 80%, rgba(139, 0, 0, 0.1) 0%, transparent 20%);z-index:0;"></div>
            
            <div id="game-ui" style="position:absolute;top:10px;left:10px;z-index:10;display:none;"> <!-- 隐藏得分UI -->
                <div id="score" style="font-size:24px;margin-bottom:10px;background:rgba(0,0,0,0.7);padding:8px 15px;border-radius:5px;border:1px solid #d4af37;box-shadow:0 0 10px rgba(212, 175, 55, 0.3);">分数: 0</div>
                <div id="game-over" class="hidden" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);padding:30px;border-radius:10px;text-align:center;display:none;z-index:20;border:2px solid #d4af37;box-shadow:0 0 20px rgba(212, 175, 55, 0.5);">
                    <h2 style="color:#d4af37;margin-top:0;margin-bottom:20px;text-transform:uppercase;letter-spacing:2px;">游戏结束</h2>
                    <div id="final-score" style="margin-bottom:20px;font-size:18px;">最终结果</div>
                    <button id="restart-button" style="padding:12px 25px;font-size:16px;background:linear-gradient(to bottom, #8B0000, #4d0000);color:#d4af37;border:1px solid #d4af37;border-radius:5px;cursor:pointer;margin-top:10px;letter-spacing:1px;box-shadow:0 0 10px rgba(212, 175, 55, 0.3);transition:all 0.3s;">重新开始</button>
                </div>
            </div>
            
            <!-- 对手信息区域 (右上角) -->
            <div id="opponent-info-container" style="position:absolute;top:20px;right:20px;z-index:10;background:rgba(0,0,0,0.7);padding:15px;border-radius:8px;border:1px solid #d4af37;min-width:220px;box-shadow:0 0 15px rgba(212, 175, 55, 0.4);">
                <div id="opponent-info" style="text-align:center;"></div>
            </div>
            
            <!-- 玩家信息区域 (右下角) -->
            <div id="player-info-container" style="position:absolute;bottom:20px;right:20px;z-index:10;background:rgba(0,0,0,0.7);padding:15px;border-radius:8px;border:1px solid #d4af37;min-width:220px;box-shadow:0 0 15px rgba(212, 175, 55, 0.4);">
                <div id="player-info" style="text-align:center;"></div>
            </div>
            
            <!-- 调试信息区域 -->
            <div id="debug-info" style="position:absolute;bottom:10px;left:10px;background:rgba(0,0,0,0.8);padding:15px;border-radius:5px;z-index:1000;width:300px;border:1px solid #d4af37;box-shadow:0 0 10px rgba(212, 175, 55, 0.3);display:none;">
                <h3 style="margin-top:0;color:#d4af37;border-bottom:1px solid #d4af37;padding-bottom:5px;">调试信息</h3>
                <div id="debug-content" style="font-size:12px;"></div>
            </div>
            
            <!-- 对手区域 -->
            <div id="opponent-area" style="height:30%;border-bottom:2px solid rgba(212, 175, 55, 0.5);display:flex;flex-direction:column;justify-content:center;align-items:center;background:rgba(0,0,0,0.3);position:relative;z-index:1;">
                <div id="opponent-hand" style="display:flex;gap:20px;transition:all 0.3s ease;z-index:2;align-items:center;justify-content:center;width:100%;"></div>
            </div>
            
            <!-- 对手已出牌区域 -->
            <div id="opponent-played-cards" style="height:12%;display:flex;justify-content:center;align-items:center;gap:20px;background:rgba(30, 30, 30, 0.5);border-bottom:1px dashed rgba(212, 175, 55, 0.3);transition: all 0.5s ease;"></div>
            
            <!-- 战场区域 -->
            <div id="battlefield" style="height:16%;display:flex;flex-direction:column;justify-content:center;align-items:center;background:rgba(0,0,0,0.4);position:relative;z-index:1;border-top:1px dashed rgba(212, 175, 55, 0.3);border-bottom:1px dashed rgba(212, 175, 55, 0.3);">
                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background-image:repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(212, 175, 55, 0.05) 4px, rgba(212, 175, 55, 0.05) 8px);"></div>
                <div id="game-message" style="font-size:22px;text-align:center;margin-bottom:20px;text-shadow:0 0 5px rgba(212, 175, 55, 0.7);max-width:80%;line-height:1.4;"></div>
                <button id="end-turn-button" style="padding:12px 30px;font-size:18px;background:linear-gradient(to bottom, #8B0000, #4d0000);color:#d4af37;border:1px solid #d4af37;border-radius:5px;cursor:pointer;letter-spacing:1px;box-shadow:0 0 15px rgba(212, 175, 55, 0.4);transition:all 0.3s;text-transform:uppercase;z-index:5;position:relative;">结束回合</button>
            </div>
            
            <!-- 玩家已出牌区域 -->
            <div id="player-played-cards" style="height:12%;display:flex;justify-content:center;align-items:center;gap:20px;background:rgba(30, 30, 30, 0.5);border-top:1px dashed rgba(212, 175, 55, 0.3);transition: all 0.5s ease;"></div>
            
            <!-- 玩家区域 -->
            <div id="player-area" style="height:30%;border-top:2px solid rgba(212, 175, 55, 0.5);display:flex;flex-direction:column-reverse;justify-content:center;align-items:center;background:rgba(0,0,0,0.3);position:relative;z-index:1;">
                <div id="player-hand" style="display:flex;gap:20px;transition:all 0.3s ease;margin-bottom:15px;z-index:2;align-items:center;justify-content:center;width:100%;"></div>
            </div>
            
            <!-- 末日风格装饰元素 -->
            <div style="position:absolute;top:20%;left:5%;width:50px;height:2px;background:#d4af37;transform:rotate(30deg);opacity:0.5;"></div>
            <div style="position:absolute;top:70%;right:7%;width:30px;height:2px;background:#d4af37;transform:rotate(-20deg);opacity:0.5;"></div>
            <div style="position:absolute;top:40%;right:10%;width:40px;height:40px;border:1px solid #d4af37;border-radius:50%;opacity:0.2;"></div>
        </div>
    `;

    private state: CardGameState;
    private restartButton: HTMLButtonElement | null = null;
    private endTurnButton: HTMLButtonElement | null = null;
    private playerHandElement: HTMLElement | null = null;
    private opponentHandElement: HTMLElement | null = null;
    private playerInfoElement: HTMLElement | null = null;
    private opponentInfoElement: HTMLElement | null = null;
    private gameMessageElement: HTMLElement | null = null;
    private debugContentElement: HTMLElement | null = null; // 添加调试信息元素引用
    private playerPlayedCardsElement: HTMLElement | null = null; // 玩家已出牌区域
    private opponentPlayedCardsElement: HTMLElement | null = null; // 对手已出牌区域
    
    // 已出牌记录（包含回合信息）
    private playerPlayedCards: Array<{card: Card, turn: number}> = []; // 玩家已出的牌
    private opponentPlayedCards: Array<{card: Card, turn: number}> = []; // 对手已出的牌
    
    // 游戏配置
    private config: CardGameConfig;
    // 音频管理器
    private audioManager: any;
    // 原始背景音乐
    private originalBgm: string = "";
    constructor(onComplete: (score: number) => void, private gameConfig?: CardGameConfig) {
        super(onComplete);
        
// 在CardGame类的构造函数中，处理player deck配置
        this.config = {
            player: {
                actionPoints: gameConfig?.player?.actionPoints ?? 3,
                hp: gameConfig?.player?.hp ?? 30,
                maxHp: gameConfig?.player?.maxHp ?? 30,
                deck: typeof gameConfig?.player?.deck === 'function' 
                    ? gameConfig.player.deck() 
                    : gameConfig?.player?.deck ?? DEFAULT_PLAYER_DECK,
                drawCount: gameConfig?.player?.drawCount ?? 2,
                initialDrawCount: gameConfig?.player?.initialDrawCount ?? 4
            },
            opponent: {
                actionPoints: gameConfig?.opponent?.actionPoints ?? 3,
                hp: gameConfig?.opponent?.hp ?? 30,
                maxHp: gameConfig?.opponent?.maxHp ?? 30,
                deck: gameConfig?.opponent?.deck ?? DEFAULT_PLAYER_DECK,
                drawCount: gameConfig?.opponent?.drawCount ?? 1,
                initialDrawCount: gameConfig?.opponent?.initialDrawCount ?? 3
            }
        };

        // 初始化游戏状态
        this.state = {
            player: {
                id: 'player',
                name: '玩家',
                hp: this.config.player!.hp!,
                maxHp: this.config.player!.maxHp!,
                actionPoints: this.config.player!.actionPoints!,
                maxActionPoints: this.config.player!.actionPoints!,
                deck: GameService.createInitialDeck(
                    typeof this.config.player!.deck === 'function' 
                        ? this.config.player!.deck() 
                        : this.config.player!.deck, 
                    true
                ),
                hand: [],
                discardPile: [],
                defense: 0,
                buffs: []  // 初始化buff列表
            },
            opponent: {
                id: 'opponent',
                name: '巨石',
                hp: this.config.opponent!.hp!,
                maxHp: this.config.opponent!.maxHp!,
                actionPoints: this.config.opponent!.actionPoints!,
                maxActionPoints: this.config.opponent!.actionPoints!,
                deck: GameService.createInitialDeck(
                    typeof this.config.opponent!.deck === 'function' 
                        ? this.config.opponent!.deck() 
                        : this.config.opponent!.deck, 
                    true
                ),
                hand: [],
                discardPile: [],
                defense: 0,
                buffs: []  // 初始化buff列表
            },
            currentPlayer: 'player',
            gamePhase: 'draw',
            turn: 1,
            selectedCard: null,
            message: '游戏开始！抽牌阶段。',
            playerWon: null
        };

        this.setUIElements('score', 'game-over');
    }

    protected init(): void {
        this.setupUIElements();
        this.setupEventListeners();
        this.startGame();
    }

    // 设置UI元素
    private setupUIElements(): void {
        this.restartButton = document.getElementById('restart-button') as HTMLButtonElement;
        this.endTurnButton = document.getElementById('end-turn-button') as HTMLButtonElement;
        this.playerHandElement = document.getElementById('player-hand');
        this.opponentHandElement = document.getElementById('opponent-hand');
        this.playerInfoElement = document.getElementById('player-info');
        this.opponentInfoElement = document.getElementById('opponent-info');
        this.gameMessageElement = document.getElementById('game-message');
        this.debugContentElement = document.getElementById('debug-content'); // 获取调试信息元素引用
        this.playerPlayedCardsElement = document.getElementById('player-played-cards'); // 获取玩家已出牌区域
        this.opponentPlayedCardsElement = document.getElementById('opponent-played-cards'); // 获取对手已出牌区域
    }

    // 更新调试信息显示
    private updateDebugInfo(): void {
        if (this.debugContentElement) {
            this.debugContentElement.innerHTML = `
                <div>当前回合: ${this.state.turn}</div>
                <div>当前玩家: ${this.state.currentPlayer}</div>
                <div>游戏阶段: ${this.state.gamePhase}</div>
                <div>玩家HP: ${this.state.player.hp}/${this.state.player.maxHp}</div>
                <div>玩家行动值: ${this.state.player.actionPoints}/${this.state.player.maxActionPoints}</div>
                <div>巨石HP: ${this.state.opponent.hp}/${this.state.opponent.maxHp}</div>
                <div>巨石行动值: ${this.state.opponent.actionPoints}/${this.state.opponent.maxActionPoints}</div>
                <div>玩家手牌数: ${this.state.player.hand.length}</div>
                <div>巨石手牌数: ${this.state.opponent.hand.length}</div>
            `;
        }
    }

    protected setupEventListeners(): void {
        if (this.restartButton) {
            this.restartButton.addEventListener('click', () => {
                this.restart();
            });
            
            // 添加悬停效果
            this.restartButton.addEventListener('mouseenter', () => {
                if (this.restartButton) {
                    this.restartButton.style.background = 'linear-gradient(to bottom, #a00000, #6b0000)';
                    this.restartButton.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.6)';
                }
            });
            
            this.restartButton.addEventListener('mouseleave', () => {
                if (this.restartButton) {
                    this.restartButton.style.background = 'linear-gradient(to bottom, #8B0000, #4d0000)';
                    this.restartButton.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
                }
            });
        }

        if (this.endTurnButton) {
            this.endTurnButton.addEventListener('click', () => {
                console.log('玩家点击结束回合按钮');
                this.endTurn();
            });
            
            // 添加悬停效果
            this.endTurnButton.addEventListener('mouseenter', () => {
                if (this.endTurnButton) {
                    this.endTurnButton.style.background = 'linear-gradient(to bottom, #a00000, #6b0000)';
                    this.endTurnButton.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
                    this.endTurnButton.style.transform = 'scale(1.05)';
                }
            });
            
            this.endTurnButton.addEventListener('mouseleave', () => {
                if (this.endTurnButton) {
                    this.endTurnButton.style.background = 'linear-gradient(to bottom, #8B0000, #4d0000)';
                    this.endTurnButton.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.4)';
                    this.endTurnButton.style.transform = 'scale(1)';
                }
            });
        }
    }

    // 更新已出牌区域
    private updatePlayedCards(): void {
        // 更新玩家已出牌区域
        if (this.playerPlayedCardsElement) {
            // 清空当前显示的所有卡牌
            this.playerPlayedCardsElement.innerHTML = '';
            
            // 只添加当前回合和上一回合的卡牌
            for (let i = 0; i < this.playerPlayedCards.length; i++) {
                const playedCard = this.playerPlayedCards[i];
                // 只显示当前回合和上一回合的卡牌
                if (playedCard.turn >= this.state.turn - 1) {
                    const cardElement = UIManager.createPlayedCardElement(playedCard, 'player', this.state.turn);
                    this.playerPlayedCardsElement.appendChild(cardElement);
                }
            }
        }
        
        // 更新对手已出牌区域
        if (this.opponentPlayedCardsElement) {
            // 清空当前显示的所有卡牌
            this.opponentPlayedCardsElement.innerHTML = '';
            
            // 只添加当前回合和上一回合的卡牌
            for (let i = 0; i < this.opponentPlayedCards.length; i++) {
                const playedCard = this.opponentPlayedCards[i];
                // 只显示当前回合和上一回合的卡牌
                if (playedCard.turn >= this.state.turn - 1) {
                    const cardElement = UIManager.createPlayedCardElement(playedCard, 'opponent', this.state.turn);
                    this.opponentPlayedCardsElement.appendChild(cardElement);
                }
            }
        }
    }

 // 开始游戏
    private startGame(): void {
        // 播放背景音乐
        this.playBackgroundMusic();
        
        // 初始抽牌
        PlayerService.drawCards(this.state.player, this.config.player!.initialDrawCount!);
        PlayerService.drawCards(this.state.opponent, this.config.opponent!.initialDrawCount!);
        this.updateUI();
    }

    // 播放背景音乐
    private playBackgroundMusic(): void {
        try {
            // 获取音频管理器实例
            this.audioManager = (window as any).audioManagerInstance;
            
            // 如果无法获取音频管理器实例，则尝试通过getInstance方法获取
            if (!this.audioManager) {
                try {
                    this.audioManager = AudioManager.getInstance();
                } catch (e) {
                    console.warn("无法获取真实的音频管理器实例，使用模拟实例", e);
                }
            }
            
            // 如果仍然无法获取音频管理器实例，则创建一个模拟的
            if (!this.audioManager) {
                console.warn("无法获取真实的音频管理器实例，使用模拟实例");
                this.audioManager = {
                    updateBackgroundMusic: (bgm: string) => {
                        console.log("模拟播放背景音乐:", bgm);
                        // 尝试直接操作DOM中的audio元素
                        const musicElement = document.getElementById("music") as HTMLAudioElement | null;
                        if (musicElement) {
                            const audioPath = `../../assets/bgm/${bgm}.mp3`;
                            musicElement.src = audioPath;
                            musicElement.loop = true;
                            musicElement.volume = 1.0;
                            musicElement.play().catch(e => console.error("播放失败:", e));
                            // 更新localStorage
                            localStorage.setItem("nowbgm", bgm);
                            console.log("已直接播放音乐:", audioPath);
                        }
                    },
                    stopBackgroundMusic: () => {
                        console.log("模拟停止背景音乐");
                        const musicElement = document.getElementById("music") as HTMLAudioElement | null;
                        if (musicElement) {
                            musicElement.pause();
                            musicElement.src = "";
                        }
                        localStorage.setItem("nowbgm", "null");
                    },
                    getCurrentBgm: () => {
                        const musicElement = document.getElementById("music") as HTMLAudioElement | null;
                        return musicElement && musicElement.src ? musicElement.src.split('/').pop()?.replace('.mp3', '') || "" : "";
                    }
                };
            }
            
            // 保存当前播放的背景音乐
            this.originalBgm = this.audioManager.getCurrentBgm();
            console.log("保存当前背景音乐:", this.originalBgm);
            
                       // 保存当前播放的背景音乐
            this.originalBgm = this.audioManager.getCurrentBgm();
            console.log("保存当前背景音乐:", this.originalBgm);
            
                       // 播放卡牌游戏专用背景音乐
            // 如果游戏配置中指定了背景音乐，则使用指定的，否则使用默认的 bgm9
            const gameBgm = this.gameConfig?.bgm || "bgm9";
            console.log("播放卡牌游戏背景音乐:", gameBgm);
            this.audioManager.updateBackgroundMusic(gameBgm);
        } catch (error) {
            console.error("播放背景音乐时出错:", error);
        }
    }    private stopBackgroundMusic(): void {
        try {
            if (this.audioManager) {
                // 恢复原始背景音乐
                if (this.originalBgm && this.originalBgm !== "") {
                    console.log("恢复原始背景音乐:", this.originalBgm);
                    this.audioManager.updateBackgroundMusic(this.originalBgm);
                } else {
                    console.log("没有原始背景音乐或原始背景音乐为空，播放默认背景音乐 bgm1");
                    this.audioManager.updateBackgroundMusic("bgm1");
                }
            }
        } catch (error) {
            console.error("恢复背景音乐时出错:", error);
        }
    }
    // 玩家回合
    private playerTurn(): void {
        console.log('玩家回合，当前玩家:', this.state.currentPlayer);
        if (this.state.currentPlayer !== 'player') return;

        console.log('玩家游戏阶段:', this.state.gamePhase);
        switch (this.state.gamePhase) {
            case 'draw':
                console.log('玩家抽牌阶段');
                // 在玩家新回合开始时清除上一回合的防御点数
                this.state.player.defense = 0;
                PlayerService.drawCards(this.state.player, this.config.player!.drawCount!);
                this.state.gamePhase = 'main';
                this.state.message = '你的回合，选择一张卡牌使用';
                this.updateUI();
                // 重启游戏循环以确保UI更新
                this.gameLoop();
                break;
            case 'main':
                // 等待玩家操作
                console.log('等待玩家操作');
                this.updateUI();
                break;
            case 'battle':
                // 处理战斗逻辑
                break;
        }
    }

    // 巨石回合
    private opponentTurn(): void {
        console.log('巨石回合开始:', this.state.currentPlayer);
        if (this.state.currentPlayer !== 'opponent') {
            console.log('当前不是巨石回合，返回');
            return;
        }

        console.log('巨石游戏阶段:', this.state.gamePhase);
        switch (this.state.gamePhase) {
            case 'draw':
                console.log('巨石抽牌阶段');
                // 在巨石新回合开始时清除上一回合的防御点数
                this.state.opponent.defense = 0;
                PlayerService.drawCards(this.state.opponent, this.config.opponent!.drawCount!);
                this.state.gamePhase = 'main';
                this.state.message = '巨石回合';
                this.updateUI();
                // 继续处理main阶段
                this.opponentTurn();
                break;
            case 'main':
                console.log('巨石主要阶段，准备出牌');
                this.updateUI();
                // 添加一个小延迟，让玩家看到消息变化
                setTimeout(() => {
                    console.log('调用巨石出牌逻辑');
                    this.opponentPlayCard();
                }, 1000);
                break;
        }
    }

    // 巨石出牌逻辑
    private opponentPlayCard(): void {
        console.log('巨石尝试出牌');
        console.log('巨石手牌:', this.state.opponent.hand);
        console.log('巨石行动值:', this.state.opponent.actionPoints);
        console.log('巨石血量:', this.state.opponent.hp, '/', this.state.opponent.maxHp);
        console.log('玩家血量:', this.state.player.hp, '/', this.state.player.maxHp);
        
        // 更新调试信息
        this.updateDebugInfo();
        
        // 获取所有能使用的卡牌
        let playableCards = this.state.opponent.hand.filter(card => card.cost <= this.state.opponent.actionPoints);
        console.log('可用卡牌:', playableCards);
        
        // 在调试信息中显示可用卡牌
        if (this.debugContentElement) {
            const playableCardsInfo = playableCards.map(card => 
                `${card.name}(优先级:${card.priority},消耗:${card.cost})`
            ).join(', ') || '无';
            this.debugContentElement.innerHTML += `<div>巨石可用卡牌: ${playableCardsInfo}</div>`;
        }
        
        if (playableCards.length > 0) {
            // 根据血量情况调整策略
            const opponentHpRatio = this.state.opponent.hp / this.state.opponent.maxHp;
            const playerHpRatio = this.state.player.hp / this.state.player.maxHp;
            
            // 在调试信息中显示血量比例
            if (this.debugContentElement) {
                this.debugContentElement.innerHTML += `<div>巨石血量比例: ${opponentHpRatio.toFixed(2)}, 玩家血量比例: ${playerHpRatio.toFixed(2)}</div>`;
            }
            
            // 过滤掉不必要的治疗卡牌（当巨石血量已经很高时）
            if (opponentHpRatio > 0.9) {
                // 当血量超过90%时，过滤掉治疗类卡牌
                playableCards = playableCards.filter(card => {
                    // 保留攻击牌和防御牌，过滤掉特殊牌中的治疗术
                    if (card.type === CardType.SPECIAL) {
                        // 检查是否有治疗效果
                        const hasHealEffect = card.effects.some(effect => effect.type === 'heal');
                        return !hasHealEffect;
                    }
                    return true;
                });
                
                // 如果过滤后没有卡牌了，则恢复所有卡牌
                if (playableCards.length === 0) {
                    playableCards = this.state.opponent.hand.filter(card => card.cost <= this.state.opponent.actionPoints);
                }
                
                console.log('过滤治疗卡牌后:', playableCards);
                if (this.debugContentElement) {
                    const filteredCardsInfo = playableCards.map(card => 
                        `${card.name}(类型:${card.type},优先级:${card.priority},消耗:${card.cost})`
                    ).join(', ') || '无';
                    this.debugContentElement.innerHTML += `<div>过滤治疗卡牌后: ${filteredCardsInfo}</div>`;
                }
            }
            
            // 如果巨石血量较低，过滤掉会消耗自己血量的卡牌，除非能一次性击败玩家
            if (opponentHpRatio < 0.5) {
                playableCards = playableCards.filter(card => {
                    // 检查卡牌是否会对自身造成伤害
                    const selfDamageEffects = card.effects.filter(effect => 
                        effect.type === 'damage' && effect.target === 'self');
                    
                    // 如果没有对自身伤害的效果，保留这张卡牌
                    if (selfDamageEffects.length === 0) {
                        return true;
                    }
                    
                    // 如果有对自身伤害的效果，计算总伤害
                    const selfDamage = selfDamageEffects.reduce((sum, effect) => sum + (effect.value || 0), 0);
                    
                    // 检查是否能一次性击败玩家
                    const totalPlayerDamage = this.state.player.hp;
                    
                    // 如果巨石当前血量减去自伤后仍然能击败玩家，则保留这张卡牌
                    if (this.state.opponent.hp - selfDamage > 0 && 
                        card.effects.some(effect => 
                            effect.type === 'damage' && 
                            effect.target === 'opponent' && 
                            (effect.value || 0) >= totalPlayerDamage)) {
                        return true;
                    }
                    
                    // 如果会造成自伤且不能一次性击败玩家，则过滤掉这张卡牌
                    return false;
                });
                
                // 如果过滤后没有卡牌了，则恢复所有卡牌
                if (playableCards.length === 0) {
                    playableCards = this.state.opponent.hand.filter(card => card.cost <= this.state.opponent.actionPoints);
                }
                
                console.log('过滤自伤卡牌后:', playableCards);
                if (this.debugContentElement) {
                    const filteredCardsInfo = playableCards.map(card => 
                        `${card.name}(类型:${card.type},优先级:${card.priority},消耗:${card.cost})`
                    ).join(', ') || '无';
                    this.debugContentElement.innerHTML += `<div>过滤自伤卡牌后: ${filteredCardsInfo}</div>`;
                }
            }
            
            // 按优先级排序，但根据血量情况调整策略
            playableCards.sort((a, b) => {
                // 如果巨石血量较高(>70%)且玩家血量较低(<50%)，更倾向于使用攻击牌
                if (opponentHpRatio > 0.7 && playerHpRatio < 0.5) {
                    // 优先考虑攻击类型卡牌
                    if (a.type === CardType.ATTACK && b.type !== CardType.ATTACK) {
                        return -1; // a优先
                    }
                    if (b.type === CardType.ATTACK && a.type !== CardType.ATTACK) {
                        return 1; // b优先
                    }
                }
                
                // 如果巨石血量较低(<30%)，更倾向于使用防御和治疗牌
                if (opponentHpRatio < 0.3) {
                    // 优先考虑防御和特殊类型卡牌（治疗）
                    const aIsDefensive = (a.type === CardType.DEFENSE || a.type === CardType.SPECIAL);
                    const bIsDefensive = (b.type === CardType.DEFENSE || b.type === CardType.SPECIAL);
                    
                    if (aIsDefensive && !bIsDefensive) {
                        return -1; // a优先
                    }
                    if (bIsDefensive && !aIsDefensive) {
                        return 1; // b优先
                    }
                }
                
                // 默认情况下按优先级排序
                if (b.priority !== a.priority) {
                    return b.priority - a.priority; // 优先级高的排在前面
                }
                // 优先级相同时随机排序
                return Math.random() - 0.5;
            });
            
            // 选择第一张卡牌
            const card = playableCards[0];
            console.log('巨石选择卡牌:', card);
            
            // 在调试信息中显示选择的卡牌
            if (this.debugContentElement) {
                this.debugContentElement.innerHTML += `<div>巨石选择: ${card.name}(类型:${card.type},优先级:${card.priority},消耗:${card.cost})</div>`;
            }
            
            this.playCard(this.state.opponent, card);
        } else {
            console.log('巨石没有可用卡牌');
            // 在调试信息中显示没有可用卡牌
            if (this.debugContentElement) {
                this.debugContentElement.innerHTML += `<div>巨石没有可用卡牌，将结束回合</div>`;
            }
            // 没有可用卡牌，直接结束回合
            setTimeout(() => {
                console.log('巨石没有可用卡牌，结束回合');
                this.endTurn();
            }, 1500);
        }
    }

 // 使用卡牌
    private async playCard(player: Player, card: Card): Promise<void> {
        console.log(`${player.name} 使用卡牌:`, card);
        
        // 在调试信息中显示使用卡牌的信息
        if (this.debugContentElement) {
            this.debugContentElement.innerHTML += `<div>${player.name}使用卡牌: ${card.name}</div>`;
        }
        
        if (player.actionPoints < card.cost) {
            this.state.message = `${player.name} 行动值不足，无法使用 ${card.name}`;
            this.updateUI();
            return;
        }

        // 记录已出的牌（包含回合信息）
        if (player.id === 'player') {
            this.playerPlayedCards.push({card: {...card}, turn: this.state.turn});
        } else {
            this.opponentPlayedCards.push({card: {...card}, turn: this.state.turn});
        }

        // 保存卡牌索引用于后续处理
        const cardIndex = player.hand.findIndex(c => c.id === card.id);
        
        // 执行出牌动画
        await UIManager.playCardAnimation(player.id as 'player' | 'opponent', card, card.id);

        // 在出牌动画结束后播放音效
        try {
            if (this.audioManager) {
                this.audioManager.playSoundEffect("card_play");
            }
        } catch (e) {
            console.log("无法播放出牌音效:", e);
        }

        // 消耗行动值
        player.actionPoints -= card.cost;

        // 执行卡牌效果
        CardService.executeCardEffects(player, card, player.id === 'player' ? this.state.opponent : this.state.player, (message) => {
            this.state.message = message;
        });

        // 从手牌中移除卡牌并放入弃牌堆
        if (cardIndex !== -1) {
            const [removedCard] = player.hand.splice(cardIndex, 1);
            player.discardPile.push(removedCard);
        }

        // 更新UI
        this.updateUI();

        // 检查游戏是否结束
        this.checkGameOver();
        
        // 如果是玩家出牌
        if (player.id === 'player') {
            console.log('玩家使用卡牌完毕，等待玩家结束回合');
        }
        // 如果是巨石出牌
        else if (player.id === 'opponent') {
            console.log('巨石使用卡牌完毕，检查是否继续出牌');
            
            // 检查是否还有可用的卡牌并且还有行动点数
            const remainingPlayableCards = this.state.opponent.hand.filter(c => c.cost <= this.state.opponent.actionPoints);
            if (remainingPlayableCards.length > 0 && this.state.opponent.actionPoints > 0) {
                console.log('巨石还有可用卡牌，0.5秒后继续出牌'); // 缩短延迟时间
                if (this.debugContentElement) {
                    this.debugContentElement.innerHTML += `<div>巨石还有${remainingPlayableCards.length}张可用卡牌，继续出牌</div>`;
                }
                // 缩短延迟时间
                setTimeout(() => {
                    this.opponentPlayCard();
                }, 500);
            } else {
                console.log('巨石没有更多可用卡牌或行动点数，0.75秒后结束回合'); // 缩短延迟时间
                if (this.debugContentElement) {
                    this.debugContentElement.innerHTML += `<div>巨石结束回合</div>`;
                }
                // 缩短延迟时间
                setTimeout(() => {
                    this.endTurn();
                }, 750);
            }
        }
    }
    // 结束回合
    private endTurn(): void {
        console.log('结束回合，当前玩家:', this.state.currentPlayer);
        
        // 处理所有玩家的buff效果
        PlayerService.processBuffs(this.state.player, this.state.opponent, (message) => {
            this.state.message += message;
        });
        PlayerService.processBuffs(this.state.opponent, this.state.player, (message) => {
            this.state.message += message;
        });
        
        if (this.state.currentPlayer === 'player') {
            // 玩家回合结束，轮到巨石
            // 不再清除玩家的防御点数，而是在玩家下一回合开始时清除
            // 玩家回合结束时增加玩家行动值
            this.state.player.actionPoints += 2;
            this.state.currentPlayer = 'opponent';
            this.state.gamePhase = 'draw';
            this.state.message = '巨石回合';
            console.log('切换到巨石回合');
            
            // 重启游戏循环以处理巨石回合
            this.gameLoop();
        } else {
            // 巨石回合结束，轮到玩家
            // 不再清除巨石的防御点数，而是在巨石下一回合开始时清除
            // 巨石回合结束时增加巨石行动值
            this.state.opponent.actionPoints += 2;
            this.state.currentPlayer = 'player';
            this.state.gamePhase = 'draw';
            this.state.turn++;
            this.state.message = '你的回合，抽牌阶段';
            console.log('切换到玩家回合');

            // 重启游戏循环以处理玩家回合
            this.gameLoop();
        }
        
        // 在调试信息中显示回合切换
        if (this.debugContentElement) {
            this.debugContentElement.innerHTML += `<div>回合切换到: ${this.state.currentPlayer}</div>`;
        }
        
        this.updateUI();
    }

    // 检查游戏是否结束
    private checkGameOver(): void {
        if (this.state.player.hp <= 0) {
            this.state.player.hp = 0;
            this.state.message = '你输了！';
            this.state.playerWon = false;
            this.endGame();
        } else if (this.state.opponent.hp <= 0) {
            this.state.opponent.hp = 0;
            this.state.message = '你赢了！';
            this.state.playerWon = true;
            this.endGame();
        }
    }

    // 结束游戏
    protected endGame(): void {
        this.state.gamePhase = 'gameover';
        this.updateUI();

        if (this.gameOverElement) {
            this.gameOverElement.classList.remove('hidden');
            const finalScoreElement = document.getElementById('final-score');
            if (finalScoreElement) {
                finalScoreElement.textContent = this.state.playerWon ? '恭喜你赢了!' : '很遗憾，你输了!';
            }
        }

        // 停止背景音乐
        this.stopBackgroundMusic();

        // 调用完成回调，玩家获胜得分为1，失败为0
        this.onComplete(this.state.playerWon ? 1 : 0);
    }

    protected gameLoop(): void {
        console.log('游戏循环执行');
        // 卡牌游戏不需要持续的游戏循环，主要通过事件驱动
        this.update();
        this.draw();
        
        // 只有在非等待阶段才继续循环
        if (this.state.gamePhase !== 'gameover' && this.state.gamePhase !== 'main') {
            requestAnimationFrame(() => this.gameLoop());
        } else {
            console.log('暂停游戏循环，等待用户输入');
        }
    }

    protected update(): void {
        console.log('更新游戏状态，当前阶段:', this.state.gamePhase, '当前玩家:', this.state.currentPlayer);
        // 更新游戏状态
        if (this.state.gamePhase !== 'gameover') {
            if (this.state.currentPlayer === 'player') {
                this.playerTurn();
            } else {
                this.opponentTurn();
            }
        }
    }

    protected draw(): void {
        console.log('绘制游戏画面');
        // 绘制游戏画面，主要是更新UI
        // 注意：updateUI已经在opponentTurn/playerTurn中调用，避免重复调用
        this.updateScoreDisplay();
    }

    // 更新UI
    private updateUI(): void {
        this.updateScoreDisplay();
        UIManager.updatePlayerInfo(this.playerInfoElement, this.state.player);
        UIManager.updatePlayerInfo(this.opponentInfoElement, this.state.opponent);
        UIManager.updateHand(
            this.playerHandElement, 
            this.state.player.hand, 
            this.state.player.id === this.state.currentPlayer,
            this.state.gamePhase,
            this.state.currentPlayer,
            (card) => {
                if (this.state.currentPlayer === 'player' && this.state.gamePhase === 'main') {
                    this.playCard(this.state.player, card);
                }
            }
        );
        UIManager.updateHand(
            this.opponentHandElement, 
            this.state.opponent.hand, 
            false,
            this.state.gamePhase,
            this.state.currentPlayer,
            () => {} // 对手手牌不需要点击事件
        );
        this.updatePlayedCards(); // 更新已出牌区域
        
        // 更新结束回合按钮状态
        if (this.endTurnButton) {
            // 只有在玩家回合且不是抽牌阶段时才启用按钮
            if (this.state.currentPlayer === 'player' && this.state.gamePhase !== 'draw') {
                this.endTurnButton.disabled = false;
                this.endTurnButton.style.opacity = '1';
                this.endTurnButton.style.cursor = 'pointer';
            } else {
                this.endTurnButton.disabled = true;
                this.endTurnButton.style.opacity = '0.5';
                this.endTurnButton.style.cursor = 'not-allowed';
            }
        }
        
        if (this.gameMessageElement) {
            // 添加消息变化的动画效果
            this.gameMessageElement.style.opacity = '0';
            this.gameMessageElement.style.transition = 'opacity 0.3s';
            
            setTimeout(() => {
                if (this.gameMessageElement) {
                    this.gameMessageElement.textContent = this.state.message;
                    this.gameMessageElement.style.opacity = '1';
                }
            }, 300);
        }
        
        // 更新调试信息
        this.updateDebugInfo();
    }

        // 更新已出牌区域卡牌的视觉状态
    private updatePlayedCardsVisualState(): void {
        // 处理玩家已出牌区域
        if (this.playerPlayedCardsElement) {
            const cards = this.playerPlayedCardsElement.querySelectorAll('.played-card');
            cards.forEach((card, index) => {
                const cardElement = card as HTMLElement;
                
                // 确保索引在范围内
                if (index < this.playerPlayedCards.length) {
                    const playedCard = this.playerPlayedCards[index];
                    
                    // 检查是否是当前回合或上一回合出的牌
                    const isCurrentTurnCard = (playedCard.turn === this.state.turn);
                    const isPreviousTurnCard = (playedCard.turn === this.state.turn - 1);
                    
                    // 设置视觉状态
                    if (isCurrentTurnCard) {
                        cardElement.style.opacity = '1';
                        cardElement.style.border = '2px solid #ff6347';
                    } else if (isPreviousTurnCard) {
                        cardElement.style.opacity = '0.7';
                        cardElement.style.border = '2px solid #d4af37';
                    } else {
                        // 更早的牌应该淡出
                        cardElement.style.opacity = '0';
                        cardElement.style.border = '2px solid #888';
                        cardElement.style.transform = 'scale(0.5)';
                        
                        // 在动画结束后移除元素
                        setTimeout(() => {
                            if (cardElement.parentNode) {
                                cardElement.parentNode.removeChild(cardElement);
                            }
                        }, 500);
                    }
                }
            });
        }
        
        // 处理对手已出牌区域
        if (this.opponentPlayedCardsElement) {
            const cards = this.opponentPlayedCardsElement.querySelectorAll('.played-card');
            cards.forEach((card, index) => {
                const cardElement = card as HTMLElement;
                
                // 确保索引在范围内
                if (index < this.opponentPlayedCards.length) {
                    const playedCard = this.opponentPlayedCards[index];
                    
                    // 检查是否是当前回合或上一回合出的牌
                    const isCurrentTurnCard = (playedCard.turn === this.state.turn);
                    const isPreviousTurnCard = (playedCard.turn === this.state.turn - 1);
                    
                    // 设置视觉状态
                    if (isCurrentTurnCard) {
                        cardElement.style.opacity = '1';
                        cardElement.style.border = '2px solid #ff6347';
                    } else if (isPreviousTurnCard) {
                        cardElement.style.opacity = '0.7';
                        cardElement.style.border = '2px solid #d4af37';
                    } else {
                        // 更早的牌应该淡出
                        cardElement.style.opacity = '0';
                        cardElement.style.border = '2px solid #888';
                        cardElement.style.transform = 'scale(0.5)';
                        
                        // 在动画结束后移除元素
                        setTimeout(() => {
                            if (cardElement.parentNode) {
                                cardElement.parentNode.removeChild(cardElement);
                            }
                        }, 500);
                    }
                }
            });
        }
    }

    public restart(): void {
        // 重置游戏状态
        this.state = {
            player: {
                id: 'player',
                name: '玩家',
                hp: this.config.player!.hp!,
                maxHp: this.config.player!.maxHp!,
                actionPoints: this.config.player!.actionPoints!,
                maxActionPoints: this.config.player!.actionPoints!,
                deck: GameService.createInitialDeck(
                    typeof this.config.player!.deck === 'function' 
                        ? this.config.player!.deck() 
                        : this.config.player!.deck, 
                    true
                ),
                hand: [],
                discardPile: [],
                defense: 0,
                buffs: []  // 重置buff列表
            },
            opponent: {
                id: 'opponent',
                name: '巨石',
                hp: this.config.opponent!.hp!,
                maxHp: this.config.opponent!.maxHp!,
                actionPoints: this.config.opponent!.actionPoints!,
                maxActionPoints: this.config.opponent!.actionPoints!,
                deck: GameService.createInitialDeck(
                    typeof this.config.opponent!.deck === 'function' 
                        ? this.config.opponent!.deck() 
                        : this.config.opponent!.deck, 
                    true
                ),
                hand: [],
                discardPile: [],
                defense: 0,
                buffs: []  // 重置buff列表
            },
            currentPlayer: 'player',
            gamePhase: 'draw',
            turn: 1,
            selectedCard: null,
            message: '游戏开始！抽牌阶段。',
            playerWon: null
        };
        
        // 清空已出牌记录
        this.playerPlayedCards = [];
        this.opponentPlayedCards = [];

        // 隐藏游戏结束界面
        if (this.gameOverElement) {
            this.gameOverElement.classList.add('hidden');
        }

        // 重新开始游戏
        this.startGame();
    }
    
    public start(): void {
        // 调用父类的start方法
        super.start();
        console.log('卡牌游戏开始');
        // 开始游戏循环
        this.gameLoop();
    }
}

export { CardGame, Card, Player, CardType };