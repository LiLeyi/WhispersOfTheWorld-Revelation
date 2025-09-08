import { ArchiveManager } from './ArchiveManager';

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

/**
 * 背包管理器
 * 负责管理游戏中的物品背包功能
 */
export class BagManager {
    private static instance: BagManager;

    private constructor() {}

    /**
     * 获取 BagManager 的单例实例
     */
    public static getInstance(): BagManager {
        if (!BagManager.instance) {
            BagManager.instance = new BagManager();
        }
        return BagManager.instance;
    }

    /**
     * 切换背包界面显示/隐藏
     */
    public toggleBag(): void {
        const bagOverlay = document.getElementById("bag-overlay");
        if (bagOverlay) {
            const isVisible = bagOverlay.style.display === "flex";
            if (isVisible) {
                bagOverlay.style.display = "none";
            } else {
                this.renderBag();
                bagOverlay.style.display = "flex";
            }
        }
    }

    /**
     * 渲染背包内容
     */
    private renderBag(): void {
        const bagGrid = document.getElementById("bag-grid");
        if (!bagGrid) return;

        // 清空现有内容
        bagGrid.innerHTML = "";

        // 获取ArchiveManager实例
        const archiveManager = ArchiveManager.getInstance();

        // 获取玩家拥有的物品
        const playerItems: string[] = [];
        for (const itemId in ITEMS_DATABASE) {
            if (archiveManager.hasItem(itemId)) {
                playerItems.push(itemId);
            }
        }

        // 如果没有物品，显示提示
        if (playerItems.length === 0) {
            bagGrid.innerHTML = '<p class="empty-bag" style="grid-column: 1/-1; text-align: center; color: #eeeeee;">背包是空的</p>';
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

    /**
     * 创建物品元素
     * @param item 物品数据
     * @returns HTML元素
     */
    private createItemElement(item: Item): HTMLElement {
        const itemElement = document.createElement("div");
        itemElement.className = "bag-item";
        itemElement.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <p class="item-name">${item.name}</p>
        `;

        itemElement.addEventListener("click", () => {
            this.showItemModal(item);
        });

        return itemElement;
    }

    /**
     * 显示物品详情弹窗
     * @param item 物品数据
     */
    public showItemModal(item: Item): void {
        const modal = document.getElementById("item-modal");
        const itemName = document.getElementById("modal-item-name");
        const itemDescription = document.getElementById("modal-item-description");

        if (itemName) itemName.textContent = item.name;
        if (itemDescription) itemDescription.textContent = item.description;

        if (modal) {
            modal.style.display = "flex";
        }
    }

    /**
     * 添加物品到背包
     * @param itemId 物品ID
     */
    public addItemToBag(itemId: string): void {
        const archiveManager = ArchiveManager.getInstance();
        archiveManager.addItem(itemId);
    }

    /**
     * 从背包移除物品
     * @param itemId 物品ID
     */
    public removeItemFromBag(itemId: string): void {
        const archiveManager = ArchiveManager.getInstance();
        archiveManager.removeItem(itemId);
    }

    /**
     * 检查背包中是否有指定物品
     * @param itemId 物品ID
     * @returns 是否拥有该物品
     */
    public hasItemInBag(itemId: string): boolean {
        const archiveManager = ArchiveManager.getInstance();
        return archiveManager.hasItem(itemId);
    }

    /**
     * 获取物品信息
     * @param itemId 物品ID
     * @returns 物品信息
     */
    public getItemInfo(itemId: string): Item | undefined {
        return ITEMS_DATABASE[itemId];
    }
}