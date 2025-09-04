import "./achievement.css";

// src/pages/achievement_page/achievement.ts
import { Achievements, Achievement } from './achievements';

// 加载成就
function loadAchievements(): Achievement[] {
    const saved = localStorage.getItem("achievements");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            return parsed as Achievement[];
        } catch (e) {
            console.error("解析成就数据失败:", e);
            return Achievements;
        }
    }
    return Achievements;
}

// 保存成就
function saveAchievements(achievements: Achievement[]): void {
    try {
        localStorage.setItem("achievements", JSON.stringify(achievements));
    } catch (e) {
        console.error("保存成就数据失败:", e);
    }
}

// 渲染成就统计信息
function renderAchievementStats(): void {
    const achievements = loadAchievements();
    const total = achievements.length;
    const unlocked = achievements.filter(ach => ach.unlocked).length;
    const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    
    const totalElement = document.getElementById("total-achievements");
    const unlockedElement = document.getElementById("unlocked-achievements");
    const rateElement = document.getElementById("completion-rate");
    
    if (totalElement) totalElement.textContent = total.toString();
    if (unlockedElement) unlockedElement.textContent = unlocked.toString();
    if (rateElement) rateElement.textContent = `${percentage}%`;
}

// 渲染成就列表
function renderAchievements(): void {
    const listContainer = document.getElementById("achievement-list");
    
    if (!listContainer) {
        console.error("无法找到成就列表容器");
        return;
    }
    
    const achievements = loadAchievements();
    
    listContainer.innerHTML = "";
    
    if (achievements.length === 0) {
        listContainer.innerHTML = "<p>暂无成就数据</p>";
        return;
    }
    
    const list = document.createElement("div");
    list.className = "achievements-grid";
    
    achievements.forEach((achievement: Achievement) => {
        const item = document.createElement("div");
        item.className = `achievement-item ${achievement.unlocked ? "unlocked" : "locked"}`;
        
        item.innerHTML = `
            <div class="achievement-icon">
                ${achievement.unlocked ? "🏆" : "🔒"}
            </div>
            <div class="achievement-info">
                <h3>${achievement.name}</h3>
                <p class="achievement-description">${achievement.description}</p>
                <p class="achievement-status">
                    ${achievement.unlocked ? "✅ 已解锁" : "❌ 未解锁"}
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
export { loadAchievements, saveAchievements, renderAchievements };