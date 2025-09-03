import "./archive_page.css"
import { ArchiveManager } from '../../components/ArchiveManager';
import { SceneRegistry } from '../../story/SceneRegistry';

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
// 渲染存档槽
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
    const url = `${page}?scene=${slot.chapter}&click=${slot.click || 0}&referrer=archive_page`;
    console.log(`[ArchivePage] 跳转到URL: ${url}`);
    window.location.href = url;
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
        // 检查是否从游戏场景进入（通过referrer参数）
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = urlParams.get('referrer');
        
        if (referrer) {
            try {
                // 解码referrer URL
                const decodedReferrer = decodeURIComponent(referrer);
                // 检查是否来自游戏场景
                if (decodedReferrer.includes('game_scenes.html')) {
                    // 从游戏场景进入，返回游戏
                    backButtonText.textContent = '返回游戏';
                    backButton.href = decodedReferrer;
                    return;
                }
            } catch (e) {
                console.error('解码referrer失败:', e);
            }
        }
        
        // 默认情况：从主菜单进入，返回主菜单
        backButtonText.textContent = '主菜单';
        backButton.href = '../main_menu/main_menu.html';
    }
}

// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function() {
    // 设置返回按钮行为
    setupBackButton();

    // 渲染存档槽
    renderSlots();
    
    // 输出所有存档信息到控制台，便于调试
    console.log("[ArchivePage] 当前所有存档数据:", saveData);
});

// 导出函数以便在HTML中使用
(window as any).loadGame = loadGame;
(window as any).saveGame = saveGame;
(window as any).deleteGame = deleteGame;
(window as any).renameGame = renameGame;