import { Player } from "../models/Player";
import { Card } from "../models/Card";

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
                <div style="font-weight:bold;font-size:18px;margin-bottom:10px;color:#d4af37;text-align:center;text-shadow:0 0 3px rgba(212, 175, 55, 0.7);border-bottom:1px solid #d4af37;padding-bottom:5px;">${player.name}</div>
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
            element.innerHTML = '';
            
            // 为手牌容器添加过渡效果
            element.style.display = 'flex';
            element.style.gap = '20px';
            element.style.transition = 'all 0.3s ease';
            element.style.zIndex = '2';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
            element.style.width = '100%';
            
            hand.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                // 为每张卡牌添加唯一标识符
                const cardId = `${card.id}-${index}`;
                cardElement.dataset.cardId = cardId;
                cardElement.dataset.cardName = card.name;
                
                cardElement.style.cssText = `
                    width: 110px;
                    height: 160px;
                    background: linear-gradient(135deg, ${isCurrentPlayer ? '#2a2a2a' : '#1a1a1a'} 0%, ${isCurrentPlayer ? '#1a1a1a' : '#0a0a0a'} 100%);
                    border: 2px solid #d4af37;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 10px;
                    cursor: ${isCurrentPlayer && gamePhase === 'main' ? 'pointer' : 'default'};
                    opacity: ${isCurrentPlayer && gamePhase === 'main' ? '1' : '0.6'};
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    transform: scale(1);
                    z-index: 1;
                `;

                // 添加金属质感效果
                cardElement.innerHTML = `
                    <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 3px,
                        rgba(212, 175, 55, 0.05) 3px,
                        rgba(212, 175, 55, 0.05) 6px
                    );pointer-events:none;z-index:0;"></div>
                    <div style="position:relative;z-index:1;">
                        <div style="font-weight: bold; font-size: 14px; text-align: center; color:#d4af37; text-shadow: 0 0 3px rgba(212, 175, 55, 0.7);">${card.name}</div>
                        <div style="font-size: 12px; text-align: center; margin: 6px 0; color:#aaa;">${card.description}</div>
                        <div style="font-size: 13px; text-align: center;">
                            <div style="margin-bottom:4px;color:#d4af37;">消耗: ${card.cost}</div>
                            <div style="margin-bottom:4px;color:#d4af37;">效果: ${card.power}</div>
                            <div style="color:#888;">优先级: ${card.priority}</div>
                        </div>
                    </div>
                `;

                // 添加悬停效果
                if (isCurrentPlayer && gamePhase === 'main' && currentPlayer === 'player') {
                    cardElement.addEventListener('mouseenter', () => {
                        cardElement.style.transform = 'scale(1.25) translateY(-15px)';
                        cardElement.style.boxShadow = '0 12px 25px rgba(212, 175, 55, 0.8)';
                        cardElement.style.zIndex = '10';
                    });
                    
                    cardElement.addEventListener('mouseleave', () => {
                        cardElement.style.transform = 'scale(1) translateY(0)';
                        cardElement.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
                        cardElement.style.zIndex = '1';
                    });
                    
                    cardElement.addEventListener('click', () => {
                        onCardClick(card);
                    });
                }

                element.appendChild(cardElement);
            });
        }
    }
    
    // 创建已出牌的卡片元素
    static createPlayedCardElement(playedCard: {card: Card, turn: number}, player: string, currentTurn: number): HTMLElement {
        const cardElement = document.createElement('div');
        cardElement.className = 'played-card';
        
        // 判断是否是当前回合出的牌
        const isCurrentTurnCard = playedCard.turn === currentTurn;
        const isPreviousTurnCard = playedCard.turn === currentTurn - 1;
        
        cardElement.style.cssText = `
            width: 90px;
            height: 130px;
            background: linear-gradient(135deg, ${player === 'player' ? '#2a2a2a' : '#1a1a1a'} 0%, ${player === 'player' ? '#1a1a1a' : '#0a0a0a'} 100%);
            border: 2px solid ${isCurrentTurnCard ? '#ff6347' : (isPreviousTurnCard ? '#d4af37' : '#888')};
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
                <div style="font-weight: bold; font-size: 11px; text-align: center; color:#d4af37; text-shadow: 0 0 3px rgba(212, 175, 55, 0.7);">${playedCard.card.name}</div>
                <div style="font-size: 9px; text-align: center; margin: 5px 0; color:#aaa;">${playedCard.card.description}</div>
                <div style="font-size: 10px; text-align: center;">
                    <div style="margin-bottom:3px;color:#d4af37;">消耗: ${playedCard.card.cost}</div>
                    <div style="color:#d4af37;">效果: ${playedCard.card.power}</div>
                </div>
            </div>
        `;
        
        // 添加悬停效果
        cardElement.addEventListener('mouseenter', () => {
            cardElement.style.transform = 'scale(1.25) translateY(-12px)';
            cardElement.style.boxShadow = '0 12px 25px rgba(212, 175, 55, 0.6)';
            cardElement.style.zIndex = '5';
        });
        
        cardElement.addEventListener('mouseleave', () => {
            cardElement.style.transform = 'scale(1) translateY(0)';
            cardElement.style.boxShadow = '0 0 8px rgba(212, 175, 55, 0.3)';
            cardElement.style.zIndex = '1';
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
            animatedCard.style.cssText = `
                position: absolute;
                width: 110px;
                height: 160px;
                background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
                border: 2px solid #d4af37;
                border-radius: 8px;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 0 15px rgba(212, 175, 55, 0.7);
            `;
            
            // 设置起始位置（战场中央）
            const battlefieldRect = battlefieldElement.getBoundingClientRect();
            const startPos = {
                x: battlefieldRect.left + battlefieldRect.width / 2 - 55,
                y: battlefieldRect.top + battlefieldRect.height / 2 - 80
            };
            
            animatedCard.style.left = `${startPos.x}px`;
            animatedCard.style.top = `${startPos.y}px`;
            
            // 添加卡牌内容
            animatedCard.innerHTML = `
                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 3px,
                    rgba(212, 175, 55, 0.05) 3px,
                    rgba(212, 175, 55, 0.05) 6px
                );pointer-events:none;z-index:0;"></div>
                <div style="position:relative;z-index:1;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;">
                    <div style="font-weight: bold; font-size: 14px; text-align: center; color:#d4af37;">${cardData.name || '卡牌'}</div>
                </div>
            `;
            
            document.body.appendChild(animatedCard);
            
            // 计算目标位置（手牌区域）
            const handRect = handElement.getBoundingClientRect();
            const targetPos = {
                x: handRect.left + handRect.width / 2 - 55,
                y: handRect.top + handRect.height / 2 - 80
            };
            
            // 执行动画
            const startTime = performance.now();
            const duration = 600; // 动画持续时间（毫秒）
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // 使用缓动函数使动画更自然
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentX = startPos.x + (targetPos.x - startPos.x) * easeProgress;
                const currentY = startPos.y + (targetPos.y - startPos.y) * easeProgress;
                
                animatedCard.style.left = `${currentX}px`;
                animatedCard.style.top = `${currentY}px`;
                animatedCard.style.transform = `scale(${1 - 0.3 * progress})`;
                animatedCard.style.opacity = `${1 - progress * 0.5}`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // 动画结束，移除元素
                    document.body.removeChild(animatedCard);
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
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
            const playedCardsElement = document.getElementById(player === 'player' ? 'player-played-cards' : 'opponent-played-cards');
            
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
            
            // 克隆卡牌元素用于动画
            const animatedCard = sourceCardElement.cloneNode(true) as HTMLElement;
            animatedCard.style.position = 'absolute';
            animatedCard.style.zIndex = '1000';
            animatedCard.style.pointerEvents = 'none';
            animatedCard.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.9)';
            animatedCard.style.transition = 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
            
            // 获取原始位置
            const sourceRect = sourceCardElement.getBoundingClientRect();
            const startPos = {
                x: sourceRect.left,
                y: sourceRect.top
            };
            
            // 将动画卡牌添加到文档中
            animatedCard.style.left = `${startPos.x}px`;
            animatedCard.style.top = `${startPos.y}px`;
            document.body.appendChild(animatedCard);
            
            // 隐藏原始卡牌而不是立即移除，这样其他卡牌可以平滑移动
            sourceCardElement.style.visibility = 'hidden';
            sourceCardElement.style.opacity = '0';
            sourceCardElement.style.transform = 'scale(0.8)';
            sourceCardElement.style.transition = 'all 0.2s ease';
            
            // 在短暂延迟后从DOM中移除原始卡牌
            setTimeout(() => {
                if (sourceCardElement && sourceCardElement.parentNode) {
                    sourceCardElement.parentNode.removeChild(sourceCardElement);
                    
                    // 强制重新计算样式，触发填补空位的动画
                    if (handElement) {
                        const cards = handElement.querySelectorAll('.card');
                        // 为剩余卡牌添加过渡效果
                        cards.forEach(card => {
                            (card as HTMLElement).style.transition = 'all 0.3s ease';
                        });
                        
                        // 触发重排
                        handElement.style.transition = 'all 0.3s ease';
                    }
                }
            }, 200);
            
            // 计算中间位置（战场中央）
            const battlefieldRect = battlefieldElement.getBoundingClientRect();
            const midPos = {
                x: battlefieldRect.left + battlefieldRect.width / 2 - 55,
                y: battlefieldRect.top + battlefieldRect.height / 2 - 80
            };
            
            // 计算目标位置（已出牌区域）
            const playedCardsRect = playedCardsElement.getBoundingClientRect();
            const targetPos = {
                x: playedCardsRect.left + playedCardsRect.width / 2 - 45,
                y: playedCardsRect.top + playedCardsRect.height / 2 - 65
            };
            
            // 执行两段动画（加快动画速度）
            const startTime = performance.now();
            const duration = 400; // 缩短总动画持续时间（毫秒）
            const midPointTime = 0.5; // 中点时间比例
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                let currentX, currentY;
                
                if (progress <= midPointTime) {
                    // 第一段：手牌 -> 战场中央
                    const segmentProgress = progress / midPointTime;
                    // 使用缓动函数使动画更自然
                    const easeProgress = 1 - Math.pow(1 - segmentProgress, 2);
                    
                    currentX = startPos.x + (midPos.x - startPos.x) * easeProgress;
                    currentY = startPos.y + (midPos.y - startPos.y) * easeProgress;
                } else {
                    // 第二段：战场中央 -> 已出牌区域
                    const segmentProgress = (progress - midPointTime) / (1 - midPointTime);
                    // 使用缓动函数使动画更自然
                    const easeProgress = 1 - Math.pow(1 - segmentProgress, 2);
                    
                    currentX = midPos.x + (targetPos.x - midPos.x) * easeProgress;
                    currentY = midPos.y + (targetPos.y - midPos.y) * easeProgress;
                }
                
                // 缩放效果
                let scale = 1;
                if (progress <= midPointTime) {
                    // 在第一段中逐渐放大
                    scale = 1 + 0.3 * (progress / midPointTime);
                } else {
                    // 在第二段中逐渐缩小
                    scale = 1.3 - 0.4 * ((progress - midPointTime) / (1 - midPointTime));
                }
                
                animatedCard.style.left = `${currentX}px`;
                animatedCard.style.top = `${currentY}px`;
                animatedCard.style.transform = `scale(${scale})`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // 动画结束，移除元素
                    document.body.removeChild(animatedCard);
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
}