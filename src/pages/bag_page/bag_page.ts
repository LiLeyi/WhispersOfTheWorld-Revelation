import { ArchiveManager } from '../../components/ArchiveManager';
import './bag_page.css';

// 定义道具接口
interface Item {
    id: string;
    name: string;
    description: string;
    icon: string;
}

// 道具数据库
const ITEMS_DATABASE: Record<string, Item> = {
    "ancient_coin": {
        id: "ancient_coin",
        name: "古币",
        description: "一枚古老的硬币，上面刻着未知的符文。似乎有某种神秘的力量。",
        icon: "🪙"
    },
    "mystic_gem": {
        id: "mystic_gem",
        name: "神秘宝石",
        description: "散发着微弱蓝光的宝石，让人感到平静和安宁。",
        icon: "💎"
    },
    "old_key": {
        id: "old_key",
        name: "古老的钥匙",
        description: "一把生锈的钥匙，不知道能打开什么。",
        icon: "🗝️"
    },
    "healing_potion": {
        id: "healing_potion",
        name: "治疗药水",
        description: "可以恢复生命值的红色药水。",
        icon: "🧪"
    },
    "magic_scroll": {
        id: "magic_scroll",
        name: "魔法卷轴",
        description: "记载着古老咒语的卷轴，似乎蕴含着强大的力量。",
        icon: "📜"
    },
    "silver_ring": {
        id: "silver_ring",
        name: "银戒指",
        description: "一枚精美的银戒指，镶嵌着小小的红宝石。",
        icon: "💍"
    }
};

class BagPage {
    private archiveManager: ArchiveManager;
    private modal: HTMLElement;
    private modalItemName: HTMLElement;
    private modalItemDescription: HTMLElement;

    constructor() {
        this.archiveManager = ArchiveManager.getInstance();
        this.modal = document.getElementById('itemModal')!;
        this.modalItemName = document.getElementById('modalItemName')!;
        this.modalItemDescription = document.getElementById('modalItemDescription')!;

        this.init();
    }

    private init(): void {
        this.renderBag();
        this.bindEvents();
    }

    private renderBag(): void {
        const bagGrid = document.getElementById('bagGrid');
        if (!bagGrid) return;

        // 清空现有内容
        bagGrid.innerHTML = '';

        // 获取玩家拥有的物品
        const playerItems: string[] = [];
        for (const itemId in ITEMS_DATABASE) {
            if (this.archiveManager.hasItem(itemId)) {
                playerItems.push(itemId);
            }
        }

        // 如果没有物品，显示提示
        if (playerItems.length === 0) {
            bagGrid.innerHTML = '<p class="empty-bag">背包是空的</p>';
            return;
        }

        // 渲染每个物品
        playerItems.forEach(itemId => {
            const item = ITEMS_DATABASE[itemId];
            if (item) {
                const itemElement = this.createItemElement(item);
                bagGrid.appendChild(itemElement);
            }
        });
    }

    private createItemElement(item: Item): HTMLElement {
        const itemElement = document.createElement('div');
        itemElement.className = 'bag-item';
        itemElement.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <p class="item-name">${item.name}</p>
        `;

        itemElement.addEventListener('click', () => {
            this.showItemModal(item);
        });

        return itemElement;
    }

    private showItemModal(item: Item): void {
        this.modalItemName.textContent = item.name;
        this.modalItemDescription.textContent = item.description;
        this.modal.style.display = 'block';
    }

    private bindEvents(): void {
        // 返回按钮
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.history.back();
            });
        }

        // 关闭模态框
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.modal.style.display = 'none';
            });
        }

        // 点击模态框外部关闭
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
    }
}

// 初始化背包页面
document.addEventListener('DOMContentLoaded', () => {
    new BagPage();
});