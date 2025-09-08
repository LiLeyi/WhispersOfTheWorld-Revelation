import "./settings.css";
import { AudioManager } from '../../components/AudioManager';

let currentLang: "zh" | "en" = "zh";
let audioManager: AudioManager;

// 检查是否从游戏页面进入（通过referrer参数）
function isFromGame(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = urlParams.get("referrer");
  return referrer ? referrer.includes("game_scenes") : false;
}

// 获取游戏页面URL
function getGamePageUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = urlParams.get("referrer");
  return referrer || null;
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

// 保存设置
function saveSettings(): void {
  const gameVolume = (document.getElementById("gameVolume") as HTMLInputElement).value;
  const bgmVolume = (document.getElementById("bgmVolume") as HTMLInputElement).value;
  const menuVolume = (document.getElementById("menuVolume") as HTMLInputElement).value;
  
  // 保存到 localStorage
  localStorage.setItem("gameVolume", gameVolume);
  localStorage.setItem("bgmVolume", bgmVolume);
  localStorage.setItem("menuVolume", menuVolume);
  
  const message = currentLang === "zh" ? "设置已保存！" : "Settings saved!";
  alert(message);
}

// 加载设置
function loadSettings(): void {
  const gameVolume = localStorage.getItem("gameVolume") || "100";
  const bgmVolume = localStorage.getItem("bgmVolume") || "100";
  const menuVolume = localStorage.getItem("menuVolume") || "100";
  
  (document.getElementById("gameVolume") as HTMLInputElement).value = gameVolume;
  (document.getElementById("bgmVolume") as HTMLInputElement).value = bgmVolume;
  (document.getElementById("menuVolume") as HTMLInputElement).value = menuVolume;
  
  updateVolumeDisplay("gameVolumeValue", gameVolume);
  updateVolumeDisplay("bgmVolumeValue", bgmVolume);
  updateVolumeDisplay("menuVolumeValue", menuVolume);
}

// 返回功能 - 根据来源决定返回哪里
function back(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = urlParams.get("referrer");
  
  if (isFromGame() && referrer) {
    // 如果从游戏进入，返回游戏页面
    window.location.href = referrer;
  } else if (referrer) {
    // 如果有referrer但不是来自游戏，则返回referrer指定的页面
    window.location.href = referrer;
  } else {
    // 否则返回主菜单
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
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get("referrer");
    
    if (referrer) {
      backBtn.setAttribute("data-zh", "返回");
      backBtn.setAttribute("data-en", "Back");
      const text = currentLang === "zh" ? "返回" : "Back";
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
});