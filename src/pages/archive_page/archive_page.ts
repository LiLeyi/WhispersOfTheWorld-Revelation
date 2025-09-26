import "./archive_page.css"
import { ArchiveManager } from '../../components/ArchiveManager';
import { SceneRegistry } from '../../story/SceneRegistry';
import { AutoSaveManager } from '../../components/AutoSaveManager'; // 添加导入

// 存档数据接口
interface SaveSlot {
    date?: string;
    page?: string;
    click?: number;
    background?: string;
    chapter?: string;
    userFlags?: any;
    gameData?: any; // 新增游戏数据字段
    previousElements?: any; // 新增场景元素状态字段
    name?: string; // 新增存档名称字段
}

const STORAGE_KEY = "myGameSaveSlots";
let saveData: (SaveSlot | null)[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") || [];
while(saveData.length < 9) saveData.push(null);

// 添加自动存档管理器实例
const autoSaveManager = AutoSaveManager.getInstance();

// 渲染手动存档槽
async function renderSlots(){
    const container = document.getElementById('saveSlotsContainer');
    if (!container) return;
    
    container.innerHTML = '';

    for(let row=0; row<3; row++){
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        for(let col=0; col<3; col++){
            const index = row*3 + col;
            const slot = saveData[index];
            const div = document.createElement('div');
            div.className = 'save-slot';

            // 获取当前台词和场景标题
            let currentText = '无';
            let sceneTitle = '';
            let backgroundStyle = '';
            
            if (slot && slot.chapter) {
                try {
                    // 动态加载场景数据
                    const sceneModule = await SceneRegistry[slot.chapter]();
                    const scene = sceneModule.default; // 注意这里要用.default
                    
                    // 获取场景标题
                    if (scene && scene.title) {
                        sceneTitle = scene.title;
                    }
                    
                    // 查找当前节点
                    if (scene && scene.nodes && slot.click !== undefined) {
                        // 根据click数计算当前节点
                        const nodeIndex = Math.min(slot.click, scene.nodes.length - 1);
                        if (nodeIndex >= 0 && scene.nodes[nodeIndex] && scene.nodes[nodeIndex].elements) {
                            const elements = scene.nodes[nodeIndex].elements;
                            currentText = elements.text || '无';
                        }
                    }
                    
                    // 如果存档中有文本历史记录，优先显示最新的文本
                    if (slot.gameData && slot.gameData.objects) {
                        // 尝试从TextManager的文本历史中获取
                        const textHistoryKey = `gameTextHistory_${index}`;
                        const textHistoryStr = localStorage.getItem(textHistoryKey);
                        if (textHistoryStr) {
                            try {
                                const textHistory = JSON.parse(textHistoryStr);
                                if (textHistory.length > 0) {
                                    // 显示最新的文本
                                    const latestEntry = textHistory[textHistory.length - 1];
                                    currentText = latestEntry.text;
                                }
                            } catch (e) {
                                console.error('解析文本历史记录失败:', e);
                            }
                        }
                    }
                } catch (e) {
                    console.error('加载场景数据失败:', e);
                    currentText = '加载失败';
                    sceneTitle = '未知场景';
                }
                
                // 设置背景图片
                if (slot.background) {
                    backgroundStyle = `background-image: url('../../assets/images/background/${slot.background}');`;
                }
            }

            div.innerHTML = `
                <div class="save-info" style="${backgroundStyle}">
                    <h2>${slot && slot.name ? slot.name : '存档' + (index + 1)}</h2>
                    <p>${slot ? slot.date : '空'}</p>
                    <p>${slot ? sceneTitle : ''}</p>
                    <p>台词: ${slot ? currentText : 'N/A'}</p>
                </div>
                <div class="save-buttons">
                    <button class="save-button load" onclick="loadGame(${index})">
                        读取
                    </button>
                    <button class="save-button save" onclick="saveGame(${index})">
                        保存
                    </button>
                    <button class="save-button rename" onclick="renameGame(${index})">
                        命名
                    </button>
                    <button class="save-button delete" onclick="deleteGame(${index})">
                        删除
                    </button>
                </div>
            `;
             // 添加empty类到空存档槽
            if (!slot) {
                div.classList.add('empty');
            }
            rowDiv.appendChild(div);
        }
        container.appendChild(rowDiv);
    }

    const hoverSound = document.getElementById('hoverSound') as HTMLAudioElement | null;
    if (hoverSound) {
        document.querySelectorAll('.save-button').forEach(btn=>{
            btn.addEventListener('mouseover', ()=>hoverSound.play());
        });
    }
}

// 渲染自动存档槽
async function renderAutoSaveSlots() {
    const container = document.getElementById('autoSaveSlotsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const autoSaveSlots = autoSaveManager.getAutoSaveSlots();
    
    // 如果没有自动存档，显示提示信息
    if (autoSaveSlots.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'row';
        
        const slotDiv = document.createElement('div');
        slotDiv.className = 'auto-save-slot empty';
        slotDiv.innerHTML = `
            <div class="auto-save-info">
                <h3>暂无自动存档</h3>
                <p>游戏会在关键节点自动保存进度</p>
            </div>
        `;
        
        emptyDiv.appendChild(slotDiv);
        container.appendChild(emptyDiv);
        return;
    }
    
    // 显示自动存档槽位 - 修改为3行，每行3列，总共9个槽位
    for (let row = 0; row < 3; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            if (index >= autoSaveSlots.length) break;
            
            const slot = autoSaveSlots[index];
            const slotDiv = document.createElement('div');
            slotDiv.className = 'auto-save-slot';
            
            // 获取当前台词和场景标题
            let currentText = '无';
            let sceneTitle = '';
            let backgroundStyle = '';
            
            try {
                // 从存档数据中获取场景ID
                const sceneId = slot.sceneId;
                if (sceneId) {
                    // 动态加载场景数据
                    const sceneModule = await SceneRegistry[sceneId]();
                    const scene = sceneModule.default;
                    
                    // 获取场景标题
                    if (scene && scene.title) {
                        sceneTitle = scene.title;
                    }
                    
                    // 查找当前节点
                    if (scene && scene.nodes && slot.nodeIndex !== undefined) {
                        const nodeIndex = Math.min(slot.nodeIndex, scene.nodes.length - 1);
                        if (nodeIndex >= 0 && scene.nodes[nodeIndex] && scene.nodes[nodeIndex].elements) {
                            const elements = scene.nodes[nodeIndex].elements;
                            currentText = elements.text || '无';
                            
                            // 设置背景图片
                            if (elements.background) {
                                backgroundStyle = `background-image: url('../../assets/images/background/${elements.background}');`;
                            }
                        }
                    }
                }
                
                // 如果节点中没有背景，则尝试从gameData中获取
                if (!backgroundStyle && slot.gameData && slot.gameData.background) {
                    backgroundStyle = `background-image: url('../../assets/images/background/${slot.gameData.background}');`;
                }
            } catch (e) {
                console.error('加载自动存档场景数据失败:', e);
                currentText = '加载失败';
                sceneTitle = '未知场景';
            }
            
            const date = new Date(slot.timestamp);
            const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
            
            slotDiv.innerHTML = `
                <div class="auto-save-info" style="${backgroundStyle}">
                    <h3>自动存档 #${index + 1}</h3>
                    <p class="timestamp">${dateString}</p>
                    <p>${sceneTitle}</p>
                    <p>台词: ${currentText}</p>
                </div>
                <div class="auto-save-buttons">
                    <button class="auto-save-button load-auto" onclick="loadAutoSave('${slot.id}')">
                        读取
                    </button>
                    <button class="auto-save-button delete-auto" onclick="deleteAutoSave('${slot.id}')">
                        删除
                    </button>
                </div>
            `;
            
            rowDiv.appendChild(slotDiv);
        }
        
        container.appendChild(rowDiv);
    }
    
    const hoverSound = document.getElementById('hoverSound') as HTMLAudioElement | null;
    if (hoverSound) {
        document.querySelectorAll('.auto-save-button').forEach(btn=>{
            btn.addEventListener('mouseover', ()=>hoverSound.play());
        });
    }
}

// 删除自动存档
function deleteAutoSave(saveId: string) {
    if (confirm('确定要删除这个自动存档吗？')) {
        try {
            // 获取所有自动存档
            let autoSaveSlots = autoSaveManager.getAutoSaveSlots();
            
            // 过滤掉要删除的存档
            autoSaveSlots = autoSaveSlots.filter((slot: any) => slot.id !== saveId);
            
            // 保存更新后的自动存档列表
            localStorage.setItem('autoSaveSlots', JSON.stringify(autoSaveSlots));
            
            // 重新渲染自动存档槽
            renderAutoSaveSlots();
            
            const clickSound = document.getElementById('clickSound') as HTMLAudioElement | null;
            if (clickSound) clickSound.play();
            
            console.log(`[ArchivePage] 自动存档 ${saveId} 已删除`);
        } catch (e) {
            console.error('删除自动存档时出错:', e);
            alert('删除自动存档时出错');
        }
    }
}
// 加载存档
function loadGame(index: number){
    const slot = saveData[index];
    console.log(`[ArchivePage] 开始加载存档 ${index}:`, slot);
    
    if(!slot){
        alert('该存档为空');
        return;
    }

    // 恢复用户状态
    if(slot.userFlags){
        localStorage.setItem("userArr", JSON.stringify(slot.userFlags));
        console.log(`[ArchivePage] 恢复用户状态:`, slot.userFlags);
    }
    
    localStorage.setItem("nowclick", String(slot.click));
    console.log(`[ArchivePage] 设置点击数: ${slot.click}`);
    
    localStorage.setItem("MSYbackgroundIMG", slot.background || "");
    console.log(`[ArchivePage] 设置背景: ${slot.background}`);
    
    localStorage.setItem("MSYgamename", slot.chapter || "");
    console.log(`[ArchivePage] 设置章节: ${slot.chapter}`);

    // 恢复游戏数据（物品、好感度等）
    if (slot.gameData) {
        const archiveManager = ArchiveManager.getInstance();
        archiveManager.restoreFromData(slot.gameData);
        console.log(`[ArchivePage] 恢复游戏数据:`, slot.gameData);
    }

    // 恢复previousElements状态（包含sprite信息）
    if (slot.previousElements) {
        localStorage.setItem("previousElements", JSON.stringify(slot.previousElements));
        console.log(`[ArchivePage] 恢复场景元素状态:`, slot.previousElements);
    }

    const clickSound = document.getElementById('clickSound') as HTMLAudioElement | null;
    if (clickSound) clickSound.play();

    // 跳转回游戏场景页面，并传递场景信息
    const page = "../game_scenes/game_scenes.html";
    const url = `${page}?scene=${slot.chapter}&click=${slot.click || 0}`;
    console.log(`[ArchivePage] 跳转到URL: ${url}`);
    window.location.href = url;
}

function loadAutoSave(saveId: string) {
    console.log(`[ArchivePage] 开始加载自动存档: ${saveId}`);
    
    try {
        const success = autoSaveManager.restoreAutoSave(saveId);
        if (success) {
            // 从localStorage中获取场景和节点信息（这些信息在restoreAutoSave方法中设置）
            const sceneId = localStorage.getItem('restoreSceneId') || 'chapter_0_scene_0';
            const nodeIndex = localStorage.getItem('restoreNodeIndex') || '0';
            
            // 生成存档ID
            const archiveId = 'autosave_' + Date.now();
            
            // 保存存档ID到localStorage，确保游戏场景能使用正确的存档
            localStorage.setItem('currentArchiveId', archiveId);
            
            const clickSound = document.getElementById('clickSound') as HTMLAudioElement | null;
            if (clickSound) clickSound.play();
            
            // 跳转到游戏场景页面
            const page = "../game_scenes/game_scenes.html";
            const url = `${page}?scene=${sceneId}&click=${nodeIndex}&archiveId=${archiveId}`;
            console.log(`[ArchivePage] 跳转到自动存档URL: ${url}`);
            window.location.href = url;
        } else {
            alert('加载自动存档失败');
        }
    } catch (e) {
        console.error('加载自动存档时出错:', e);
        alert('加载自动存档时出错');
    }
}

// 保存存档
function saveGame(index: number){
    const nowclick = localStorage.getItem("nowclick") || "0";
    const background = localStorage.getItem("MSYbackgroundIMG") || "";
    const chapter = localStorage.getItem("MSYgamename") || "";
    
    // 获取当前游戏数据
    const archiveManager = ArchiveManager.getInstance();
    const gameData = archiveManager.getAllData();
    
    // 获取当前的previousElements状态（包含sprite信息）
    const previousElements = localStorage.getItem("previousElements");

    const slot: SaveSlot = {
        date: new Date().toLocaleString('zh-CN'),
        page: "../game_scenes/game_scenes.html",
        click: parseInt(nowclick),
        background: background,
        chapter: chapter,  // 这里保存的是场景ID而不是标题
        userFlags: JSON.parse(localStorage.getItem("userArr") || "[]"),
        gameData: gameData, // 保存游戏数据
        previousElements: previousElements ? JSON.parse(previousElements) : undefined, // 保存场景元素状态
        name: saveData[index] && saveData[index]!.name ? saveData[index]!.name : undefined // 保留原有名称
    };

    console.log(`[ArchivePage] 保存存档 ${index}:`, slot);
    
    saveData[index] = slot;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    renderSlots();

    const clickSound = document.getElementById('clickSound') as HTMLAudioElement | null;
    if (clickSound) clickSound.play();
}

// 删除存档
function deleteGame(index: number){
    if(confirm(`确定要删除存档${index+1}吗？`)){
        saveData[index] = null;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
        renderSlots();
        
        const clickSound = document.getElementById('clickSound') as HTMLAudioElement | null;
        if (clickSound) clickSound.play();
        
        alert(`存档${index+1}已删除`);
    }
}

// 重命名存档
function renameGame(index: number){
    const slot = saveData[index];
    if(!slot){
        alert('该存档为空，无法命名');
        return;
    }
    
    const currentName = slot.name || `存档${index + 1}`;
    const newName = prompt('请输入存档名称：', currentName);
    
    if(newName !== null){ // 用户没有点击取消
        slot.name = newName;
        saveData[index] = slot;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
        renderSlots();
        
        const clickSound = document.getElementById('clickSound') as HTMLAudioElement | null;
        if (clickSound) clickSound.play();
    }
}

// 根据来源设置返回按钮
function setupBackButton() {
    const backButton = document.getElementById('backButton') as HTMLAnchorElement;
    const backButtonText = document.getElementById('backButtonText');
    
    if (backButton && backButtonText) {
        // 检查是否从游戏场景进入
        const urlParams = new URLSearchParams(window.location.search);
        const from = urlParams.get('from');
        const scene = urlParams.get('scene');
        
        if (from === 'game_scenes' && scene) {
            // 从游戏场景进入，返回游戏
            backButtonText.textContent = '返回游戏';
            
            // 构造返回URL
            let returnUrl = '../game_scenes/game_scenes.html?scene=' + encodeURIComponent(scene);
            const click = urlParams.get('click');
            const archiveId = urlParams.get('archiveId');
            
            if (click) returnUrl += '&click=' + encodeURIComponent(click);
            if (archiveId) returnUrl += '&archiveId=' + encodeURIComponent(archiveId);
            
            backButton.href = returnUrl;
        } else {
            // 默认情况：返回主菜单
            backButtonText.textContent = '主菜单';
            backButton.href = '../main_menu/main_menu.html';
        }
    }
}
// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function() {
    // 设置返回按钮行为
    setupBackButton();

    // 渲染存档槽
    renderSlots();
    
    // 渲染自动存档槽
    renderAutoSaveSlots();
    
    // 输出所有存档信息到控制台，便于调试
    console.log("[ArchivePage] 当前所有存档数据:", saveData);
    console.log("[ArchivePage] 当前所有自动存档数据:", autoSaveManager.getAutoSaveSlots());
});

// 导出函数以便在HTML中使用
(window as any).loadGame = loadGame;
(window as any).saveGame = saveGame;
(window as any).deleteGame = deleteGame;
(window as any).renameGame = renameGame;
(window as any).loadAutoSave = loadAutoSave; // 导出自动存档加载函数
(window as any).deleteAutoSave = deleteAutoSave; // 添加这一行