import "./style.css";

let currentLang: "zh" | "en" = "zh";

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

function checkStrength(password: string): number {
  let types = 0;
  if (/[0-9]/.test(password)) types++;
  if (/[a-z]/.test(password)) types++;
  if (/[A-Z]/.test(password)) types++;
  if (/[^a-zA-Z0-9]/.test(password)) types++;
  return types;
}

function register(): void {
  const usernameEl = document.getElementById("reg-username") as HTMLInputElement | null;
  const pwdEl = document.getElementById("reg-password") as HTMLInputElement | null;
  const confirmEl = document.getElementById("reg-confirm") as HTMLInputElement | null;
  const msgEl = document.getElementById("strength-msg") as HTMLElement | null;
  if (!usernameEl || !pwdEl || !confirmEl || !msgEl) return;

  const username = usernameEl.value.trim();
  const pwd = pwdEl.value;
  const confirm = confirmEl.value;

  if (!username || !pwd || !confirm) {
    msgEl.textContent = currentLang === "zh" ? "请填写完整信息！" : "Please fill all fields!";
    msgEl.className = "strength-msg weak";
    return;
  }

  if (pwd !== confirm) {
    msgEl.textContent = currentLang === "zh" ? "两次密码不一致！" : "Passwords do not match!";
    msgEl.className = "strength-msg weak";
    return;
  }

  const strength = checkStrength(pwd);
  if (strength <= 2) {
    msgEl.textContent = currentLang === "zh" ? "密码强度太弱！" : "Password too weak!";
    msgEl.className = "strength-msg weak";
    return;
  }

  let accounts: Record<string, string> = JSON.parse(localStorage.getItem("accounts") || "{}");
  if (accounts[username]) {
    msgEl.textContent = currentLang === "zh" ? "账号已存在！" : "Account already exists!";
    msgEl.className = "strength-msg weak";
    return;
  }

  accounts[username] = pwd;
  localStorage.setItem("accounts", JSON.stringify(accounts));

  msgEl.textContent = currentLang === "zh" ? "注册成功！" : "Registration success!";
  msgEl.className = "strength-msg strong";

  // 注册成功后跳转到登录页面，并传递用户名参数
  window.location.href = `login.html?username=${encodeURIComponent(username)}`;
}

function bindStrengthChecker(): void {
  const pwdInput = document.getElementById("reg-password") as HTMLInputElement | null;
  const msg = document.getElementById("strength-msg") as HTMLElement | null;
  if (!pwdInput || !msg) return;

  pwdInput.addEventListener("input", () => {
    const strength = checkStrength(pwdInput.value);
    if (strength <= 2) {
      msg.textContent = currentLang === "zh" ? "弱 / Weak" : "Weak";
      msg.className = "strength-msg weak";
    } else if (strength === 3) {
      msg.textContent = currentLang === "zh" ? "中 / Medium" : "Medium";
      msg.className = "strength-msg medium";
    } else {
      msg.textContent = currentLang === "zh" ? "强 / Strong" : "Strong";
      msg.className = "strength-msg strong";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("注册页面脚本加载完成");

  const langBtn = document.querySelector<HTMLButtonElement>(".lang-btn");
  langBtn?.addEventListener("click", toggleLang);

  const regBtn = document.getElementById("reg-btn");
  regBtn?.addEventListener("click", register);

  bindStrengthChecker();
});