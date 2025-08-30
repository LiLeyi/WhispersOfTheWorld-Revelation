import "./settings.css";

let currentLang: "zh" | "en" = "zh";

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

// 更新音量显示
function updateVolumeDisplay(elementId: string, value: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value + "%";
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

// 返回主菜单
function backToMenu(): void {
  window.location.href = "../main_menu/main_menu.html";
}

// 页面加载完成后绑定事件
document.addEventListener("DOMContentLoaded", () => {
  // 初始化语言按钮
  toggleLang();
  
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
  document.getElementById("backToMenu")?.addEventListener("click", backToMenu);
});