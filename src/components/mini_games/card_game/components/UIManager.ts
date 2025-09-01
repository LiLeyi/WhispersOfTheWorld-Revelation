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
            hand.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
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
        
        cardElement.style.cssText = `
            width: 90px;
            height: 130px;
            background: linear-gradient(135deg, ${player === 'player' ? '#2a2a2a' : '#1a1a1a'} 0%, ${player === 'player' ? '#1a1a1a' : '#0a0a0a'} 100%);
            border: 2px solid ${isCurrentTurnCard ? '#ff6347' : '#d4af37'};
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 8px;
            font-size: 10px;
            opacity: ${isCurrentTurnCard ? '1' : '0.7'};
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
            transform: scale(1);
            z-index: 1;
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
}