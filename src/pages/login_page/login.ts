import "./style.css";

let currentLang: "zh" | "en" = "zh";

// 切换语言
function toggleLang(): void {
  currentLang = currentLang === "zh" ? "en" : "zh";

  document.querySelectorAll<HTMLElement>("[data-zh]").forEach(el => {
    const newText = el.getAttribute(`data-${currentLang}`);
    if (!newText) return;

    if ("placeholder" in el) {
      (el as HTMLInputElement).placeholder = newText;
    } else {
      el.textContent = newText;
    }
  });

  document.querySelectorAll<HTMLButtonElement>(".lang-btn").forEach(btn => {
    btn.textContent = currentLang === "zh" ? "EN" : "中";
  });
}

// 登录逻辑
function login(): void {
  const usernameEl = document.getElementById("login-username") as HTMLInputElement | null;
  const pwdEl = document.getElementById("login-password") as HTMLInputElement | null;

  if (!usernameEl || !pwdEl) return;

  const username = usernameEl.value.trim();
  const pwd = pwdEl.value;

  const accounts: Record<string, string> = JSON.parse(localStorage.getItem("accounts") || "{}");

  if (!accounts[username]) {
    alert(currentLang === "zh" ? "账号不存在，请先注册！" : "Account does not exist. Please register first!");
    return;
  }
  if (accounts[username] !== pwd) {
    alert(currentLang === "zh" ? "密码错误！" : "Incorrect password!");
    return;
  }

  localStorage.setItem("currentUser", username);
  alert(currentLang === "zh" ? "登录成功！" : "Login success!");
  window.location.href = "../game_scenes/game_scenes.html"; // 登录成功跳转首页
}

// 页面加载完成后绑定事件
document.addEventListener("DOMContentLoaded", () => {
  toggleLang(); // 初始化语言按钮

  // 检查URL参数，自动填充用户名
  const urlParams = new URLSearchParams(window.location.search);
  const registeredUsername = urlParams.get('username');
  if (registeredUsername) {
    const usernameEl = document.getElementById("login-username") as HTMLInputElement | null;
    if (usernameEl) {
      usernameEl.value = decodeURIComponent(registeredUsername);
    }
  }

  const langBtn = document.querySelector<HTMLButtonElement>(".lang-btn");
  if (langBtn) langBtn.addEventListener("click", toggleLang);

  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) loginBtn.addEventListener("click", login);
});