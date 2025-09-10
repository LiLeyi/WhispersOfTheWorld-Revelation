import { Player } from "../models/Player";
import { Card } from "../models/Card";
import { AudioManager } from "../../../AudioManager";

export class UIManager {
    // 更新玩家信息显示
    static updatePlayerInfo(element: HTMLElement | null, player: Player): void {
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
            
            element.innerHTML = `
                <div style="font-weight:bold;font-size:18px;margin-bottom:10px;color:#d4af37;text-align:center;text-shadow:0 0 3px rgba(255, 236, 143, 1);border-bottom:1px solid #d4af37;padding-bottom:5px;">${player.name}</div>
                <div style="display:grid;grid-template-columns:1fr;gap:8px;font-size:14px;">
                    <!-- 血条 -->
                    <div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                            <span>生命:</span>
                            <span style="color:${hpRatio <= 0.3 ? '#ff6347' : '#d4af37'}">${player.hp}/${player.maxHp}</span>
                        </div>
                        <div style="width:100%;height:12px;background:#333;border:1px solid #555;border-radius:3px;overflow:hidden;">
                            <div style="width:${hpPercentage}%;height:100%;background:${hpBarColor};transition:width 0.3s ease;"></div>
                        </div>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;">
                        <span>行动值:</span>
                        <span style="color:#d4af37">${player.actionPoints}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;">
                        <span>防御:</span>
                        <span style="color:#d4af37">${player.defense}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;">
                        <span>手牌:</span>
                        <span style="color:#d4af37">${player.hand.length}</span>
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
                    const cardId = `${card.id}-${index}`;
                    cardElement.dataset.cardId = cardId;
                    cardElement.dataset.cardName = card.name;
                    
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
                            <div class="card-details">
                                <div style="margin-bottom:4px;">消耗: <span class="card-cost">${card.cost}</span></div>
                                <div style="margin-bottom:4px;">效果: <span class="card-power">${card.power}</span></div>
                                <div>优先级: <span class="card-priority">${card.priority}</span></div>
                            </div>
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
                    const cardId = `${card.id}-${index}`;
                    cardElement.dataset.cardId = cardId;
                    cardElement.dataset.cardName = card.name;
                    
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
                            <div class="card-details">
                                <div style="margin-bottom:4px;">消耗: <span class="card-cost">${card.cost}</span></div>
                                <div style="margin-bottom:4px;">效果: <span class="card-power">${card.power}</span></div>
                                <div>优先级: <span class="card-priority">${card.priority}</span></div>
                            </div>
                        </div>
                    `;

                    // 添加悬停效果
                    if (isCurrentPlayer && gamePhase === 'main' && currentPlayer === 'player') {
                        // 使用dataset存储音效播放状态，确保每张卡牌独立控制
                        cardElement.dataset.hasPlayedHoverSound = "false";
                        
                        cardElement.addEventListener('mouseenter', () => {
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
                            cardElement.classList.remove('peek');
                            // 重置标志位，允许下次悬停时再次播放音效
                            cardElement.dataset.hasPlayedHoverSound = "false";
                        });
                        
                        cardElement.addEventListener('click', () => {
                            // 不再在这里播放点击音效，只调用点击回调函数
                            onCardClick(card);
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
        const spreadDistance = 80; // 增加展开时每张牌的间距，原值为60
        const maxAngle = 25; // 增加最大展开角度，原值为16
        
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
    }
    
    // 创建已出牌的卡片元素
    static createPlayedCardElement(playedCard: {card: Card, turn: number, player: string}, currentTurn: number): HTMLElement {
        const cardElement = document.createElement('div');
        cardElement.className = 'played-card';
        
        // 判断是否是当前回合出的牌
        const isCurrentTurnCard = playedCard.turn === currentTurn;
        const isPreviousTurnCard = playedCard.turn === currentTurn - 1;
        
        // 根据玩家设置不同的边框颜色
        let borderColor = '#888';
        if (playedCard.player === 'player') {
            borderColor = '#4a9dff'; // 玩家蓝色
        } else if (playedCard.player === 'opponent') {
            borderColor = '#ff4a4a'; // 对手红色
        }
        
        cardElement.style.cssText = `
            width: 90px;
            height: 130px;
            background: linear-gradient(135deg, ${playedCard.player === 'player' ? '#2a2a2a' : '#1a1a1a'} 0%, ${playedCard.player === 'player' ? '#1a1a1a' : '#0a0a0a'} 100%);
            border: 2px solid ${isCurrentTurnCard ? '#ff6347' : (isPreviousTurnCard ? '#d4af37' : borderColor)};
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 8px;
            font-size: 10px;
            opacity: ${isCurrentTurnCard ? '1' : (isPreviousTurnCard ? '0.7' : '0.4')};
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
            transform: scale(1);
            z-index: 1;
            flex-shrink: 0; /* 防止卡片在容器中被压缩 */
        `;

        // 添加使用过的卡牌效果
        cardElement.innerHTML = `
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.1) 2px,
                rgba(0, 0, 0, 0.1) 4px
            );pointer-events:none;z-index:0;"></div>
            <div style="position:relative;z-index:1;">
                <div style="font-weight: bold; font-size: 11px; text-align: center; color:#000000; text-shadow: 0 0 3px rgba(212, 175, 55, 0.7);">${playedCard.card.name}</div>
                <div style="font-size: 9px; text-align: center; margin: 5px 0; color:#aaa;">${playedCard.card.description}</div>
                <div style="font-size: 10px; text-align: center;">
                    <div style="margin-bottom:3px;color:#d4af37;">消耗: ${playedCard.card.cost}</div>
                    <div style="color:#d4af37;">效果: ${playedCard.card.power}</div>
                </div>
                <div style="position:absolute;top:4px;right:4px;font-size:8px;color:${playedCard.player === 'player' ? '#4a9dff' : '#ff4a4a'};">
                    ${playedCard.player === 'player' ? '我' : '敌'}
                </div>
            </div>
        `;
        
        // 添加悬停效果
        // 使用dataset存储音效播放状态，确保每张卡牌独立控制
        cardElement.dataset.hasPlayedHoverSound = "false";

        cardElement.addEventListener('mouseenter', () => {
            cardElement.style.transform = 'scale(1.25) translateY(-12px)';
            cardElement.style.boxShadow = '0 12px 25px rgba(212, 175, 55, 0.6)';
            cardElement.style.zIndex = '5';
            
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
            cardElement.style.transform = 'scale(1) translateY(0)';
            cardElement.style.boxShadow = '0 0 8px rgba(212, 175, 55, 0.3)';
            cardElement.style.zIndex = '1';
            // 重置标志位，允许下次悬停时再次播放音效
            cardElement.dataset.hasPlayedHoverSound = "false";
        });
        
        return cardElement;
    }
    
    // 执行抽牌动画
    static async drawCardAnimation(
        player: 'player' | 'opponent',
        cardData: any
    ): Promise<void> {
        return new Promise((resolve) => {
            // 获取相关元素
            const handElement = document.getElementById(player === 'player' ? 'player-hand' : 'opponent-hand');
            const battlefieldElement = document.getElementById('battlefield');
            
            if (!handElement || !battlefieldElement) {
                resolve();
                return;
            }
            
            // 创建动画卡牌元素
            const animatedCard = document.createElement('div');
            animatedCard.className = 'card incoming';
            animatedCard.style.setProperty('--i', '0');
            
            // 添加卡牌内容
            animatedCard.innerHTML = `
                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 3px,
                    rgba(212, 175, 55, 0.05) 3px,
                    rgba(212, 175, 55, 0.05) 6px
                );pointer-events:none;z-index:0;"></div>
                <div class="card-content">
                    <div class="card-name">${cardData.name || '卡牌'}</div>
                    <div class="card-desc">${cardData.description || '描述'}</div>
                    <div class="card-details">
                        <div style="margin-bottom:4px;">消耗: <span class="card-cost">${cardData.cost || '消耗'}</span></div>
                        <div style="margin-bottom:4px;">效果: <span class="card-power">${cardData.power || '效果'}</span></div>
                        <div>优先级: <span class="card-priority">${cardData.priority || '优先级'}</span></div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(animatedCard);
            
            // 强制重排以确保初始状态生效
            animatedCard.offsetHeight;
            
            // 飞到中央（使用 class 改变 left/top/transform）
            requestAnimationFrame(() => {
                animatedCard.classList.add('center');
            });
            
            // 在中央停顿一段时间，再飞回到牌堆位置
            const pause = 600;
            setTimeout(() => {
                // 计算目标位置（牌堆中心下方）
                const deckRect = handElement.getBoundingClientRect();
                const targetX = Math.round(deckRect.left + deckRect.width / 2 - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-w')) / 2);
                const targetY = Math.round(deckRect.top + deckRect.height / 2 - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-h')) / 2);
                
                // 添加轻微的随机偏移，使卡牌插入更自然
                const randomOffset = (Math.random() - 0.5) * 20;
                
                // 使用 inline left/top 改变驱动过渡，同时切换 class 以调整 transform
                animatedCard.classList.remove('center');
                animatedCard.classList.add('to-deck');
                animatedCard.style.left = `${targetX + randomOffset}px`;
                animatedCard.style.top = `${targetY}px`;
            }, pause);
            
            // 最终加入牌堆
            setTimeout(() => {
                document.body.removeChild(animatedCard);
                resolve();
            }, pause + 700);
        });
    }
    
    // 执行出牌动画
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
            
            // 查找要移动的卡牌元素
            let sourceCardElement: HTMLElement | null = null;
            const allCards = handElement.querySelectorAll('.card');
            
            // 首先尝试通过cardId查找
            for (let i = 0; i < allCards.length; i++) {
                const card = allCards[i] as HTMLElement;
                if (card.dataset.cardId && card.dataset.cardId.startsWith(cardId)) {
                    sourceCardElement = card;
                    break;
                }
            }
            
            // 如果找不到，尝试通过cardName查找
            if (!sourceCardElement) {
                for (let i = 0; i < allCards.length; i++) {
                    const card = allCards[i] as HTMLElement;
                    if (card.dataset.cardName && card.dataset.cardName === cardData.name) {
                        sourceCardElement = card;
                        break;
                    }
                }
            }
            
            // 如果还是找不到，直接使用第一张卡牌（作为备选方案）
            if (!sourceCardElement && allCards.length > 0) {
                sourceCardElement = allCards[0] as HTMLElement;
            }
            
            // 如果仍然没有找到卡牌元素，则直接resolve并返回
            if (!sourceCardElement) {
                resolve();
                return;
            }
            
            const cardRect = sourceCardElement.getBoundingClientRect();
            const clone = sourceCardElement.cloneNode(true) as HTMLElement;
            clone.style.position = 'fixed';
            clone.style.left = `${cardRect.left}px`;
            clone.style.top = `${cardRect.top}px`;
            clone.style.width = `${cardRect.width}px`;
            clone.style.height = `${cardRect.height}px`;
            clone.classList.add('playing');
            document.body.appendChild(clone);
            
            // 隐藏原牌
            sourceCardElement.style.visibility = 'hidden';
            
            // 计算放置位置（放在出牌区域中央）
            const playedCardsRect = playedCardsElement.getBoundingClientRect();
            const targetX = playedCardsRect.left + playedCardsRect.width / 2 - cardRect.width / 2;
            const targetY = playedCardsRect.top + playedCardsRect.height / 2 - cardRect.height / 2;
            
            // 添加一些动画效果增强
            clone.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.25, 1)';
            clone.style.transform = 'scale(1.05)';
            
            // 平滑移动
            requestAnimationFrame(() => {
                clone.style.left = `${targetX}px`;
                clone.style.top = `${targetY}px`;
                clone.style.transform = 'scale(1)';
            });
            
            setTimeout(() => {
                // 转为出牌区域内元素
                clone.style.position = 'relative';
                clone.style.left = '0';
                clone.style.top = '0';
                clone.classList.remove('playing');
                clone.classList.add('placed');
                clone.style.transform = 'none';
                clone.style.margin = '0 8px';
                playedCardsElement.appendChild(clone);
                
                // 移除原手牌
                if (sourceCardElement && sourceCardElement.parentNode) {
                    sourceCardElement.parentNode.removeChild(sourceCardElement);
                }
                
                // 重新索引玩家卡牌（如果是玩家手牌）
                if (player === 'player' && handElement) {
                    UIManager.reindexCards(handElement);
                }
                
                // 动画结束
                resolve();
            }, 600);
        });
    }
}