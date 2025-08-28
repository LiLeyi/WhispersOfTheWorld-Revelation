// 第0章场景数据
import { Scene } from '../../../types/SceneTypes';
import gameScene from '../../../pages/game_scenes/game_scenes';
import { ArchiveManager } from '../../../components/ArchiveManager';

// 定义第0章的起始场景
const chapter0_scene_0: Scene = {
    id: "chapter_0_scene_0",
    title: "第0章：开始",
    nodes: [
        {
            id: "start",
            elements: {
                background: "sc3.1/page1.JPG",
                name: "旁白",
                text: "夜幕降临，你走在一条空旷的街道上。街灯昏暗，四周寂静无声。"
            }
        },
        {
            id: "node1",
            elements: {
                name: "旁白",
                text: "突然，你注意到前方有一个模糊的身影。"
            }
        },
        {
            id: "node2",
            elements: {
                name: "神秘人",
                text: "你终于来了...我已等候多时。",
                sprite: {
                    center: 'mysterious_man/mysterious_man.png'
                }
            }
        },
        {
            id: "node3",
            elements: {
                name: "你",
                text: "你是谁？为什么等我？"
            }
        },
        {
            id: "node4",
            elements: {
                name: "神秘人",
                text: "我是谁并不重要。重要的是，你即将面临一个选择，而这个选择将决定你的命运。"
            }
        },
        {
            id: "node5",
            elements: {
                name: "旁白",
                text: "神秘人递给你一把古老的钥匙。"
            }
        },
        {
            id: "node6",
            elements: {
                name: "神秘人",
                text: "这把钥匙将引导你走向真相，但记住，每个选择都有其代价。"
            },
            choices: [
                {
                    text: "继续",
                    next: "take_key_1",
                    action: () => {
                        // 使用 ArchiveManager 管理物品
                        const archiveManager = ArchiveManager.getInstance();
                        archiveManager.addItem("ancient_key");
                        // 增加神秘人好感度
                        archiveManager.increaseAffection("mysterious_man", 10);
                        console.log("获得了古老的钥匙");
                    }
                },
                {
                    text: "拒绝钥匙",
                    next: "refuse_key"
                }
            ]
        },
        // 接过钥匙的分支
        {
            id: "take_key",
            elements: {
                name: "你",
                text: "我接受你的钥匙。"
            }
        },
        {
            id: "take_key_1",
            elements: {
                name: "神秘人",
                text: "明智的选择。记住，当你来到分岔路口时，用心去选择。"
            }
        },
        {
            id: "take_key_2",
            elements: {
                name: "旁白",
                text: "神秘人消失在夜色中，只留下你和那把冰冷的钥匙。",
                sprite: {
                    center: null
                }
            },
            next: "fork_in_road"
        },
        // 拒绝钥匙的分支
        {
            id: "refuse_key",
            elements: {
                name: "你",
                text: "我不需要你的钥匙。"
            }
        },
        {
            id: "refuse_key_1",
            elements: {
                name: "神秘人",
                text: "那么，你将只能靠自己了。愿命运眷顾你。"
            }
        },
        {
            id: "refuse_key_2",
            elements: {
                name: "旁白",
                text: "神秘人叹了口气，消失在夜色中。你继续独自前行。",
                sprite: {
                    center: null
                }
            },
            next: "fork_in_road"
        },
        // 分岔路口
        {
            id: "fork_in_road",
            elements: {
                background: "sc3.1/page2.0.JPG",
                name: "旁白",
                text: "你来到一个分岔路口。左边的小路通向一座古老的建筑，右边的小路消失在黑暗中。"
            },
            choices: [
                {
                    text: "走左边的路",
                    next: "chapter_0_scene_1_0",
                    condition: () => {
                        // 可以根据好感度值来影响选项的可用性
                        const archiveManager = ArchiveManager.getInstance();
                        const mysteriousManAffection = archiveManager.getAffection("mysterious_man");
                        // 好感度足够高时才能选择这条路
                        return mysteriousManAffection >= 5;
                    },
                    action: () => {
                        const archiveManager = ArchiveManager.getInstance();
                        archiveManager.setFlag("tookLeftPath", true);
                    }
                },
                {
                    text: "走右边的路",
                    next: "chapter_0_scene_1_1",
                    action: () => {
                        const archiveManager = ArchiveManager.getInstance();
                        archiveManager.setFlag("tookRightPath", true);
                    }
                }
            ]
        }
    ]
};

// 当DOM加载完成后启动场景
document.addEventListener("DOMContentLoaded", function () {
    gameScene.loadScene(chapter0_scene_0);
});

export default chapter0_scene_0;