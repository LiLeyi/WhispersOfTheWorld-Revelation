import { ArchiveManager } from './ArchiveManager';
import { CARD_DATABASE } from '../components/CardDatabase';
import { Card } from './mini_games/card_game';

export class BagManager {
    private static instance: BagManager;
    private archiveManager: ArchiveManager;
    private bagPage: BagPage | null = null;

    private constructor() {
        this.archiveManager = ArchiveManager.getInstance();
    }

    public static getInstance(): BagManager {
        if (!BagManager.instance) {
            BagManager.instance = new BagManager();
        }
        return BagManager.instance;
    }

    public hasCard(cardId: string): boolean {
        const currentArchiveManager = ArchiveManager.getInstance();
        return currentArchiveManager.hasItem(cardId);
    }

    public addCardToBag(cardId: string): void {
        const currentArchiveManager = ArchiveManager.getInstance();
        // 检查是否已经拥有该卡牌
        const hasCard = currentArchiveManager.hasItem(cardId);
        
        // 添加卡牌到存档（数量+1）
        currentArchiveManager.addItem(cardId, 1);
        
        // 只有在第一次获得卡牌时才显示提示
        if (!hasCard) {
            this.showCardObtainedNotification(cardId);
        }
    }
    
    private showCardObtainedNotification(cardId: string): void {
        const card = CARD_DATABASE[cardId];
        if (!card) return;
        
        // 创建提示元素
        const notification = document.createElement('div');
        notification.className = 'card-obtained-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">+</div>
                <div class="notification-text">
                    <div class="notification-title">获得卡牌</div>
                    <div class="notification-card-name">${card.name}</div>
                </div>
            </div>
        `;
        
        // 添加样式
        this.addNotificationStyles();
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 计算垂直位置，避免重叠
        const notifications = document.querySelectorAll('.card-obtained-notification');
        const offset = (notifications.length - 1) * 70; // 增加偏移量以避免重叠
        
        // 设置初始位置
        notification.style.top = `${20 + offset}px`;
        
        // 添加显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                
                // 调整其他通知的位置
                this.adjustNotificationPositions();
            }, 300);
        }, 3000);
    }
    
    private adjustNotificationPositions(): void {
        const notifications = document.querySelectorAll('.card-obtained-notification');
        notifications.forEach((notification, index) => {
            const offset = index * 70;
            (notification as HTMLElement).style.top = `${20 + offset}px`;
        });
    }
    
    private addNotificationStyles(): void {
        // 检查是否已经添加过样式
        if (document.getElementById('card-notification-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'card-notification-styles';
        style.textContent = `
            .card-obtained-notification {
                position: fixed;
                right: 20px;
                background: rgba(0, 0, 0, 0.85);
                color: white;
                border-radius: 10px;
                padding: 15px;
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.3s ease-out;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                min-width: 250px;
                min-height: 70px; /* 设置最小高度 */
            }
            
            .card-obtained-notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-icon {
                font-size: 24px;
                font-weight: bold;
                color: #4ecdc4;
                background: rgba(78, 205, 196, 0.2);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-text {
                flex: 1;
            }
            
            .notification-title {
                font-size: 12px;
                color: #aaa;
                margin-bottom: 3px;
            }
            
            .notification-card-name {
                font-size: 16px;
                font-weight: bold;
                color: #fff;
            }
        `;
        
        document.head.appendChild(style);
    }

    public toggleBag(): void {
        const bagOverlay = document.getElementById("bag-overlay");
        if (bagOverlay) {
            const isVisible = bagOverlay.style.display === "flex";
            if (isVisible) {
                bagOverlay.style.display = "none";
            } else {
                // 确保BagPage实例存在
                if (!this.bagPage) {
                    this.bagPage = new BagPage();
                }
                // 更新背包内容
                this.bagPage.renderBag();
                bagOverlay.style.display = "flex";
            }
        }
    }
}

class BagPage {
    private archiveManager: ArchiveManager;

    constructor() {
        this.archiveManager = ArchiveManager.getInstance();
        this.init();
    }

    private init(): void {
        this.bindEvents();
        // 确保在初始化时渲染背包内容
        this.renderBag();
    }
    
    public renderBag(searchTerm: string = ''): void {
        const bagGrid = document.getElementById('bag-grid');
        if (!bagGrid) {
            console.error('无法找到 bag-grid 元素');
            return;
        }

        // 清空现有内容
        bagGrid.innerHTML = '';

        // 获取玩家拥有的卡牌及数量
        const playerCards: {card: Card, count: number}[] = [];
        
        // 获取唯一的卡牌列表并过滤
        for (const cardId in CARD_DATABASE) {
            if (this.archiveManager.hasItem(cardId)) {
                const card = CARD_DATABASE[cardId];
                const count = this.archiveManager.getItemCount(cardId);
                // 如果有搜索词，进行过滤
                if (searchTerm === '' || 
                    card.name.includes(searchTerm) || 
                    card.description.includes(searchTerm)) {
                    playerCards.push({card, count});
                }
            }
        }

        // 如果没有卡牌，显示提示
        if (playerCards.length === 0) {
            bagGrid.innerHTML = '<p class="empty-bag" style="grid-column: 1/-1; text-align: center; color: #eeeeee;">' + 
                (searchTerm ? '未找到匹配的卡牌' : '背包是空的') + '</p>';
            return;
        }

        // 渲染每张卡牌
        playerCards.forEach(({card, count}) => {
            const cardElement = this.createCardElement(card, count);
            bagGrid.appendChild(cardElement);
        });
    }

    private createCardElement(card: Card, count: number): HTMLElement {
        const bagItemElement = document.createElement("div");
        bagItemElement.className = "bag-item";

        // 创建卡片容器
        const cardContainer = document.createElement("div");
        cardContainer.className = "card";
        
        // 添加卡片内容
        const cardContent = document.createElement("div");
        cardContent.className = "card-content";
        
        const cardName = document.createElement("div");
        cardName.className = "card-name";
        // 显示卡牌名称和数量
        cardName.textContent = count > 1 ? `${card.name} x${count}` : card.name;
        
        const cardDesc = document.createElement("div");
        cardDesc.className = "card-desc";
        cardDesc.textContent = card.description;
        
        // 组装卡片结构
        cardContent.appendChild(cardName);
        cardContent.appendChild(cardDesc);
        cardContainer.appendChild(cardContent);
        
        // 将卡片添加到背包项目中
        bagItemElement.appendChild(cardContainer);

        // 添加点击事件
        bagItemElement.addEventListener("click", () => {
            this.showCardModal(card);
        });

        return bagItemElement;
    }

    private showCardModal(card: Card): void {
        const modal = document.getElementById("item-modal");
        const itemName = document.getElementById("modal-item-name");
        const itemDescription = document.getElementById("modal-item-description");

        if (itemName) itemName.textContent = card.name;
        if (itemDescription) itemDescription.textContent = card.description;

        if (modal) {
            modal.style.display = "flex";
        }
    }

    private bindEvents(): void {
        // 绑定关闭按钮事件
        const closeButton = document.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                const bagOverlay = document.getElementById('bag-overlay');
                if (bagOverlay) {
                    bagOverlay.style.display = 'none';
                }
            });
        }

        // 绑定关闭弹窗按钮事件
        const closeModalButtons = document.querySelectorAll('.close-modal');
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.getElementById('item-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // 点击遮罩层关闭弹窗
        const bagOverlay = document.getElementById('bag-overlay');
        const itemModal = document.getElementById('item-modal');
        
        if (bagOverlay) {
            bagOverlay.addEventListener('click', (e) => {
                if (e.target === bagOverlay) {
                    bagOverlay.style.display = 'none';
                }
            });
        }
        
        if (itemModal) {
            itemModal.addEventListener('click', (e) => {
                if (e.target === itemModal) {
                    itemModal.style.display = 'none';
                }
            });
        }
        
        // 绑定搜索功能
        const searchInput = document.getElementById('bag-search-input') as HTMLInputElement;
        const searchButton = document.querySelector('.bag-search button');
        
        if (searchInput && searchButton) {
            // 点击搜索按钮
            searchButton.addEventListener('click', () => {
                this.renderBag(searchInput.value.trim());
            });
            
            // 回车搜索
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.renderBag(searchInput.value.trim());
                }
            });
        }
        
        // 添加样式以确保背包中的卡牌与游戏中的一致
        this.addCardStyles();
    }
    
    private addCardStyles(): void {
        // 检查是否已经添加过样式
        if (document.getElementById('bag-card-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'bag-card-styles';
        style.textContent = `
            .bag-item {
                width: 110px;
                height: 160px;
                position: relative;
                border-radius: 10px;
                cursor: pointer;
                overflow: hidden;
                user-select: none;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
                background: rgb(226, 218, 197);
                color: #000;
                transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.25, 1), filter 0.22s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0;
                margin: 0 auto;
            }
            
            .bag-item:hover {
                transform: scale(1.05);
                filter: drop-shadow(0 22px 48px rgba(0, 0, 0, 0.7));
                z-index: 10;
            }
            
            .card {
                width: 100%;
                height: 100%;
                background: 
                    linear-gradient(rgba(226, 218, 197, 0.8), rgba(226, 218, 197, 0.8)),
                    url('./assets/images/beijing.png');
                background-size: cover;
                border-radius: 8px;
                color: #000;
                padding: 10px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .card-content {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
            }
            
            .card-name {
                font-size: 16px;
                text-align: center;
                margin-bottom: 5px;
                color: #000;
                font-weight: bold;
            }
            
            .card-desc {
                font-size: 10px;
                text-align: center;
                margin: 5px 0;
                line-height: 1.2;
                color: #000;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }
        `;
        
        document.head.appendChild(style);
    }
}