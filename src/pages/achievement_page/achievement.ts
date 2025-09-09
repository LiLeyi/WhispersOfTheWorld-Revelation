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
    
    // 创建 3D 轮播容器（保持原 class，并附加 carousel-3d 以启用 3D 样式）
    const list = document.createElement("div");
    list.className = "achievements-grid carousel-3d";

    // 生成卡片
    const items: HTMLDivElement[] = [];
    achievements.forEach((achievement, index) => {
        const isUnlocked = achievementManager.isUnlocked(achievement.id);
        const item = document.createElement("div");
        item.className = `achievement-item ${isUnlocked ? "unlocked" : "locked"}`;
        item.setAttribute("data-index", String(index));
        item.innerHTML = `
            <div class="achievement-icon">
                ${isUnlocked ? "🏆" : "🔒"}
            </div>
            <div class="achievement-info">
                <h3>${achievement.cnName}</h3>
                <p class="achievement-en-name">${achievement.enName}</p>
                <p class="achievement-description">${achievement.description}</p>
                <p class="achievement-status">${isUnlocked ? "✅ 已解锁" : "❌ 未解锁"}</p>
            </div>
        `;
        list.appendChild(item);
        items.push(item);
    });

    listContainer.appendChild(list);

    // 创建控制按钮容器
    const controls = document.createElement("div");
    controls.className = "carousel-controls";
    
    const prevBtn = document.createElement("div");
    prevBtn.className = "carousel-btn prev";
    prevBtn.innerHTML = "‹";
    
    const nextBtn = document.createElement("div");
    nextBtn.className = "carousel-btn next";
    nextBtn.innerHTML = "›";
    
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    listContainer.appendChild(controls);

    // 3D 轮播逻辑
    let currentIndex = 0;
    const total = items.length;

    const wrapIndex = (i: number) => {
        const m = ((i % total) + total) % total;
        return m;
    };

    const updateCarousel = () => {
        const maxVisibleOffset = Math.min(3, Math.floor((total - 1) / 2));
        items.forEach((el, i) => {
            const rawOffset = i - currentIndex;
            // 将偏移映射到最短环形距离
            let d = rawOffset;
            if (d > total / 2) d -= total;
            if (d < -total / 2) d += total;

            // 超出可视范围的卡片淡出
            const ad = Math.abs(d);
            const clamped = Math.sign(d) * Math.min(ad, maxVisibleOffset + 1);

            const translateX = clamped * 140; // 左右位移
            const translateZ = -Math.min(ad, maxVisibleOffset) * 120; // 纵深
            const rotateY = clamped * -22; // Y 轴旋转
            const scale = Math.max(0.6, 1 - ad * 0.08);
            const opacity = ad === 0 ? 1 : ad === 1 ? 0.25 : 0.05;
            const zIndex = 1000 - ad; // 中心更靠前

            el.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
            el.style.left = "50%";
            el.style.transformOrigin = "center center";
            el.style.opacity = String(opacity);
            (el.style as any).zIndex = String(zIndex);
            el.style.filter = ad === 0 ? "brightness(1)" : ad === 1 ? "blur(1.2px) brightness(0.85) saturate(0.85)" : "blur(2px) brightness(0.75) saturate(0.75)";

            // 文字与交互抑制，避免堆叠干扰
            if (ad === 0) {
                el.classList.add("is-center");
                el.classList.remove("is-dimmed", "is-hidden");
                el.style.pointerEvents = "auto";
            } else if (ad === 1) {
                el.classList.add("is-dimmed");
                el.classList.remove("is-center", "is-hidden");
                el.style.pointerEvents = "none";
            } else {
                el.classList.add("is-hidden");
                el.classList.remove("is-center", "is-dimmed");
                el.style.pointerEvents = "none";
            }
        });
    };

    const goTo = (index: number) => {
        currentIndex = wrapIndex(index);
        updateCarousel();
    };

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    // 点击聚焦到某一项
    items.forEach((el, i) => {
        el.addEventListener("click", () => {
            goTo(i);
        });
    });

    // 控制按钮事件
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        prev();
    });

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        next();
    });

    // 键盘导航（左右键与空格）
    const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            next();
        } else if (e.key === "ArrowLeft") {
            prev();
        } else if (e.code === "Space" || e.key === " ") {
            e.preventDefault();
            next();
        }
    };
    document.addEventListener("keydown", onKey);

    // 屏幕左右半部分点击导航
    const onScreenClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // 忽略按钮、返回按钮和成就项的点击
        if (target.closest('.carousel-btn') || 
            target.closest('#backButton') || 
            target.closest('.achievement-item')) {
            return;
        }

        // 获取屏幕宽度
        const screenWidth = window.innerWidth;
        // 根据点击位置判断是左半屏还是右半屏
        if (e.clientX < screenWidth / 2) {
            // 左半屏点击，向前切换
            prev();
        } else {
            // 右半屏点击，向后切换
            next();
        }
    };
    document.addEventListener("click", onScreenClick);

    // 拖拽/触控滑动
    let dragging = false;
    let startX = 0;
    let lastX = 0;
    const dragThreshold = 30;

    const onPointerDown = (e: PointerEvent) => {
        dragging = true;
        startX = e.clientX;
        lastX = startX;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        lastX = e.clientX;
    };
    const onPointerUp = (e: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        const dx = lastX - startX;
        if (Math.abs(dx) > dragThreshold) {
            if (dx < 0) next(); else prev();
        }
    };
    list.addEventListener("pointerdown", onPointerDown);
    list.addEventListener("pointermove", onPointerMove);
    list.addEventListener("pointerup", onPointerUp);
    list.addEventListener("pointercancel", onPointerUp);

    // 初始渲染
    updateCarousel();

    // 更新统计信息
    renderAchievementStats();

    // 注入主题色（仅设置 CSS 变量，保持兼容）
    const palette = [
        ["#7bdff2", "#b2f7ef"],
        ["#ffd6a5", "#fdffb6"],
        ["#caffbf", "#bde0fe"],
        ["#f2b5d4", "#cdb4db"],
        ["#a0c4ff", "#bde0fe"],
        ["#f7d6e0", "#f2b5d4"],
        ["#cdb4db", "#ffc8dd"],
        ["#bde0fe", "#a0c4ff"],
        ["#fdffb6", "#ffd6a5"],
        ["#b2f7ef", "#7bdff2"],
    ];

    items.forEach((el, i) => {
        const [start, end] = palette[i % palette.length];
        el.style.setProperty("--accent-start", start);
        el.style.setProperty("--accent-end", end);
        el.style.setProperty("--accent-glow", start + "55");
        el.style.setProperty("--accent-text", "#f8d7da");
    });
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function() {
    renderAchievements();
});

// 导出函数供其他模块使用
export { renderAchievements };