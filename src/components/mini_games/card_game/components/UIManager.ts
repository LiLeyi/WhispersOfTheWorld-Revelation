import { Player } from "../models/Player";
import { Card } from "../models/Card";
import { AudioManager } from "../../../AudioManager";

export class UIManager {
    // 更新玩家信息显示
    static updatePlayerInfo(element: HTMLElement | null, player: Player, drawCount: number = 1): void {
        if (element) {
            const hpRatio = player.hp / player.maxHp;
            const hpPercentage = Math.max(0, Math.min(100, hpRatio * 100));
            
            // 血条颜色根据血量变化
            let hpBarColor = '#4CAF50'; // 绿色
            if (hpRatio <= 0.3) {
                hpBarColor = '#f44336'; // 红色
            } else if (hpRatio <= 0.6) {
                hpBarColor = '#FFC107'; // 黄色
            }
            
            // 检查是否有fog buff
            const hasFog = player.buffs.some(buff => buff.id === 'fog');
            
            // 获取防御和真防值
            const defense = player.buffs.find(buff => buff.id === 'defence')?.duration || 0;
            const trueDefense = player.buffs.find(buff => buff.id === 'true_defence')?.duration || 0;
            
            // 根据屏幕宽度调整字体大小
            const baseFontSize = window.innerWidth < 480 ? 12 : window.innerWidth < 768 ? 13 : 14;
            const nameFontSize = window.innerWidth < 480 ? 16 : window.innerWidth < 768 ? 17 : 18;
            const gapSize = window.innerWidth < 480 ? 6 : window.innerWidth < 768 ? 7 : 8;
            const marginBottom = window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 9 : 10;
            
            element.innerHTML = `
                <div style="font-weight:bold;font-size:${nameFontSize}px;margin-bottom:${marginBottom}px;color:#ffffff;text-align:center;text-shadow:0 0 3px rgba(255, 255, 255, 0.5);border-bottom:1px solid #cccccc;padding-bottom:5px;">${player.name}</div>
                <div style="display:grid;grid-template-columns:1fr;gap:${gapSize}px;font-size:${baseFontSize}px;">
                    <!-- 血条 -->
                    <div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                            <span style="color:#cccccc;">生命:</span>
                            <span style="color:${hpRatio <= 0.3 ? '#ff6b6b' : '#ffffff'}">${hasFog ? '??/??' : `${player.hp}/${player.maxHp}`}</span>
                        </div>
                        <div style="width:100%;height:${window.innerWidth < 480 ? 10 : 12}px;background:#333;border:1px solid #555;border-radius:3px;overflow:hidden;">
                            <div style="width:${hasFog ? '50' : hpPercentage}%;height:100%;background:${hasFog ? '#888888' : hpBarColor};transition:width 0.3s ease;"></div>
                        </div>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;">
                        <span style="color:#cccccc;">行动值:</span>
                        <span style="color:#ffffff">${hasFog ? '?' : player.actionPoints}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;">
                        <span style="color:#cccccc;">防御:</span>
                        <span style="color:#ffffff">${hasFog ? '?' : defense}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;">
                        <span style="color:#cccccc;">真防:</span>
                        <span style="color:#ffffff">${hasFog ? '?' : trueDefense}</span>
                    </div>
                </div>
            `;
        }
    }

    // 更新手牌显示
    static updateHand(
        element: HTMLElement | null, 
        hand: Card[], 
        isCurrentPlayer: boolean, 
        gamePhase: 'draw' | 'main' | 'battle' | 'end' | 'gameover',
        currentPlayer: 'player' | 'opponent',
        onCardClick: (card: Card) => void
    ): void {
        if (element) {
            // 清空现有内容
            element.innerHTML = '';
            
            // 根据是否是玩家手牌设置不同的显示方式
            if (element.id === 'opponent-hand') {
                // 对手手牌 - 水平排列
                element.className = 'deck opponent-hand';
                element.style.display = 'flex';
                element.style.gap = '15px';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
                element.style.height = '180px';
                
                // 添加卡牌
                hand.forEach((card, index) => {
                    const cardElement = document.createElement('div');
                    cardElement.className = 'card';
                    // 为每张卡牌添加唯一标识符
                    const cardId = `${card.id}-${Date.now()}-${index}`;
                    cardElement.dataset.cardId = cardId;
                    cardElement.dataset.cardName = card.name;
                    cardElement.dataset.cardIndex = index.toString();
                    
                    // 添加金属质感效果
                    cardElement.innerHTML = `
                        <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 3px,
                            rgba(212, 175, 55, 0.05) 3px,
                            rgba(212, 175, 55, 0.05) 6px
                        );pointer-events:none;z-index:0;"></div>
                        <div class="card-content">
                            <div class="card-name">${card.name}</div>
                            <div class="card-desc">${card.description}</div>
                        </div>
                    `;
                    
                    // 添加点击事件，实现点击放大查看功能
                    cardElement.addEventListener('click', function(e) {
                        e.stopPropagation();
                        
                        // 如果已经有一个放大的卡片，先将其恢复原状
                        const existingEnlarged = document.querySelector('.card.enlarged');
                        if (existingEnlarged && existingEnlarged !== this) {
                            existingEnlarged.classList.remove('enlarged');
                            if (existingEnlarged.parentNode) {
                                existingEnlarged.parentNode.removeChild(existingEnlarged.nextSibling as HTMLElement); // 移除覆盖层
                            }
                        }
                        
                        // 切换当前卡片的放大状态
                        if (this.classList.contains('enlarged')) {
                            // 如果已经放大，则恢复原状
                            this.classList.remove('enlarged');
                            // 移除覆盖层
                            if (this.nextSibling && (this.nextSibling as HTMLElement).classList.contains('card-overlay')) {
                                this.parentNode?.removeChild(this.nextSibling);
                            }
                        } else {
                            // 如果未放大，则放大显示
                            this.classList.add('enlarged');
                            
                            // 创建一个覆盖层来显示放大的卡片
                            const overlay = document.createElement('div');
                            overlay.className = 'card-overlay';
                            overlay.style.position = 'fixed';
                            overlay.style.top = '0';
                            overlay.style.left = '0';
                            overlay.style.width = '100%';
                            overlay.style.height = '100%';
                            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                            overlay.style.zIndex = '3000';
                            overlay.style.display = 'flex';
                            overlay.style.justifyContent = 'center';
                            overlay.style.alignItems = 'center';
                            overlay.style.cursor = 'pointer';
                            
                            // 克隆卡片并放大
                            const enlargedCard = this.cloneNode(true) as HTMLElement;
                            enlargedCard.style.transform = 'scale(2)';
                            enlargedCard.style.transition = 'transform 0.3s ease';
                            enlargedCard.style.zIndex = '3001';
                            enlargedCard.style.margin = '0';
                            enlargedCard.style.boxSizing = 'border-box';
                            
                            // 确保卡片使用flex布局居中
                            // 移除可能干扰居中的样式
                            enlargedCard.style.position = 'static'; // 确保不是绝对定位
                            
                            // 关键修改：添加transform-origin来确保缩放中心点正确
                            enlargedCard.style.transformOrigin = 'center center';
                            
                            // 添加阴影效果
                            enlargedCard.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.5)';
                            
                            // 调整背景颜色和透明度
                            enlargedCard.style.background = 'linear-gradient(135deg, #ff9a00, #ff6b00)';
                            enlargedCard.style.opacity = '0.95';
                            
                            overlay.appendChild(enlargedCard);
                            
                            // 点击覆盖层任何地方都关闭放大视图
                            overlay.addEventListener('click', () => {
                                if (overlay.parentNode) {
                                    overlay.parentNode.removeChild(overlay);
                                }
                                cardElement.classList.remove('enlarged');
                            });
                            
                            // 添加到容器中
                            document.body.appendChild(overlay);
                        }
                    });
                    
                    element.appendChild(cardElement);
                });
            } else {
                // 玩家手牌 - 扇形展开
                element.className = 'deck player-hand';
                element.style.display = 'flex';
                element.style.transition = 'all 0.3s ease';
                element.style.zIndex = '2';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
                element.style.width = '100%';
                
                // 添加卡牌
                hand.forEach((card, index) => {
                    const cardElement = document.createElement('div');
                    cardElement.className = 'card';
                    // 为每张卡牌添加唯一标识符
                    const cardId = `${card.id}-${Date.now()}-${index}`;
                    cardElement.dataset.cardId = cardId;
                    cardElement.dataset.cardName = card.name;
                    cardElement.dataset.cardIndex = index.toString();
                    
                    // 设置卡牌样式变量
                    cardElement.style.setProperty('--i', index.toString());
                    
                    // 添加金属质感效果
                    cardElement.innerHTML = `
                       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 3px,
                            rgba(212, 175, 55, 0.05) 3px,
                            rgba(212, 175, 55, 0.05) 6px
                        );pointer-events:none;z-index:0;"></div>
                        <div class="card-content">
                            <div class="card-name">${card.name}</div>
                            <div class="card-desc">${card.description}</div>
                        </div>
                    `;

                    // 添加悬停效果
if (isCurrentPlayer && gamePhase === 'main' && currentPlayer === 'player') {
    // 使用dataset存储音效播放状态，确保每张卡牌独立控制
    cardElement.dataset.hasPlayedHoverSound = "false";
    
    // 使用较小的延迟来平衡防抖和响应性
    let hoverTimeout: number | null = null;
    
    cardElement.addEventListener('mouseenter', () => {
        // 清除之前的定时器
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        
        cardElement.classList.add('peek');
        // 只有当未播放过音效时才播放
        if (cardElement.dataset.hasPlayedHoverSound === "false") {
            // 播放悬停音效
            try {
                const audioManager = AudioManager.getInstance();
                audioManager.playSoundEffect("card_hover");
                cardElement.dataset.hasPlayedHoverSound = "true";
            } catch (e) {
                console.log("无法播放悬停音效:", e);
            }
        }
    });
    
    cardElement.addEventListener('mouseleave', () => {
        // 使用较小的延迟(30ms)来防止在卡牌边缘快速移动时的抽搐
        hoverTimeout = window.setTimeout(() => {
            cardElement.classList.remove('peek');
            // 重置标志位，允许下次悬停时再次播放音效
            cardElement.dataset.hasPlayedHoverSound = "false";
            hoverTimeout = null;
        }, 50);
    });
                        
                       // 直接传递卡牌元素给点击回调
                        cardElement.addEventListener('click', () => {
                            // 添加sourceElement属性但不改变类型
                            const cardWithElement = card as Card & { sourceElement: HTMLElement };
                            cardWithElement.sourceElement = cardElement;
                            // 直接调用点击回调函数，传递卡牌和元素引用
                            onCardClick(cardWithElement);
                        });
                    }

                    element.appendChild(cardElement);
                });
                
                // 重新索引卡牌
                UIManager.reindexCards(element);
            }
        }
    }
    // 重新索引卡牌（设置位置）
static reindexCards(deck: HTMLElement): void {
    const cards = Array.from(deck.querySelectorAll('.card')) as HTMLElement[];
    const total = cards.length;
    const mid = (total - 1) / 2;
    
    // 获取容器宽度以动态调整布局参数
    const containerWidth = deck.clientWidth;
    const cardWidth = 110; // 标准卡牌宽度
    
    // 根据卡牌数量动态调整展开距离和最大角度
    let spreadDistance = 80;
    let maxAngle = 25;
    
    // 如果卡牌数量较多，需要调整参数以适应容器
    if (total > 0) {
        // 计算理想情况下所有卡牌所需的总宽度
        const totalCardsWidth = total * cardWidth;
        
        // 如果总宽度超过容器宽度，则需要调整
        if (totalCardsWidth > containerWidth) {
            // 减小卡牌间距以适应容器
            const availableSpacePerCard = containerWidth / total;
            spreadDistance = Math.max(30, availableSpacePerCard * 0.7); // 确保最小间距为30
            
            // 根据卡牌密度调整展开角度
            maxAngle = Math.max(10, 25 - (total * 0.8));
        }
    }
    
    // 设置deck的变量
    deck.style.setProperty('--total', total.toString());
    deck.style.setProperty('--mid', mid.toString());
    
    // 计算基础偏移量
    const totalWidth = (total - 1) * 12; // 收起时的总宽度
    const centerOffset = -totalWidth / 2; // 居中偏移量
    
    // 为每张卡牌计算位置和旋转
    cards.forEach((htmlCard, i) => {
        // 应用居中偏移
        const indexOffset = i * 12;
        const centeredOffset = centerOffset + indexOffset;
        htmlCard.style.setProperty('--centered-offset', centeredOffset.toString());
        
        // 计算展开状态下的位置偏移
        const spreadOffset = (i - mid) * spreadDistance;
        htmlCard.style.setProperty('--offset', spreadOffset.toString());
        
        // 计算旋转角度，形成标准扇形
        const rotation = (i - mid) * (maxAngle / Math.max(1, mid));
        htmlCard.style.setProperty('--rotation', rotation.toString());
    });
}   // 更新玩家buff显示
    static updatePlayerBuffs(element: HTMLElement | null, buffs: import("../models/Buff").Buff[]): void {
        if (element) {
            element.innerHTML = '';
            // 只显示持续性的buff，不显示立即执行的buff
            // 现在也包括永久buff（duration为-1）
            const persistentBuffs = buffs.filter(buff => 
                buff.duration !== undefined && buff.duration >= -1
            );
            
            persistentBuffs.forEach(buff => {
                const buffElement = document.createElement('div');
                buffElement.className = 'buff-icon';
                buffElement.style.width = '50px';
                buffElement.style.height = '50px';
                buffElement.style.borderRadius = '8px';
                buffElement.style.backgroundColor = '#4a4a4a';
                buffElement.style.display = 'flex';
                buffElement.style.justifyContent = 'center';
                buffElement.style.alignItems = 'center';
                buffElement.style.color = '#fff';
                buffElement.style.fontWeight = 'bold';
                buffElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
                buffElement.style.position = 'relative';
                buffElement.style.cursor = 'pointer';
                buffElement.style.flexDirection = 'column';
                buffElement.style.fontSize = '12px';
                
                // 定义buff名称映射
                const buffNames: Record<string, string> = {
                    'defence': '防御',
                    'true_defence': '真防',
                    'attack_increase_once': '攻击+',
                    'combo': '连击',
                    'immunication': '免疫',
                    'incurable': '不治',
                    'hard': '坚硬',
                    'true_hard': '真坚',
                    'sharp': '锋利',
                    'transfer': '转化',
                    'battery_bomb': '电池',
                    'the_king': '国王',
                    'mechanical_sentry': '哨兵',
                    'mechanical_bomb': '炸弹',
                    'mechanical_guard': '护卫',
                    'delay_attack': '延迟',
                    'conduction': '传导',
                    'ban': '禁言',
                    'fog': '迷雾',
                    'ghast': '恶魂',
                    'unreal_spell': '虚幻',
                    'erosive_heart': '蚀心',
                    'erosive': '腐蚀',
                    'shadow': '影子',
                    'disaster_lord_phase1': '灾厄1',
                    'disaster_lord_phase2': '灾厄2',
                    'disaster_lord_phase3': '灾厄3'
                };
                
                // 显示buff简短名称
                const buffName = buffNames[buff.id] || buff.id.substring(0, 4);
                const nameElement = document.createElement('div');
                nameElement.textContent = buffName;
                nameElement.style.fontSize = '12px';
                nameElement.style.whiteSpace = 'nowrap';
                nameElement.style.overflow = 'hidden';
                nameElement.style.textOverflow = 'ellipsis';
                nameElement.style.width = '100%';
                nameElement.style.textAlign = 'center';
                nameElement.style.padding = '0 2px';
                
                // 显示剩余持续时间（如果大于0）
                // 不再显示永久buff的数字（duration为-1）
                const durationElement = document.createElement('div');
                durationElement.style.fontSize = '14px';
                durationElement.style.fontWeight = 'bold';
                if (buff.duration !== undefined && buff.duration > 0) {
                    durationElement.textContent = buff.duration.toString();
                } else if (buff.duration === -1) {
                    // 对于永久buff，显示∞符号
                    durationElement.textContent = '∞';
                    durationElement.style.color = '#FFD700';
                }
                
                buffElement.appendChild(nameElement);
                buffElement.appendChild(durationElement);
                
                // 添加描述作为title属性，鼠标悬停时显示
                const buffDescriptions: Record<string, string> = {
                    'defence': '防御：抵挡对手的伤害，每抵挡一点防御减少一点，下次玩家出牌回合时消失。',
                    'true_defence': '真防：抵挡对手的伤害，每抵挡一点防御减少一点，不会在下个玩家出牌回合消失，受到攻击时会先消耗防御，之后再消耗真防；只要真防存在，则每回合扣除对方1滴血',
                    'attack_increase_once': '单次攻击加成：下次攻击的伤害增加指定点数，使用后buff消失。',
                    'combo': '连击：下次伤害翻倍，作用后buff消失',
                    'immunication': '免疫：免疫以后指定次数伤害；每免疫一次减一层',
                    'incurable': '不治：无法回血',
                    'hard': '坚硬：回合开始获得5点防御，buff消失',
                    'true_hard': '真坚：回合开始获得5真防，buff消失',
                    'sharp': '锋利：攻击永久增加指定数值，buff一直保持',
                    'transfer': '转化：将攻击伤害转化为真防，buff每回合层数-1',
                    'battery_bomb': '电池炸弹：每回合受到2真攻，获得1真防，当真防大于5时，9攻击，buff消失',
                    'the_king': '国王；受到致命伤害时，血量上限+5，恢复所有血量，对方获得机械炸弹3层，机械炸弹卡牌3张，buff消失。自己手牌变为满蓄电池炸弹六张',
                    'mechanical_sentry': '机械哨兵：本回合"机械哨兵"卡片牌伤害增加指定数值，下回合buff消失',
                    'mechanical_bomb': '机械炸弹：每回合受到指定点数伤害，只能通过特定卡牌去消除buff',
                    'mechanical_guard': '机械护卫队：使用机械护卫队卡牌时，行动力增加指定数值，buff一直保持',
                    'delay_attack': '延迟攻击：下回合进行指定点数攻击',
                    'conduction': '传导：本回合造成的攻击，会等量转换为真防',
                    'ban': '禁言：本回合无法再出牌',
                    'fog': '雾：无法看见血量、行动值等数值',
                    'ghast': '恶魂：受到致命伤害时，血量上限-10，恢复所有血量，对方血量上限减少一半，恢复所有血量，获得雾buff',
                    'unreal_spell': '虚幻咒语：每回合进行1攻击，增加1行动，buff一直保持且可叠加',
                    'erosive_heart': '蚀心：所有攻击变为真攻，buff一直保持',
                    'erosive': '腐蚀：每回合受到攻击',
                    'shadow': '影子：复制上一张牌效果，作用后消失',
                    'disaster_lord_phase1': '灾厄之主第一阶段：每回合10手牌上限，每回合8行动点',
                    'disaster_lord_phase2': '灾厄之主第二阶段：每回合结束清除玩家剩余行动点，手牌中添加10张机械炸弹',
                    'disaster_lord_phase3': '灾厄之主第三阶段：每回合结束清除玩家剩余行动点，血量上限减为6'
                };
                
                buffElement.title = buffDescriptions[buff.id] || buff.id;
                
                // 添加自定义tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'buff-tooltip';
                tooltip.textContent = buffDescriptions[buff.id] || buff.id;
                tooltip.style.position = 'absolute';
                tooltip.style.bottom = '100%';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                tooltip.style.color = '#fff';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '4px';
                tooltip.style.fontSize = '12px';
                tooltip.style.whiteSpace = 'nowrap';
                tooltip.style.zIndex = '1000';
                tooltip.style.display = 'none';
                tooltip.style.pointerEvents = 'none';
                tooltip.style.marginBottom = '5px';
                
                buffElement.appendChild(tooltip);
                
                // 添加鼠标事件
                buffElement.addEventListener('mouseenter', () => {
                    tooltip.style.display = 'block';
                });
                
                buffElement.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });
                
                element.appendChild(buffElement);
            });
        }
    }
    
    // 更新对手buff显示
    static updateOpponentBuffs(element: HTMLElement | null, buffs: import("../models/Buff").Buff[]): void {
        // 对手的buff显示与玩家相同
        this.updatePlayerBuffs(element, buffs);
    }
    // 创建已出牌的卡片元素
    static createPlayedCardElement(playedCard: {card: Card, turn: number, player: string}, currentTurn: number): HTMLElement {
        const cardElement = document.createElement('div');
        cardElement.className = 'played-card';
        
        // 根据玩家设置不同的边框颜色
        let borderColor = '#888';
        if (playedCard.player === 'player') {
            borderColor = '#4a9dff'; // 玩家蓝色
        } else if (playedCard.player === 'opponent') {
            borderColor = '#ff4a4a'; // 对手红色
        }
        
        // 使用相对单位设置基础样式，便于响应式缩放
        cardElement.style.cssText = `
            width: 110px;
            height: 160px;
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            user-select: none;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
            background: linear-gradient(135deg, #e6e6e6, #cccccc);
            color: #000;
            border: 2px solid ${borderColor};
            margin: 0 8px;
        `;
        
        cardElement.innerHTML = `
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 3px,
                rgba(212, 175, 55, 0.05) 3px,
                rgba(212, 175, 55, 0.05) 6px
            );pointer-events:none;z-index:0;border-radius:8px;"></div>
            <div style="position:relative;z-index:1;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:8px;box-sizing:border-box;">
                <div class="card-name" style="font-weight:bold;font-size:14px;text-align:center;color:#000;margin-bottom:6px;">${playedCard.card.name}</div>
                <div class="card-desc" style="font-size:10px;text-align:center;margin:4px 0;color:#333;line-height:1.2;">${playedCard.card.description}</div>
                <div style="position:absolute;top:4px;right:4px;font-size:10px;color:${playedCard.player === 'player' ? '#4a9dff' : '#ff4a4a'};font-weight:bold;">
                    ${playedCard.player === 'player' ? '我' : '敌'}
                </div>
            </div>
        `;
        
        // 添加悬停效果
        // 使用dataset存储音效播放状态，确保每张卡牌独立控制
        cardElement.dataset.hasPlayedHoverSound = "false";

        cardElement.addEventListener('mouseenter', () => {
            cardElement.style.transform = 'scale(1.15) translateY(-10px)';
            cardElement.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.6)';
            cardElement.style.zIndex = '5';
            
            // 只有当未播放过音效时才播放
            if (cardElement.dataset.hasPlayedHoverSound === "false") {
                // 播放悬停音效
                try {
                    const audioManager = AudioManager.getInstance();
                    // 获取当前保存的音效音量并应用
                    const savedSfxVolume = localStorage.getItem('sfxVolume');
                    if (savedSfxVolume !== null) {
                        const volume = parseInt(savedSfxVolume);
                        if (!isNaN(volume)) {
                            const clampedVolume = Math.max(0, Math.min(100, volume)) / 100;
                            audioManager.setGameVolume(clampedVolume);
                        }
                    }
                    audioManager.playSoundEffect("card_hover");
                    cardElement.dataset.hasPlayedHoverSound = "true";
                } catch (e) {
                    console.log("无法播放悬停音效:", e);
                }
            }
        });

        cardElement.addEventListener('mouseleave', () => {
            cardElement.style.transform = 'scale(1) translateY(0)';
            cardElement.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5)';
            cardElement.style.zIndex = '1';
            // 重置标志位，允许下次悬停时再次播放音效
            cardElement.dataset.hasPlayedHoverSound = "false";
        });
        
        return cardElement;
    }
    
    // 新增方法：重新调整已出牌区域所有卡牌的大小
    static resizePlayedCards(): void {
        const playedCardsContainer = document.getElementById('center-played-cards');
        if (!playedCardsContainer) return;
        
        const playedCards = Array.from(playedCardsContainer.querySelectorAll('.played-card')) as HTMLElement[];
        
        // 如果没有卡牌，直接返回
        if (playedCards.length === 0) return;
        
        // 获取容器尺寸
        const containerWidth = playedCardsContainer.clientWidth;
        const containerHeight = playedCardsContainer.clientHeight;
        
        // 定义基础卡片尺寸和比例
        const baseCardWidth = 110;
        const baseCardHeight = 160;
        const cardAspectRatio = baseCardWidth / baseCardHeight; // 11:16比例
        
        // 计算每张卡片的理想尺寸，确保所有卡片能在一行内显示
        const cardCount = playedCards.length;
        const gap = 15; // 卡片之间的间隙
        
        // 计算基于宽度的卡片尺寸
        let cardWidth = (containerWidth - (cardCount + 1) * gap) / cardCount;
        let cardHeight = cardWidth / cardAspectRatio;
        
        // 检查基于高度的限制
        const maxCardHeight = containerHeight * 0.8; // 卡片最大高度为容器高度的80%
        if (cardHeight > maxCardHeight) {
            cardHeight = maxCardHeight;
            cardWidth = cardHeight * cardAspectRatio;
        }
        
        // 设置最大和最小宽度以保证可读性
        const maxCardWidth = 110;
        const minCardWidth = 50;
        cardWidth = Math.max(minCardWidth, Math.min(maxCardWidth, cardWidth));
        cardHeight = cardWidth / cardAspectRatio;
        
        // 向下取整确保整数像素值
        cardWidth = Math.floor(cardWidth);
        cardHeight = Math.floor(cardHeight);
        
        // 根据新的尺寸调整所有卡牌
        playedCards.forEach(card => {
            // 更新样式 - 保持等比例缩放
            card.style.width = `${cardWidth}px`;
            card.style.height = `${cardHeight}px`;
            card.style.minWidth = `${cardWidth}px`;
            card.style.minHeight = `${cardHeight}px`;
            
            // 计算字体大小比例
            const scaleFactor = cardWidth / baseCardWidth;
            const baseFontSize = 14;
            const baseDescFontSize = 10;
            const fontSize = Math.max(7, Math.floor(baseFontSize * scaleFactor));
            const descFontSize = Math.max(5, Math.floor(baseDescFontSize * scaleFactor));
            
            // 更新内部内容的样式，确保文字居中并等比例缩放
            const nameElement = card.querySelector('.card-name') as HTMLElement;
            const descElement = card.querySelector('.card-desc') as HTMLElement;
            
            if (nameElement) {
                nameElement.style.fontWeight = 'bold';
                nameElement.style.fontSize = `${fontSize}px`;
                nameElement.style.textAlign = 'center';
                nameElement.style.color = '#000';
                nameElement.style.marginBottom = `${Math.max(3, Math.floor(8 * scaleFactor))}px`;
            }
            
            if (descElement) {
                descElement.style.fontSize = `${descFontSize}px`;
                descElement.style.textAlign = 'center';
                descElement.style.margin = `${Math.max(2, Math.floor(5 * scaleFactor))}px 0`;
                descElement.style.color = '#333';
                descElement.style.lineHeight = '1.2';
            }
            
            // 更新位置
            card.style.margin = `0 ${Math.max(2, Math.floor(gap / 2))}px`;
        });
        
        // 重新布局容器，确保不换行并居中显示
        playedCardsContainer.style.display = 'flex';
        playedCardsContainer.style.flexWrap = 'nowrap';
        playedCardsContainer.style.justifyContent = 'center';
        playedCardsContainer.style.alignItems = 'center';
        playedCardsContainer.style.overflowX = 'hidden';
        playedCardsContainer.style.gap = `${gap}px`;
    }
    static async playCardAnimation(
        player: 'player' | 'opponent',
        cardData: any,
        cardId: string
    ): Promise<void> {
        return new Promise((resolve) => {
            // 获取相关元素
            const handElement = document.getElementById(player === 'player' ? 'player-hand' : 'opponent-hand');
            const battlefieldElement = document.getElementById('battlefield');
            const playedCardsElement = document.getElementById('center-played-cards');
            
            if (!handElement || !battlefieldElement || !playedCardsElement) {
                resolve();
                return;
            }
            
            // 直接使用传递过来的卡牌元素
            const sourceCardElement = cardData.sourceElement;
            
            // 如果没有传递元素，则直接返回，因为我们无法确定要动画哪张卡牌
            if (!sourceCardElement) {
                console.warn('未提供卡牌元素，无法执行动画');
                resolve();
                return;
            }
            
             // 获取原始卡牌的位置和尺寸
            const cardRect = sourceCardElement.getBoundingClientRect();
            
            // 创建克隆元素
            const clone = sourceCardElement.cloneNode(true) as HTMLElement;
            
            // 在添加到DOM前设置初始样式避免闪现
            clone.style.position = 'fixed';
            clone.style.left = `${cardRect.left}px`;
            clone.style.top = `${cardRect.top}px`;
            clone.style.margin = '0';
            clone.style.zIndex = '1000';
            clone.style.zIndex = '1000';
            clone.classList.add('playing');
            clone.style.visibility = 'visible';
            clone.style.transform = 'scale(1) translate(0, 0)';
            clone.style.transformOrigin = 'center center';
            // 添加到文档中
            document.body.appendChild(clone);
            
            // 强制重排确保初始状态生效
            clone.offsetHeight;
            
           // 设置过渡动画
            clone.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.25, 1)';
            
            // 隐藏原牌
            sourceCardElement.style.visibility = 'hidden';
            
            // 计算目标位置（出牌区域中央）
            const playedCardsRect = playedCardsElement.getBoundingClientRect();
            const targetX = playedCardsRect.left + playedCardsRect.width / 2 - cardRect.width / 2;
            const targetY = playedCardsRect.top + playedCardsRect.height / 2 - cardRect.height / 2;
            
            // 计算位移量而不是直接设置left和top
            const translateX = targetX - cardRect.left;
            const translateY = targetY - cardRect.top;
            
            // 在下一帧开始动画
            requestAnimationFrame(() => {
                clone.style.transform = `scale(1) translate(${translateX}px, ${translateY}px)`;
            });
            // 动画完成后处理
            setTimeout(() => {
                try {
                    // 将卡牌添加到出牌区域
                    const finalClone = clone.cloneNode(true) as HTMLElement;
                    finalClone.style.position = 'relative';
                    finalClone.style.left = '0';
                    finalClone.style.top = '0';
                    finalClone.style.margin = '0 8px';
                    finalClone.classList.remove('playing');
                    finalClone.classList.add('placed');
                    finalClone.style.transform = 'scale(1)';
                    finalClone.style.transformOrigin = 'center center';
                    finalClone.style.transition = 'none';
                    
                    playedCardsElement.appendChild(finalClone);
                    
                    // 在添加新卡牌后，重新调整所有卡牌的大小
                    UIManager.resizePlayedCards();
                } catch (e) {
                    console.error('出牌动画执行出错:', e);
                } finally {
                    // 确保清理动画元素
                    if (clone.parentNode) {
                        clone.parentNode.removeChild(clone);
                    }
                    
                    // 移除原手牌
                    if (sourceCardElement && sourceCardElement.parentNode) {
                        sourceCardElement.parentNode.removeChild(sourceCardElement);
                    }
                    
                   // 重新索引玩家卡牌（如果是玩家手牌），确保在下一帧执行
                    requestAnimationFrame(() => {
                        if (player === 'player' && handElement) {
                            // 确保玩家手牌保持展开状态
                            handElement.classList.add('open');
                            UIManager.reindexCards(handElement);
                        } else if (handElement) {
                            UIManager.reindexCards(handElement);
                        }
                    });
                    
                    resolve();
                }
            }, 600);
        });
    } 
}