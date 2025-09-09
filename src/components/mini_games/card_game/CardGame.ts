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
import { DeckSelection } from "./DeckSelection";
import { CardGameEventData } from "../../../types/MiniGameEvents";
import { SceneManager } from "../../SceneManager";

// 卡牌游戏类
class CardGame extends MiniGame {
 static readonly HTML_TEMPLATE = `
        <div id="card-game-container" style="width:100%;height:100%;position:relative;color:#d4af37;font-family:'Courier New', monospace;overflow:hidden;">
            <!-- 背景图片层 -->
            <div id="card-game-background" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;background-color:#000000;"></div>
            
            <!-- 末日风格背景纹理 -->
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(circle at 10% 20%, rgba(139, 0, 0, 0.1) 0%, transparent 20%),radial-gradient(circle at 90% 80%, rgba(139, 0, 0, 0.1) 0%, transparent 20%);z-index:1;"></div>
            <div id="game-ui" style="position:absolute;top:2%;left:2%;z-index:10;display:none;"> <!-- 使用百分比替代固定像素 -->
                <div id="score" style="font-size:1.5em;margin-bottom:0.5em;background:rgba(0,0,0,0.7);padding:0.5em 1em;border-radius:0.3em;border:1px solid #5f5f5fff;box-shadow:0 0 0.6em rgba(212, 175, 55, 0.3);">分数: 0</div>
                <div id="game-over" class="hidden" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);padding:2em;border-radius:0.6em;text-align:center;display:none;z-index:20;border:0.1em solid #a7a7a7ff;box-shadow:0 0 1.2em rgba(164, 164, 164, 0.5);">
                    <h2 style="color:#d4af37;margin-top:0;margin-bottom:1.2em;text-transform:uppercase;letter-spacing:0.1em;">游戏结束</h2>
                    <div id="final-score" style="margin-bottom:1.2em;font-size:1.1em;">最终结果</div>
                    <button id="restart-button" style="padding:0.7em 1.5em;font-size:1em;background:linear-gradient(to bottom, #5a5a5a, #3a3a3a);color:#d4af37;border:1px solid #8B7D6B;border-radius:0.5em;cursor:pointer;margin-top:0.6em;letter-spacing:0.06em;box-shadow:0 0 0.6em rgba(139, 125, 107, 0.5);transition:all 0.3s;font-family:'Courier New', monospace;">重新开始</button>
                </div>
            </div>
            
            <!-- 对手信息区域 (右上角) -->
            <div id="opponent-info-container" style="position:absolute;top:2%;right:2%;z-index:10;background:rgba(0,0,0,0.7);padding:1%;border-radius:0.5em;border:1px solid #8B7D6B;min-width:15%;box-shadow:0 0 1em rgba(139, 125, 107, 0.6);">
                <div id="opponent-info" style="text-align:center;"></div>
            </div>
            
            <!-- 玩家信息区域 (右下角) -->
            <div id="player-info-container" style="position:absolute;bottom:2%;right:2%;z-index:10;background:rgba(0,0,0,0.7);padding:1%;border-radius:0.5em;border:1px solid #8B7D6B;min-width:15%;box-shadow:0 0 1em rgba(139, 125, 107, 0.6);">
                <div id="player-info" style="text-align:center;"></div>
            </div>
            
            <!-- 调试信息区域 -->
            <div id="debug-info" style="position:absolute;bottom:1%;left:1%;background:rgba(0,0,0,0.8);padding:1%;border-radius:0.3em;z-index:1000;width:20%;border:1px solid #8B7D6B;box-shadow:0 0 0.6em rgba(139, 125, 107, 0.5);display:none;">
                <h3 style="margin-top:0;color:#d4af37;border-bottom:1px solid #7d7c7aff;padding-bottom:0.3em;">调试信息</h3>
                <div id="debug-content" style="font-size:0.75em;"></div>
            </div>
            
            <style>
                 :root {
                    --card-w: 110px;
                    --card-h: 160px;
                    --spread-angle: 16deg;
                    /* 新增玩家卡牌大小控制变量 */
                    --player-card-w: 15.6vh;
                    --player-card-h: 23.4vh;
                    /* 新增玩家手牌区域偏移控制变量 */
                    --player-hand-offset: -4.75%;
                }
                
                @media (max-width: 768px) {
                    :root {
                        --card-w: 70px;
                        --card-h: 100px;
                        --player-card-w: 10vw;
                        --player-card-h: 14vh;
                    }
                    
                    #opponent-info-container, #player-info-container {
                        min-width: 120px;
                        padding: 8px;
                        font-size: 12px;
                    }
                    
                    #game-message {
                        font-size: 16px;
                    }
                    
                    #end-turn-button {
                        padding: 8px 16px;
                        font-size: 14px;
                    }
                    
                    /* 响应式区域背景 */
                    #opponent-area-background, #player-area-background {
                        width: 90%;
                    }
                }
                
                @media (max-width: 480px) {
                    :root {
                        --card-w: 50px;
                        --card-h: 75px;
                        --player-card-w: 8vw;
                        --player-card-h: 12vh;
                    }
                    
                    #opponent-info-container, #player-info-container {
                        min-width: 100px;
                        padding: 5px;
                        font-size: 10px;
                    }
                    
                    #game-message {
                        font-size: 14px;
                    }
                    
                    #end-turn-button {
                        padding: 6px 12px;
                        font-size: 12px;
                    }
                    
                    /* 响应式区域背景 */
                    #opponent-area-background, #player-area-background {
                        width: 95%;
                    }
                }
                
                .deck {
                    position: relative;
                    width: 100%;
                    height: 35vh; /* 使用视口高度单位替代固定像素值 */
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    pointer-events: auto;
                }
                
                @media (max-width: 768px) {
                    .deck {
                        height: 25vh;
                    }
                }
                
                @media (max-width: 480px) {
                    .deck {
                        height: 20vh;
                    }
                }
                
                .card {
                    --i: 0;
                    width: var(--card-w);
                    height: var(--card-h);
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform-origin: 50% 120%;
                    border-radius: 10px;
                    cursor: pointer;
                    overflow: hidden;
                    user-select: none;
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
                    transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.25, 1), opacity 0.22s ease, filter 0.22s ease;
                    background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
                    color: #fff;
                    z-index: calc(100 - var(--i));
                }
                
               /* 对手卡牌水平排列 */
                #opponent-hand {
                    height: 180px;
                    gap: 15px;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                
                @media (max-width: 768px) {
                    #opponent-hand {
                        height: 120px;
                    }
                }
                
                @media (max-width: 480px) {
                    #opponent-hand {
                        height: 90px;
                    }
                }
                
                #opponent-hand .card {
                    position: relative;
                    left: unset;
                    bottom: unset;
                    transform: none !important;
                    margin: 0 5px;
                    width: var(--card-w);
                    height: var(--card-h);
                    border-radius: 10px;
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
                    transition: all 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
                    background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
                    color: #fff;
                    z-index: 1;
                }
                
                /* 玩家卡牌扇形展开 */
                .deck.player-hand .card {
                    transform: translateX(calc(var(--centered-offset) * 1px));
                }
                
                .deck.player-hand.open .card {
                    transform: translateX(calc(var(--offset) * 1px)) rotate(calc(var(--rotation) * 1deg)) translateY(-26px);
                }
                
                @media (max-width: 768px) {
                    .deck.player-hand.open .card {
                        transform: translateX(calc(var(--offset) * 1px)) rotate(calc(var(--rotation) * 1deg)) translateY(-16px);
                    }
                }
                
                @media (max-width: 480px) {
                    .deck.player-hand.open .card {
                        transform: translateX(calc(var(--offset) * 1px)) rotate(calc(var(--rotation) * 1deg)) translateY(-10px);
                    }
                }
                
                /* 悬停预览（其他牌淡出） */
                .deck.player-hand .card.peek {
                    z-index: 1500;
                    transform: translateX(calc(var(--offset) * 1px)) rotate(calc(var(--rotation) * 1deg)) translateY(-76px) scale(1.15);
                    filter: drop-shadow(0 22px 48px rgba(0, 0, 0, 0.7));
                }
                
                @media (max-width: 768px) {
                    .deck.player-hand .card.peek {
                        transform: translateX(calc(var(--offset) * 1px)) rotate(calc(var(--rotation) * 1deg)) translateY(-50px) scale(1.15);
                    }
                }
                
                @media (max-width: 480px) {
                    .deck.player-hand .card.peek {
                        transform: translateX(calc(var(--offset) * 1px)) rotate(calc(var(--rotation) * 1deg)) translateY(-35px) scale(1.1);
                    }
                }
                
                .deck.player-hand.dim .card:not(.peek):not(.selected) {
                    opacity: 0.28;
                    filter: grayscale(0.6) brightness(0.6);
                }
                
                /* 选中状态 */
                .deck.player-hand .card.selected {
                    z-index: 1600;
                    transform: translateX(calc(var(--offset) * 1px)) rotate(0deg) translateY(-44px) scale(1.07);
                }
                
                @media (max-width: 768px) {
                    .deck.player-hand .card.selected {
                        transform: translateX(calc(var(--offset) * 1px)) rotate(0deg) translateY(-30px) scale(1.05);
                    }
                }
                
                @media (max-width: 480px) {
                    .deck.player-hand .card.selected {
                        transform: translateX(calc(var(--offset) * 1px)) rotate(0deg) translateY(-20px) scale(1.03);
                    }
                }
                
                /* 出牌 */
                .card.playing {
                    pointer-events: none;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.25, 1), left 0.6s ease, top 0.6s ease, opacity 0.35s ease;
                    z-index: 2000;
                }
                
                .placed {
                    position: relative;
                    transform: none !important;
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
                }
                
                /* 玩家和对手出牌区域的不同边框颜色 */
                #player-played-cards .placed {
                    border: 2px solid #4a9dff;
                }
                
                #opponent-played-cards .placed {
                    border: 2px solid #ff4a4a;
                }
                
                /* 抽牌入堆：class 驱动 */
                .incoming {
                    position: fixed;
                    width: var(--card-w);
                    height: var(--card-h);
                    border-radius: 10px;
                    left: 50%;
                    top: -20vh; /* 使用视口高度单位替代固定像素值 */
                    transform: translate(-50%, 0) scale(0.9);
                    z-index: 2800;
                    opacity: 0.98;
                    transition: left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                                top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                                transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                                opacity 0.3s ease-out;
                }
                
                .incoming.center {
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                
                .incoming.to-deck {
                    transform: scale(1);
                    transition: left 0.7s cubic-bezier(0.27, 0.01, 0.47, 1.01),
                                top 0.7s cubic-bezier(0.27, 0.01, 0.47, 1.01),
                                transform 0.7s cubic-bezier(0.27, 0.01, 0.47, 1.01);
                }
                
               .card-content {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-weight: 700;
                    background: linear-gradient(180deg, #ffd89b, #ff8a00);
                    color: #082;
                    padding: 10px;
                    overflow: hidden;
                }
                
                @media (max-width: 768px) {
                    .card-content {
                        padding: 5px;
                    }
                }
                
                @media (max-width: 480px) {
                    .card-content {
                        padding: 3px;
                    }
                }
                
                .card-name {
                    font-size: 14px;
                    text-align: center;
                    margin-bottom: 5px;
                }
                
                @media (max-width: 768px) {
                    .card-name {
                        font-size: 10px;
                    }
                }
                
                @media (max-width: 480px) {
                    .card-name {
                        font-size: 8px;
                    }
                }
                
                .card-desc {
                    font-size: 10px;
                    text-align: center;
                    margin: 5px 0;
                    line-height: 1.2;
                }
                
                @media (max-width: 768px) {
                    .card-desc {
                        font-size: 8px;
                        margin: 3px 0;
                    }
                }
                
                @media (max-width: 480px) {
                    .card-desc {
                        font-size: 6px;
                        margin: 2px 0;
                    }
                }
                
                .card-details {
                    font-size: 10px;
                    text-align: center;
                    margin-top: 5px;
                }
                
                @media (max-width: 768px) {
                    .card-details {
                        font-size: 8px;
                    }
                }
                
                @media (max-width: 480px) {
                    .card-details {
                        font-size: 6px;
                    }
                }
                
                .card-cost {
                    color: #d4af37;
                }
                
                .card-power {
                    color: #d4af37;
                }
                
                .card-priority {
                    color: #d4af37;
                }
                
               /* 出牌区域样式 */
                .played-cards-container {
                    height: 20vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1em;
                    background: rgba(26, 26, 26, 0.8);
                    transition: all 0.5s ease;
                    z-index: 2;
                    padding: 1em;
                    border-radius: 1em;
                    margin: 1em 0;
                    border: 1px solid #8B7D6B;
                    box-shadow: 0 0 15px rgba(139, 125, 107, 0.3);
                }
                
                @media (max-width: 768px) {
                    .played-cards-container {
                        height: 15vh; /* 增加高度从10vh到15vh */
                        gap: 0.6em;
                        padding: 0.5em;
                    }
                }
                
                @media (max-width: 480px) {
                    .played-cards-container {
                        height: 12vh; /* 增加高度从8vh到12vh */
                        gap: 0.3em;
                        padding: 0.2em;
                    }
                }
            </style>
              
           <!-- 对手区域背景装饰 -->
            <div id="opponent-area-background" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:70%;height:25vh;background:rgba(135, 124, 124, 0.8);border-bottom-left-radius:20px;border-bottom-right-radius:20px;z-index:0;box-shadow:0 5px 15px rgba(0,0,0,0.5);border:1px solid #8B7D6B;">
                <div style="position:absolute;top:10px;left:10px;right:10px;bottom:10px;border:1px solid rgba(212, 175, 55, 0.3);border-radius:10px;"></div>
                <div style="position:absolute;top:30%;right:5%;width:25px;height:2px;background:#8B7D6B;transform:rotate(20deg);opacity:0.5;"></div>
                <div style="position:absolute;top:70%;left:7%;width:15px;height:2px;background:#8B7D6B;transform:rotate(-30deg);opacity:0.5;"></div>
            </div>
            
            <!-- 对手区域 -->
            <div id="opponent-area" style="height:25vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;z-index:1;">
                <div id="opponent-hand" class="deck opponent-hand" style="width:100%;display:flex;overflow:hidden;"></div>
            </div>
            
            <!-- 中央已出牌区域 -->
            <div id="center-played-cards" class="played-cards-container" style="position:relative;z-index:2;"></div>
            
            <!-- 战场区域 -->
            <div id="battlefield" style="flex:1.5;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;z-index:1;">
                <div id="game-message" style="font-size:1.4em;text-align:center;margin-bottom:1.2em;text-shadow:0 0 0.3em rgba(134, 134, 134, 0.7);max-width:80%;line-height:1.4;z-index:2;"></div>
                <button id="end-turn-button" style="padding:0.7em 2em;font-size:1.1em;background:linear-gradient(to bottom, #5a5a5a, #3a3a3a);color:#d4af37;border:1px solid #bab9b7ff;border-radius:0.5em;cursor:pointer;letter-spacing:0.06em;box-shadow:0 0 1em rgba(139, 125, 107, 0.6);transition:all 0.3s;text-transform:uppercase;z-index:5;position:relative;font-family:'Courier New', monospace;">结束回合</button>
            </div>
            
            <!-- 玩家区域背景装饰 -->
            <div id="player-area-background" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:70%;height:35vh;background:rgba(135, 124, 124, 0.8);border-top-left-radius:20px;border-top-right-radius:20px;z-index:0;box-shadow:0 -5px 15px rgba(0,0,0,0.5);border:1px solid #8B7D6B;">
                <div style="position:absolute;top:10px;left:10px;right:10px;bottom:10px;border:1px solid rgba(212, 175, 55, 0.3);border-radius:10px;"></div>
                <div style="position:absolute;top:20%;left:5%;width:30px;height:2px;background:#8B7D6B;transform:rotate(-20deg);opacity:0.5;"></div>
                <div style="position:absolute;top:60%;right:7%;width:20px;height:2px;background:#8B7D6B;transform:rotate(30deg);opacity:0.5;"></div>
            </div>
            
            <!-- 玩家手牌区域 -->
            <div id="player-area" style="height:35vh;width:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;position:relative;z-index:1;">
                <div id="player-hand" class="deck player-hand" style="position:relative;width:100%;height:30vh;display:flex;align-items:flex-end;justify-content:center;pointer-events:auto;margin-top:1vh;transform:translateX(var(--player-hand-offset));--card-w:var(--player-card-w);--card-h:var(--player-card-h);"></div>
            </div>
            
            <!-- 卡组选择区域 -->
            <div id="deck-selection-container" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;display:none;"></div>
            
            <!-- 末日风格装饰元素 -->
            <div style="position:absolute;top:20%;left:5%;width:3%;height:0.15em;background:#8B7D6B;transform:rotate(30deg);opacity:0.5;z-index:1;"></div>
            <div style="position:absolute;top:70%;right:7%;width:2%;height:0.15em;background:#8B7D6B;transform:rotate(-20deg);opacity:0.5;z-index:1;"></div>
            <div style="position:absolute;top:40%;right:10%;width:2.5%;height:2.5%;border:1px solid #bdbcbbff;border-radius:50%;opacity:0.2;z-index:1;"></div>
        </div>
    `;
    private playerHandElement: HTMLElement | null = null;
    private opponentHandElement: HTMLElement | null = null;
    private playerInfoElement: HTMLElement | null = null;
    private opponentInfoElement: HTMLElement | null = null;
    private gameMessageElement: HTMLElement | null = null;
    private debugContentElement: HTMLElement | null = null; // 添加调试信息元素引用
    private playedCardsElement: HTMLElement | null = null; // 统一的已出牌区域
    private deckSelectionContainer: HTMLElement | null = null; // 卡组选择容器
    private endTurnButton: HTMLButtonElement | null = null; // 结束回合按钮
    private restartButton: HTMLButtonElement | null = null; // 重启游戏按钮

    // 已出牌记录（包含回合信息）
    private playedCards: Array<{card: Card, turn: number, player: 'player' | 'opponent'}> = []; // 统一的已出牌记录
    
    // 游戏状态
    private state: CardGameState = {
        player: {
            id: 'player',
            name: '玩家',
            hp: 30,
            maxHp: 30,
            actionPoints: 3,
            maxActionPoints: 3,
            deck: [],
            hand: [],
            discardPile: [],
            defense: 0,
            buffs: []
        },
        opponent: {
            id: 'opponent',
            name: '巨石',
            hp: 30,
            maxHp: 30,
            actionPoints: 3,
            maxActionPoints: 3,
            deck: [],
            hand: [],
            discardPile: [],
            defense: 0,
            buffs: []
        },
        currentPlayer: 'player',
        gamePhase: 'draw',
        turn: 1,
        selectedCard: null,
        message: '游戏开始！抽牌阶段。',
        playerWon: null
    };
    // 游戏配置
    private config: CardGameConfig;
    // 音频管理器
    private audioManager: any;
    // 原始背景音乐
    private originalBgm: string = "";
    // 玩家选择的卡组
    private selectedPlayerDeck: Record<string, number> | null = null;
    
    // 场景管理器实例
    private sceneManager: any = null;
    
    constructor(onComplete: (score: number) => void, private gameConfig?: CardGameConfig, private gameEvents?: Array<any>) {
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
                name: this.gameConfig?.player?.name || '玩家',
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
                name: this.gameConfig?.opponent?.name || '巨石',
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
        
        // 设置事件
        if (gameEvents) {
            console.log('[CardGame] 设置游戏事件:', gameEvents);
            this.setEvents(gameEvents);
            console.log('[CardGame] 当前事件数量:', this.events.length);
        } else if (gameConfig && (gameConfig as any).events) {
            console.log('[CardGame] 从gameConfig设置游戏事件:', (gameConfig as any).events);
            this.setEvents((gameConfig as any).events);
            console.log('[CardGame] 当前事件数量:', this.events.length);
        } else {
            console.log('[CardGame] 未找到游戏事件配置');
            console.log('[CardGame] gameConfig内容:', gameConfig);
            console.log('[CardGame] gameEvents内容:', gameEvents);
        }
    }

    protected init(): void {
        this.setupUIElements();
        // 显示卡组选择界面而不是直接开始游戏
        this.showDeckSelection();
    }

    private showDeckSelection(): void {
        if (this.deckSelectionContainer) {
            this.deckSelectionContainer.style.display = 'block';
            
            // 获取选牌配置
            const minDeckSize = this.gameConfig?.deckSelection?.minDeckSize || 5;
            const maxDeckSize = this.gameConfig?.deckSelection?.maxDeckSize || 10;
            
            const deckSelection = new DeckSelection(this.deckSelectionContainer, (selectedDeck) => {
                if (Object.keys(selectedDeck).length > 0) {
                    // 玩家选择了卡组，使用选择的卡组开始游戏
                    this.selectedPlayerDeck = selectedDeck;
                    this.updateGameStateWithSelectedDeck();
                    this.deckSelectionContainer!.style.display = 'none';
                    this.startGame();
                } else {
                    // 玩家取消了选择，退出游戏
                    this.onComplete(0);
                }
            }, minDeckSize, maxDeckSize);
        }
    }

    private updateGameStateWithSelectedDeck(): void {
        if (this.selectedPlayerDeck) {
            // 更新玩家卡组
            this.state.player.deck = GameService.createInitialDeck(this.selectedPlayerDeck, true);
        }
    }

    private setupUIElements(): void {
        this.restartButton = document.getElementById('restart-button') as HTMLButtonElement;
        this.endTurnButton = document.getElementById('end-turn-button') as HTMLButtonElement;
        this.playerHandElement = document.getElementById('player-hand');
        this.opponentHandElement = document.getElementById('opponent-hand');
        this.playerInfoElement = document.getElementById('player-info');
        this.opponentInfoElement = document.getElementById('opponent-info');
        this.gameMessageElement = document.getElementById('game-message');
        this.debugContentElement = document.getElementById('debug-content'); // 获取调试信息元素引用
        this.playedCardsElement = document.getElementById('center-played-cards'); // 获取统一的已出牌区域
        this.deckSelectionContainer = document.getElementById('deck-selection-container'); // 获取卡组选择容器
        
        // 设置事件监听器
        this.setupEventListeners();
        
        // 设置背景图片
        this.setBackgroundImage();
    }

    // 设置背景图片
    private setBackgroundImage(): void {
        const backgroundElement = document.getElementById('card-game-background');
        if (backgroundElement) {
            // 使用原来的深灰色背景
            backgroundElement.style.backgroundColor = '#1a1a1a';
            backgroundElement.style.backgroundImage = 'none';
        }
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
                    this.endTurnButton.style.background = 'linear-gradient(to bottom, #7a6a2a, #5a4a0a)';
                    this.endTurnButton.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.6)';
                }
            });
            
            this.endTurnButton.addEventListener('mouseleave', () => {
                if (this.endTurnButton) {
                    this.endTurnButton.style.background = 'linear-gradient(to bottom, #5a5a5a, #3a3a3a)';
                    this.endTurnButton.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
                }
            });
        }
        
        // 为玩家手牌区域添加事件监听器
        const playerHandElement = document.getElementById('player-hand');
        if (playerHandElement) {
            // 鼠标进入时展开手牌
            playerHandElement.addEventListener('mouseenter', () => {
                playerHandElement.classList.add('open');
            });
            
            // 鼠标离开时收拢手牌
            playerHandElement.addEventListener('mouseleave', () => {
                playerHandElement.classList.remove('open');
                // 清除所有悬停效果
                const peekedCards = playerHandElement.querySelectorAll('.card.peek');
                peekedCards.forEach(card => {
                    card.classList.remove('peek');
                });
                playerHandElement.classList.remove('dim');
            });
            
            // 点击空白处取消选中
            document.body.addEventListener('click', (e) => {
                if (!playerHandElement.contains(e.target as Node)) {
                    const selectedCards = playerHandElement.querySelectorAll('.card.selected');
                    selectedCards.forEach(card => {
                        card.classList.remove('selected');
                    });
                    playerHandElement.classList.remove('dim');
                }
            });
        }

        // 为对手手牌区域添加事件监听器（如果需要）
        const opponentHandElement = document.getElementById('opponent-hand');
        if (opponentHandElement) {
            // 可以根据需要添加对手手牌的交互逻辑
        }
    }

       // 更新已出牌区域
    private updatePlayedCards(): void {
        // 更新已出牌区域
        if (this.playedCardsElement) {
            // 清空当前显示的所有卡牌
            this.playedCardsElement.innerHTML = '';
            
            // 只添加当前回合和上一回合的卡牌
            for (const playedCard of this.playedCards) {
                // 只显示当前回合和上一回合的卡牌
                if (playedCard.turn >= this.state.turn - 1) {
                    const cardElement = UIManager.createPlayedCardElement(playedCard, this.state.turn);
                    this.playedCardsElement.appendChild(cardElement);
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
        
        // 确保游戏阶段设置为draw
        this.state.gamePhase = 'draw';
        this.state.currentPlayer = 'player';
        
        this.updateUI();
        
        // 启动游戏循环
        this.gameLoop();
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
                // 确保比较的卡牌有效
                if (!a || !b) return 0;
                
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
            
            // 添加卡牌有效性检查
            if (!card || !card.id) {
                console.error('AI选择了无效卡牌:', card);
                // 没有可用卡牌，直接结束回合
                setTimeout(() => {
                    console.log('AI选择无效卡牌，结束回合');
                    this.endTurn();
                }, 1500);
                return;
            }
            
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
        
        // 添加卡牌有效性检查
        if (!card) {
            console.error('尝试使用无效卡牌:', card);
            this.state.message = `使用卡牌时出错`;
            this.updateUI();
            return;
        }
        
        if (!card.id) {
            console.error('卡牌缺少ID:', card);
            this.state.message = `卡牌数据不完整`;
            this.updateUI();
            return;
        }

        // 在调试信息中显示使用卡牌的信息
        if (this.debugContentElement) {
            this.debugContentElement.innerHTML += `<div>${player.name}使用卡牌: ${card.name}</div>`;
        }
        
        if (player.actionPoints < card.cost) {
            this.state.message = `${player.name} 行动值不足，无法使用 ${card.name}`;
            this.updateUI();
            return;
        }

        // 记录已出的牌（包含回合信息）到统一的已出牌记录中
        this.playedCards.push({
            card: {...card}, 
            turn: this.state.turn,
            player: player.id as 'player' | 'opponent'
        });

        // 保存卡牌索引用于后续处理
        const cardIndex = player.hand.findIndex(c => c && c.id === card.id);
        
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

        // 触发所有符合条件的事件
        const gameData: CardGameEventData = this.getGameData();
        if (player.id === 'player') {
            gameData.player.lastPlayedCard = card.id;
            console.log('[CardGame] 玩家出牌，检查触发事件，当前游戏数据:', gameData);
            this.triggerEvents('player_play_card', gameData);
        } else {
            gameData.opponent.lastPlayedCard = card.id;
            console.log('[CardGame] 对手出牌，检查触发事件，当前游戏数据:', gameData);
            this.triggerEvents('opponent_play_card', gameData);
        }

        // 更新UI
        this.updateUI();

        // 检查游戏是否结束
        this.checkGameOver();
        
        // 如果是玩家出牌
        if (player.id === 'player') {
            console.log('玩家使用卡牌完毕，等待玩家进行其他操作或结束回合');
            // 玩家出牌后继续保持在main阶段，等待玩家进行其他操作
            this.state.gamePhase = 'main';
        }
        // 如果是巨石出牌
        else if (player.id === 'opponent') {
            console.log('巨石使用卡牌完毕，检查是否继续出牌');
            
            // 检查是否还有可用的卡牌并且还有行动点数
            const remainingPlayableCards = this.state.opponent.hand.filter(c => c && c.cost <= this.state.opponent.actionPoints);
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
        
        // 触发所有符合条件的事件
        const gameData: CardGameEventData = this.getGameData();
        console.log('[CardGame] 回合结束，检查触发事件，当前游戏数据:', gameData);
        this.triggerEvents('turn_end', gameData);
        
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
            
            // 触发所有符合条件的事件
            const gameData: CardGameEventData = this.getGameData();
            console.log('[CardGame] 玩家失败，检查触发事件，当前游戏数据:', gameData);
            this.triggerEvents('player_lose', gameData);
            
            this.endGame();
        } else if (this.state.opponent.hp <= 0) {
            this.state.opponent.hp = 0;
            this.state.message = '你赢了！';
            this.state.playerWon = true;
            
            // 触发所有符合条件的事件
            const gameData: CardGameEventData = this.getGameData();
            console.log('[CardGame] 玩家胜利，检查触发事件，当前游戏数据:', gameData);
            this.triggerEvents('player_win', gameData);
            
            this.endGame();
        }
    }

    /**
     * 获取当前游戏数据
     */
    private getGameData(): CardGameEventData {
        return {
            player: {
                hp: this.state.player.hp,
                maxHp: this.state.player.maxHp,
                lastPlayedCard: this.playerPlayedCards.length > 0 
                    ? this.playerPlayedCards[this.playerPlayedCards.length - 1].card.id 
                    : null
            },
            opponent: {
                hp: this.state.opponent.hp,
                maxHp: this.state.opponent.maxHp,
                lastPlayedCard: this.opponentPlayedCards.length > 0 
                    ? this.opponentPlayedCards[this.opponentPlayedCards.length - 1].card.id 
                    : null
            },
            turn: this.state.turn,
            totalTurns: this.state.turn
        };
    }

    /**
     * 处理事件
     * @param event 事件对象
     */
    protected handleEvent(event: any): void {
        console.log('[CardGame] 处理事件:', event);
        
        // 创建场景管理器实例（如果还没有的话）
        if (!this.sceneManager) {
            // 尝试从全局获取场景管理器
            this.sceneManager = (window as any).sceneManagerInstance;
            console.log('[CardGame] 场景管理器实例:', this.sceneManager);
        }
        
        // 如果仍然无法获取场景管理器，尝试直接创建一个新的实例
        if (!this.sceneManager) {
            try {
                this.sceneManager = new SceneManager();
                console.log('[CardGame] 创建新的场景管理器实例:', this.sceneManager);
            } catch (e) {
                console.log('[CardGame] 无法创建场景管理器实例:', e);
            }
        }
        
        if (this.sceneManager) {
            // 使用场景管理器显示事件对话框
            const elementsContainer = document.getElementById('card-game-container');
            if (elementsContainer) {
                console.log('[CardGame] 创建事件对话框');
                
                // 创建覆盖层以显示事件对话
                const overlay = document.createElement('div');
                overlay.id = 'minigame-event-overlay';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.zIndex = '2000';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                overlay.style.cursor = 'pointer';
                
                // 创建场景元素容器
                const sceneElementsContainer = this.sceneManager.createSceneElementsContainer(
                    overlay, 
                    event.elements
                );
                
                console.log('[CardGame] 创建场景元素容器:', sceneElementsContainer);
                
                // 添加点击事件以关闭对话框
                const closeHandler = () => {
                    console.log('[CardGame] 关闭事件对话框');
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                    // 移除事件监听器
                    overlay.removeEventListener('click', closeHandler);
                };
                
                overlay.addEventListener('click', closeHandler);
                elementsContainer.appendChild(overlay);
            } else {
                console.warn('[CardGame] 未找到card-game-container元素');
            }
        } else {
            console.warn('[CardGame] 场景管理器未找到，无法显示事件对话');
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
        if (this.state.gamePhase !== 'gameover' && this.state.gamePhase !== 'main') {
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
            if (this.state.currentPlayer === 'player' && this.state.gamePhase === 'main') {
                this.endTurnButton.disabled = false;
                this.endTurnButton.style.opacity = '1';
                this.endTurnButton.style.cursor = 'pointer';
                console.log('结束回合按钮已启用');
            } else {
                this.endTurnButton.disabled = true;
                this.endTurnButton.style.opacity = '0.5';
                this.endTurnButton.style.cursor = 'not-allowed';
                console.log('结束回合按钮已禁用', '当前玩家:', this.state.currentPlayer, '游戏阶段:', this.state.gamePhase);
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
        // 处理统一的已出牌区域
        if (this.playedCardsElement) {
            const cards = this.playedCardsElement.querySelectorAll('.played-card');
            cards.forEach((card, index) => {
                const cardElement = card as HTMLElement;
                
                // 确保索引在范围内
                if (index < this.playedCards.length) {
                    const playedCard = this.playedCards[index];
                    
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
        this.playedCards = [];

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