import "./log_page.css"

// 日志页面逻辑

document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('logContainer');
    const noLogsMessage = document.getElementById('noLogsMessage');
    const backButton = document.getElementById('backButton');

    // 初始化粒子系统
    initParticleSystem();

    if (backButton) {
        backButton.addEventListener('click', () => {
            // 检查是否有referrer参数，如果有则返回到游戏页面
            const urlParams = new URLSearchParams(window.location.search);
            const referrer = urlParams.get('referrer');
            
            if (referrer) {
                window.location.href = decodeURIComponent(referrer);
            } else {
                // 如果没有referrer，则返回到主菜单
                window.location.href = '../main_menu/main_menu.html';
            }
        });
    }

    if (logContainer) {
        displayGameLogs(logContainer, noLogsMessage);
    }
});

function displayGameLogs(container: HTMLElement, noLogsElement: HTMLElement | null) {
    // 清空容器
    container.innerHTML = '';

    // 获取当前存档ID
    let archiveId = getCurrentArchiveId();
    
    // 检查是否是新游戏
    const urlParams = new URLSearchParams(window.location.search);
    const isNewGameParam = urlParams.get("newGame");
    const isNewGame = isNewGameParam === "true";
    
    let textHistory: Array<{name: string, text: string}> = [];
    
    // 如果不是新游戏，才加载文本历史记录
    if (!isNewGame) {
        try {
            const historyKey = `gameTextHistory_${archiveId}`;
            const historyStr = localStorage.getItem(historyKey);
            if (historyStr) {
                textHistory = JSON.parse(historyStr);
            }
        } catch (e) {
            console.error('解析文本历史记录失败:', e);
        }
    }
    // 如果是新游戏，则使用空的历史记录（即不显示任何历史记录）

    // 反转数组，使最新记录显示在最上面
    textHistory = textHistory.reverse();

    // 显示历史记录
    if (textHistory.length > 0) {
        if (noLogsElement) {
            noLogsElement.style.display = 'none';
        }

        // 用于检测重复条目
        let lastEntries: Array<{ name: string; text: string }> = [];

        textHistory.forEach(entry => {
            // 检查最近几条记录中是否已存在相同条目
            const isDuplicate = lastEntries.some(
                recorded => recorded.name === entry.name && recorded.text === entry.text
            );
            
            if (isDuplicate) {
                return; // 跳过重复条目
            }
            
            // 添加到最近记录列表
            lastEntries.push(entry);
            
            // 保持最近记录列表不超过3条
            if (lastEntries.length > 3) {
                lastEntries.shift();
            }

            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';

            // 如果有角色名且不是旁白，显示角色名
            if (entry.name && entry.name !== "旁白") {
                const characterElement = document.createElement('span');
                characterElement.className = 'log-character';
                characterElement.textContent = entry.name;
                logEntry.appendChild(characterElement);
            }

            // 显示文本
            const textElement = document.createElement('span');
            textElement.className = 'log-text';
            textElement.textContent = entry.text;
            logEntry.appendChild(textElement);

            container.appendChild(logEntry);
        });
    } else {
        // 没有历史记录时显示提示
        if (noLogsElement) {
            noLogsElement.style.display = 'block';
        }
    }
}

/**
 * 获取当前存档ID
 */
function getCurrentArchiveId(): string {
    // 从URL参数获取存档ID
    const urlParams = new URLSearchParams(window.location.search);
    let archiveId = urlParams.get('archiveId');
    
    // 如果URL中没有存档ID，则尝试从localStorage获取
    if (!archiveId) {
        archiveId = localStorage.getItem('currentArchiveId') || 'default_' + Date.now();
    }
    
    return archiveId;
}

/**
 * 初始化粒子系统
 */
function initParticleSystem(): void {
    const particleContainer = document.getElementById('particle-background');
    if (!particleContainer) return;

    // 创建粒子
    createParticles(particleContainer);
    
    // 定期添加新粒子
    setInterval(() => {
        createParticles(particleContainer);
    }, 3000);
}

/**
 * 创建粒子
 */
function createParticles(container: HTMLElement): void {
    const particleCount = Math.floor(Math.random() * 3) + 2; // 每次创建2-4个粒子
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机设置粒子大小
        const size = Math.random() * 4 + 2; // 2-6px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // 随机设置粒子位置
        particle.style.left = Math.random() * 100 + '%';
        
        // 随机设置动画延迟
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // 随机设置动画持续时间
        const duration = Math.random() * 10 + 20; // 20-30秒
        particle.style.animationDuration = duration + 's';
        
        container.appendChild(particle);
        
        // 动画结束后移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + 5) * 1000);
    }
}