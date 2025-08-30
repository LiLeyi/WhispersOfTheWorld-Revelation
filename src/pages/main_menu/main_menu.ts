import './main_menu.css';
import { SceneRegistry } from '../../story/SceneRegistry';

// 主菜单功能
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const loadButton = document.getElementById('loadButton');
    const settingButton = document.getElementById('settingButton');
    const aboutUsButton = document.getElementById('aboutUsButton');
    const exitButton = document.getElementById('exitButton');

    if (startButton) {
        startButton.addEventListener('click', function() {
            // 检查是否登录
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
    alert("请先登录再开始游戏！");
    window.location.href = "../login_page/login.html";
    return;
    }
    
            // 尝试读取存档，如果失败则重新开始
            try {
                const lastGamePage = localStorage.getItem("lastGamePage");
                const lastClick = localStorage.getItem("nowclick");
                
                if (lastGamePage && lastClick) {
                    // 有存档，询问用户是否继续
                    if (confirm("检测到存档，是否继续游戏？")) {
                        // 通过SceneRegistry实现数据驱动的场景跳转
                        // 从lastGamePage中提取场景名称
                        let sceneName = null;
                        for (const registeredSceneName in SceneRegistry) {
                            if (lastGamePage.includes(registeredSceneName)) {
                                sceneName = registeredSceneName;
                                break;
                            }
                        }
                        
                        // 如果找到匹配的场景名称，则跳转到该场景
                        if (sceneName) {
                            const redirectUrl = `../game_scenes/game_scenes.html?scene=${sceneName}&click=${lastClick}`;
                            window.location.href = redirectUrl;
                        } else {
                            // 如果未找到匹配的场景，跳转到默认场景
                            window.location.href = `../game_scenes/game_scenes.html?scene=chapter_0_scene_0&click=${lastClick}`;
                        }
                    } else {
                        // 警告用户先保存存档
                        if (confirm("是否放弃当前存档并开始新游戏？\n\n注意：此操作将丢失未保存的进度！")) {
                            // 放弃存档，重新开始游戏
                            localStorage.removeItem("nowclick");
                            localStorage.removeItem("MSYbackgroundIMG");
                            localStorage.removeItem("MSYgamename");
                            localStorage.removeItem("userArr");
                            localStorage.removeItem("previousElements");
                            window.location.href = '../game_scenes/game_scenes.html?scene=chapter_0_scene_0&newGame=true';
                        }
                        // 如果用户选择"取消"，则不执行任何操作，留在主菜单
                    }
                } else {
                    // 没有存档，重新开始游戏
                    localStorage.removeItem("nowclick");
                    localStorage.removeItem("MSYbackgroundIMG");
                    localStorage.removeItem("MSYgamename");
                    localStorage.removeItem("userArr");
                    localStorage.removeItem("previousElements");
                    window.location.href = '../game_scenes/game_scenes.html?scene=chapter_0_scene_0&newGame=true';
                }
            } catch (e) {
                // 出现错误，重新开始游戏
                console.error("读取存档时出错:", e);
                localStorage.removeItem("nowclick");
                localStorage.removeItem("MSYbackgroundIMG");
                localStorage.removeItem("MSYgamename");
                localStorage.removeItem("userArr");
                localStorage.removeItem("previousElements");
                window.location.href = '../game_scenes/game_scenes.html?scene=chapter_0_scene_0&newGame=true';
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
            alert('设置功能尚未实现');
        });
    }

    if (aboutUsButton) {
        aboutUsButton.addEventListener('click', function() {
            window.location.href = '../about_us/about_us.html';
        });
    }

    if (exitButton) {
        exitButton.addEventListener('click', function() {
            if (confirm('确定要退出游戏吗？')) {
                window.close();
            }
        });
    }
});