import "./achievement.css";

// src/pages/achievement_page/achievement.ts
import { AchievementManager } from '../../components/AchievementManager';
import { AchievementRegistry } from '../../components/AchievementRegistry';

// 渲染成就统计信息
function renderAchievementStats(): void {
    const achievements = AchievementRegistry.getAllAchievements();
    const achievementManager = AchievementManager.getInstance();
    const unlockedCount = achievements.filter(ach => achievementManager.isUnlocked(ach.id)).length;
    const total = achievements.length;
    const percentage = total > 0 ? Math.round((unlockedCount / total) * 100) : 0;
    
    const totalElement = document.getElementById("total-achievements");
    const unlockedElement = document.getElementById("unlocked-achievements");
    const rateElement = document.getElementById("completion-rate");
    
    if (totalElement) totalElement.textContent = total.toString();
    if (unlockedElement) unlockedElement.textContent = unlockedCount.toString();
    if (rateElement) rateElement.textContent = `${percentage}%`;
}

// 渲染成就列表
function renderAchievements(): void {
    const listContainer = document.getElementById("achievement-list");
    
    if (!listContainer) {
        console.error("无法找到成就列表容器");
        return;
    }
    
    const achievements = AchievementRegistry.getAllAchievements();
    const achievementManager = AchievementManager.getInstance();
    
    listContainer.innerHTML = "";
    
    if (achievements.length === 0) {
        listContainer.innerHTML = "<p>暂无成就数据</p>";
        return;
    }
    
    const list = document.createElement("div");
    list.className = "achievements-grid";
    
    achievements.forEach((achievement) => {
        const isUnlocked = achievementManager.isUnlocked(achievement.id);
        const item = document.createElement("div");
        item.className = `achievement-item ${isUnlocked ? "unlocked" : "locked"}`;
        
        item.innerHTML = `
            <div class="achievement-icon">
                ${isUnlocked ? "🏆" : "🔒"}
            </div>
            <div class="achievement-info">
                <h3>${achievement.cnName}</h3>
                <p class="achievement-en-name">${achievement.enName}</p>
                <p class="achievement-description">${achievement.description}</p>
                <p class="achievement-status">
                    ${isUnlocked ? "✅ 已解锁" : "❌ 未解锁"}
                </p>
            </div>
        `;
        
        list.appendChild(item);
    });
    
    listContainer.appendChild(list);
    
    // 更新统计信息
    renderAchievementStats();
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function() {
    renderAchievements();
});

// 导出函数供其他模块使用
export { renderAchievements };