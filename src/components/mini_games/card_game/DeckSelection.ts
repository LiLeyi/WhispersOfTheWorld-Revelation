import { CardManager } from "./CardManager";
import { CARD_TEMPLATES } from "./data/CardData";

export class DeckSelection {
    private cardManager: CardManager;
    private playerDeck: Record<string, number>;
    private selectedDeck: Record<string, number> = {};
    private maxDeckSize: number;
    private minDeckSize: number;
    private totalSelected: number = 0;
    private container: HTMLElement;
    private onComplete: (deck: Record<string, number>) => void;

    constructor(
        container: HTMLElement, 
        onComplete: (deck: Record<string, number>) => void,
        private minDeck: number = 5,
        private maxDeck: number = 10,
        initialDeck?: Record<string, number>  // 添加初始卡组参数
    ) {
        this.container = container;
        this.onComplete = onComplete;
        this.cardManager = CardManager.getInstance();
        // 使用传入的初始卡组或从CardManager获取
        this.playerDeck = initialDeck || this.cardManager.getPlayerDeck();
        this.minDeckSize = minDeck;
        this.maxDeckSize = maxDeck;
        this.init();
    }

    private init(): void {
        this.render();
        this.bindEvents();
    }

    private render(): void {
        const template = `
            <div id="deck-selection" style="width:100%;height:100%;position:relative;color:#d4af37;font-family:'Courier New', 'KaiTi', monospace;overflow:hidden;background:linear-gradient(135deg, #0c0e18, #1a1f33);">
                <style>
                    @keyframes titleGlow {
                        0%, 100% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                    }
                    
                    #deck-selection .card-item {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    
                    #deck-selection .card-item:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
                    }
                    
                    #deck-selection .action-btn:hover:not(:disabled) {
                        background: linear-gradient(135deg, #6a6a6a, #4a4a4a);
                        transform: scale(1.1);
                        box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
                    }
                    
                    #deck-selection .action-button:hover:not(:disabled) {
                        background: linear-gradient(to bottom, #6a6a6a, #4a4a4a);
                        transform: translateY(-2px);
                        box-shadow: 0 5px 20px rgba(212, 175, 55, 0.7);
                    }
                    
                    #deck-selection .confirm-button:hover:not(:disabled) {
                        background: linear-gradient(to bottom, #9b8d7b, #6a6252);
                        box-shadow: 0 5px 20px rgba(212, 175, 55, 0.9);
                    }
                    
                    #deck-selection .cancel-button:hover {
                        background: linear-gradient(to bottom, #6a6a6a, #4a4a4a);
                    }
                    
                    #deck-selection .available-cards-container::-webkit-scrollbar {
                        width: 8px;
                    }
                    
                    #deck-selection .available-cards-container::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 4px;
                    }
                    
                    #deck-selection .available-cards-container::-webkit-scrollbar-thumb {
                        background: linear-gradient(#8B7D6B, #5a5242);
                        border-radius: 4px;
                    }
                    
                    #deck-selection .available-cards-container::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(#9b8d7b, #6a6252);
                    }
                    
                    @media (max-width: 768px) {
                        #deck-selection .deck-selection-content {
                            padding: 15px;
                        }
                        
                        #deck-selection .deck-info-container {
                            flex-direction: column;
                            align-items: center;
                            gap: 15px;
                        }
                        
                        #deck-selection .cards-grid {
                            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                            gap: 15px;
                        }
                        
                        #deck-selection .card-container {
                            width: 140px;
                            height: 210px;
                        }
                        
                        #deck-selection .card-name {
                            font-size: 1rem;
                            margin-bottom: 10px;
                        }
                        
                        #deck-selection .card-description {
                            font-size: 0.8rem;
                        }
                        
                        #deck-selection .deck-selection-actions {
                            flex-direction: column;
                            align-items: center;
                            gap: 15px;
                        }
                        
                        #deck-selection .action-button {
                            width: 80%;
                            max-width: 250px;
                        }
                    }
                </style>
                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 20%),radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 20%),linear-gradient(45deg, transparent 49%, rgba(139, 125, 107, 0.05) 50%, transparent 51%);background-size:200px 200px, 300px 300px, 40px 40px;z-index:1;"></div>
                
                <div style="position:relative;z-index:10;padding:30px;height:100%;display:flex;flex-direction:column;">
                    <h1 style="text-align:center;margin-bottom:25px;text-transform:uppercase;letter-spacing:3px;border-bottom:2px solid #8B7D6B;padding-bottom:15px;font-size:2.2rem;text-shadow:0 0 15px rgba(212, 175, 55, 0.7);background:linear-gradient(45deg, #d4af37, #fff8dc, #d4af37);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:titleGlow 3s ease-in-out infinite;">选择你的卡组</h1>
                    
                    <div style="display:flex;justify-content:center;gap:30px;margin-bottom:25px;flex-wrap:wrap;">
                        <div style="background:rgba(0, 0, 0, 0.7);padding:12px 20px;border-radius:8px;border:1px solid #8B7D6B;box-shadow:0 0 15px rgba(139, 125, 107, 0.3);display:flex;align-items:center;gap:8px;">
                            <span style="color:#e8edf3;font-size:1rem;">已选择:</span>
                            <span id="selected-count" style="color:#d4af37;font-weight:bold;font-size:1.1rem;">0</span>
                            <span style="color:#8B7D6B;">/</span>
                            <span style="color:#d4af37;font-weight:bold;font-size:1.1rem;">${this.maxDeckSize}</span>
                        </div>
                        <div style="background:rgba(0, 0, 0, 0.7);padding:12px 20px;border-radius:8px;border:1px solid #8B7D6B;box-shadow:0 0 15px rgba(139, 125, 107, 0.3);display:flex;align-items:center;gap:8px;">
                            <span style="color:#e8edf3;font-size:1rem;">最少需要:</span>
                            <span style="color:#d4af37;font-weight:bold;font-size:1.1rem;">${this.minDeckSize}张</span>
                        </div>
                    </div>
                    
                    <div id="available-cards" style="flex:1;overflow-y:auto;margin-bottom:25px;background:rgba(0, 0, 0, 0.5);border:1px solid #8B7D6B;border-radius:10px;padding:15px;box-shadow:inset 0 0 20px rgba(0, 0, 0, 0.5);">
                        <h2 style="margin-top:0;margin-bottom:20px;text-align:center;color:#d4af37;text-shadow:0 0 10px rgba(212, 175, 55, 0.5);font-size:1.5rem;">可用卡牌</h2>
                        <div id="cards-container" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:20px;"></div>
                    </div>
                    
                    <div style="display:flex;justify-content:center;gap:30px;">
                        <button id="confirm-deck" class="action-button confirm-button" style="padding:12px 30px;font-size:1.1rem;background:linear-gradient(to bottom, #8B7D6B, #5a5242);color:#d4af37;border:1px solid #8B7D6B;border-radius:8px;cursor:pointer;letter-spacing:1px;box-shadow:0 0 15px rgba(139, 125, 107, 0.5);transition:all 0.3s ease;font-family:'Courier New', monospace;font-weight:bold;" disabled>确认卡组</button>
                        <button id="cancel-selection" class="action-button cancel-button" style="padding:12px 30px;font-size:1.1rem;background:linear-gradient(to bottom, #5a5a5a, #3a3a3a);color:#d4af37;border:1px solid #8B7D6B;border-radius:8px;cursor:pointer;letter-spacing:1px;box-shadow:0 0 15px rgba(139, 125, 107, 0.5);transition:all 0.3s ease;font-family:'Courier New', monospace;font-weight:bold;">取消</button>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = template;
        this.renderCards();
        this.updateSelectedCount();
    }

    private renderCards(): void {
        const cardsContainer = document.getElementById('cards-container');
        if (!cardsContainer) return;

        cardsContainer.innerHTML = '';

        for (const cardId in this.playerDeck) {
            if (this.playerDeck[cardId] > 0) {
                const cardData = CARD_TEMPLATES[cardId];
                if (cardData) {
                    const cardElement = this.createCardElement(cardData, this.playerDeck[cardId]);
                    cardsContainer.appendChild(cardElement);
                }
            }
        }
    }

    private createCardElement(cardData: any, count: number): HTMLElement {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        cardElement.dataset.cardId = cardData.id;
        
        const selectedCount = this.selectedDeck[cardData.id] || 0;
        
        cardElement.innerHTML = `
            <div style="width:180px;height:260px;position:relative;border-radius:15px;overflow:hidden;background:linear-gradient(135deg, #e2dacd, #d4c9b5);color:#000;border:2px solid #8B7D6B;box-shadow:0 12px 30px rgba(0, 0, 0, 0.6);margin:0 auto;">
                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(-45deg,transparent,transparent 3px,rgba(212, 175, 55, 0.1) 3px,rgba(212, 175, 55, 0.1) 6px);pointer-events:none;z-index:0;"></div>
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:13px;background:linear-gradient(rgba(226, 218, 197, 0.85), rgba(226, 218, 197, 0.85));padding:15px;overflow:hidden;z-index:1;">
                    <div style="font-size:1.2rem;text-align:center;margin-bottom:15px;color:#000;font-weight:bold;text-shadow:0 0 5px rgba(255, 255, 255, 0.8);">${cardData.name}</div>
                    <div style="font-size:0.9rem;text-align:center;margin:10px 0;line-height:1.4;color:#222;">${cardData.description}</div>
                </div>
                <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.8);padding:10px;text-align:center;z-index:2;">
                    <div style="font-size:0.9rem;color:#d4af37;margin-bottom:8px;">拥有: ${count}张</div>
                    <div style="display:flex;align-items:center;justify-content:center;gap:8px;">
                        <button class="action-btn decrease-btn" style="width:32px;height:32px;background:linear-gradient(135deg, #5a5a5a, #3a3a3a);border:1px solid #8B7D6B;color:#d4af37;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:all 0.3s ease;box-shadow:0 2px 5px rgba(0, 0, 0, 0.3);" ${selectedCount <= 0 ? 'disabled' : ''}>-</button>
                        <span class="selected-count" style="min-width:25px;text-align:center;font-size:1.1rem;color:#d4af37;font-weight:bold;">${selectedCount}</span>
                        <button class="action-btn increase-btn" style="width:32px;height:32px;background:linear-gradient(135deg, #5a5a5a, #3a3a3a);border:1px solid #8B7D6B;color:#d4af37;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:all 0.3s ease;box-shadow:0 2px 5px rgba(0, 0, 0, 0.3);" ${selectedCount >= count || this.totalSelected >= this.maxDeckSize ? 'disabled' : ''}>+</button>
                    </div>
                </div>
            </div>
        `;
        
        return cardElement;
    }

    private getCardTypeText(type: string): string {
        switch (type) {
            case 'attack': return '攻击';
            case 'defense': return '防御';
            case 'special': return '特殊';
            default: return type;
        }
    }

    private bindEvents(): void {
        // 处理增加卡牌按钮
        this.container.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            
            if (target.classList.contains('increase-btn')) {
                const cardItem = target.closest('.card-item') as HTMLElement;
                if (cardItem) {
                    const cardId = cardItem.dataset.cardId!;
                    this.increaseCard(cardId);
                }
            }
            
            if (target.classList.contains('decrease-btn')) {
                const cardItem = target.closest('.card-item') as HTMLElement;
                if (cardItem) {
                    const cardId = cardItem.dataset.cardId!;
                    this.decreaseCard(cardId);
                }
            }
            
            if (target.id === 'confirm-deck') {
                this.confirmDeck();
            }
            
            if (target.id === 'cancel-selection') {
                this.cancelSelection();
            }
        });
    }

    private increaseCard(cardId: string): void {
        const availableCount = this.playerDeck[cardId];
        const selectedCount = this.selectedDeck[cardId] || 0;
        
        if (selectedCount < availableCount && this.totalSelected < this.maxDeckSize) {
            this.selectedDeck[cardId] = selectedCount + 1;
            this.totalSelected++;
            this.updateCardDisplay(cardId);
            this.updateSelectedCount();
            this.updateConfirmButton();
        }
    }

    private decreaseCard(cardId: string): void {
        const selectedCount = this.selectedDeck[cardId] || 0;
        
        if (selectedCount > 0) {
            this.selectedDeck[cardId] = selectedCount - 1;
            if (this.selectedDeck[cardId] === 0) {
                delete this.selectedDeck[cardId];
            }
            this.totalSelected--;
            this.updateCardDisplay(cardId);
            this.updateSelectedCount();
            this.updateConfirmButton();
        }
    }

    private updateCardDisplay(cardId: string): void {
        const cardElement = this.container.querySelector(`.card-item[data-card-id="${cardId}"]`) as HTMLElement;
        if (!cardElement) return;
        
        const selectedCount = this.selectedDeck[cardId] || 0;
        const availableCount = this.playerDeck[cardId];
        
        const decreaseBtn = cardElement.querySelector('.decrease-btn') as HTMLButtonElement;
        const increaseBtn = cardElement.querySelector('.increase-btn') as HTMLButtonElement;
        const selectedCountElement = cardElement.querySelector('.selected-count') as HTMLElement;
        
        if (decreaseBtn) {
            decreaseBtn.disabled = selectedCount <= 0;
        }
        
        if (increaseBtn) {
            increaseBtn.disabled = selectedCount >= availableCount || this.totalSelected >= this.maxDeckSize;
        }
        
        if (selectedCountElement) {
            selectedCountElement.textContent = selectedCount.toString();
        }
    }

    private updateSelectedCount(): void {
        const selectedCountElement = document.getElementById('selected-count');
        if (selectedCountElement) {
            selectedCountElement.textContent = this.totalSelected.toString();
        }
    }

    private updateConfirmButton(): void {
        const confirmButton = document.getElementById('confirm-deck') as HTMLButtonElement;
        if (confirmButton) {
            confirmButton.disabled = this.totalSelected < this.minDeckSize;
        }
    }

    private confirmDeck(): void {
        if (this.totalSelected >= this.minDeckSize) {
            // 移除值为0的卡牌
            const cleanedDeck: Record<string, number> = {};
            for (const cardId in this.selectedDeck) {
                if (this.selectedDeck[cardId] > 0) {
                    cleanedDeck[cardId] = this.selectedDeck[cardId];
                }
            }
            
            this.onComplete(cleanedDeck);
        }
    }

    private cancelSelection(): void {
        // 可以在这里添加取消选择的逻辑，比如返回到主菜单
        if (confirm('确定要取消选择并退出卡组编辑吗？')) {
            this.onComplete({}); // 传入空的卡组表示取消
        }
    }
}