import "./settings.css";
import { AudioManager } from '../../components/AudioManager';

let currentLang: "zh" | "en" = "zh";
let audioManager: AudioManager;

// 检查是否从游戏页面进入
function isFromGame(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  const from = urlParams.get("from");
  return from === "game_scenes";
}

// 切换语言
function toggleLang(): void {
  currentLang = currentLang === "zh" ? "en" : "zh";

  document.querySelectorAll<HTMLElement>("[data-zh]").forEach(el => {
    const newText = el.getAttribute(`data-${currentLang}`);
    if (!newText) return;

    if (el.tagName === "LABEL" || el.tagName === "SPAN") {
      el.textContent = newText;
    }
  });

  document.querySelectorAll<HTMLButtonElement>(".lang-btn").forEach(btn => {
    btn.textContent = currentLang === "zh" ? "EN" : "中";
  });
}

// 更新音量显示并设置实际音量
function updateVolumeDisplay(elementId: string, value: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value + "%";
  }

  // 根据不同的音量控制条调节对应的音量
  const volumeValue = parseFloat(value) / 100;
  switch(elementId) {
    case "gameVolumeValue":
      audioManager.setGameVolume(volumeValue);
      break;
    case "bgmVolumeValue":
      audioManager.setBGMVolume(volumeValue);
      break;
    case "menuVolumeValue":
      audioManager.setMenuVolume(volumeValue);
      break;
  }
}

// 更新自动播放速度显示
function updateAutoPlaySpeedDisplay(value: string): void {
  const element = document.getElementById("autoPlaySpeedValue");
  if (element) {
    element.textContent = value + "ms";
  }
}

// 保存设置
function saveSettings(): void {
  const gameVolume = (document.getElementById("gameVolume") as HTMLInputElement).value;
  const bgmVolume = (document.getElementById("bgmVolume") as HTMLInputElement).value;
  const menuVolume = (document.getElementById("menuVolume") as HTMLInputElement).value;
  const skipUnreadText = (document.getElementById("skipUnreadText") as HTMLInputElement).checked;
  const changeReadTextColor = (document.getElementById("changeReadTextColor") as HTMLInputElement).checked;
  const autoPlaySpeed = (document.getElementById("autoPlaySpeed") as HTMLInputElement).value;
  const stopAutoPlayOnClick = (document.getElementById("stopAutoPlayOnClick") as HTMLInputElement).checked;
  
  // 保存到 localStorage
  localStorage.setItem("gameVolume", gameVolume);
  localStorage.setItem("bgmVolume", bgmVolume);
  localStorage.setItem("menuVolume", menuVolume);
  localStorage.setItem("skipUnreadText", skipUnreadText.toString());
  localStorage.setItem("changeReadTextColor", changeReadTextColor.toString());
  localStorage.setItem("autoPlaySpeed", autoPlaySpeed);
  localStorage.setItem("stopAutoPlayOnClick", stopAutoPlayOnClick.toString());
  
  const message = currentLang === "zh" ? "设置已保存！" : "Settings saved!";
  alert(message);
}

// 加载设置
function loadSettings(): void {
  const gameVolume = localStorage.getItem("gameVolume") || "100";
  const bgmVolume = localStorage.getItem("bgmVolume") || "100";
  const menuVolume = localStorage.getItem("menuVolume") || "100";
  const skipUnreadText = localStorage.getItem("skipUnreadText") === "true";
  const changeReadTextColor = localStorage.getItem("changeReadTextColor") === "true";
  const autoPlaySpeed = localStorage.getItem("autoPlaySpeed") || "1500";
  const stopAutoPlayOnClick = localStorage.getItem("stopAutoPlayOnClick") === "true";
  
  (document.getElementById("gameVolume") as HTMLInputElement).value = gameVolume;
  (document.getElementById("bgmVolume") as HTMLInputElement).value = bgmVolume;
  (document.getElementById("menuVolume") as HTMLInputElement).value = menuVolume;
  (document.getElementById("skipUnreadText") as HTMLInputElement).checked = skipUnreadText;
  (document.getElementById("changeReadTextColor") as HTMLInputElement).checked = changeReadTextColor;
  (document.getElementById("autoPlaySpeed") as HTMLInputElement).value = autoPlaySpeed;
  (document.getElementById("stopAutoPlayOnClick") as HTMLInputElement).checked = stopAutoPlayOnClick;
  
  updateVolumeDisplay("gameVolumeValue", gameVolume);
  updateVolumeDisplay("bgmVolumeValue", bgmVolume);
  updateVolumeDisplay("menuVolumeValue", menuVolume);
  updateAutoPlaySpeedDisplay(autoPlaySpeed);
}

// 返回功能 - 根据来源决定返回哪里
function back(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const from = urlParams.get("from");
  const referrer = urlParams.get("referrer");
  const scene = urlParams.get("scene");
  
  // 手动构建参数对象以避免使用不兼容的API
  const paramsObj: Record<string, string> = {};
  urlParams.forEach((value, key) => {
      paramsObj[key] = value;
  });
  
  console.log("设置页面返回功能参数:", { from, referrer, scene, urlParams: paramsObj });
  
  // 检查是否从游戏场景进入（支持两种参数格式）
  if ((from === "game_scenes" || referrer) && scene) {
    // 如果从游戏进入，返回游戏页面
    let returnUrl = "../game_scenes/game_scenes.html?scene=" + encodeURIComponent(scene);
    const click = urlParams.get("click");
    const archiveId = urlParams.get("archiveId");
    
    if (click) returnUrl += "&click=" + encodeURIComponent(click);
    if (archiveId) returnUrl += "&archiveId=" + encodeURIComponent(archiveId);
    
    console.log("返回游戏URL:", returnUrl);
    window.location.href = returnUrl;
  } else if (referrer && referrer.includes('game_scenes')) {
    // 如果有referrer参数且包含game_scenes，则直接返回referrer
    console.log("通过referrer返回游戏:", referrer);
    window.location.href = referrer;
  } else {
    // 否则返回主菜单
    console.log("返回主菜单");
    window.location.href = "../main_menu/main_menu.html";
  }
}

// 页面加载完成后绑定事件
document.addEventListener("DOMContentLoaded", () => {
  // 初始化AudioManager
  audioManager = AudioManager.getInstance();
  
  // 初始化语言按钮
  toggleLang();
  
  // 根据来源更新返回按钮文本
  const backBtn = document.getElementById("backToMenu");
  if (backBtn) {
    if (isFromGame()) {
      backBtn.setAttribute("data-zh", "返回游戏");
      backBtn.setAttribute("data-en", "Back to Game");
      const text = currentLang === "zh" ? "返回游戏" : "Back to Game";
      backBtn.textContent = text;
    } else {
      backBtn.setAttribute("data-zh", "返回主菜单");
      backBtn.setAttribute("data-en", "Back to Main Menu");
      const text = currentLang === "zh" ? "返回主菜单" : "Back to Main Menu";
      backBtn.textContent = text;
    }
  }
  
  // 加载保存的设置
  loadSettings();
  
  // 绑定语言切换按钮
  const langBtn = document.querySelector<HTMLButtonElement>(".lang-btn");
  if (langBtn) langBtn.addEventListener("click", toggleLang);
  
  // 绑定音量滑块事件
  document.getElementById("gameVolume")?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    updateVolumeDisplay("gameVolumeValue", target.value);
  });
  
  document.getElementById("bgmVolume")?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    updateVolumeDisplay("bgmVolumeValue", target.value);
  });
  
  document.getElementById("menuVolume")?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    updateVolumeDisplay("menuVolumeValue", target.value);
  });
  
  // 绑定保存按钮
  document.getElementById("saveSettings")?.addEventListener("click", saveSettings);
  
  // 绑定返回按钮
  document.getElementById("backToMenu")?.addEventListener("click", back);

  // 绑定自动播放速度滑块事件
  document.getElementById("autoPlaySpeed")?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    updateAutoPlaySpeedDisplay(target.value);
  });
});