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
        private maxDeck: number = 10
    ) {
        this.container = container;
        this.onComplete = onComplete;
        this.cardManager = CardManager.getInstance();
        this.playerDeck = this.cardManager.getPlayerDeck();
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
            <div id="deck-selection" style="width:100%;height:100%;position:relative;color:#d4af37;font-family:'Courier New', monospace;overflow:hidden;background-color:#000;">
                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(circle at 10% 20%, rgba(139, 0, 0, 0.1) 0%, transparent 20%),radial-gradient(circle at 90% 80%, rgba(139, 0, 0, 0.1) 0%, transparent 20%);z-index:1;"></div>
                
                <div style="position:relative;z-index:10;padding:20px;height:100%;display:flex;flex-direction:column;">
                    <h1 style="text-align:center;margin-bottom:20px;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #8B7D6B;padding-bottom:10px;">选择你的卡组</h1>
                    
                    <div style="display:flex;justify-content:space-between;margin-bottom:20px;">
                        <div style="background:rgba(0,0,0,0.7);padding:10px 15px;border-radius:5px;border:1px solid #8B7D6B;">
                            已选择: <span id="selected-count">0</span>/${this.maxDeckSize}
                        </div>
                        <div style="background:rgba(0,0,0,0.7);padding:10px 15px;border-radius:5px;border:1px solid #8B7D6B;">
                            最少需要: ${this.minDeckSize}张
                        </div>
                    </div>
                    
                    <div id="available-cards" style="flex:1;overflow-y:auto;margin-bottom:20px;background:rgba(0,0,0,0.5);border:1px solid #8B7D6B;border-radius:5px;padding:10px;">
                        <h2 style="margin-top:0;margin-bottom:15px;text-align:center;">可用卡牌</h2>
                        <div id="cards-container" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(150px, 1fr));gap:15px;"></div>
                    </div>
                    
                    <div style="display:flex;justify-content:center;gap:20px;">
                        <button id="confirm-deck" style="padding:12px 25px;font-size:16px;background:linear-gradient(to bottom, #5a5a5a, #3a3a3a);color:#d4af37;border:1px solid #8B7D6B;border-radius:8px;cursor:pointer;letter-spacing:1px;box-shadow:0 0 10px rgba(139, 125, 107, 0.5);transition:all 0.3s;font-family:'Courier New', monospace;" disabled>确认卡组</button>
                        <button id="cancel-selection" style="padding:12px 25px;font-size:16px;background:linear-gradient(to bottom, #5a5a5a, #3a3a3a);color:#d4af37;border:1px solid #8B7D6B;border-radius:8px;cursor:pointer;letter-spacing:1px;box-shadow:0 0 10px rgba(139, 125, 107, 0.5);transition:all 0.3s;font-family:'Courier New', monospace;">取消</button>
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
            <div style="width:165px;height:240px;position:relative;border-radius:10px;overflow:hidden;background:rgb(226, 218, 197);background-image:url('../../assets/images/beijing.png');background-size:cover;color:#000;border:1px solid #8B7D6B;box-shadow:0 12px 30px rgba(0, 0, 0, 0.6);margin:0 auto;">
                <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(-45deg,transparent,transparent 3px,rgba(212, 175, 55, 0.05) 3px,rgba(212, 175, 55, 0.05) 6px);pointer-events:none;z-index:0;"></div>
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;font-weight:700;background:linear-gradient(rgba(226, 218, 197, 0.8), rgba(226, 218, 197, 0.8));background-size:cover;color:#000;padding:15px;overflow:hidden;">
                    <div style="font-size:18px;text-align:center;margin-bottom:10px;color:#000;font-weight:bold;">${cardData.name}</div>
                    <div style="font-size:12px;text-align:center;margin:8px 0;line-height:1.3;color:#000;">${cardData.description}</div>
                    <div style="font-size:12px;text-align:center;margin-top:10px;color:#000;">
                        <div style="margin-bottom:6px;">消耗: ${cardData.cost}</div>
                        <div>类型: ${this.getCardTypeText(cardData.type)}</div>
                    </div>
                </div>
                <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.7);padding:8px;text-align:center;">
                    <div style="font-size:14px;color:#d4af37;margin-bottom:8px;">拥有: ${count}张</div>
                    <div style="display:flex;align-items:center;justify-content:center;gap:8px;">
                        <button class="decrease-btn" style="width:28px;height:28px;background:#444;border:1px solid #8B7D6B;color:#d4af37;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;" ${selectedCount <= 0 ? 'disabled' : ''}>-</button>
                        <span class="selected-count" style="min-width:20px;text-align:center;font-size:14px;color:#d4af37;">${selectedCount}</span>
                        <button class="increase-btn" style="width:28px;height:28px;background:#444;border:1px solid #8B7D6B;color:#d4af37;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;" ${selectedCount >= count || this.totalSelected >= this.maxDeckSize ? 'disabled' : ''}>+</button>
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