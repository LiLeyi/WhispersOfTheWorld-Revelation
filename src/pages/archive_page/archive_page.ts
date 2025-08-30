import "./archive_page.css"
import { ArchiveManager } from '../../components/ArchiveManager';

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
}

const STORAGE_KEY = "myGameSaveSlots";
let saveData: (SaveSlot | null)[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") || [];
while(saveData.length < 9) saveData.push(null);

// 获取打开 load 的来源页
const urlParams = new URLSearchParams(window.location.search);
const referrerPage = urlParams.get('referrer') || localStorage.getItem("lastGamePage") || "../main_menu/main_menu.html";

// 渲染存档槽
function renderSlots(){
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

            div.innerHTML = `
                <div class="save-info">
                    <h2>存档${index + 1}</h2>
                    <p>${slot ? slot.date : '空'}</p>
                    <p>${slot ? slot.chapter : ''}</p>
                    <p>点击数: ${slot ? slot.click : 'N/A'}</p>
                </div>
                <div class="save-buttons">
                    <button class="save-button" onclick="loadGame(${index})">
                        读取
                    </button>
                    <button class="save-button" onclick="saveGame(${index})">
                        保存
                    </button>
                    <button class="save-button delete" onclick="deleteGame(${index})">
                        删除
                    </button>
                </div>
            `;
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
        previousElements: previousElements ? JSON.parse(previousElements) : undefined // 保存场景元素状态
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

// “继续游戏”按钮
document.addEventListener("DOMContentLoaded", function() {
    const continueGameBtn = document.getElementById("continueGame");
    if (continueGameBtn) {
        continueGameBtn.addEventListener("click", function() {
            // 尝试找到最新的存档
            let latestSlotIndex = -1;
            let latestDate: Date | null = null;
            
            for (let i = 0; i < saveData.length; i++) {
                const slot = saveData[i];
                if (slot && slot.date) {
                    const slotDate = new Date(slot.date);
                    if (!latestDate || slotDate > latestDate) {
                        latestDate = slotDate;
                        latestSlotIndex = i;
                    }
                }
            }
            
            if (latestSlotIndex >= 0) {
                loadGame(latestSlotIndex);
            } else {
                // 没有找到存档时，返回游戏界面而不是主菜单
                const lastGamePage = localStorage.getItem("lastGamePage") || "../main_menu/main_menu.html";
                window.location.href = lastGamePage;
            }
        });
    }

    // 渲染存档槽
    renderSlots();
    
    // 输出所有存档信息到控制台，便于调试
    console.log("[ArchivePage] 当前所有存档数据:", saveData);
});

// 导出函数以便在HTML中使用
(window as any).loadGame = loadGame;
(window as any).saveGame = saveGame;
(window as any).deleteGame = deleteGame;