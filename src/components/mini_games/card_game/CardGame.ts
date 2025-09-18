import { MiniGame } from "../../../components/MiniGame";
import { CardGameConfig } from "../../../types/MiniGameConfig";
import { CARD_TEMPLATES } from "./data/CardData";
import { Card, CardType } from "./models/Card";
import { Player } from "./models/Player";
import { CardGameState } from "./models/GameState";
import { CardService, BuffService } from "./services/CardService";
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
        <div id="card-game-container" style="width:100%;height:100%;position:relative;color:#ffffff;font-family:'Courier New', monospace;overflow:hidden;">
          <!-- 背景图片层 -->
            <div id="card-game-background" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;background-color:#38383a;background-size:cover;background-position:center;background-repeat:no-repeat;"></div>
            
            <!-- 末日风格背景纹理 -->
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(circle at 10% 20%, rgba(139, 0, 0, 0.1) 0%, transparent 20%),radial-gradient(circle at 90% 80%, rgba(139, 0, 0, 0.1) 0%, transparent 20%);z-index:1;"></div>  
            <div id="game-ui" style="position:absolute;top:2%;left:2%;z-index:10;display:none;"> <!-- 使用百分比替代固定像素 -->
                <div id="score" style="font-size:1.5em;margin-bottom:0.5em;background:rgba(0,0,0,0.7);padding:0.5em 1em;border-radius:0.3em;border:1px solid #5f5f5fff;box-shadow:0 0 0.6em rgba(212, 175, 55, 0.3);">分数: 0</div>
                <div id="game-over" class="hidden" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);padding:2em;border-radius:0.6em;text-align:center;display:none;z-index:20;border:0.1em solid #a7a7a7ff;box-shadow:0 0 1.2em rgba(164, 164, 164, 0.5);">
                    <h2 style="color:#ffffff;margin-top:0;margin-bottom:1.2em;text-transform:uppercase;letter-spacing:0.1em;">游戏结束</h2>
                    <div id="final-score" style="margin-bottom:1.2em;font-size:1.1em;">最终结果</div>
                    <button id="restart-button" style="padding:0.7em 1.5em;font-size:1em;background:linear-gradient(to bottom, #5a5a5a, #3a3a3a);color:#ffffff;border:1px solid #8B7D6B;border-radius:0.5em;cursor:pointer;margin-top:0.6em;letter-spacing:0.06em;box-shadow:0 0 0.6em rgba(139, 125, 107, 0.5);transition:all 0.3s;font-family:'Courier New', monospace;">重新开始</button>
                </div>
            </div>
            
            <!-- 音量控制区域 -->
            <div id="volume-control-container" style="position:absolute;top:0;left:0;z-index:999;height:30%;width:30px;">
                <!-- 音量控制切换按钮 -->
                <div id="volume-toggle" style="position:fixed;top:30%;left:0;width:30px;height:60px;background:rgba(0,0,0,0.7);border-top-right-radius:10px;border-bottom-right-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;border:1px solid #8B7D6B;border-left:none;box-shadow:2px 0 5px rgba(0,0,0,0.5);transform:translateY(-50%);z-index:101;">
                    <span id="volume-icon" style="color:#d4af37;font-size:18px;">🔊</span>
                </div>
                
                <!-- 音量控制面板 -->
                <div id="volume-panel" style="position:fixed;top:0;left:0;height:30%;width:250px;background:rgba(0,0,0,0.95);padding:20px;box-sizing:border-box;border:2px solid #d4af37;border-left:none;border-top-right-radius:10px;border-bottom-right-radius:10px;box-shadow: 5px 0 15px rgba(0,0,0,0.5);transform:translateX(-100%);transition:transform 0.3s ease;z-index:100;">
                    <button id="close-volume-panel" style="position:absolute;top:10px;right:10px;background:#d4af37;color:#000;border:none;border-radius:50%;width:24px;height:24px;cursor:pointer;font-weight:bold;">&times;</button>
                    <div style="display:flex;flex-direction:column;gap:20px;margin-top:30px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:16px;color:#d4af37;">背景音乐</span>
                            <span id="bgm-volume-value" style="font-size:16px;color:#d4af37;">100%</span>
                        </div>
                        <input type="range" id="bgm-volume-slider" min="0" max="100" value="100" style="width:100%;height:10px;background:#333;border-radius:5px;outline:none;-webkit-appearance:none;">
                        
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:16px;color:#d4af37;">游戏音效</span>
                            <span id="sfx-volume-value" style="font-size:16px;color:#d4af37;">100%</span>
                        </div>
                        <input type="range" id="sfx-volume-slider" min="0" max="100" value="100" style="width:100%;height:10px;background:#333;border-radius:5px;outline:none;-webkit-appearance:none;">
                    </div>
                </div>
            </div>
            
            <!-- 对手信息区域 (右上角) -->
            <div id="opponent-info-container" style="position:absolute;top:0%;right:0%;z-index:10;background:linear-gradient(145deg, #2c2c2c, #1a1a1a);padding:1%;border-radius:0.5em;border:1px solid #8B7D6B;min-width:15%;box-shadow:0 0 1em rgba(139, 125, 107, 0.6);">
                <div id="opponent-info" style="text-align:center;"></div>
            </div>
            
            <!-- 玩家信息区域 (右下角) -->
            <div id="player-info-container" style="position:absolute;bottom:8%;right:0%;z-index:10;background:linear-gradient(145deg, #2c2c2c, #1a1a1a);padding:1%;border-radius:0.5em;border:1px solid #8B7D6B;min-width:15%;box-shadow:0 0 1em rgba(139, 125, 107, 0.6);">
                <div id="player-info" style="text-align:center;"></div>
            </div>
            
                        <!-- 调试信息区域 -->
            <div id="debug-info" style="position:absolute;bottom:1%;left:1%;background:rgba(0,0,0,0.8);padding:1%;border-radius:0.3em;z-index:1000;width:20%;border:1px solid #8B7D6B;box-shadow:0 0 0.6em rgba(139, 125, 107, 0.5);display:none;">
                <h3 style="margin-top:0;color:#ffffff;border-bottom:1px solid #7d7c7aff;padding-bottom:0.3em;">调试信息</h3>
                <div id="debug-content" style="font-size:0.75em;"></div>
            </div>
                    
                <!-- Buff说明控制区域 -->
            <div id="buff-info-control-container" style="position:absolute;bottom:0;left:0;z-index:999;height:70%;width:30px;">
                <!-- Buff说明切换按钮 -->
                <div id="buff-info-toggle" style="position:fixed;top:70%;left:0;width:30px;height:60px;background:rgba(0,0,0,0.7);border-top-right-radius:10px;border-bottom-right-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;border:1px solid #8B7D6B;border-left:none;box-shadow:2px 0 5px rgba(0,0,0,0.5);transform:translateY(-50%);z-index:101;">
                    <span id="buff-info-icon" style="color:#d4af37;font-size:18px;">ⓘ</span>
                </div>
                
                <!-- Buff说明面板 -->
                <div id="buff-info-panel" style="position:fixed;bottom:0;left:0;height:70%;width:250px;background:rgba(0,0,0,0.95);padding:20px;box-sizing:border-box;border:2px solid #d4af37;border-left:none;border-top-right-radius:10px;border-bottom-right-radius:10px;box-shadow: 5px 0 15px rgba(0,0,0,0.5);transform:translateX(-100%);transition:transform 0.3s ease;z-index:100;">
                    <button id="close-buff-panel" style="position:absolute;top:10px;right:10px;background:#d4af37;color:#000;border:none;border-radius:50%;width:24px;height:24px;cursor:pointer;font-weight:bold;">&times;</button>
                    <h3 style="color:#d4af37;margin-top:30px;margin-bottom:15px;text-align:center;border-bottom:1px solid #7d7c7aff;padding-bottom:10px;">Buff说明</h3>
                    <div id="buff-info-content" style="overflow-y:auto;height:calc(100% - 80px);">
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">防御(defence)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">抵挡对手的伤害，每抵挡一点防御减少一点，下次玩家出牌回合时消失。</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">真防(true_defence)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">抵挡对手的伤害，每抵挡一点防御减少一点，不会在下个玩家出牌回合消失，受到攻击时会先消耗防御，之后再消耗真防；只要真防存在，则每回合扣除对方1滴血</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">单次攻击加成(attack_increase_once)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">下次攻击的伤害增加指定点数，使用后buff消失。</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">连击(combo)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">下次伤害翻倍，作用后buff消失</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">免疫(immunication)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">免疫以后指定次数伤害；每免疫一次减一层</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">不治(incurable)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">无法回血</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">坚硬(hard)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">回合开始获得5点防御，buff消失</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">真坚(true_hard)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">回合开始获得5真防，buff消失</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">锋利(sharp)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">攻击永久增加指定数值，buff一直保持</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">转化(transfer)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">将攻击伤害转化为真防，buff每回合层数-1</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">电池炸弹(battery_bomb)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">每回合受到2真攻，获得1真防，当真防大于5时，9攻击，buff消失</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">国王(the_king)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">受到致命伤害时，血量上限+5，恢复所有血量，对方获得机械炸弹3层，机械炸弹卡牌3张，buff消失。自己手牌变为满蓄电池炸弹六张</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">机械哨兵(mechanical_sentry)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">本回合"机械哨兵"卡片牌伤害增加指定数值，下回合buff消失</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">机械炸弹(mechanical_bomb)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">每回合受到指定点数伤害，只能通过特定卡牌去消除buff</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">机械护卫队(mechanical_guard)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">使用机械护卫队卡牌时，行动力增加指定数值，buff一直保持</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">延迟攻击(delay_attack)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">下回合进行指定点数攻击</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">传导(conduction)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">本回合造成的攻击，会等量转换为真防</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">禁言(ban)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">本回合无法再出牌</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">雾(fog)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">无法看见血量、行动值等数值</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">恶魂(ghast)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">受到致命伤害时，血量上限-10，恢复所有血量，对方血量上限减少一半，恢复所有血量，获得雾buff</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">虚幻咒语(unreal_spell)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">每回合进行1攻击，增加1行动，buff一直保持且可叠加</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">蚀心(erosive_heart)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">所有攻击变为真攻，buff一直保持</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">腐蚀(erosive)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">每回合受到攻击</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">影子(shadow)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">复制上一张牌效果，作用后消失</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">灾厄之主第一阶段(disaster_lord_phase1)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">每回合10手牌上限，每回合8行动点</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #555;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">灾厄之主第二阶段(disaster_lord_phase2)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">每回合结束清除玩家剩余行动点，手牌中添加10张机械炸弹</p>
                        </div>
                        <div class="buff-info-item" style="margin-bottom:15px;padding-bottom:10px;">
                            <h4 style="color:#4CAF50;margin:0 0 5px 0;">灾厄之主第三阶段(disaster_lord_phase3)</h4>
                            <p style="margin:0;font-size:14px;color:#ccc;">每回合结束清除玩家剩余行动点，血量上限减为6</p>
                        </div>
                    </div>
                </div>
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
                    background: rgb(226, 218, 197);
                    color: #000;
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
                    background: rgb(226, 218, 197);
                    color: #000;
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
                    background: rgb(226, 218, 197);
                    background-image: url('../../assets/images/beijing.png');
                    background-size: cover;
                    color: #000;
                }
                
                .placed {
                    position: relative;
                    transform: none !important;
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
                    background: rgb(226, 218, 197);
                    background-image: url('../../assets/images/beijing.png');
                    background-size: cover;
                    color: #000;
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
                    background: 
                        linear-gradient(rgba(226, 218, 197, 0.8), rgba(226, 218, 197, 0.8)),
                        url('../../assets/images/beijing.png');
                    background-size: cover;
                    color: #000;
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
                    font-size: 16px;
                    text-align: center;
                    margin-bottom: 5px;
                    color: #000;
                    font-weight: bold;
                }
                
                @media (max-width: 768px) {
                    .card-name {
                        font-size: 12px;
                    }
                }
                
                @media (max-width: 480px) {
                    .card-name {
                        font-size: 10px;
                    }
                }
                
                .card-desc {
                    font-size: 10px;
                    text-align: center;
                    margin: 5px 0;
                    line-height: 1.2;
                    color: #000;
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
                    color: #000;
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
                    color: #000;
                }
                
                .card-power {
                    color: #000;
                }
                
                .card-priority {
                    color: #000;
                }
                
               /* 出牌区域样式 */
                .played-cards-container {
                    height: 20vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1em;
                    background: rgba(80, 73, 73, 0.8);
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
            <div id="center-played-cards" class="played-cards-container" style="position:absolute;top:25vh;left:15%;width:70%;height:35vh;z-index:2;"></div>
            
            <!-- 对手buff显示区域 -->
            <div id="opponent-buffs" style="position:absolute;top:20vh;left:15%;width:70%;height:5vh;display:flex;justify-content:center;align-items:center;gap:0.5em;z-index:10;"></div>
            
            <!-- 玩家buff显示区域 -->
            <div id="player-buffs" style="position:absolute;top:60vh;left:15%;width:70%;height:5vh;display:flex;justify-content:center;align-items:center;gap:0.5em;z-index:10;"></div>
            
           <!-- 战场区域 -->
            <div id="battlefield" style="flex:1.5;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;z-index:1;position:absolute;bottom:35vh;right:0vh;width:15%;height:35vh;z-index:3;">
                <div id="game-message" style="font-size:1.4em;text-align:center;margin-bottom:1.2em;text-shadow:0 0 0.3em rgba(134, 134, 134, 0.7);max-width:80%;line-height:1.4;z-index:2;"></div>
                <button id="end-turn-button" style="padding:0.7em 2em;font-size:1.1em;background:linear-gradient(to bottom, #5a5a5a, #3a3a3a);color:#d4af37;border:1px solid #bab9b7ff;border-radius:0.5em;cursor:pointer;letter-spacing:0.06em;box-shadow:0 0 1em rgba(139, 125, 107, 0.6);transition:all 0.3s;text-transform:uppercase;z-index:5;font-family:'Courier New', monospace;">结束回合</button>
            </div>
            
            <!-- 玩家区域背景装饰 -->
            <div id="player-area-background" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:70%;height:35vh;background:rgba(135, 124, 124, 0.8);border-top-left-radius:20px;border-top-right-radius:20px;z-index:0;box-shadow:0 -5px 15px rgba(0,0,0,0.5);border:1px solid #8B7D6B;">
                <div style="position:absolute;top:10px;left:10px;right:10px;bottom:10px;border:1px solid rgba(212, 175, 55, 0.3);border-radius:10px;"></div>
                <div style="position:absolute;top:20%;left:5%;width:30px;height:2px;background:#8B7D6B;transform:rotate(-20deg);opacity:0.5;"></div>
                <div style="position:absolute;top:60%;right:7%;width:20px;height:2px;background:#8B7D6B;transform:rotate(30deg);opacity:0.5;"></div>
            </div>
            
            <!-- 玩家手牌区域 -->
            <div id="player-area" style="height:70vh;width:70%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;position:relative;z-index:4;transform:translateX(20%);">
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
    private playerBuffsElement: HTMLElement | null = null; // 玩家buff显示区域
    private opponentBuffsElement: HTMLElement | null = null; // 对手buff显示区域
    private deckSelectionContainer: HTMLElement | null = null; // 卡组选择容器
    private endTurnButton: HTMLButtonElement | null = null; // 结束回合按钮
    private restartButton: HTMLButtonElement | null = null; // 重启游戏按钮
    private buffInfoToggle: HTMLElement | null = null; // Buff说明切换按钮
    private buffInfoPanel: HTMLElement | null = null; // Buff说明面板
    private volumeToggle: HTMLElement | null = null; // 音量控制切换按钮
    private volumePanel: HTMLElement | null = null; // 音量控制面板
    // 已出牌记录（包含回合信息）
    private playedCards: Array<{ card: Card, turn: number, player: 'player' | 'opponent' }> = []; // 统一的已出牌记录

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
            buffs: []
        },
        currentPlayer: 'player',
        gamePhase: 'draw',
        turn: 1,
        selectedCard: null,
        message: '游戏开始！抽牌阶段。',
        lastPlayedCard: null,
        playerWon: null,
        usedOnceCards: new Set<string>()
    };
    // 游戏配置
    private config: CardGameConfig;
    // 音频管理器
    protected audioManager: any;
    // 原始背景音乐
    private originalBgm: string = "";
    // 玩家选择的卡组
    private selectedPlayerDeck: Record<string, number> | null = null;

    // 场景管理器实例
    protected sceneManager: any = null;

    constructor(onComplete: (score: number) => void, private gameConfig?: CardGameConfig, private gameEvents?: Array<any>) {
        super(onComplete);

        // 在CardGame类的构造函数中，处理player deck配置
        this.config = {
            player: {
                actionPoints: typeof gameConfig?.player?.actionPoints === 'function'
                    ? gameConfig.player.actionPoints()
                    : gameConfig?.player?.actionPoints ?? 3,
                hp: typeof gameConfig?.player?.hp === 'function'
                    ? gameConfig.player.hp()
                    : gameConfig?.player?.hp ?? 30,
                maxHp: typeof gameConfig?.player?.maxHp === 'function'
                    ? gameConfig.player.maxHp()
                    : gameConfig?.player?.maxHp ?? 30,
                deck: typeof gameConfig?.player?.deck === 'function'
                    ? gameConfig.player.deck()
                    : gameConfig?.player?.deck ?? DEFAULT_PLAYER_DECK,
                drawCount: typeof gameConfig?.player?.drawCount === 'function'
                    ? gameConfig.player.drawCount()
                    : gameConfig?.player?.drawCount ?? 2,
                initialDrawCount: typeof gameConfig?.player?.initialDrawCount === 'function'
                    ? gameConfig.player.initialDrawCount()
                    : gameConfig?.player?.initialDrawCount ?? 4
            },
            opponent: {
                actionPoints: typeof gameConfig?.opponent?.actionPoints === 'function'
                    ? gameConfig.opponent.actionPoints()
                    : gameConfig?.opponent?.actionPoints ?? 3,
                hp: typeof gameConfig?.opponent?.hp === 'function'
                    ? gameConfig.opponent.hp()
                    : gameConfig?.opponent?.hp ?? 30,
                maxHp: typeof gameConfig?.opponent?.maxHp === 'function'
                    ? gameConfig.opponent.maxHp()
                    : gameConfig?.opponent?.maxHp ?? 30,
                deck: typeof gameConfig?.opponent?.deck === 'function'
                    ? gameConfig.opponent.deck()
                    : gameConfig?.opponent?.deck ?? DEFAULT_PLAYER_DECK,
                drawCount: typeof gameConfig?.opponent?.drawCount === 'function'
                    ? gameConfig.opponent.drawCount()
                    : gameConfig?.opponent?.drawCount ?? 1,
                initialDrawCount: typeof gameConfig?.opponent?.initialDrawCount === 'function'
                    ? gameConfig.opponent.initialDrawCount()
                    : gameConfig?.opponent?.initialDrawCount ?? 3
            }
        };

        // 初始化游戏状态（但不设置初始化buff，不启动游戏循环）
        // 初始化游戏状态（但不设置初始化buff，不启动游戏循环）
        this.state = {
            player: {
                id: 'player',
                name: this.gameConfig?.player?.name || '玩家',
                hp: typeof this.config.player!.hp === 'function'
                    ? this.config.player!.hp()!
                    : this.config.player!.hp!,
                maxHp: typeof this.config.player!.maxHp === 'function'
                    ? this.config.player!.maxHp()!
                    : this.config.player!.maxHp!,
                actionPoints: typeof this.config.player!.actionPoints === 'function'
                    ? this.config.player!.actionPoints()!
                    : this.config.player!.actionPoints!,
                maxActionPoints: typeof this.config.player!.actionPoints === 'function'
                    ? this.config.player!.actionPoints()!
                    : this.config.player!.actionPoints!,
                deck: GameService.createInitialDeck(
                    typeof this.config.player!.deck === 'function'
                        ? this.config.player!.deck()
                        : this.config.player!.deck,
                    true
                ),
                hand: [],
                discardPile: [],
                buffs: []
            },
            opponent: {
                id: 'opponent',
                name: this.gameConfig?.opponent?.name || '对手',
                hp: typeof this.config.opponent!.hp === 'function'
                    ? this.config.opponent!.hp()!
                    : this.config.opponent!.hp!,
                maxHp: typeof this.config.opponent!.maxHp === 'function'
                    ? this.config.opponent!.maxHp()!
                    : this.config.opponent!.maxHp!,
                actionPoints: typeof this.config.opponent!.actionPoints === 'function'
                    ? this.config.opponent!.actionPoints()!
                    : this.config.opponent!.actionPoints!,
                maxActionPoints: typeof this.config.opponent!.actionPoints === 'function'
                    ? this.config.opponent!.actionPoints()!
                    : this.config.opponent!.actionPoints!,
                deck: GameService.createInitialDeck(
                    typeof this.config.opponent!.deck === 'function'
                        ? this.config.opponent!.deck()
                        : this.config.opponent!.deck,
                    true
                ),
                hand: [],
                discardPile: [],
                buffs: []
            },
            currentPlayer: 'player',
            gamePhase: 'draw',
            turn: 1,
            selectedCard: null,
            message: '游戏开始！抽牌阶段。',
            playerWon: null,
            lastPlayedCard: null,
            usedOnceCards: new Set<string>() // 初始化已使用一次性卡牌集合
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

        // 注意：不在构造函数中调用任何游戏逻辑
    }

    protected init(): void {
        this.setupUIElements();
        // 显示卡组选择界面
        this.showDeckSelection();
        // 不要在这里调用gameLoop或任何游戏逻辑
    }
    public start(): void {
        // 调用父类的start方法
        super.start();
        console.log('卡牌游戏开始');
        // 注意：这里不要调用this.gameLoop()，因为游戏循环应该在选卡完成后开始
    }


    private showDeckSelection(): void {
        if (this.deckSelectionContainer) {
            this.deckSelectionContainer.style.display = 'block';

            // 获取选牌配置
            const minDeckSize = this.gameConfig?.deckSelection?.minDeckSize || 5;
            const maxDeckSize = this.gameConfig?.deckSelection?.maxDeckSize || 10;

            // 使用场景配置的卡组或默认卡组
            let initialDeck = DEFAULT_PLAYER_DECK;
            if (this.gameConfig?.player?.deck) {
                if (typeof this.gameConfig.player.deck === 'function') {
                    initialDeck = this.gameConfig.player.deck();
                } else {
                    initialDeck = this.gameConfig.player.deck;
                }
            }

            const deckSelection = new DeckSelection(this.deckSelectionContainer, (selectedDeck) => {
                if (Object.keys(selectedDeck).length > 0) {
                    // 玩家选择了卡组，使用选择的卡组开始游戏
                    this.selectedPlayerDeck = selectedDeck;
                    this.updateGameStateWithSelectedDeck();
                    this.deckSelectionContainer!.style.display = 'none';
                    // 选卡完成后才开始游戏
                    this.startGame();
                } else {
                    // 玩家取消了选择，退出游戏
                    this.onComplete(0);
                }
            }, minDeckSize, maxDeckSize, initialDeck);
        }
    }

    private updateGameStateWithSelectedDeck(): void {
        if (this.selectedPlayerDeck) {
            // 更新玩家卡组
            this.state.player.deck = GameService.createInitialDeck(this.selectedPlayerDeck, true);
            // 重新洗牌以确保使用新的卡组
            PlayerService.shuffleDeck(this.state.player);
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
        this.playerBuffsElement = document.getElementById('player-buffs'); // 获取玩家buff显示区域
        this.opponentBuffsElement = document.getElementById('opponent-buffs'); // 获取对手buff显示区域
        this.deckSelectionContainer = document.getElementById('deck-selection-container'); // 获取卡组选择容器
        // 获取buff说明面板相关元素
        this.buffInfoToggle = document.getElementById('buff-info-toggle');
        this.buffInfoPanel = document.getElementById('buff-info-panel');
        // 获取音量控制面板相关元素
        this.volumeToggle = document.getElementById('volume-toggle');
        this.volumePanel = document.getElementById('volume-panel');

        // 设置事件监听器
        this.setupEventListeners();

        // 设置背景图片
        this.setupBackgroundImage();
        
        // 设置音量控制
        this.setupVolumeControl();
    }

    // 设置音量控制
    private setupVolumeControl(): void {
        const volumeToggle = document.getElementById('volume-toggle');
        const volumePanel = document.getElementById('volume-panel');
        const bgmVolumeSlider = document.getElementById('bgm-volume-slider') as HTMLInputElement;
        const sfxVolumeSlider = document.getElementById('sfx-volume-slider') as HTMLInputElement;
        const bgmVolumeValue = document.getElementById('bgm-volume-value');
        const sfxVolumeValue = document.getElementById('sfx-volume-value');
        
        if (volumeToggle && volumePanel && bgmVolumeSlider && sfxVolumeSlider && bgmVolumeValue && sfxVolumeValue) {
            let isPanelOpen = false;
            
            // 切换音量控制面板显示/隐藏
            volumeToggle.addEventListener('click', () => {
                isPanelOpen = !isPanelOpen;
                volumePanel.style.transform = isPanelOpen ? 'translateX(0)' : 'translateX(-100%)';
            });
            
            // 设置背景音乐音量控制
            bgmVolumeSlider.addEventListener('input', () => {
                const volume = parseInt(bgmVolumeSlider.value);
                bgmVolumeValue.textContent = `${volume}%`;
                
                // 直接控制当前游戏中正在播放的背景音乐
                const bgmElement = document.getElementById('music') as HTMLAudioElement;
                if (bgmElement) {
                    bgmElement.volume = volume / 100;
                }
                
                // 保存到localStorage
                try {
                    localStorage.setItem('bgmVolume', volume.toString());
                } catch (e) {
                    console.warn('无法保存背景音乐音量设置:', e);
                }
            });
            
            // 设置音效音量控制
            sfxVolumeSlider.addEventListener('input', () => {
                const volume = parseInt(sfxVolumeSlider.value);
                sfxVolumeValue.textContent = `${volume}%`;
                
                // 保存音效音量设置
                try {
                    localStorage.setItem('sfxVolume', volume.toString());
                } catch (e) {
                    console.warn('无法保存音效音量设置:', e);
                }
            });
            
            // 恢复保存的音量设置
            try {
                const savedBgmVolume = localStorage.getItem('bgmVolume');
                const savedSfxVolume = localStorage.getItem('sfxVolume');
                
                if (savedBgmVolume !== null) {
                    const volume = parseInt(savedBgmVolume);
                    if (!isNaN(volume)) {
                        const clampedVolume = Math.max(0, Math.min(100, volume));
                        bgmVolumeSlider.value = clampedVolume.toString();
                        bgmVolumeValue.textContent = `${clampedVolume}%`;
                        
                        // 应用到当前游戏中正在播放的背景音乐
                        const bgmElement = document.getElementById('music') as HTMLAudioElement;
                        if (bgmElement) {
                            bgmElement.volume = clampedVolume / 100;
                        }
                    }
                }
                
                if (savedSfxVolume !== null) {
                    const volume = parseInt(savedSfxVolume);
                    if (!isNaN(volume)) {
                        const clampedVolume = Math.max(0, Math.min(100, volume));
                        sfxVolumeSlider.value = clampedVolume.toString();
                        sfxVolumeValue.textContent = `${clampedVolume}%`;
                    }
                }
            } catch (e) {
                console.warn('无法恢复保存的音量设置:', e);
            }
        }
    }

    // 设置背景图片
    private setupBackgroundImage(): void {
        const backgroundElement = document.getElementById('card-game-background');
        if (backgroundElement) {
            // 检查游戏配置中是否指定了背景图片
            if (this.gameConfig?.backgroundImage) {
                // 使用配置中指定的背景图片
                this.setBackgroundImage(`../../assets/images/background/${this.gameConfig.backgroundImage}`);
            } else {
                // 使用默认背景图片
                this.setBackgroundImage('../../assets/images/background/sc1.1/1-1-0.jpg');
            }
        }
    }

    // 设置游戏背景图片
    public setBackgroundImage(imageUrl: string): void {
        const backgroundElement = document.getElementById('card-game-background');
        if (backgroundElement) {
            backgroundElement.style.backgroundImage = `url('${imageUrl}')`;
        }
    }

    // 更新调试信息显示
    private updateDebugInfo(): void {
        if (this.debugContentElement) {
            const playerDefense = CardService.getPlayerDefense(this.state.player);
            const playerTrueDefense = CardService.getPlayerTrueDefense(this.state.player);
            const opponentDefense = CardService.getPlayerDefense(this.state.opponent);
            const opponentTrueDefense = CardService.getPlayerTrueDefense(this.state.opponent);

            this.debugContentElement.innerHTML = `
                <div>当前回合: ${this.state.turn}</div>
                <div>当前玩家: ${this.state.currentPlayer}</div>
                <div>游戏阶段: ${this.state.gamePhase}</div>
                <div>玩家HP: ${this.state.player.hp}/${this.state.player.maxHp}</div>
                <div>玩家防御: ${playerDefense}</div>
                <div>玩家真防: ${playerTrueDefense}</div>
                <div>玩家行动值: ${this.state.player.actionPoints}/${this.state.player.maxActionPoints}</div>
                <div>巨石HP: ${this.state.opponent.hp}/${this.state.opponent.maxHp}</div>
                <div>巨石防御: ${opponentDefense}</div>
                <div>巨石真防: ${opponentTrueDefense}</div>
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
        if (this.playerHandElement) {
            // 添加防抖变量来处理快速鼠标移动
            let handAreaTimeout: number | null = null;
            let isHandOpen = false;

            // 鼠标进入时展开手牌并播放悬停音效
            this.playerHandElement.addEventListener('mouseenter', () => {
                // 清除之前的定时器
                if (handAreaTimeout) {
                    clearTimeout(handAreaTimeout);
                    handAreaTimeout = null;
                }

                // 如果手牌已经展开，则直接返回
                if (isHandOpen) return;

                // 标记手牌为展开状态
                isHandOpen = true;
                
                // 立即展开手牌
                this.playerHandElement!.classList.add('open');
                
                // 播放悬停音效
                try {
                    if (this.audioManager) {
                        // 获取当前保存的音效音量并应用
                        const savedSfxVolume = localStorage.getItem('sfxVolume');
                        if (savedSfxVolume !== null) {
                            const volume = parseInt(savedSfxVolume);
                            if (!isNaN(volume)) {
                                const clampedVolume = Math.max(0, Math.min(100, volume)) / 100;
                                this.audioManager.setGameVolume(clampedVolume);
                            }
                        }
                        this.audioManager.playSoundEffect("hover");
                    }
                } catch (e) {
                    console.log("无法播放悬停音效:", e);
                }
            });

            // 鼠标离开时收拢手牌
            this.playerHandElement.addEventListener('mouseleave', () => {
                // 清除之前的定时器
                if (handAreaTimeout) {
                    clearTimeout(handAreaTimeout);
                }

                // 设置延迟，让手牌在鼠标离开后稍等一会再收起
                handAreaTimeout = window.setTimeout(() => {
                    // 标记手牌为收起状态
                    isHandOpen = false;
                    
                    this.playerHandElement!.classList.remove('open');
                    // 清除所有悬停效果
                    const peekedCards = this.playerHandElement!.querySelectorAll('.card.peek');
                    peekedCards.forEach(card => {
                        card.classList.remove('peek');
                    });
                    this.playerHandElement!.classList.remove('dim');
                    
                    handAreaTimeout = null;
                }, 300); // 减少延迟到300毫秒以提高响应性
            });
        // 点击空白处取消选中
        document.body.addEventListener('click', (e) => {
            if (this.playerHandElement && !this.playerHandElement.contains(e.target as Node)) {
                const selectedCards = this.playerHandElement.querySelectorAll('.card.selected');
                selectedCards.forEach(card => {
                    card.classList.remove('selected');
                });
                if (this.playerHandElement) {
                    this.playerHandElement.classList.remove('dim');
                }
            }
        });
        
        // 为buff说明面板添加事件监听器
        if (this.buffInfoToggle && this.buffInfoPanel) {
            // 确保只添加一次事件监听器
            if (!this.buffInfoToggle.hasAttribute('data-listener-added')) {
                this.buffInfoToggle.setAttribute('data-listener-added', 'true');
                
                // 切换buff说明面板显示/隐藏
                this.buffInfoToggle.addEventListener('click', () => {
                    const isPanelOpen = this.buffInfoPanel!.style.transform === 'translateX(0px)' || 
                                      this.buffInfoPanel!.style.transform === 'translateX(0)';
                    if (isPanelOpen) {
                        // 面板已打开，关闭面板
                        this.buffInfoPanel!.style.transform = 'translateX(-100%)';
                    } else {
                        // 面板已关闭，打开面板
                        this.buffInfoPanel!.style.transform = 'translateX(0)';
                    }
                });
            }
            
            // 为buff面板添加关闭按钮事件监听器
            const closeBuffPanelButton = document.getElementById('close-buff-panel');
            if (closeBuffPanelButton && !closeBuffPanelButton.hasAttribute('data-listener-added')) {
                closeBuffPanelButton.setAttribute('data-listener-added', 'true');
                
                closeBuffPanelButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.buffInfoPanel!.style.transform = 'translateX(-100%)';
                });
            }
        }
        
        // 获取音量控制相关元素
        if (this.volumeToggle && this.volumePanel) {
            // 确保只添加一次事件监听器
            if (!this.volumeToggle.hasAttribute('data-listener-added')) {
                this.volumeToggle.setAttribute('data-listener-added', 'true');
                
                // 切换音量控制面板显示/隐藏
                this.volumeToggle.addEventListener('click', () => {
                    const isPanelOpen = this.volumePanel!.style.transform === 'translateX(0px)' || 
                                      this.volumePanel!.style.transform === 'translateX(0)';
                    if (isPanelOpen) {
                        // 面板已打开，关闭面板
                        this.volumePanel!.style.transform = 'translateX(-100%)';
                    } else {
                        // 面板已关闭，打开面板
                        this.volumePanel!.style.transform = 'translateX(0)';
                    }
                });
            }
            
            // 为音量面板添加关闭按钮事件监听器
            const closeVolumePanelButton = document.getElementById('close-volume-panel');
            if (closeVolumePanelButton && !closeVolumePanelButton.hasAttribute('data-listener-added')) {
                closeVolumePanelButton.setAttribute('data-listener-added', 'true');
                
                closeVolumePanelButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.volumePanel!.style.transform = 'translateX(-100%)';
                });
            }
        }
    }
}
    // 更新音频管理器的音效音量
    private updateAudioManagerSfxVolume(): void {
        try {
            const savedSfxVolume = localStorage.getItem('sfxVolume');
            if (savedSfxVolume !== null) {
                const volume = parseInt(savedSfxVolume);
                if (!isNaN(volume)) {
                    const clampedVolume = Math.max(0, Math.min(100, volume)) / 100;
                    
                    // 设置音频管理器的音效音量
                    if (this.audioManager && this.audioManager.setSoundEffectVolume) {
                        this.audioManager.setSoundEffectVolume(clampedVolume);
                    }
                }
            }
        } catch (e) {
            console.warn('更新音频管理器音效音量时出错:', e);
        }
    }
    // 更新已出牌区域
    private updatePlayedCards(): void {
        // 更新已出牌区域
        if (this.playedCardsElement) {
            // 清空当前显示的所有卡牌
            this.playedCardsElement.innerHTML = '';

            // 显示所有当前在场上的卡牌（最多显示8张）
            const cardsToShow = this.playedCards.slice(-8); // 取最新的8张牌

            // 如果总牌数超过8张，移除最早的牌
            while (this.playedCards.length > 8) {
                this.playedCards.shift(); // 移除最早出的牌
            }

            // 显示卡牌
            for (const playedCard of cardsToShow) {
                const cardElement = UIManager.createPlayedCardElement(playedCard, this.state.turn);
                this.playedCardsElement.appendChild(cardElement);
            }
        }
    }

    private startGame(): void {
        // 确保选卡界面已隐藏
        if (this.deckSelectionContainer) {
            this.deckSelectionContainer.style.display = 'none';
        }
        
        // 设置初始化buff（在游戏真正开始时设置）
        PlayerService.setInitialBuffs(this.state.player, this.gameConfig?.player?.initialBuffs);
        PlayerService.setInitialBuffs(this.state.opponent, this.gameConfig?.opponent?.initialBuffs);

        // 播放背景音乐
        this.playBackgroundMusic();

        // 更新音频管理器的音效音量
        this.updateAudioManagerSfxVolume();

        // 初始抽牌
        PlayerService.drawCards(this.state.player, typeof this.config.player!.initialDrawCount === 'function'
            ? this.config.player!.initialDrawCount()!
            : this.config.player!.initialDrawCount!, undefined, false, this.state.usedOnceCards);
        PlayerService.drawCards(this.state.opponent, typeof this.config.opponent!.initialDrawCount === 'function'
            ? this.config.opponent!.initialDrawCount()!
            : this.config.opponent!.initialDrawCount!, undefined, false, this.state.usedOnceCards);

        // 确保游戏阶段设置为draw
        this.state.gamePhase = 'draw';
        this.state.currentPlayer = 'player';

        this.updateUI();

        // 启动游戏循环
        this.gameLoop();
    }
    // 应用保存的音量设置
    private applySavedVolumeSettings(): void {
        try {
            // 应用背景音乐音量
            const savedBgmVolume = localStorage.getItem('bgmVolume');
            if (savedBgmVolume !== null) {
                const volume = parseInt(savedBgmVolume);
                if (!isNaN(volume)) {
                    const clampedVolume = Math.max(0, Math.min(100, volume));
                    
                    // 应用到当前游戏中正在播放的背景音乐
                    const bgmElement = document.getElementById('music') as HTMLAudioElement;
                    if (bgmElement) {
                        bgmElement.volume = clampedVolume / 100;
                    }
                }
            }
        } catch (e) {
            console.warn('应用保存的音量设置时出错:', e);
        }
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
                        // 直接操作游戏中的audio元素
                        const musicElement = document.getElementById("music") as HTMLAudioElement | null;
                        if (musicElement) {
                            const audioPath = `../../assets/bgm/${bgm}.mp3`;
                            musicElement.src = audioPath;
                            musicElement.loop = true;
                            
                            // 应用保存的音量设置
                            const savedVolume = localStorage.getItem('bgmVolume');
                            if (savedVolume) {
                                let volume = parseInt(savedVolume);
                                volume = Math.max(0, Math.min(100, volume));
                                musicElement.volume = volume / 100;
                            } else {
                                musicElement.volume = 1.0; // 默认100%
                            }
                            
                            musicElement.play().catch(e => console.error("播放失败:", e));
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

            // 播放卡牌游戏专用背景音乐
            const gameBgm = this.gameConfig?.bgm || "bgm9";
            console.log("播放卡牌游戏背景音乐:", gameBgm);
            this.audioManager.updateBackgroundMusic(gameBgm);
            
            // 确保应用保存的音量设置到当前播放的音乐
            const savedBgmVolume = localStorage.getItem('bgmVolume');
            if (savedBgmVolume !== null) {
                let volume = parseInt(savedBgmVolume);
                if (!isNaN(volume)) {
                    volume = Math.max(0, Math.min(100, volume));
                    
                    // 应用到当前播放的背景音乐
                    const musicElement = document.getElementById("music") as HTMLAudioElement | null;
                    if (musicElement) {
                        musicElement.volume = volume / 100;
                    }
                }
            }
        } catch (error) {
            console.error("播放背景音乐时出错:", error);
        }
    }
    private stopBackgroundMusic(): void {
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
                // 处理灾厄之主的牌组轮换
                BuffService.processDisasterLordTurnStart(this.state.opponent, this.state.turn);
                // 在抽牌阶段开始时处理玩家的buff效果
                PlayerService.processBuffs(this.state.player, this.state.opponent, (message) => {
                    this.state.message += message;
                }, this.state.lastPlayedCard);
                // 检查游戏是否结束
                this.checkGameOver();
                // 处理玩家的delay_attack buff
                this.processDelayAttackBuff(this.state.player, this.state.opponent);
                // 处理玩家的conduction buff
                this.processConductionBuff(this.state.player);
                // 检查游戏是否结束
                this.checkGameOver();
                // 在抽牌阶段开始时清除上一回合的防御
                console.log('[DEBUG] 玩家抽牌阶段开始，清除上一回合的防御');
                this.clearTemporaryDefense(this.state.player);
                PlayerService.drawCards(this.state.player, typeof this.config.player!.drawCount === 'function'
                    ? this.config.player!.drawCount()!
                    : this.config.player!.drawCount!, undefined, false, this.state.usedOnceCards);
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
        console.log(`${this.state.opponent.name}回合开始:`, this.state.currentPlayer);
        if (this.state.currentPlayer !== 'opponent') {
            console.log(`当前不是${this.state.opponent.name}回合，返回`);
            return;
        }

        console.log(`${this.state.opponent.name}游戏阶段:`, this.state.gamePhase);
        switch (this.state.gamePhase) {
            case 'draw':
                console.log(`${this.state.opponent.name}抽牌阶段`);
                console.log('[DEBUG] 调用处理灾厄之主牌组轮换');
                BuffService.processDisasterLordTurnStart(this.state.opponent, this.state.turn);
                // 在抽牌阶段开始时处理对手的buff效果
                PlayerService.processBuffs(this.state.opponent, this.state.player, (message) => {
                    this.state.message += message;
                }, this.state.lastPlayedCard);
                // 检查游戏是否结束
                this.checkGameOver();
                // 处理对方的delay_attack buff
                this.processDelayAttackBuff(this.state.opponent, this.state.player);
                // 处理对方的conduction buff
                this.processConductionBuff(this.state.opponent);
                // 检查游戏是否结束
                this.checkGameOver();
                // 在抽牌阶段开始时清除上一回合的防御
                console.log(`[DEBUG] ${this.state.opponent.name}抽牌阶段开始，清除上一回合的防御`);
                this.clearTemporaryDefense(this.state.opponent);
                PlayerService.drawCards(this.state.opponent, typeof this.config.opponent!.drawCount === 'function'
                    ? this.config.opponent!.drawCount()!
                    : this.config.opponent!.drawCount!, undefined, false, this.state.usedOnceCards);
                this.state.gamePhase = 'main';
                this.state.message = `${this.state.opponent.name}回合`;
                this.updateUI();
                // 继续处理main阶段
                this.opponentTurn();
                break;
            case 'main':
                                console.log(`${this.state.opponent.name}主要阶段，准备出牌`);
                this.updateUI();
                // 添加一个小延迟，让玩家看到消息变化
                setTimeout(() => {
                    console.log(`调用${this.state.opponent.name}出牌逻辑`);
                    this.opponentPlayCard();
                }, 1000);
                break;
        }
    }

    // 巨石出牌逻辑
    private opponentPlayCard(): void {
        console.log(`${this.state.opponent.name}尝试出牌`);
        console.log(`${this.state.opponent.name}手牌:`, this.state.opponent.hand);
        console.log(`${this.state.opponent.name}行动值:`, this.state.opponent.actionPoints);
        console.log(`${this.state.opponent.name}血量:`, this.state.opponent.hp, '/', this.state.opponent.maxHp);
        console.log('玩家血量:', this.state.player.hp, '/', this.state.player.maxHp);

        // 检查ban效果 - 如果对手被禁言，则不能出牌
        if (BuffService.isBanned(this.state.opponent)) {
            this.state.message = `${this.state.opponent.name} 被禁言，本回合无法出牌`;
            this.updateUI();
            // 直接结束对手回合
            setTimeout(() => {
                this.endTurn();
            }, 1000);
            return;
        }

        // 更新调试信息
        this.updateDebugInfo();

        // 获取所有能使用的卡牌
        let playableCards = this.state.opponent.hand.filter(card => (card.cost?.action || 0) <= this.state.opponent.actionPoints);
        console.log('可用卡牌:', playableCards);

        // 在调试信息中显示可用卡牌
        if (this.debugContentElement) {
            const playableCardsInfo = playableCards.map(card =>
                `${card.name}(优先级:${card.priority},消耗:${card.cost?.action || 0})`
            ).join(', ') || '无';
            this.debugContentElement.innerHTML += `<div>巨石可用卡牌: ${playableCardsInfo}</div>`;
            this.debugContentElement.innerHTML += `<div>巨石当前行动点: ${this.state.opponent.actionPoints}</div>`;
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
                    // 检查是否有治疗效果
                    const hasHealEffect = card.effect.some(effect => effect.id === 'do_health');
                    return !hasHealEffect;
                });

                // 如果过滤后没有卡牌了，则恢复所有卡牌
                if (playableCards.length === 0) {
                    playableCards = this.state.opponent.hand.filter(card => (card.cost?.action || 0) <= this.state.opponent.actionPoints);
                }

                console.log('过滤治疗卡牌后:', playableCards);
                if (this.debugContentElement) {
                    const filteredCardsInfo = playableCards.map(card =>
                        `${card.name}(优先级:${card.priority},消耗:${card.cost?.action || 0})`
                    ).join(', ') || '无';
                    this.debugContentElement.innerHTML += `<div>过滤治疗卡牌后: ${filteredCardsInfo}</div>`;
                }
            }

            // 如果巨石血量较低，过滤掉会消耗自己血量的卡牌，除非能一次性击败玩家
            if (opponentHpRatio < 0.5) {
                playableCards = playableCards.filter(card => {
                    // 检查卡牌是否会对自身造成伤害
                    const selfDamageEffects = card.effect.filter(effect =>
                        effect.id === 'do_attack' && effect.target === 'self');

                    // 如果没有对自身伤害的效果，保留这张卡牌
                    if (selfDamageEffects.length === 0) {
                        return true;
                    }

                    // 如果有对自身伤害的效果，计算总伤害
                    const selfDamage = selfDamageEffects.reduce((sum, effect) => sum + (effect.duration || 0), 0);

                    // 检查是否能一次性击败玩家
                const totalPlayerDamage = this.state.player.hp;

                // 如果对手当前血量减去自伤后仍然能击败玩家，则保留这张卡牌
                if (this.state.opponent.hp - selfDamage > 0 &&
                    card.effect.some(effect =>
                        effect.id === 'do_attack' &&
                        effect.target === 'other' &&
                        (effect.duration || 0) >= totalPlayerDamage)) {
                    return true;
                }

                    // 如果会造成自伤且不能一次性击败玩家，则过滤掉这张卡牌
                    return false;
                });

                // 如果过滤后没有卡牌了，则恢复所有卡牌
                if (playableCards.length === 0) {
                    playableCards = this.state.opponent.hand.filter(card => (card.cost?.action || 0) <= this.state.opponent.actionPoints);
                }

                console.log('过滤自伤卡牌后:', playableCards);
                if (this.debugContentElement) {
                    const filteredCardsInfo = playableCards.map(card =>
                        `${card.name}(优先级:${card.priority},消耗:${card.cost?.action || 0})`
                    ).join(', ') || '无';
                    this.debugContentElement.innerHTML += `<div>过滤自伤卡牌后: ${filteredCardsInfo}</div>`;
                }
            }

            // 按优先级排序，但根据血量情况调整策略
            playableCards.sort((a, b) => {
                // 确保比较的卡牌有效
                if (!a || !b) return 0;

                // 如果手牌中有林鬼，则优先使用林鬼
                const hasForestGhoulA = a.id === "forest_ghoul";
                const hasForestGhoulB = b.id === "forest_ghoul";

                if (hasForestGhoulA && !hasForestGhoulB) {
                    return -1; // a优先
                }
                if (hasForestGhoulB && !hasForestGhoulA) {
                    return 1; // b优先
                }

                // 如果巨石血量较高(>70%)且玩家血量较低(<50%)，更倾向于使用攻击牌
                if (opponentHpRatio > 0.7 && playerHpRatio < 0.5) {
                    // 计算攻击效果
                    const aHasAttack = a.effect.some(e => e.id === 'do_attack' || e.id === 'do_true_attack');
                    const bHasAttack = b.effect.some(e => e.id === 'do_attack' || e.id === 'do_true_attack');

                    if (aHasAttack && !bHasAttack) {
                        return -1; // a优先
                    }
                    if (bHasAttack && !aHasAttack) {
                        return 1; // b优先
                    }
                }

                // 如果巨石血量较低(<30%)，更倾向于使用防御和治疗牌
                if (opponentHpRatio < 0.3) {
                    // 优先考虑防御和治疗类型卡牌
                    const aIsDefensive = a.effect.some(e =>
                        e.id === 'do_defence' || e.id === 'do_true_defence' || e.id === 'do_health');
                    const bIsDefensive = b.effect.some(e =>
                        e.id === 'do_defence' || e.id === 'do_true_defence' || e.id === 'do_health');

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
                this.debugContentElement.innerHTML += `<div>巨石选择: ${card.name}(优先级:${card.priority},消耗:${card.cost?.action || 0})</div>`;
            }

            // 为对手卡牌添加sourceElement属性，确保动画能正常工作
        if (this.opponentHandElement) {
            const allCards = this.opponentHandElement.querySelectorAll('.card');
            // 查找匹配的卡牌元素
            for (let i = 0; i < allCards.length; i++) {
                const cardElement = allCards[i] as HTMLElement;
                if (cardElement.dataset.cardName === card.name) {
                    // 添加sourceElement属性
                    const cardWithElement = card as Card & { sourceElement: HTMLElement };
                    cardWithElement.sourceElement = cardElement;
                    break;
                }
            }
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

    // 处理delay_attack buff
    private processDelayAttackBuff(player: Player, opponent: Player): void {
        // 查找delay_attack buff
        const delayAttackBuffs = player.buffs.filter(buff => buff.id === 'delay_attack');
        if (delayAttackBuffs.length > 0) {
            // 计算总伤害
            let totalDamage = 0;
            for (const buff of delayAttackBuffs) {
                totalDamage += buff.duration || 0;
            }

            // 应用总伤害
            if (totalDamage > 0) {
                CardService.applyDamage(opponent, totalDamage, false, player, opponent);
                this.state.message += `\n${player.name}的延迟攻击造成${totalDamage}点伤害`;
                // 检查游戏是否结束
                this.checkGameOver();
            }

            // 移除所有delay_attack buff
            player.buffs = player.buffs.filter(buff => buff.id !== 'delay_attack');
        }
    }

    // 处理conduction buff
    private processConductionBuff(player: Player): void {
        // 查找conduction buff
        const conductionBuffs = player.buffs.filter(buff => buff.id === 'conduction');
        if (conductionBuffs.length > 0) {
            // conduction效果在回合结束时移除，不需要额外处理
            // 只需移除所有conduction buff
            player.buffs = player.buffs.filter(buff => buff.id !== 'conduction');
            if (conductionBuffs.length > 0) {
                console.log(`[DEBUG] 移除${player.name}的传导效果`);
            }
        }
    }

    // 处理真防效果：拥有真防时对对手造成1点伤害
    private processTrueDefenseEffect(player: Player, opponent: Player): void {
        // 检查玩家是否拥有真防
        const trueDefense = CardService.getPlayerTrueDefense(player);
        if (trueDefense > 0) {
            // 对对手造成1点伤害
            opponent.hp -= 1;
            this.state.message += `\n${player.name}的真防对${opponent.name}造成1点伤害`;
            console.log(`[DEBUG] ${player.name}拥有${trueDefense}点真防，对${opponent.name}造成1点伤害`);

            // 检查恶魂效果
            BuffService.checkGhastEffect(opponent, player);
            // 检查国王效果
            BuffService.checkKingEffect(opponent, player);
            // 检查灾厄之主阶段转换
            BuffService.checkDisasterLordPhase(opponent, player);
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

        // 检查ban效果 - 如果玩家被禁言，则不能出牌
        if (player.id === 'player' && BuffService.isBanned(player)) {
            this.state.message = `${player.name} 被禁言，本回合无法出牌`;
            this.updateUI();
            return;
        }

        // 在调试信息中显示使用卡牌的信息
        if (this.debugContentElement) {
            this.debugContentElement.innerHTML += `<div>${player.name}使用卡牌: ${card.name}</div>`;
        }

        if (player.actionPoints < (card.cost?.action || 0)) {
            this.state.message = `${player.name} 行动值不足，无法使用 ${card.name}`;
            this.updateUI();
            return;
        }

        // 执行出牌动画
        if ((card as Card & { sourceElement?: HTMLElement }).sourceElement) {
            try {
                await UIManager.playCardAnimation(
                    player.id as 'player' | 'opponent',
                    card,
                    card.id
                );
            } catch (e) {
                console.warn('出牌动画执行失败:', e);
            }
        }

        // 记录上一张使用的卡牌，用于shadow buff
        this.state.lastPlayedCard = { ...card };

        // 如果卡牌是一次性使用的，则将其添加到已使用集合中
        if (card.useOnce) {
            this.state.usedOnceCards.add(card.id);
        }

        // 保存卡牌索引用于后续处理
        const cardIndex = player.hand.findIndex(c => c && c.id === card.id);

        // 检查是否为影子牌，如果是则创建替换后的卡牌用于使用
        let actualCard = card; // 保存实际使用的卡牌
        if (card.id === 'shadow_card') {
            // 查找玩家上一张打出的手牌
            const playerLastCard = this.playedCards
                .filter(playedCard => playedCard.player === player.id)
                .slice(-1)[0];

            if (playerLastCard) {
                // 创建一个替换后的影子牌副本用于使用，不修改手牌中的原始卡牌
                actualCard = { ...playerLastCard.card, id: card.id };
                console.log(`[DEBUG] 影子牌替换为玩家上一张打出的手牌: ${actualCard.name}`);
            }
        }

        // 在出牌动画结束后播放音效
        try {
            // 获取当前保存的音效音量并应用
            const savedSfxVolume = localStorage.getItem('sfxVolume');
            if (savedSfxVolume !== null) {
                const volume = parseInt(savedSfxVolume);
                if (!isNaN(volume)) {
                    const clampedVolume = Math.max(0, Math.min(100, volume)) / 100;
                    if (this.audioManager) {
                        this.audioManager.setGameVolume(clampedVolume);
                    }
                }
            }
            
            if (this.audioManager) {
                this.audioManager.playSoundEffect("card_play");
            }
        } catch (e) {
            console.log("无法播放出牌音效:", e);
        }

        
        // 消耗行动值
        player.actionPoints -= (card.cost?.action || 0);

        // 执行卡牌效果
        console.log(`[DEBUG] 执行卡牌效果前，已使用一次性卡牌:`, Array.from(this.state.usedOnceCards));
        CardService.executeCardEffects(player, actualCard, player.id === 'player' ? this.state.opponent : this.state.player, (message) => {
            this.state.message = message;
        }, this.state.lastPlayedCard, this.state.usedOnceCards);

        // 从手牌中移除卡牌并放入弃牌堆
        if (cardIndex !== -1) {
            const [removedCard] = player.hand.splice(cardIndex, 1);
            player.discardPile.push(removedCard);
            // 将实际使用的卡牌添加到已出牌区域
            this.playedCards.push({
                card: { ...actualCard },
                turn: this.state.turn,
                player: player.id as 'player' | 'opponent'
            });
            
            // 如果卡牌是一次性使用的，则将其添加到已使用集合中
            if (card.useOnce) {
                console.log(`[DEBUG] 添加一次性卡牌到已使用集合: ${card.name}(${card.id})`);
                console.log(`[DEBUG] 添加前已使用集合:`, Array.from(this.state.usedOnceCards));
                this.state.usedOnceCards.add(card.id);
                console.log(`[DEBUG] 添加后已使用集合:`, Array.from(this.state.usedOnceCards));
            } else {
                console.log(`[DEBUG] 使用的卡牌不是一次性卡牌: ${card.name}(${card.id})`);
            }
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
            const remainingPlayableCards = this.state.opponent.hand.filter(c => (c.cost?.action || 0) <= this.state.opponent.actionPoints);
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

    // 通用音效播放方法
    private playSoundEffect(soundName: string, volume: number = 1.0): void {
        // 如果有音频管理器，使用它来播放音效
        if (this.audioManager && this.audioManager.playSoundEffect) {
            try {
                // 如果音频管理器支持设置音效音量，则设置
                if (this.audioManager.setSoundEffectVolume) {
                    this.audioManager.setSoundEffectVolume(volume);
                }
                this.audioManager.playSoundEffect(soundName);
                return;
            } catch (e) {
                console.warn('使用音频管理器播放音效失败:', e);
            }
        }
        
        // 如果没有音频管理器或调用失败，尝试直接播放
        console.log(`播放音效: ${soundName} (音量: ${volume})`);
        
        // 这里可以添加直接播放音频文件的代码
        // 例如创建一个新的Audio对象并播放
        /*
        try {
            const sound = new Audio(`../../assets/sfx/${soundName}.mp3`);
            sound.volume = volume;
            sound.play().catch(e => console.warn('播放音效失败:', e));
        } catch (e) {
            console.warn('直接播放音效失败:', e);
        }
        */
    }

    // 结束回合
    private endTurn(): void {
        console.log('结束回合，当前玩家:', this.state.currentPlayer);

        // 在回合结束时处理灾厄之主效果
        BuffService.processDisasterLordEndTurn(this.state.player);
        BuffService.processDisasterLordEndTurn(this.state.opponent);

        // 在回合结束时处理真防效果
        if (this.state.currentPlayer === 'player') {
            // 玩家回合结束时检查玩家是否拥有真防，如果有则对巨石造成1点伤害
            this.processTrueDefenseEffect(this.state.player, this.state.opponent);
        } else {
            // 巨石回合结束时检查巨石是否拥有真防，如果有则对玩家造成1点伤害
            this.processTrueDefenseEffect(this.state.opponent, this.state.player);
        }

        // 触发所有符合条件的事件
        const gameData: CardGameEventData = this.getGameData();
        console.log('[CardGame] 回合结束，检查触发事件，当前游戏数据:', gameData);
        this.triggerEvents('turn_end', gameData);

        if (this.state.currentPlayer === 'player') {
            // 在增加行动点之前，检查是否需要清零（灾厄之主第二、三阶段）
            if (BuffService.isDisasterLordPhase2(this.state.opponent) || BuffService.isDisasterLordPhase3(this.state.opponent)) {
                this.state.player.actionPoints = 0;
            }
            // 玩家回合结束时增加玩家行动值
            this.state.player.actionPoints += typeof this.config.player?.actionPoints == 'function' ? this.config.player.actionPoints() : this.config.player?.actionPoints!;
            this.state.currentPlayer = 'opponent';
            this.state.gamePhase = 'draw';
            this.state.message = `${this.state.opponent.name}回合`;
            console.log(`切换到${this.state.opponent.name}回合`);

            // 重启游戏循环以处理巨石回合
            this.gameLoop();
        } else {
            // 巨石回合结束时增加巨石行动值
            this.state.opponent.actionPoints += typeof this.config.opponent?.actionPoints == 'function' ? this.config.opponent.actionPoints() : this.config.opponent?.actionPoints!;
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

    // 清除临时防御（普通防御）
    private clearTemporaryDefense(player: Player): void {
        console.log(`[DEBUG] 清除${player.name}的临时防御前:`, player.buffs.find(b => b.id === 'defence'));
        // 查找防御buff
        const defenceBuffIndex = player.buffs.findIndex(buff => buff.id === 'defence');
        if (defenceBuffIndex !== -1) {
            // 移除防御buff
            player.buffs.splice(defenceBuffIndex, 1);
        }
        console.log(`[DEBUG] 清除${player.name}的临时防御后:`, player.buffs.find(b => b.id === 'defence'));

        // 清除本回合的ban效果
        const banBuffIndex = player.buffs.findIndex(buff => buff.id === 'ban');
        if (banBuffIndex !== -1) {
            // 移除ban buff
            player.buffs.splice(banBuffIndex, 1);
            console.log(`[DEBUG] 清除${player.name}的ban效果`);
        }
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
        // 获取玩家本回合出的牌
        const playerCards = this.playedCards.filter(card => card.player === 'player');
        // 获取对手本回合出的牌
        const opponentCards = this.playedCards.filter(card => card.player === 'opponent');

        return {
            player: {
                hp: this.state.player.hp,
                maxHp: this.state.player.maxHp,
                lastPlayedCard: playerCards.length > 0
                    ? playerCards[playerCards.length - 1].card.id
                    : null
            },
            opponent: {
                hp: this.state.opponent.hp,
                maxHp: this.state.opponent.maxHp,
                lastPlayedCard: opponentCards.length > 0
                    ? opponentCards[opponentCards.length - 1].card.id
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

        // 只有在非等待阶段才继续循环，并且确保游戏已经真正开始（选卡界面已隐藏）
        if (this.state.gamePhase !== 'gameover' && this.state.gamePhase !== 'main' &&
            (this.deckSelectionContainer?.style.display === 'none' || !this.deckSelectionContainer)) {
            requestAnimationFrame(() => this.gameLoop());
        } else {
            console.log('暂停游戏循环，等待用户输入');
        }
    }

    protected update(): void {
        console.log('更新游戏状态，当前阶段:', this.state.gamePhase, '当前玩家:', this.state.currentPlayer);
        // 更新游戏状态，但确保游戏已经真正开始（选卡界面已隐藏）
        if (this.state.gamePhase !== 'gameover' && this.state.gamePhase !== 'main' &&
            (this.deckSelectionContainer?.style.display === 'none' || !this.deckSelectionContainer)) {
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
        // 只有在选卡界面隐藏时才更新游戏UI
        if (this.deckSelectionContainer?.style.display === 'none' || !this.deckSelectionContainer) {
            this.updateScoreDisplay();
            UIManager.updatePlayerInfo(this.playerInfoElement, this.state.player, typeof this.config.player!.drawCount === 'function'
                ? this.config.player!.drawCount()!
                : this.config.player!.drawCount!);
            UIManager.updatePlayerInfo(this.opponentInfoElement, this.state.opponent, typeof this.config.opponent!.drawCount === 'function'
                ? this.config.opponent!.drawCount()!
                : this.config.opponent!.drawCount!);
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
                () => { } // 对手手牌不需要点击事件
            );
            this.updatePlayedCards(); // 更新已出牌区域

            // 更新buff显示
            UIManager.updatePlayerBuffs(this.playerBuffsElement, this.state.player.buffs);
            UIManager.updateOpponentBuffs(this.opponentBuffsElement, this.state.opponent.buffs);

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
                hp: typeof this.config.player!.hp === 'function'
                    ? this.config.player!.hp()!
                    : this.config.player!.hp!,
                maxHp: typeof this.config.player!.maxHp === 'function'
                    ? this.config.player!.maxHp()!
                    : this.config.player!.maxHp!,
                actionPoints: typeof this.config.player!.actionPoints === 'function'
                    ? this.config.player!.actionPoints()!
                    : this.config.player!.actionPoints!,
                maxActionPoints: typeof this.config.player!.actionPoints === 'function'
                    ? this.config.player!.actionPoints()!
                    : this.config.player!.actionPoints!,
                deck: GameService.createInitialDeck(
                    typeof this.config.player!.deck === 'function'
                        ? this.config.player!.deck()
                        : this.config.player!.deck,
                    true
                ),
                hand: [],
                discardPile: [],
                buffs: []  // 重置buff列表
            },
            opponent: {
                id: 'opponent',
                name: '巨石',
                hp: typeof this.config.opponent!.hp === 'function'
                    ? this.config.opponent!.hp()!
                    : this.config.opponent!.hp!,
                maxHp: typeof this.config.opponent!.maxHp === 'function'
                    ? this.config.opponent!.maxHp()!
                    : this.config.opponent!.maxHp!,
                actionPoints: typeof this.config.opponent!.actionPoints === 'function'
                    ? this.config.opponent!.actionPoints()!
                    : this.config.opponent!.actionPoints!,
                maxActionPoints: typeof this.config.opponent!.actionPoints === 'function'
                    ? this.config.opponent!.actionPoints()!
                    : this.config.opponent!.actionPoints!,
                deck: GameService.createInitialDeck(
                    typeof this.config.opponent!.deck === 'function'
                        ? this.config.opponent!.deck()
                        : this.config.opponent!.deck,
                    true
                ),
                hand: [],
                discardPile: [],
                buffs: []  // 重置buff列表
            },
            currentPlayer: 'player',
            gamePhase: 'draw',
            turn: 1,
            selectedCard: null,
            message: '游戏开始！抽牌阶段。',
            lastPlayedCard: null,
            playerWon: null,
            usedOnceCards: new Set<string>(),
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
}

export { CardGame, Card, Player, CardType };