import './main_menu.css';
import { SceneRegistry } from '../../story/SceneRegistry';
import { AudioManager } from '../../components/AudioManager';

// 通过 webpack 引入图片资源
import chatu from './chatu.png';
import background from './background.jpg';

document.addEventListener('DOMContentLoaded', function() {
    const backgroundImage = document.getElementById('backgroundImage') as HTMLImageElement;
    const backgroundContainer = document.querySelector('.background-container');
    const menuContainer = document.querySelector('.menu-container');

    // 初始化音频管理器
    const audioManager = AudioManager.getInstance();

    if (backgroundImage) {
        // 预加载主背景
        const img = new Image();
       img.onload = function () {
            backgroundImage.src = chatu; // ✅ 使用 import 的路径
            if (backgroundContainer) {
                setTimeout(() => {
                    backgroundContainer.classList.add('fade-in');
                    // 背景淡入后显示按钮
                    setTimeout(() => {
                        if (menuContainer) {
                            menuContainer.classList.add('show');
                        }
                    }, 2000);
                }, 100);
            }
        };

        img.onerror = function () {
            console.error('背景图片加载失败，切换备用背景');
            backgroundImage.src = background; // ✅ 使用备用图
            if (backgroundContainer) {
                setTimeout(() => {
                    backgroundContainer.classList.add('fade-in');
                    setTimeout(() => {
                        if (menuContainer) {
                            menuContainer.classList.add('show');
                        }
                    }, 2000);
                }, 100);
            }
        };

        img.src = chatu; // ✅ 用 import 的变量
    }

    // 播放主页背景音乐
    audioManager.updateBackgroundMusic("bgm_main.MP3");

    // ===== 按钮事件绑定 =====
    const startButton = document.getElementById('startButton');
    const loadButton = document.getElementById('loadButton');
    const settingButton = document.getElementById('settingButton');
    const aboutUsButton = document.getElementById('aboutUsButton');
    const exitButton = document.getElementById('exitButton');
    const musicButton = document.getElementById('MusicButton');
    const achievementButton = document.getElementById('achievementButton');
    const LibraryButton = document.getElementById('LibraryButton');

    if (achievementButton) {
        achievementButton.addEventListener('click', function() {
            window.location.href = "../achievement_page/achievement_page.html";
        });
    }

    if (startButton) {
        startButton.addEventListener('click', function() {
            const currentUser = localStorage.getItem("currentUser");
            if (!currentUser) {
                alert("请先登录再开始游戏！");
                window.location.href = "../login_page/login.html";
                return;
            }

            try {
                const lastGamePage = localStorage.getItem("lastGamePage");
                const lastClick = localStorage.getItem("nowclick");

                if (lastGamePage && lastClick) {
                    if (confirm("检测到存档，是否继续游戏？")) {
                        let sceneName: string | null = null;
                        for (const registeredSceneName in SceneRegistry) {
                            if (lastGamePage.includes(registeredSceneName)) {
                                sceneName = registeredSceneName;
                                break;
                            }
                        }
                        if (sceneName) {
                            window.location.href =
                                `../game_scenes/game_scenes.html?scene=${sceneName}&click=${lastClick}`;
                        } else {
                            window.location.href =
                                `../game_scenes/game_scenes.html?scene=chapter_0_scene_0&click=${lastClick}`;
                        }
                    } else {
                        if (confirm("是否放弃当前存档并开始新游戏？\n\n注意：此操作将丢失未保存的进度！")) {
                            localStorage.removeItem("nowclick");
                            localStorage.removeItem("MSYbackgroundIMG");
                            localStorage.removeItem("MSYgamename");
                            localStorage.removeItem("userArr");
                            localStorage.removeItem("previousElements");
                            window.location.href =
                                '../game_scenes/game_scenes.html?scene=chapter_0_scene_0&newGame=true';
                        }
                    }
                } else {
                    localStorage.removeItem("nowclick");
                    localStorage.removeItem("MSYbackgroundIMG");
                    localStorage.removeItem("MSYgamename");
                    localStorage.removeItem("userArr");
                    localStorage.removeItem("previousElements");
                    window.location.href =
                        '../game_scenes/game_scenes.html?scene=chapter_0_scene_0&newGame=true';
                }
            } catch (e) {
                console.error("读取存档时出错:", e);
                localStorage.removeItem("nowclick");
                localStorage.removeItem("MSYbackgroundIMG");
                localStorage.removeItem("MSYgamename");
                localStorage.removeItem("userArr");
                localStorage.removeItem("previousElements");
                window.location.href =
                    '../game_scenes/game_scenes.html?scene=chapter_0_scene_0&newGame=true';
            }
        });
    }

    if (loadButton) {
        loadButton.addEventListener('click', function() {
            window.location.href = '../archive_page/archive_page.html';
        });
    }

    if (settingButton) {
        settingButton.addEventListener('click', function() {
            window.location.href = '../settings/settings.html';
        });
    }

    if (aboutUsButton) {
        aboutUsButton.addEventListener('click', function() {
            window.location.href = '../about_us/about_us.html';
        });
    }

    if (musicButton) {
        musicButton.addEventListener('click', function() {
            window.location.href='../music_library/music_library.html';
        });
    }

    if (LibraryButton) {
        LibraryButton.addEventListener('click', function() {
            window.location.href='../card_library/card_library.html';
        });
    }

    if (exitButton) {
        exitButton.addEventListener('click', () => {
            if (confirm('确定要退出游戏吗？')) {
                localStorage.removeItem("currentUser");
                window.location.href = 'about:blank';
                window.close();
            }
        });
    }
});
