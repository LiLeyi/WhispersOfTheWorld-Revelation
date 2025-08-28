import './main_menu.css';

// 主菜单功能
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const loadButton = document.getElementById('loadButton');
    const settingButton = document.getElementById('settingButton');
    const exitButton = document.getElementById('exitButton');

    if (startButton) {
        startButton.addEventListener('click', function() {
            // 尝试读取存档，如果失败则重新开始
            try {
                const lastGamePage = localStorage.getItem("lastGamePage");
                const lastClick = localStorage.getItem("nowclick");
                
                if (lastGamePage && lastClick) {
                    // 有存档，询问用户是否继续
                    if (confirm("检测到存档，是否继续游戏？")) {
                        // 根据页面路径确定正确的URL
                        let redirectUrl = lastGamePage;
                        if (lastGamePage.includes('scene_0')) {
                            redirectUrl = '../game_scenes/game_scenes.html?scene=chapter_0_scene_0&click=' + lastClick;
                        } else if (lastGamePage.includes('scene_1_0')) {
                            redirectUrl = '../game_scenes/game_scenes.html?scene=chapter_0_scene_1_0&click=' + lastClick;
                        } else if (lastGamePage.includes('scene_1_1')) {
                            redirectUrl = '../game_scenes/game_scenes.html?scene=chapter_0_scene_1_1&click=' + lastClick;
                        }
                        window.location.href = redirectUrl;
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

    if (exitButton) {
        exitButton.addEventListener('click', function() {
            if (confirm('确定要退出游戏吗？')) {
                window.close();
            }
        });
    }
});