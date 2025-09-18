import './card_library.css';
import { BagManager } from '../../components/BagManager';
import { ArchiveManager } from '../../components/ArchiveManager';
import { CARD_DATABASE } from '../../components/CardDatabase';
import { Card, CardEffect } from '../../components/mini_games/card_game';
import { getUnlockedCards, CARD_UNLOCK_RULES } from '../../components/CardUnlockConfig';
import { 
    CardRarity, 
    CardType, 
    CardFilter, 
    CardStats, 
    RarityMap, 
    TypeMap 
} from './types';

class CardLibraryManager {
    private static instance: CardLibraryManager;
    private bagManager: BagManager;
    private archiveManager: ArchiveManager;
    private currentFilter: CardFilter = {
        search: '',
        rarity: '',
        type: ''
    };
    private searchTimeout: number | null = null;

    private constructor() {
        this.bagManager = BagManager.getInstance();
        this.archiveManager = ArchiveManager.getInstance();
    }

    public static getInstance(): CardLibraryManager {
        if (!CardLibraryManager.instance) {
            CardLibraryManager.instance = new CardLibraryManager();
        }
        return CardLibraryManager.instance;
    }

    public init(): void {
        console.log('CardLibraryManager initializing...');
        this.setupEventListeners();
        this.loadCards();
        this.updateStats();
        console.log('CardLibraryManager initialized successfully');
    }

    private setupEventListeners(): void {
        // 返回按钮
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => {
                this.goBack();
            });
        }

        // 搜索功能
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        const searchButton = document.getElementById('searchButton');
        
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', () => {
                this.performSearch();
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });

            searchInput.addEventListener('input', () => {
                this.debounceSearch();
            });
        }

        // 筛选功能
        const rarityFilter = document.getElementById('rarityFilter') as HTMLSelectElement;
        const typeFilter = document.getElementById('typeFilter') as HTMLSelectElement;
        const clearFiltersButton = document.getElementById('clearFilters');

        if (rarityFilter) {
            rarityFilter.addEventListener('change', () => {
                this.currentFilter.rarity = rarityFilter.value;
                this.loadCards();
            });
        }

        if (typeFilter) {
            typeFilter.addEventListener('change', () => {
                this.currentFilter.type = typeFilter.value;
                this.loadCards();
            });
        }

        if (clearFiltersButton) {
            clearFiltersButton.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // 模态框关闭
        const modal = document.getElementById('cardModal');
        const closeModal = document.getElementById('closeModal');

        if (modal && closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeModal();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }

    private debounceSearch(): void {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = window.setTimeout(() => {
            this.performSearch();
        }, 300);
    }

    private performSearch(): void {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        if (searchInput) {
            this.currentFilter.search = searchInput.value.trim();
            this.loadCards();
        }
    }

    private clearFilters(): void {
        this.currentFilter = {
            search: '',
            rarity: '',
            type: ''
        };

        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        const rarityFilter = document.getElementById('rarityFilter') as HTMLSelectElement;
        const typeFilter = document.getElementById('typeFilter') as HTMLSelectElement;

        if (searchInput) searchInput.value = '';
        if (rarityFilter) rarityFilter.value = '';
        if (typeFilter) typeFilter.value = '';

        this.loadCards();
    }

    private loadCards(): void {
        const cardsGrid = document.getElementById('cardsGrid');
        if (!cardsGrid) return;

        // 显示加载状态
        this.showLoading();

        // 模拟加载延迟
        setTimeout(() => {
            this.renderCards();
            this.hideLoading();
        }, 500);
    }

    private renderCards(): void {
        const cardsGrid = document.getElementById('cardsGrid');
        if (!cardsGrid) return;

        // 清空现有内容
        cardsGrid.innerHTML = '';

        // 基于游戏进度获取已解锁的卡片数据
        const ownedCardsData = this.getOwnedCardsFromBag();
        const ownedCards = ownedCardsData.map(({card}) => card);
        
        // 根据当前筛选条件过滤已解锁的卡牌
        const filteredOwnedCards = this.filterCards(ownedCards);

        if (filteredOwnedCards.length === 0) {
            this.showEmptyState();
            return;
        }

        // 只渲染已解锁的卡牌
        filteredOwnedCards.forEach(card => {
            // 从原始数据中找到对应的数量信息
            const cardData = ownedCardsData.find(({card: c}) => c.id === card.id);
            const cardElement = this.createCardElement(card, true, cardData?.count || 1);
            cardsGrid.appendChild(cardElement);
        });
    }

    private filterCards(cards: Card[]): Card[] {
        return cards.filter(card => {
            // 搜索筛选
            if (this.currentFilter.search) {
                const searchTerm = this.currentFilter.search.toLowerCase();
                const matchesSearch = 
                    card.name.toLowerCase().includes(searchTerm) ||
                    card.description.toLowerCase().includes(searchTerm);
                if (!matchesSearch) return false;
            }

            // 稀有度筛选
            if (this.currentFilter.rarity) {
                const cardRarity = this.getCardRarity(card);
                if (cardRarity !== this.currentFilter.rarity) return false;
            }

            // 类型筛选（支持重叠类别，只要包含所选类型即可）
            if (this.currentFilter.type) {
                const types = this.getCardTypes(card);
                if (!types.includes(this.currentFilter.type as CardType)) return false;
            }

            return true;
        });
    }

    private filterUnownedCards(cards: Card[]): Card[] {
        return cards.filter(card => {
            // 对于未获得的卡牌，只根据稀有度和类型筛选，不进行搜索筛选
            // 因为搜索时不应该显示未获得的卡牌详情
            
            // 稀有度筛选
            if (this.currentFilter.rarity) {
                const cardRarity = this.getCardRarity(card);
                if (cardRarity !== this.currentFilter.rarity) return false;
            }

            // 类型筛选（支持重叠类别）
            if (this.currentFilter.type) {
                const types = this.getCardTypes(card);
                if (!types.includes(this.currentFilter.type as CardType)) return false;
            }

            return true;
        });
    }

    private getCardRarity(card: Card): CardRarity {
        // 优先按 priority 动态判断稀有度：越小越普通，越大越稀有
        // 阈值：<=2 普通, 3 稀有, 4 史诗, >=5 传说
        if (typeof card.priority === 'number') {
            if (card.priority <= 2) return 'common';
            if (card.priority === 3) return 'rare';
            if (card.priority === 4) return 'epic';
            return 'legendary';
        }

        // 兼容回退：若无 priority，则使用旧映射
        const rarityMap: {[key: string]: string} = {
            'punch': 'common',
            'parry': 'common',
            'hook': 'common',
            'dodge': 'common',
            'combo': 'rare',
            'holy_shield': 'rare',
            'holiness': 'rare',
            'darkness': 'epic',
            'darkness_final': 'epic',
            'enlightenment': 'epic',
            'meteorite': 'legendary',
            'reapers_whisper': 'legendary',
            'reapers_groan': 'legendary',
            'end_tears': 'legendary'
        };
        return (rarityMap[card.id] || 'common') as CardRarity;
    }

    private getCardType(card: Card): CardType {
        // 兼容旧接口：返回一个主类型（用于 badge 显示）
        const types = this.getCardTypes(card);
        return types[0] || 'special';
    }

    private getCardTypes(card: Card): CardType[] {
        const types: Set<CardType> = new Set();
        const desc = (card.description || '').toString();

        // 文本规则（可重叠）：
        const hasAttackText = desc.includes('攻击') || desc.includes('真攻');
        const hasDefenseText = desc.includes('防御') || desc.includes('真防');
        const hasHealText = desc.includes('恢复');
        const hasDebuffText = desc.includes('对方');

        if (hasAttackText) types.add('attack');
        if (hasDefenseText) types.add('defense');
        if (hasHealText) types.add('heal');
        if (hasDebuffText) types.add('special');

        // 回退到 effect 规则，保持兼容
        if (types.size === 0 && Array.isArray(card.effect)) {
            const hasAttack = card.effect.some((e: any) => e.id === 'do_attack' || e.id === 'do_true_attack');
            const hasDefense = card.effect.some((e: any) => e.id === 'do_defence' || e.id === 'do_true_defence');
            const hasHeal = card.effect.some((e: any) => e.id === 'do_health');
            if (hasAttack) types.add('attack');
            if (hasDefense) types.add('defense');
            if (hasHeal) types.add('heal');
            if (!hasAttack && !hasDefense && !hasHeal) types.add('special');
        }

        return Array.from(types);
    }

    private createCardElement(card: Card, isOwned: boolean = true, count: number = 1): HTMLElement {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        
        if (!isOwned) {
            cardElement.classList.add('unowned');
        }
        
        const rarity = this.getCardRarity(card);
        const type = this.getCardType(card);
        const types = this.getCardTypes(card);
        const hasCard = this.isCardOwned(card.id);

        if (isOwned) {
            // 已获得的卡牌显示完整信息
            cardElement.innerHTML = `
                <div class="card-preview">
                    <div class="card-content">
                        <div class="card-name">${card.name}</div>
                        <div class="card-desc">${card.description}</div>
                    </div>
                    ${hasCard ? `<div class="card-count">x${count}</div>` : ''}
                </div>
                <div class="card-info">
                    <div class="card-title">${card.name}</div>
                    <div class="card-description">${card.description}</div>
                    <div class="card-meta">
                        <span class="card-rarity rarity-${rarity}">${this.getRarityText(rarity)}</span>
                        <span class="card-type">${types.map(t => this.getTypeText(t)).join('/')}</span>
                    </div>
                </div>
            `;
        } else {
            // 未获得的卡牌只显示名称和稀有度，其他信息模糊
            cardElement.innerHTML = `
                <div class="card-preview">
                    <div class="card-content">
                        <div class="card-name">${card.name}</div>
                        <div class="card-desc">???</div>
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-title">${card.name}</div>
                    <div class="card-description">未获得</div>
                    <div class="card-meta">
                        <span class="card-rarity rarity-${rarity}">${this.getRarityText(rarity)}</span>
                        <span class="card-type">???</span>
                    </div>
                </div>
            `;
        }

        // 添加点击事件
        cardElement.addEventListener('click', () => {
            if (isOwned) {
                this.showCardModal(card);
            } else {
                // 未获得的卡牌显示提示信息
                this.showUnownedCardModal(card);
            }
        });

        // 添加悬停效果
        cardElement.addEventListener('mouseenter', () => {
            cardElement.style.transform = 'translateY(-8px) scale(1.02)';
        });

        cardElement.addEventListener('mouseleave', () => {
            cardElement.style.transform = 'translateY(0) scale(1)';
        });

        return cardElement;
    }

    private getRarityText(rarity: CardRarity): string {
        const rarityTexts: Record<CardRarity, string> = {
            'common': '普通',
            'rare': '稀有',
            'epic': '史诗',
            'legendary': '传说'
        };
        return rarityTexts[rarity] || '普通';
    }

    private getTypeText(type: CardType): string {
        const typeTexts: Record<CardType, string> = {
            'attack': '攻击',
            'defense': '防御',
            'heal': '治疗',
            'special': '特殊'
        };
        return typeTexts[type] || '特殊';
    }

    private showCardModal(card: Card): void {
        const modal = document.getElementById('cardModal');
        if (!modal) return;

        const rarity = this.getCardRarity(card);
        const type = this.getCardType(card);
        const count = this.getCardCount(card.id);

        // 更新模态框内容
        const modalCardName = document.getElementById('modalCardName');
        const modalCardDescription = document.getElementById('modalCardDescription');
        const modalCardEffects = document.getElementById('modalCardEffects');
        const modalCardCount = document.getElementById('modalCardCount');
        const modalCardRarity = document.getElementById('modalCardRarity');
        const modalCardPreview = document.getElementById('modalCardPreview');

        if (modalCardName) modalCardName.textContent = card.name;
        if (modalCardDescription) modalCardDescription.textContent = card.description;
        if (modalCardCount) modalCardCount.textContent = count.toString();
        if (modalCardRarity) modalCardRarity.textContent = this.getRarityText(rarity);

        // 生成卡牌效果描述
        if (modalCardEffects) {
            modalCardEffects.innerHTML = this.generateCardEffectsDescription(card);
        }

        // 生成卡牌预览
        if (modalCardPreview) {
            modalCardPreview.innerHTML = `
                <div class="modal-card-content">
                    <div class="modal-card-name">${card.name}</div>
                    <div class="modal-card-desc">${card.description}</div>
                </div>
            `;
        }

        // 显示模态框
        modal.classList.add('show');
    }

    private showUnownedCardModal(card: Card): void {
        const modal = document.getElementById('cardModal');
        if (!modal) return;

        const rarity = this.getCardRarity(card);

        // 更新模态框内容
        const modalCardName = document.getElementById('modalCardName');
        const modalCardDescription = document.getElementById('modalCardDescription');
        const modalCardEffects = document.getElementById('modalCardEffects');
        const modalCardCount = document.getElementById('modalCardCount');
        const modalCardRarity = document.getElementById('modalCardRarity');
        const modalCardPreview = document.getElementById('modalCardPreview');

        if (modalCardName) modalCardName.textContent = card.name;
        if (modalCardDescription) modalCardDescription.textContent = '此卡牌尚未获得，无法查看详细信息';
        if (modalCardCount) modalCardCount.textContent = '0';
        if (modalCardRarity) modalCardRarity.textContent = this.getRarityText(rarity);

        // 生成卡牌效果描述
        if (modalCardEffects) {
            modalCardEffects.innerHTML = '<p>需要获得此卡牌后才能查看效果详情</p>';
        }

        // 生成卡牌预览
        if (modalCardPreview) {
            modalCardPreview.innerHTML = `
                <div class="modal-card-content">
                    <div class="modal-card-name">${card.name}</div>
                    <div class="modal-card-desc">???</div>
                </div>
            `;
        }

        // 显示模态框
        modal.classList.add('show');
    }

    private generateCardEffectsDescription(card: Card): string {
        let effects = '';

        // 行动消耗
        if (card.cost?.action) {
            effects += `<div class="effect-item"><strong>行动消耗:</strong> ${card.cost.action}点</div>`;
        }

        // 生命消耗
        if (card.cost?.health) {
            effects += `<div class="effect-item"><strong>生命消耗:</strong> ${card.cost.health}点</div>`;
        }

        // 优先级
        effects += `<div class="effect-item"><strong>优先级:</strong> ${card.priority}</div>`;

        // 卡牌效果
        if (card.effect && card.effect.length > 0) {
            effects += `<div class="effect-item"><strong>效果:</strong></div>`;
            card.effect.forEach((effect: CardEffect) => {
                effects += `<div class="effect-detail">• ${this.getEffectDescription(effect)}</div>`;
            });
        }

        return effects || '<div class="effect-item">无特殊效果</div>';
    }

    private getEffectDescription(effect: CardEffect): string {
        // 这里可以根据实际的effect结构来生成描述
        // 暂时返回简单的描述
        return `${effect.id || '未知效果'}`;
    }

    private closeModal(): void {
        const modal = document.getElementById('cardModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    private showEmptyState(): void {
        const cardsGrid = document.getElementById('cardsGrid');
        if (!cardsGrid) return;

        cardsGrid.innerHTML = `
            <div class="empty-state">
                <h3>未找到匹配的卡牌</h3>
                <p>请尝试调整搜索条件或筛选器</p>
            </div>
        `;
    }

    /**
     * 基于游戏进度获取已解锁的卡片数据
     * 使用进度解锁系统，不依赖存档中的实际卡片数据
     */
    private getOwnedCardsFromBag(): {card: Card, count: number}[] {
        const ownedCards: {card: Card, count: number}[] = [];
        
        // 获取基于游戏进度解锁的卡片
        const unlockedCards = getUnlockedCards();
        
        // 遍历解锁的卡片
        for (const [cardId, count] of Object.entries(unlockedCards)) {
            if (CARD_DATABASE[cardId]) {
                const card = CARD_DATABASE[cardId];
                ownedCards.push({card, count});
            }
        }
        
        return ownedCards;
    }

    /**
     * 获取未拥有的卡片 - 现在只显示已解锁但未拥有的卡片
     */
    private getUnownedCardsFromDatabase(): Card[] {
        const unlockedCards = getUnlockedCards();
        const allCards = Object.values(CARD_DATABASE);
        
        // 只显示已解锁但未拥有的卡片（这里简化处理，实际游戏中可能不需要显示未拥有的卡片）
        return allCards.filter(card => unlockedCards[card.id]);
    }

    /**
     * 获取卡片数量
     */
    private getCardCount(cardId: string): number {
        const unlockedCards = getUnlockedCards();
        return unlockedCards[cardId] || 0;
    }

    /**
     * 检查是否拥有卡片
     */
    private isCardOwned(cardId: string): boolean {
        const unlockedCards = getUnlockedCards();
        return !!unlockedCards[cardId];
    }

    private updateStats(): void {
        // 基于游戏进度更新统计信息
        const stats = this.calculateStats();
        this.displayStats(stats);
    }

    private calculateStats(): CardStats {
        // 基于解锁配置计算总数（以 CardUnlockConfig 中出现过的卡牌去重统计）
        const totalCards = (() => {
            const set = new Set<string>();
            CARD_UNLOCK_RULES.forEach(rule => set.add(rule.cardId));
            return set.size;
        })();
        const unlockedCards = getUnlockedCards();
        
        // 统计“在解锁配置中且已解锁”的卡牌数量
        const setUnlockPool = new Set<string>();
        CARD_UNLOCK_RULES.forEach(rule => setUnlockPool.add(rule.cardId));
        const ownedCards = Object.keys(unlockedCards).filter(id => setUnlockPool.has(id)).length;
        const collectionRate = totalCards > 0 ? Math.round((ownedCards / totalCards) * 100) : 0;
        
        return {
            totalCards,
            collectedCards: ownedCards,
            collectionRate
        };
    }

    private displayStats(stats: CardStats): void {
        const totalCardsElement = document.getElementById('totalCards');
        const collectedCardsElement = document.getElementById('collectedCards');
        const collectionRateElement = document.getElementById('collectionRate');

        if (totalCardsElement) totalCardsElement.textContent = stats.totalCards.toString();
        if (collectedCardsElement) collectedCardsElement.textContent = stats.collectedCards.toString();
        if (collectionRateElement) collectionRateElement.textContent = `${stats.collectionRate}%`;
    }

    private showLoading(): void {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }

    private hideLoading(): void {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    private goBack(): void {
        // 返回到主菜单
        if (typeof window !== 'undefined' && window.history) {
            window.history.back();
        } else {
            // 如果没有历史记录，跳转到主菜单
            window.location.href = '../main_menu/main_menu.html';
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const cardLibraryManager = CardLibraryManager.getInstance();
    cardLibraryManager.init();
});

// 导出供其他模块使用
export { CardLibraryManager };
